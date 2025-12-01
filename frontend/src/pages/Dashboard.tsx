import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import { 
  Search, Bell, Mail, ChevronDown, ArrowUpRight, 
  Edit2, Calendar as CalendarIcon,
  LayoutDashboard, Settings, Users, FileText,
  RotateCw, Star, Trophy, CheckCircle
} from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Booking');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Left Sidebar (Mini) */}
      <aside className="sidebar">
        <div className="logo">
          <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', clipPath: 'circle(70% at 30% 30%)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#888' }}>
          <LayoutDashboard size={24} color="#006D77" />
          <Users size={24} />
          <FileText size={24} />
          <Settings size={24} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="nav-links">
            <span className="nav-link active">Overview</span>
            <span className="nav-link">Reports</span>
          </div>
          
          <div className="search-bar">
            <Search size={18} color="#888" />
            <input type="text" placeholder="Search Rooms" />
          </div>
        </header>

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>Main Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#006D77', cursor: 'pointer' }}>
            <span>Manage</span>
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['Booking', 'Amenities', 'Customization', 'Locality'].map(tab => (
            <div 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {/* Profile Widget */}
          <div className="card card-profile" style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600 }}>Profile</span>
              <RotateCw size={16} color="#888" style={{ cursor: 'pointer' }} />
            </div>
            
            <div className="profile-ring">
              {/* Progress Ring Simulation */}
              <div className="profile-ring-progress"></div>
              <img 
                src={user?.picture || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                alt="profile" 
                className="profile-ring-avatar"
              />
              <div className="profile-ring-badge">
                <Star size={10} fill="white" color="white" />
              </div>
            </div>

            <div className="profile-title">{user?.name || 'Kristin Watson'}</div>
            <div className="profile-subtitle">Design Manager</div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <div className="profile-stat-pill">
                <Users size={14} color="#FF6B6B" /> <span>11</span>
              </div>
              <div className="profile-stat-pill">
                <CheckCircle size={14} color="#FF6B6B" /> <span>56</span>
              </div>
              <div className="profile-stat-pill">
                <Trophy size={14} color="#FF6B6B" /> <span>12</span>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="card">
            <div>
              <div className="stat-label">Today's Earning</div>
              <div className="stat-value">$2890</div>
            </div>
            {/* Mock Graph */}
            <svg viewBox="0 0 100 40" style={{ width: '100%', height: '50px', overflow: 'visible' }}>
              <path d="M0 30 Q 20 10, 40 25 T 80 15 T 100 5" fill="none" stroke="#006D77" strokeWidth="3" />
            </svg>
          </div>

          {/* Demographics */}
          <div className="card card-yellow">
            <div>
              <div className="stat-label">Demographics</div>
              <div className="stat-value">20</div>
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
              <Users size={40} opacity={0.2} />
            </div>
          </div>

          {/* Today's Bookings */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-label">Today's Bookings</div>
                <div className="stat-value">24</div>
              </div>
              <div style={{ background: '#E0F2F1', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', color: '#006D77', height: 'fit-content' }}>
                +12%
              </div>
            </div>
            <div>
              <div className="stat-label">Total Balance</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#EF476F' }}>$2M <span style={{ fontSize: '0.8rem', color: '#888' }}>+</span></div>
            </div>
          </div>

          {/* Promo */}
          <div className="card card-dark">
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>20% OFF</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>On your first booking</div>
            </div>
            <button style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', width: 'fit-content' }}>
              NEWBIE20
            </button>
            <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.6 }}>COPY CODE</div>
          </div>

          {/* Design Meetings */}
          <div className="card card-green">
            <div>
              <div style={{ fontWeight: 'bold' }}>Design Meetings</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>11 Min Left</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div className="avatars">
                <img src="https://i.pravatar.cc/100?img=1" className="avatar" alt="user" />
                <img src="https://i.pravatar.cc/100?img=2" className="avatar" alt="user" />
              </div>
              <div style={{ background: '#FFD166', borderRadius: '50%', padding: '0.3rem' }}>
                <ArrowUpRight size={16} color="black" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="section-header">
          <h2>Active Bookings</h2>
          <span style={{ color: '#006D77', cursor: 'pointer', fontWeight: 500 }}>Check All &gt;</span>
        </div>

        <div className="bookings-list">
          <div className="booking-card">
            <div className="booking-header">
              <span style={{ fontWeight: 600 }}>Award Ceremony</span>
              <div style={{ width: '10px', height: '10px', background: '#A7F3D0', borderRadius: '50%' }}></div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>12:30 - 15:45</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ background: '#FFF8E1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: '#F57F17' }}>Team</span>
              <span style={{ background: '#FFEBEE', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: '#C2185B' }}>Meeting</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div className="avatars">
                <img src="https://i.pravatar.cc/100?img=3" className="avatar" alt="user" />
                <img src="https://i.pravatar.cc/100?img=4" className="avatar" alt="user" />
                <div className="avatar" style={{ background: '#FFD166', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'black' }}>+9</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ padding: '0.3rem', borderRadius: '50%', border: '1px solid #eee' }}><Edit2 size={14} color="#888" /></div>
                <div style={{ padding: '0.3rem', borderRadius: '50%', background: '#006D77', color: 'white' }}><ArrowUpRight size={14} /></div>
              </div>
            </div>
          </div>

          <div className="booking-card">
            <div className="booking-header">
              <span style={{ fontWeight: 600 }}>Design Discussion</span>
              <div style={{ width: '10px', height: '10px', background: '#A7F3D0', borderRadius: '50%' }}></div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>16:30 - 20:00</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ background: '#FFF8E1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: '#F57F17' }}>Team</span>
              <span style={{ background: '#FFEBEE', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', color: '#C2185B' }}>Meeting</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div className="avatars">
                <img src="https://i.pravatar.cc/100?img=5" className="avatar" alt="user" />
                <img src="https://i.pravatar.cc/100?img=6" className="avatar" alt="user" />
                <div className="avatar" style={{ background: '#FFD166', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'black' }}>+2</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ padding: '0.3rem', borderRadius: '50%', border: '1px solid #eee' }}><Edit2 size={14} color="#888" /></div>
                <div style={{ padding: '0.3rem', borderRadius: '50%', background: '#006D77', color: 'white' }}><ArrowUpRight size={14} /></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="user-profile pos-relative">
          <Mail size={20} color="#888" />
          <Bell size={20} color="#888" />
          <div className="user-profile-name" onClick={() => setShowUserMenu(v => !v)}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{user?.name || 'Thomas Gepsan'}</div>
            <div style={{ fontSize: '0.7rem', color: '#888' }}>Super Admin</div>
          </div>
          <img 
            src={user?.picture || "https://i.pravatar.cc/100?img=12"} 
            alt="profile" 
            className="user-profile-avatar"
            onClick={() => setShowUserMenu(v => !v)}
          />

          {showUserMenu && (
            <div className="user-menu">
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}
        </div>

        <div className="calendar-widget">
          <div className="calendar-header">
            <h3>Jan, 21 Tuesday</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ChevronDown size={16} style={{ transform: 'rotate(90deg)' }} />
              <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
            </div>
          </div>
          <div className="calendar-grid">
            <div style={{ color: '#888' }}>Sun</div>
            <div style={{ color: '#888' }}>Mon</div>
            <div style={{ color: '#888' }}>Tue</div>
            <div style={{ color: '#888' }}>Wed</div>
            <div style={{ color: '#888' }}>Thu</div>
            <div style={{ color: '#888' }}>Fri</div>
            <div style={{ color: '#888' }}>Sat</div>
            
            {/* Mock Calendar Days */}
            <div className="calendar-day">31</div>
            <div className="calendar-day">1</div>
            <div className="calendar-day">2</div>
            <div className="calendar-day">3</div>
            <div className="calendar-day">4</div>
            <div className="calendar-day">5</div>
            <div className="calendar-day">6</div>
            
            <div className="calendar-day">8</div>
            <div className="calendar-day">9</div>
            <div className="calendar-day active">10</div>
            <div className="calendar-day">11</div>
            <div className="calendar-day active">12</div>
            <div className="calendar-day">13</div>
            <div className="calendar-day">14</div>

            <div className="calendar-day">15</div>
            <div className="calendar-day">16</div>
            <div className="calendar-day">17</div>
            <div className="calendar-day">18</div>
            <div className="calendar-day">19</div>
            <div className="calendar-day orange">20</div>
            <div className="calendar-day orange">21</div>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="time">08:00</div>
            <div style={{ borderBottom: '1px solid #eee', flex: 1 }}></div>
          </div>
          
          <div className="timeline-item">
            <div className="time">08:30</div>
            <div className="event-card event-blue">
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: '#006D77', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={12} color="white" />
                </div>
                Award Show Discussion
              </div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>09:00 AM — 10:00 AM</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="time">09:00</div>
          </div>

          <div className="timeline-item">
            <div className="time">09:30</div>
            <div className="event-card event-yellow">
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', background: '#F57F17', borderRadius: '50%' }}></div>
                New Branding work Ave
              </div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>11:00 AM — 12:30 PM</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="time">10:00</div>
          </div>

          <div className="timeline-item">
            <div className="time">10:30</div>
            <div className="event-card event-pink">
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', background: '#C2185B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarIcon size={12} color="white" />
                </div>
                Development Discussion
              </div>
              <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>12:00 PM — 03:30 AM</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

