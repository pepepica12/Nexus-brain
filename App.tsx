
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import PlatformsView from './components/PlatformsView';
import ForensicsView from './components/ForensicsView';
import AssistantChat from './components/AssistantChat';

const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-20 text-center text-slate-500">
      Module "{title}" is ready for implementation with real API endpoints.
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-slate-950 overflow-hidden">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/repos" element={<PlaceholderView title="Repositories Management" />} />
            <Route path="/platforms" element={<PlatformsView />} />
            <Route path="/forensics" element={<ForensicsView />} />
            <Route path="/runners" element={<PlaceholderView title="Orchestration Runners" />} />
            <Route path="/cdn" element={<PlaceholderView title="Edge & CDN Control" />} />
            <Route path="/search" element={<PlaceholderView title="Google CX Search" />} />
            <Route path="/assistant" element={<AssistantChat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
