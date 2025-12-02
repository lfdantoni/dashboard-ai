import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/Card';
import './Calendar.css';

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

export const Calendar = ({ 
  month, 
  year,
  days, 
  onDayClick,
  onPrevMonth,
  onNextMonth,
  className = '' 
}: CalendarProps) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className={`calendar-widget ${className}`.trim()}>
      <div className="calendar-header">
        <h3>{month}{year && `, ${year}`}</h3>
        <div className="calendar-nav">
          <button 
            className="calendar-nav-btn"
            onClick={onPrevMonth}
            aria-label="Previous month"
          >
            <ChevronDown size={16} className="chevron-left" />
          </button>
          <button 
            className="calendar-nav-btn"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ChevronDown size={16} className="chevron-right" />
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {days.map((dayData, index) => (
          <div
            key={index}
            className={`calendar-day ${dayData.isActive ? 'active' : ''} ${dayData.isHighlighted ? 'highlighted' : ''}`}
            onClick={() => onDayClick?.(dayData.day)}
          >
            {dayData.day}
          </div>
        ))}
      </div>
    </Card>
  );
};

