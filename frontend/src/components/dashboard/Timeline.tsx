import { ReactNode } from 'react';
import { Card } from '../ui/Card';
import './Timeline.css';

export interface TimelineEvent {
  time: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: 'blue' | 'yellow' | 'pink';
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline = ({ events, className = '' }: TimelineProps) => {
  return (
    <div className={`timeline ${className}`.trim()}>
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-time">{event.time}</div>
          {event.title ? (
            <Card className={`timeline-event event-${event.variant || 'blue'}`}>
              <div className="timeline-event-header">
                {event.icon && (
                  <div className="timeline-event-icon">
                    {event.icon}
                  </div>
                )}
                <div className="timeline-event-title">{event.title}</div>
              </div>
              {event.subtitle && (
                <div className="timeline-event-subtitle">{event.subtitle}</div>
              )}
            </Card>
          ) : (
            <div className="timeline-line" />
          )}
        </div>
      ))}
    </div>
  );
};

