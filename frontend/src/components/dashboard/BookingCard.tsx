import { Edit2, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { AvatarGroup } from '../ui/AvatarGroup';
import { Badge } from '../ui/Badge';
import './BookingCard.css';

export interface BookingCardProps {
  title: string;
  time: string;
  status?: 'active' | 'pending' | 'completed';
  tags?: Array<{ label: string; variant?: 'default' | 'yellow' | 'pink' | 'green' | 'blue' }>;
  participants?: Array<{ src?: string; alt?: string }>;
  onEdit?: () => void;
  onView?: () => void;
  className?: string;
}

export const BookingCard = ({ 
  title, 
  time, 
  status = 'active',
  tags = [],
  participants = [],
  onEdit,
  onView,
  className = '' 
}: BookingCardProps) => {
  return (
    <Card className={`booking-card ${className}`.trim()}>
      <div className="booking-header">
        <span className="booking-title">{title}</span>
        {status === 'active' && (
          <div className="booking-status-indicator" />
        )}
      </div>
      <div className="booking-time">{time}</div>
      {tags.length > 0 && (
        <div className="booking-tags">
          {tags.map((tag, index) => (
            <Badge key={index} variant={tag.variant || 'default'}>
              {tag.label}
            </Badge>
          ))}
        </div>
      )}
      <div className="booking-footer">
        {participants.length > 0 && (
          <AvatarGroup 
            avatars={participants} 
            maxVisible={2}
            size="medium"
          />
        )}
        <div className="booking-actions">
          {onEdit && (
            <button 
              className="booking-action-btn"
              onClick={onEdit}
              aria-label="Edit booking"
            >
              <Edit2 size={14} color="#888" />
            </button>
          )}
          {onView && (
            <button 
              className="booking-action-btn booking-action-btn-primary"
              onClick={onView}
              aria-label="View booking"
            >
              <ArrowUpRight size={14} color="white" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

