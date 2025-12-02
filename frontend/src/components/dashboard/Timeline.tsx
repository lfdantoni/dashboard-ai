import { ReactNode } from 'react';
import clsx from 'clsx';

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

const VARIANT_CLASSES = {
  blue: 'bg-[#E0F2F1] text-primary',
  yellow: 'bg-[#FFF8E1] text-[#F57F17]',
  pink: 'bg-[#FCE4EC] text-[#C2185B]',
} as const;

const ICON_BG_CLASSES = {
  blue: 'bg-primary',
  yellow: 'bg-[#F57F17] w-2 h-2',
  pink: 'bg-[#C2185B]',
} as const;

export const Timeline = ({ events, className }: TimelineProps) => {
  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      {events.map((event, index) => {
        const variant = event.variant || 'blue';
        return (
          <div key={index} className="flex gap-4 relative">
            <div className="text-sm text-gray-500 w-10 flex-shrink-0">{event.time}</div>
            {event.title ? (
              <div 
                className={clsx(
                  'flex-1 p-4 rounded-xl text-sm shadow-[0_4px_12px_rgba(0,0,0,0.03)]',
                  VARIANT_CLASSES[variant]
                )}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {event.icon && (
                    <div 
                      className={clsx(
                        'w-5 h-5 rounded-full flex items-center justify-center',
                        ICON_BG_CLASSES[variant]
                      )}
                    >
                      {event.icon}
                    </div>
                  )}
                  <div className="flex-1">{event.title}</div>
                </div>
                {event.subtitle && (
                  <div className="text-[0.7rem] mt-1 opacity-80">{event.subtitle}</div>
                )}
              </div>
            ) : (
              <div className="flex-1 border-b border-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
};

