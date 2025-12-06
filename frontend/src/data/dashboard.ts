export interface ChartDataPoint {
  date: Date;
  label: string;
  day: number;
  dateKey: string;
  timestamp: number;
  index?: number;
  xValue?: number;
  ingresos: number;
  gastos: number;
}

/**
 * Generate all sample data for the past year with fixed test data
 * @param endDate - The end date for data generation (typically today)
 * @returns Array of chart data points
 */
export const generateAllData = (endDate: Date): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  startDate.setMonth(0);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  
  const finalEndDate = new Date(endDate);
  finalEndDate.setHours(23, 59, 59, 999);
  
  // Generate data for the past year
  for (let d = new Date(startDate); d <= finalEndDate; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const dayOfYear = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Fixed test data with some variation
    const baseIngresos = 3000;
    const baseGastos = 1500;
    const variation = Math.sin(dayOfYear / 10) * 1000;
    
    data.push({
      date,
      label: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      day: date.getDate(),
      dateKey: date.toISOString().split('T')[0], // Unique date key (YYYY-MM-DD)
      timestamp: date.getTime(), // Numeric timestamp for X-axis
      ingresos: Math.floor(baseIngresos + variation + (dayOfYear % 7) * 200),
      gastos: Math.floor(baseGastos + variation * 0.6 + (dayOfYear % 5) * 150),
    });
  }
  return data;
};

/**
 * Simulates an HTTP request to fetch filtered chart data
 * @param startAt - Unix timestamp (in milliseconds) for the start date
 * @param endAt - Unix timestamp (in milliseconds) for the end date
 * @returns Promise with filtered chart data
 */
export const fetchChartData = async (
  startAt: number,
  endAt: number
): Promise<ChartDataPoint[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log('startAt', startAt, new Date(startAt));
  console.log('endAt', endAt, new Date(endAt));

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Generate all data
  const allData = generateAllData(now);

  // Filter data based on timestamp range
  const filtered = allData.filter(point => {
    const pointTime = point.date.getTime();
    return pointTime >= startAt && pointTime <= endAt;
  });

  // Sort by date and add index to each data point for unique X-axis values
  return filtered
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((point, index) => ({
      ...point,
      index,
      xValue: index, // Unique numeric value for X-axis
    }));
};
