
import React, { useState } from 'react';
import { REPOS } from '../constants';
import { ForensicReport } from '../types';

const mockReports: ForensicReport[] = [
  {
    repoId: '1',
    timestamp: '2023-10-26T12:00:00Z',
    findings: [
      { type: 'trash', severity: 'low', message: 'Found .DS_Store in build folder', file: 'dist/.DS_Store' },
      { type: 'dependency', severity: 'medium', message: 'Lodash included but only one function used. Suggest cherry-picking.', file: 'package.json' }
    ]
  },
  {
    repoId: '2',
    timestamp: '2023-10-26T12:05:00Z',
    findings: [
      { type: 'duplicate', severity: 'high', message: 'Duplicate UserSchema definition found in two different directories', file: 'models/User.ts' },
      { type: 'framework', severity: 'medium', message: 'React 17 imports found in a project using React 18 syntax', file: 'components/Auth.tsx' }
    ]
  },
  {
    repoId: '4',
    timestamp: '2023-10-26T12:10:00Z',
    findings: [
      { type: 'structure', severity: 'high', message: 'Edge function exceeds 1MB limit for Cloudflare basic tier', file: 'functions/api.ts' },
      { type: 'trash', severity: 'low', message: 'Obsolete test-config.js found', file: 'scripts/test-config.js' }
    ]
  }
];

const ForensicsView: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(REPOS[0].id);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  const report = mockReports.find(r => r.repoId === selectedRepo);

  return (
    <div className="p-8 space-y-8 h-full overflow-y-auto">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Forensic Analysis</h2>
          <p className="text-slate-400">Deep structural scanning for code smells, trash, and pollution.</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
          >
            {REPOS.map(repo => <option key={repo.id} value={repo.id}>{repo.name}</option>)}
          </select>
          <button 
            onClick={handleScan}
            disabled={scanning}
            className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${scanning ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            {scanning ? 'Scanning...' : 'Run Deep Scan'}
          </button>
        </div>
      </header>

      {scanning ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-indigo-400 font-mono animate-pulse">Analyzing AST and directory tree...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>Findings for {REPOS.find(r => r.id === selectedRepo)?.name}</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-500">{report?.findings.length || 0} Issues</span>
            </h3>
            
            {report ? (
              <div className="space-y-4">
                {report.findings.map((f, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex gap-4">
                    <div className={`mt-1 text-xl flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      f.severity === 'high' ? 'bg-red-500/10 text-red-400' : f.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {f.type === 'trash' ? '🗑️' : f.type === 'duplicate' ? '👯' : f.type === 'framework' ? '⚛️' : f.type === 'dependency' ? '📦' : '🏗️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{f.type}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          f.severity === 'high' ? 'bg-red-500/20 text-red-500' : f.severity === 'medium' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'
                        }`}>{f.severity} severity</span>
                      </div>
                      <p className="text-slate-200 font-medium mt-1">{f.message}</p>
                      {f.file && <code className="block mt-2 text-xs bg-slate-950 p-2 rounded text-indigo-400 border border-slate-800">{f.file}</code>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-xl p-12 text-center text-slate-500">
                No recent forensic data available for this repository. Run a scan to populate.
              </div>
            )}
          </div>

          <aside className="space-y-6">
             <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
                <h4 className="font-bold text-indigo-400 mb-2">Automated Recommendations</h4>
                <ul className="text-sm text-slate-300 space-y-3 list-disc list-inside marker:text-indigo-500">
                  <li>Cleanup <code className="text-white">dist</code> folders across all repos</li>
                  <li>Centralize shared schemas into a <code className="text-white">nexus-shared</code> repo</li>
                  <li>Migrate Cloudflare workers to a monorepo structure to reduce config duplication</li>
                  <li>Audit <code className="text-white">node_modules</code> footprint in Runner repos</li>
                </ul>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4 italic">Comparison Insight</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Frontend is using <span className="text-white font-semibold">v18.2</span> of React, but Backend types are targeting <span className="text-white font-semibold">v17.0</span>. This discrepancy might cause SSRhydration errors.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[80%]" />
                  </div>
                  <span className="text-[10px] font-mono">80% Match</span>
                </div>
             </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ForensicsView;
