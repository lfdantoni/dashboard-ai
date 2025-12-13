import { Link } from 'react-router-dom';
import { Card, Button, PageHeader } from '../components/ui';

export const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <header className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="🚀 Dashboard AI"
          subtitle="Welcome to Dashboard AI"
        />
        
        <Card className="max-w-[500px] w-full">
          <h2 className="mt-0 text-primary">Get Started</h2>
          <p className="text-sm sm:text-base">A full-stack application with React and NestJS</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Login with Google</Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">Go to Dashboard</Button>
            </Link>
          </div>
        </Card>

        <Card className="max-w-[500px] w-full mt-4 sm:mt-6">
          <h2 className="mt-0 text-primary">Features</h2>
          <ul className="list-none p-0 text-left text-sm sm:text-base">
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Google OAuth Authentication</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Protected Routes</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ NestJS Backend API</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Swagger Documentation</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Docker Support</li>
          </ul>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8 w-full max-w-[500px]">
          <a 
            href="http://localhost:3000/api/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[rgba(100,108,255,0.1)] border-2 border-[#646cff] transition-all duration-300 hover:bg-[rgba(100,108,255,0.2)] hover:-translate-y-0.5 text-center"
          >
            API Documentation
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[rgba(100,108,255,0.1)] border-2 border-[#646cff] transition-all duration-300 hover:bg-[rgba(100,108,255,0.2)] hover:-translate-y-0.5 text-center"
          >
            GitHub Repository
          </a>
        </div>
      </header>
    </div>
  );
};
