import { useState, useEffect, useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronUp, ChevronDown, ChevronDown as ChevronDownIcon, Loader2 } from 'lucide-react';
import { fetchChartData, ChartDataPoint } from '../../data/dashboard';

interface LineChartProps {
  className?: string;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ranges = ['By month', 'Last week', 'Last month', 'Last 3 months', 'Last year'];

export const LineChart = ({ className }: LineChartProps) => {
  // Create today once and memoize it to avoid recreating on every render
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  
  const currentMonthIndex = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Initialize with current month and 3 previous months
  const availableMonths = useMemo(() => {
    const months: Array<{ name: string; index: number; year: number }> = [];
    
    for (let i = 3; i >= 0; i--) {
      let monthIndex = currentMonthIndex - i;
      let year = currentYear;
      
      if (monthIndex < 0) {
        monthIndex += 12;
        year = currentYear - 1;
      }
      
      months.push({ name: monthNames[monthIndex], index: monthIndex, year });
    }
    return months;
  }, [currentMonthIndex, currentYear]);

  const [selectedMonthIndices, setSelectedMonthIndices] = useState<number[]>([3]); // Current month by default
  const [selectedRange, setSelectedRange] = useState('By month');
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [animatedData, setAnimatedData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<ChartDataPoint[]>([]);


  // Fetch data asynchronously when month or range changes
  useEffect(() => {
    let isCancelled = false;
    
    const loadData = async () => {
      setIsLoading(true);
      setAnimatedData([]);
      setFilteredData([]);
      
      try {
        // Convert UI state to Unix timestamps
        let startAt: number;
        let endAt: number;

        if (selectedRange === 'By month') {
          // Calculate range based on all selected months
          if (selectedMonthIndices.length === 0) {
            // Fallback to current month if no months selected
            const currentMonth = availableMonths[3];
            const firstDay = new Date(currentMonth.year, currentMonth.index, 1);
            firstDay.setHours(0, 0, 0, 0);
            const lastDay = new Date(currentMonth.year, currentMonth.index + 1, 0);
            lastDay.setHours(23, 59, 59, 999);
            const isCurrentMonth = currentMonth.index === currentMonthIndex && currentMonth.year === currentYear;
            const finalEndDate = isCurrentMonth ? today : lastDay;
            finalEndDate.setHours(23, 59, 59, 999);
            startAt = firstDay.getTime();
            endAt = finalEndDate.getTime();
          } else {
            // Get the earliest first day and latest last day from all selected months
            let earliestStart: Date | null = null;
            let latestEnd: Date | null = null;

            selectedMonthIndices.forEach(index => {
              const selectedMonth = availableMonths[index];
              const monthIdx = selectedMonth.index;
              const year = selectedMonth.year;
              
              const firstDay = new Date(year, monthIdx, 1);
              firstDay.setHours(0, 0, 0, 0);
              const lastDay = new Date(year, monthIdx + 1, 0);
              lastDay.setHours(23, 59, 59, 999);
              
              // If it's the current month, only show up to today
              const isCurrentMonth = monthIdx === currentMonthIndex && year === currentYear;
              const finalEndDate = isCurrentMonth ? new Date(today) : lastDay;
              finalEndDate.setHours(23, 59, 59, 999);
              
              if (!earliestStart || firstDay.getTime() < earliestStart.getTime()) {
                earliestStart = firstDay;
              }
              if (!latestEnd || finalEndDate.getTime() > latestEnd.getTime()) {
                latestEnd = finalEndDate;
              }
            });

            startAt = earliestStart!.getTime();
            endAt = latestEnd!.getTime();
          }
        } else if (selectedRange === 'Last week') {
          const startDate = new Date(today);
          startDate.setDate(today.getDate() - 6); // Last 7 days including today
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(today);
          endDate.setHours(23, 59, 59, 999);
          
          startAt = startDate.getTime();
          endAt = endDate.getTime();
        } else if (selectedRange === 'Last month') {
          const startDate = new Date(today);
          startDate.setDate(today.getDate() - 29); // Last 30 days including today
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(today);
          endDate.setHours(23, 59, 59, 999);
          
          startAt = startDate.getTime();
          endAt = endDate.getTime();
        } else if (selectedRange === 'Last 3 months') {
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 3);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(today);
          endDate.setHours(23, 59, 59, 999);
          
          startAt = startDate.getTime();
          endAt = endDate.getTime();
        } else if (selectedRange === 'Last year') {
          const startDate = new Date(today);
          startDate.setFullYear(today.getFullYear() - 1);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(today);
          endDate.setHours(23, 59, 59, 999);
          
          startAt = startDate.getTime();
          endAt = endDate.getTime();
        } else {
          // Default fallback
          const startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(today);
          endDate.setHours(23, 59, 59, 999);
          
          startAt = startDate.getTime();
          endAt = endDate.getTime();
        }

        const data = await fetchChartData(startAt, endAt);
        
        if (!isCancelled) {
          setFilteredData(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Error fetching chart data:', error);
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [selectedMonthIndices, selectedRange, availableMonths, today, currentMonthIndex, currentYear]);

  // Animation effect - only run when data is loaded and not loading
  useEffect(() => {
    if (isLoading || filteredData.length === 0) return; // Don't animate while loading or if no data
    
    setAnimatedData([]);
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < filteredData.length) {
          // Ensure animated data has correct indices and xValue
          const animated = filteredData.slice(0, currentIndex + 1).map((point, idx) => ({
            ...point,
            index: idx,
            xValue: idx,
          }));
          setAnimatedData(animated);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredData, isLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isRangeOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.range-dropdown')) {
          setIsRangeOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isRangeOpen]);

  // Use animated data if available and animation is in progress, otherwise use full filtered data
  // Ensure we always have data to display
  const chartData = (animatedData.length > 0 && animatedData.length < filteredData.length) 
    ? animatedData 
    : (filteredData.length > 0 ? filteredData : []);

  const maxValue = filteredData.length > 0 
    ? Math.max(...filteredData.map((d) => Math.max(d.ingresos, d.gastos)))
    : 10000;
  const minValue = filteredData.length > 0
    ? Math.min(...filteredData.map((d) => Math.min(d.ingresos, d.gastos)))
    : 0;

  const avgIngresos = filteredData.length > 0
    ? Math.round(filteredData.reduce((sum, d) => sum + d.ingresos, 0) / filteredData.length)
    : 0;

  // Determine if XAxis should be hidden
  const hideXAxis = selectedRange === 'Last 3 months' || selectedRange === 'Last year';

  // Format XAxis label based on range
  const formatXAxisLabel = (item: ChartDataPoint) => {
    if (selectedRange === 'Last 3 months' || selectedRange === 'Last year') {
      return '';
    }
    if (selectedRange === 'Last week' || selectedRange === 'Last month') {
      return item.date.getDate().toString();
    }
    // By month
    return item.date.getDate().toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as ChartDataPoint;
      const ingresos = payload.find((p: any) => p.dataKey === 'ingresos')?.value || 0;
      const gastos = payload.find((p: any) => p.dataKey === 'gastos')?.value || 0;
      const isUnbalanced = gastos > ingresos * 0.8;
      
      // Format date - always show day, month and year
      const dateLabel = dataPoint.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
      
      return (
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="text-sm font-semibold text-gray-800 mb-2">
            {dateLabel}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span className="text-xs text-gray-700">
                Ingresos: <span className="font-semibold">${ingresos.toLocaleString()}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-xs text-gray-700">
                Gastos: <span className="font-semibold">${gastos.toLocaleString()}</span>
              </span>
            </div>
          </div>
          {isUnbalanced && (
            <div className="text-xs text-purple-600 mt-2 font-medium">Desbalanceado</div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Finanzas</h2>
          <p className="text-sm text-gray-600">Análisis de ingresos y gastos</p>
        </div>
        <div className="relative range-dropdown">
          <button
            onClick={() => setIsRangeOpen(!isRangeOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm text-gray-700">Range: {selectedRange}</span>
            <ChevronDownIcon size={16} className="text-gray-600" />
          </button>
          {isRangeOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[150px] range-dropdown">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsRangeOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    selectedRange === range ? 'bg-blue-50 font-medium' : ''
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Month Navigation - Only show when "By month" is selected */}
        {selectedRange === 'By month' && (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                const minIndex = Math.min(...selectedMonthIndices);
                if (minIndex > 0) {
                  setSelectedMonthIndices(prev => prev.map(idx => idx - 1));
                }
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronUp size={20} className="text-gray-600" />
            </button>
            {availableMonths.map((month, index) => {
              const isSelected = selectedMonthIndices.includes(index);
              return (
                <button
                  key={`${month.name}-${month.year}`}
                  onClick={() => {
                    if (isSelected) {
                      // Deselect if already selected (but keep at least one selected)
                      if (selectedMonthIndices.length > 1) {
                        setSelectedMonthIndices(prev => prev.filter(idx => idx !== index));
                      }
                    } else {
                      // Add to selection
                      setSelectedMonthIndices(prev => [...prev, index].sort((a, b) => a - b));
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {month.name}
                </button>
              );
            })}
            <button
              onClick={() => {
                const maxIndex = Math.max(...selectedMonthIndices);
                if (maxIndex < availableMonths.length - 1) {
                  setSelectedMonthIndices(prev => prev.map(idx => idx + 1));
                }
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronDown size={20} className="text-gray-600" />
            </button>
          </div>
        )}

        {/* Chart */}
        <div className="flex-1 relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-sm text-gray-600 font-medium">Cargando datos...</span>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: hideXAxis ? 0 : 20 }}
            >
              <defs>
                <pattern
                  id="gridPattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="#e5e7eb" opacity="0.3" />
                </pattern>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                opacity={0.5}
                fill="url(#gridPattern)"
              />
              {!hideXAxis && (
                <XAxis
                  dataKey="xValue"
                  type="number"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  domain={[0, 'dataMax']}
                  tickFormatter={(_value: number) => {
                    const dataPoint = chartData[_value];
                    if (dataPoint) {
                      return formatXAxisLabel(dataPoint);
                    }
                    return '';
                  }}
                />
              )}
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
                axisLine={{ stroke: '#e5e7eb' }}
                domain={[Math.floor(minValue * 0.8), Math.ceil(maxValue * 1.2)]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="gastos"
                stroke="#a855f7"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#a855f7', stroke: 'white', strokeWidth: 2 }}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
          )}

          {/* Legend and Summary */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500"></div>
                <span className="text-sm text-gray-700">Ingresos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-500"></div>
                <span className="text-sm text-gray-700">Gastos</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${avgIngresos.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Prom. Ingresos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
