import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2,
  BarChart3,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/ui';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`p-6 rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-dark">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const StatItem = ({ value, label, delay = 0 }: { value: string, label: string, delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`text-center transition-all duration-700 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm md:text-base text-gray-600 font-medium">{label}</div>
    </div>
  );
};

export const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <BrainCircuit size={20} />
            </div>
            <span className="font-bold text-xl text-dark">Dashboard AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-primary">Log In</Button>
            </Link>
            <Link to="/login">
              <Button className="rounded-full px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background Elements */}
        <div 
          className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-gradient-to-tr from-accent/30 to-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-sm font-medium text-gray-600">New: Predictive Analytics Engine 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-dark mb-6 animate-fade-in-up [animation-delay:200ms]">
            Data-Driven Decisions <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Powered by AI
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 animate-fade-in-up [animation-delay:400ms]">
            Transform your workflow with intelligent dashboards, synchronized calendars, and predictive insights that help you stay ahead of the curve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:600ms]">
            <Link to="/dashboard">
              <Button className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/api/docs" target="_blank">
              <Button variant="outline" className="h-12 px-8 text-lg rounded-full border-2 hover:bg-gray-50">
                View Documentation
              </Button>
            </Link>
          </div>

          {/* Hero Dashboard Preview (Parallax Effect) */}
          <div 
            className="mt-16 sm:mt-24 relative max-w-5xl mx-auto rounded-xl shadow-2xl border border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-4 animate-fade-in-up [animation-delay:800ms]"
            style={{ transform: `perspective(1000px) rotateX(${Math.max(0, 10 - scrollY * 0.05)}deg) translateY(${scrollY * 0.05}px)` }}
          >
            <div className="rounded-lg overflow-hidden bg-white shadow-inner md:aspect-[16/9] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
              <div className="relative z-10 w-full h-full flex items-center justify-center py-8 px-4 md:p-0">
                 {/* Detailed Mock Dashboard */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl md:px-8 opacity-95">
                    {/* Revenue Chart Card */}
                    <div className="col-span-1 md:col-span-2 h-32 md:h-40 bg-white rounded-lg shadow-sm p-3 md:p-4 flex flex-col justify-between border border-gray-100 animate-fade-in-up [animation-delay:1000ms]">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs text-gray-400 font-medium">TOTAL REVENUE</div>
                          <div className="text-xl md:text-2xl font-bold text-dark">$48,290</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">
                          <TrendingUp size={12} />
                          <span>+12.5%</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-12 md:h-16 mt-2">
                        {[40, 65, 55, 80, 70, 90, 85, 95].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-sm transition-all relative group" style={{ height: `${h}%` }}>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Users Card */}
                    <div className="col-span-1 h-32 md:h-40 bg-primary rounded-lg shadow-sm p-3 md:p-4 flex flex-col justify-between text-white relative overflow-hidden animate-fade-in-up [animation-delay:1100ms]">
                      <div className="relative z-10">
                        <div className="text-xs text-white/70 font-medium">ACTIVE USERS</div>
                        <div className="text-xl md:text-2xl font-bold">2,405</div>
                      </div>
                      <div className="relative z-10 flex -space-x-2">
                         {[10, 12, 32].map((imgId, i) => (
                           <img 
                             key={i} 
                             src={`https://i.pravatar.cc/100?img=${imgId}`} 
                             alt={`User ${i}`}
                             className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-primary object-cover" 
                           />
                         ))}
                         <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] md:text-xs border-2 border-primary text-white font-medium">+42</div>
                      </div>
                    </div>

                    {/* Tasks Card */}
                    <div className="col-span-1 h-auto min-h-[180px] bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-100 animate-fade-in-up [animation-delay:1200ms]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-400 font-medium">TASKS</div>
                        <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><CheckCircle2 size={14} /></div>
                      </div>
                      <div className="space-y-3">
                        {['Review Q3 Report', 'Team Meeting', 'Update Analytics'].map((task, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${i === 0 ? 'bg-secondary' : i === 1 ? 'bg-accent' : 'bg-primary'}`}></div>
                            <div className="text-xs text-gray-600 truncate font-medium">{task}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity Table Card */}
                    <div className="col-span-1 md:col-span-2 h-auto min-h-[180px] bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-100 overflow-hidden animate-fade-in-up [animation-delay:1300ms]">
                      <div className="flex justify-between items-center mb-4">
                         <div className="text-xs text-gray-400 font-medium">RECENT ACTIVITY</div>
                         <Button variant="ghost" className="h-6 text-[10px] px-2 hover:bg-gray-50">View All</Button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { event: 'New user registered', time: '2 min ago', type: 'user' },
                          { event: 'Project "Alpha" completed', time: '1 hr ago', type: 'project' },
                          { event: 'Server load warning', time: '3 hrs ago', type: 'alert' }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${item.type === 'user' ? 'bg-blue-50 text-blue-500' : item.type === 'project' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                {item.type === 'user' ? <ShieldCheck size={16} /> : item.type === 'project' ? <CheckCircle2 size={16} /> : <BarChart3 size={16} />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-dark leading-tight">{item.event}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Everything you need in one place</h2>
            <p className="text-lg text-gray-600">
              Stop juggling multiple tools. Our integrated platform brings your data, schedule, and insights together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={LayoutDashboard}
              title="Unified Dashboards"
              description="Visualize all your key metrics in customizable, real-time dashboards. Drag, drop, and configure widgets to match your workflow."
              delay={0}
            />
            <FeatureCard 
              icon={Calendar}
              title="Smart Calendars"
              description="Sync events across teams and projects. Our intelligent scheduling suggests the best meeting times and highlights conflicts automatically."
              delay={200}
            />
            <FeatureCard 
              icon={BrainCircuit}
              title="AI Predictions"
              description="Leverage machine learning to forecast trends. Get actionable suggestions to improve performance and optimize resource allocation."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* AI Advantage Section with Parallax Background */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark z-0">
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
              backgroundSize: '30px 30px',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6 border border-accent/20">
                POWERED BY NEURAL NETWORKS
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Predict the future before it happens
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our proprietary AI engine analyzes historical data to identify patterns humans miss. From revenue forecasting to churn prediction, get the edge you need.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Automated trend analysis and anomaly detection",
                  "Natural language queries for complex data",
                  "Proactive recommendations for optimization",
                  "Seamless integration with your existing stack"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-10 bg-accent text-dark hover:bg-accent/90 border-none px-8 h-12 rounded-full text-base font-bold">
                See AI in Action
              </Button>
            </div>
            
            <div className="relative">
              <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ transform: `translateY(${scrollY * -0.05}px) rotate(${3 - scrollY * 0.005}deg)` }}
              >
                {/* AI Chat/Graph Mockup */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-sm">AI Analysis Module</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <BrainCircuit className="text-primary" size={20} />
                    </div>
                    <div className="bg-gray-800 rounded-lg rounded-tl-none p-4 text-gray-300 text-sm w-full">
                      Based on Q3 performance data, I project a <strong>24% increase</strong> in efficiency if you reallocate resources to Project Alpha.
                    </div>
                  </div>
                  
                  <div className="h-40 bg-gray-800/50 rounded-lg border border-gray-700 p-4 flex items-end justify-between gap-2">
                    {[30, 45, 35, 60, 50, 75, 65, 90].map((h, i) => (
                      <div key={i} className="w-full bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="99%" label="Accuracy Rate" delay={0} />
            <StatItem value="2M+" label="Data Points Analyzed" delay={100} />
            <StatItem value="10k+" label="Predictions Generated" delay={200} />
            <StatItem value="24/7" label="Real-time Monitoring" delay={300} />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-dark mb-6">Ready to optimize your workflow?</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Join thousands of teams using Dashboard AI to make better decisions, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login">
              <Button className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                Explore Demo
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-8">
            <p>&copy; 2024 Dashboard AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
