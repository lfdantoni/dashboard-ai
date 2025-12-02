import { Link } from 'react-router-dom';
import { Card, Button, PageHeader } from '../components/ui';

export const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <header className="min-h-screen flex flex-col items-center justify-center p-8">
        <PageHeader
          title="🚀 Dashboard AI"
          subtitle="Welcome to Dashboard AI"
        />
        
        <Card className="max-w-[500px]">
          <h2 className="mt-0 text-primary">Get Started</h2>
          <p>A full-stack application with React and NestJS</p>
          <div className="flex gap-4 mt-6 md:flex-row flex-col">
            <Link to="/login">
              <Button>Login with Google</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary">Go to Dashboard</Button>
            </Link>
          </div>
        </Card>

        <Card className="max-w-[500px]">
          <h2 className="mt-0 text-primary">Features</h2>
          <ul className="list-none p-0 text-left text-base">
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Google OAuth Authentication</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Protected Routes</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ NestJS Backend API</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Swagger Documentation</li>
            <li className="py-2 border-b border-gray-200 last:border-b-0">✅ Docker Support</li>
          </ul>
        </Card>

        <div className="flex gap-8 mt-8 flex-wrap justify-center">
          <a 
            href="http://localhost:3000/api/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[rgba(100,108,255,0.1)] border-2 border-[#646cff] transition-all duration-300 hover:bg-[rgba(100,108,255,0.2)] hover:-translate-y-0.5"
          >
            API Documentation
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[rgba(100,108,255,0.1)] border-2 border-[#646cff] transition-all duration-300 hover:bg-[rgba(100,108,255,0.2)] hover:-translate-y-0.5"
          >
            GitHub Repository
          </a>
        </div>
      </header>
    </div>
  );
};
