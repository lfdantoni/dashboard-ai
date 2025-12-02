import { RotateCw, Star, Users, CheckCircle, Trophy } from 'lucide-react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import './ProfileCard.css';

export interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  stats?: Array<{ icon: React.ReactNode; value: number; color?: string }>;
  onRefresh?: () => void;
  className?: string;
}

export const ProfileCard = ({ 
  name, 
  role, 
  avatar,
  stats = [],
  onRefresh,
  className = '' 
}: ProfileCardProps) => {
  const defaultStats = [
    { icon: <Users size={14} color="#FF6B6B" />, value: 11 },
    { icon: <CheckCircle size={14} color="#FF6B6B" />, value: 56 },
    { icon: <Trophy size={14} color="#FF6B6B" />, value: 12 },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <Card className={`card-profile ${className}`.trim()} style={{ gridRow: 'span 2' }}>
      <div className="profile-card-header">
        <span className="profile-card-title">Profile</span>
        {onRefresh && (
          <button 
            className="profile-refresh-btn"
            onClick={onRefresh}
            aria-label="Refresh profile"
          >
            <RotateCw size={16} color="#888" />
          </button>
        )}
      </div>
      
      <div className="profile-ring">
        <div className="profile-ring-progress"></div>
        <Avatar 
          src={avatar}
          alt={name}
          size="large"
          className="profile-ring-avatar"
        />
        <div className="profile-ring-badge">
          <Star size={10} fill="white" color="white" />
        </div>
      </div>

      <div className="profile-title">{name}</div>
      <div className="profile-subtitle">{role}</div>

      <div className="profile-stats">
        {displayStats.map((stat, index) => (
          <div key={index} className="profile-stat-pill">
            {stat.icon}
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

