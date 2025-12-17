import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { LineChart } from '../components/dashboard/LineChart';
import { Card } from '../components/ui/Card';
import { AvatarGroup } from '../components/ui/AvatarGroup';
import { ArrowUpRight, Users, Calendar as CalendarIcon, ChevronDown, Menu, X } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Booking');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
    <div className="min-h-screen w-full bg-background font-sans overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Layout Grid */}
      <div className="lg:grid lg:grid-cols-[80px_1fr_auto] min-h-screen lg:min-h-0">
        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:w-[80px] lg:h-full
        `}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto lg:overflow-y-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => setIsAsideOpen(!isAsideOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isAsideOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
            <div className="flex gap-4 sm:gap-8">
              <span className="text-primary font-medium cursor-pointer border-b-2 border-primary pb-2">Overview</span>
              <span className="text-gray-500 font-medium cursor-pointer hover:text-primary">Reports</span>
            </div>
            
            <SearchBar placeholder="Search Rooms" className="w-full sm:w-auto" />
          </header>

        <PageHeader
          title="Main Dashboard"
          action={
            <div className="flex items-center gap-2 text-primary cursor-pointer">
              <span>Manage</span>
              <ChevronDown size={16} />
            </div>
          }
        />

        <Tabs items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] auto-rows-[190px] gap-4 sm:gap-6 mb-6 lg:mb-8">
          <ProfileCard
            name={user?.name || 'Kristin Watson'}
            role="Design Manager"
            avatar={user?.picture}
            className="animate-fade-in-up row-span-1 sm:row-span-2"
            style={{ animationDelay: '0.1s' }}
          />

          <StatCard
            label="Today's Earning"
            value="$2890"
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <svg viewBox="0 0 100 40" className="w-full h-[50px] overflow-visible">
              <path d="M0 30 Q 20 10, 40 25 T 80 15 T 100 5" fill="none" stroke="#006D77" strokeWidth="3" />
            </svg>
          </StatCard>

          <StatCard
            label="Demographics"
            value="20"
            variant="yellow"
            icon={<Users size={40} opacity={0.2} />}
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          />

          <StatCard
            label="Today's Bookings"
            value="24"
            trend="+12%"
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="mt-4">
              <div className="text-sm opacity-80">Total Balance</div>
              <div className="text-xl font-bold text-secondary">
                $2M <span className="text-sm text-gray-500">+</span>
              </div>
            </div>
          </StatCard>

          <Card variant="dark" className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div>
              <div className="text-2xl font-bold text-white">20% OFF</div>
              <div className="text-sm opacity-80 text-white">On your first booking</div>
            </div>
            <button className="mt-4 bg-white/10 text-white border border-white/20 w-fit px-4 py-2 rounded-lg cursor-pointer hover:bg-white/15">
              NEWBIE20
            </button>
            <div className="text-[0.7rem] mt-2 opacity-60 text-white">COPY CODE</div>
          </Card>

          <Card variant="green" className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="font-bold text-white">Design Meetings</div>
              <div className="text-sm opacity-80 text-white">11 Min Left</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <AvatarGroup
                avatars={[
                  { src: 'https://i.pravatar.cc/100?img=1', alt: 'User 1' },
                  { src: 'https://i.pravatar.cc/100?img=2', alt: 'User 2' },
                ]}
                maxVisible={2}
              />
              <div className="bg-accent rounded-full p-1.5">
                <ArrowUpRight size={16} color="black" />
              </div>
            </div>
          </Card>
        </div>

        <SectionHeader
          title="Active Bookings"
          action={<span>Check All &gt;</span>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
          {bookings.map((booking, index) => (
            <BookingCard
              key={index}
              title={booking.title}
              time={booking.time}
              tags={booking.tags}
              participants={booking.participants}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            />
          ))}
        </div>

        <LineChart className="animate-fade-in-up" style={{ animationDelay: '0.8s' }} />
      </main>

        {/* Aside Panel */}
        <aside className={`
          fixed lg:static inset-y-0 right-0 z-50 lg:z-auto
          bg-white border-l border-[#eef2f6] w-[350px] max-w-[90vw] box-border
          transform transition-transform duration-300 ease-in-out
          overflow-y-auto lg:overflow-y-visible lg:h-auto
          ${isAsideOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          p-4 sm:p-6 lg:p-8
        `}>
          {/* Mobile Close Button */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button
              onClick={() => setIsAsideOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <UserMenu
            userName={user?.name || 'Thomas Gepsan'}
            userRole="Super Admin"
            userAvatar={user?.picture}
            onLogout={handleLogout}
          />

          <Calendar
            month="Jan, 21 Tuesday"
            days={calendarDays}
          />

          <Timeline events={timelineEvents} />
        </aside>
      </div>
    </div>
  );
};
