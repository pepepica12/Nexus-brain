
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/repos', label: 'Repositories', icon: '📂' },
  { path: '/platforms', label: 'Platforms', icon: '☁️' },
  { path: '/forensics', label: 'Forensics', icon: '🔍' },
  { path: '/runners', label: 'Runners', icon: '⚡' },
  { path: '/cdn', label: 'Edge & CDN', icon: '🌐' },
  { path: '/search', label: 'Search CX', icon: '🔎' },
  { path: '/assistant', label: 'AI Assistant', icon: '🤖' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          NEXUS BRAIN
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Multirepo Intelligence</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">AD</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Admin Console</p>
            <p className="text-[10px] text-slate-500">v2.4.1-stable</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
