import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/dashboard/Sidebar';
import { UserMenu } from '../components/dashboard/UserMenu';
import { SearchBar } from '../components/ui/SearchBar';
import { PageHeader } from '../components/ui/PageHeader';
import { Tabs } from '../components/ui/Tabs';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StatCard } from '../components/dashboard/StatCard';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { BookingCard } from '../components/dashboard/BookingCard';
import { Calendar } from '../components/dashboard/Calendar';
import { Timeline } from '../components/dashboard/Timeline';
import { Card } from '../components/ui/Card';
import { AvatarGroup } from '../components/ui/AvatarGroup';
import { ArrowUpRight, Users, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Booking');

  const tabs = [
    { id: 'Booking', label: 'Booking' },
    { id: 'Amenities', label: 'Amenities' },
    { id: 'Customization', label: 'Customization' },
    { id: 'Locality', label: 'Locality' },
  ];

  const bookings = [
    {
      title: 'Award Ceremony',
      time: '12:30 - 15:45',
      tags: [
        { label: 'Team', variant: 'yellow' as const },
        { label: 'Meeting', variant: 'pink' as const },
      ],
      participants: [
        { src: 'https://i.pravatar.cc/100?img=3', alt: 'Participant 1' },
        { src: 'https://i.pravatar.cc/100?img=4', alt: 'Participant 2' },
        { src: 'https://i.pravatar.cc/100?img=5', alt: 'Participant 3' },
        { src: 'https://i.pravatar.cc/100?img=6', alt: 'Participant 4' },
        { src: 'https://i.pravatar.cc/100?img=7', alt: 'Participant 5' },
        { src: 'https://i.pravatar.cc/100?img=8', alt: 'Participant 6' },
        { src: 'https://i.pravatar.cc/100?img=9', alt: 'Participant 7' },
        { src: 'https://i.pravatar.cc/100?img=10', alt: 'Participant 8' },
        { src: 'https://i.pravatar.cc/100?img=11', alt: 'Participant 9' },
        { src: 'https://i.pravatar.cc/100?img=12', alt: 'Participant 10' },
        { src: 'https://i.pravatar.cc/100?img=13', alt: 'Participant 11' },
      ],
    },
    {
      title: 'Design Discussion',
      time: '16:30 - 20:00',
      tags: [
        { label: 'Team', variant: 'yellow' as const },
        { label: 'Meeting', variant: 'pink' as const },
      ],
      participants: [
        { src: 'https://i.pravatar.cc/100?img=5', alt: 'Participant 1' },
        { src: 'https://i.pravatar.cc/100?img=6', alt: 'Participant 2' },
        { src: 'https://i.pravatar.cc/100?img=7', alt: 'Participant 3' },
        { src: 'https://i.pravatar.cc/100?img=8', alt: 'Participant 4' },
      ],
    },
  ];

  const calendarDays = [
    { day: 31 },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 8 },
    { day: 9 },
    { day: 10, isActive: true },
    { day: 11 },
    { day: 12, isActive: true },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20, isHighlighted: true },
    { day: 21, isHighlighted: true },
  ];

  const timelineEvents = [
    { time: '08:00' },
    {
      time: '08:30',
      title: 'Award Show Discussion',
      subtitle: '09:00 AM — 10:00 AM',
      icon: <Users size={12} color="white" />,
      variant: 'blue' as const,
    },
    { time: '09:00' },
    {
      time: '09:30',
      title: 'New Branding work Ave',
      subtitle: '11:00 AM — 12:30 PM',
      variant: 'yellow' as const,
    },
    { time: '10:00' },
    {
      time: '10:30',
      title: 'Development Discussion',
      subtitle: '12:00 PM — 03:30 AM',
      icon: <CalendarIcon size={12} color="white" />,
      variant: 'pink' as const,
    },
    {
      time: '12:30',
      title: 'Meeting with CEO',
      subtitle: '14:00 PM — 15:00 PM',
      icon: <Users size={12} color="white" />,
      variant: 'blue' as const,
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="top-header">
          <div className="nav-links">
            <span className="nav-link active">Overview</span>
            <span className="nav-link">Reports</span>
          </div>
          
          <SearchBar placeholder="Search Rooms" />
        </header>

        <PageHeader
          title="Main Dashboard"
          action={
            <div className="manage-action">
              <span>Manage</span>
              <ChevronDown size={16} />
            </div>
          }
        />

        <Tabs items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="stats-grid">
          <ProfileCard
            name={user?.name || 'Kristin Watson'}
            role="Design Manager"
            avatar={user?.picture}
          />

          <StatCard
            label="Today's Earning"
            value="$2890"
          >
            <svg viewBox="0 0 100 40" className="earning-chart">
              <path d="M0 30 Q 20 10, 40 25 T 80 15 T 100 5" fill="none" stroke="#006D77" strokeWidth="3" />
            </svg>
          </StatCard>

          <StatCard
            label="Demographics"
            value="20"
            variant="yellow"
            icon={<Users size={40} opacity={0.2} />}
          />

          <StatCard
            label="Today's Bookings"
            value="24"
            trend="+12%"
          >
            <div className="stat-content">
              <div className="stat-label">Total Balance</div>
              <div className="stat-value-large">
                $2M <span className="stat-value-small">+</span>
              </div>
            </div>
          </StatCard>

          <Card variant="dark">
            <div>
              <div className="discount-title">20% OFF</div>
              <div className="discount-subtitle">On your first booking</div>
            </div>
            <button className="discount-button">
              NEWBIE20
            </button>
            <div className="discount-copy">COPY CODE</div>
          </Card>

          <Card variant="green">
            <div>
              <div className="meeting-title">Design Meetings</div>
              <div className="meeting-time">11 Min Left</div>
            </div>
            <div className="meeting-footer">
              <AvatarGroup
                avatars={[
                  { src: 'https://i.pravatar.cc/100?img=1', alt: 'User 1' },
                  { src: 'https://i.pravatar.cc/100?img=2', alt: 'User 2' },
                ]}
                maxVisible={2}
              />
              <div className="meeting-icon-wrapper">
                <ArrowUpRight size={16} color="black" />
              </div>
            </div>
          </Card>
        </div>

        <SectionHeader
          title="Active Bookings"
          action={<span>Check All &gt;</span>}
        />

        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <BookingCard
              key={index}
              title={booking.title}
              time={booking.time}
              tags={booking.tags}
              participants={booking.participants}
            />
          ))}
        </div>
      </main>

      <aside className="right-panel">
        <UserMenu
          userName={user?.name || 'Thomas Gepsan'}
          userRole="Super Admin"
          userAvatar={user?.picture}
          onLogout={logout}
        />

        <Calendar
          month="Jan, 21 Tuesday"
          days={calendarDays}
        />

        <Timeline events={timelineEvents} />
      </aside>
    </div>
  );
};
