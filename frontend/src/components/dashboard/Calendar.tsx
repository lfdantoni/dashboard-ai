import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '../ui/Card';

export interface CalendarDay {
  day: number;
  isActive?: boolean;
  isHighlighted?: boolean;
}

export interface CalendarProps {
  month: string;
  year?: number;
  days: CalendarDay[];
  onDayClick?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  className?: string;
}

const NAV_BUTTON_CLASSES = 'bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-gray-500 transition-colors duration-200 hover:text-primary';
const DAY_BASE_CLASSES = 'p-2 rounded-full cursor-pointer transition-all duration-200 min-w-0 aspect-square flex items-center justify-center';

export const Calendar = ({ 
  month, 
  year,
  days, 
  onDayClick,
  onPrevMonth,
  onNextMonth,
  className 
}: CalendarProps) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className={clsx('mb-8 w-full overflow-visible', className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="m-0 text-lg font-semibold">{month}{year && `, ${year}`}</h3>
        <div className="flex gap-2">
          <button 
            className={NAV_BUTTON_CLASSES}
            onClick={onPrevMonth}
            aria-label="Previous month"
          >
            <ChevronDown size={16} className="rotate-90" />
          </button>
          <button 
            className={NAV_BUTTON_CLASSES}
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ChevronDown size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm w-full min-w-0">
        {weekDays.map((day) => (
          <div key={day} className="text-gray-500 font-medium p-2 min-w-0 overflow-hidden text-ellipsis">
            {day}
          </div>
        ))}
        {days.map((dayData, index) => (
          <div
            key={index}
            className={clsx(
              DAY_BASE_CLASSES,
              dayData.isActive && 'bg-primary text-white',
              !dayData.isActive && dayData.isHighlighted && 'bg-secondary text-white',
              !dayData.isActive && !dayData.isHighlighted && 'hover:bg-gray-100'
            )}
            onClick={() => onDayClick?.(dayData.day)}
          >
            {dayData.day}
          </div>
        ))}
      </div>
    </Card>
  );
};

