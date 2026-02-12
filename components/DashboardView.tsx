
import React from 'react';
import { REPOS, SERVICES, EDGE_NODES } from '../constants';

const DashboardView: React.FC = () => {
  const onlineServices = SERVICES.filter(s => s.status === 'online').length;
  const healthAvg = Math.round(REPOS.reduce((acc, r) => acc + r.healthScore, 0) / REPOS.length);
  const activeNodes = EDGE_NODES.filter(n => n.status === 'active').length;

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full">
      <header>
        <h2 className="text-2xl font-bold text-white">System Overview</h2>
        <p className="text-slate-400">Real-time status of your multirepo architecture.</p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Repositories" value={REPOS.length} icon="📂" color="blue" />
        <MetricCard label="Active Services" value={`${onlineServices}/${SERVICES.length}`} icon="☁️" color="green" />
        <MetricCard label="Global Health" value={`${healthAvg}%`} icon="❤️" color="rose" />
        <MetricCard label="Edge Nodes" value={activeNodes} icon="🌐" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Commits */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
            <h3 className="font-semibold text-slate-200">Recent Infrastructure Activity</h3>
            <button className="text-xs text-indigo-400 hover:underline">View all</button>
          </div>
          <div className="divide-y divide-slate-800">
            {REPOS.map(repo => (
              <div key={repo.id} className="p-4 flex gap-4 hover:bg-slate-800/20 transition-colors">
                <div className="mt-1 text-xl">📝</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{repo.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">{repo.lastCommit.hash}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{repo.lastCommit.message}</p>
                  <p className="text-xs text-slate-500 mt-1">By {repo.lastCommit.author} • {new Date(repo.lastCommit.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sync Status */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-800/30">
            <h3 className="font-semibold text-slate-200">Repository Sync Status</h3>
          </div>
          <div className="p-4 space-y-4">
            {REPOS.map(repo => (
              <div key={repo.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${repo.syncStatus === 'synced' ? 'bg-green-500' : repo.syncStatus === 'behind' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <span className="font-medium text-sm">{repo.name}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  repo.syncStatus === 'synced' ? 'bg-green-500/10 text-green-400' : repo.syncStatus === 'behind' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {repo.syncStatus}
                </span>
              </div>
            ))}
            <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-xs text-indigo-300 leading-relaxed">
                <strong>Brain Suggestion:</strong> Your <code className="text-white">nexus-backend-api</code> is behind. Sync is recommended before deploying the next frontend batch to avoid schema mismatches.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string | number; icon: string; color: string }> = ({ label, value, icon, color }) => {
  const colors: Record<string, string> = {
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
    green: 'border-green-500/20 bg-green-500/5 text-green-400',
    rose: 'border-rose-500/20 bg-rose-500/5 text-rose-400',
    indigo: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-400'
  };

  return (
    <div className={`p-6 rounded-xl border ${colors[color]} flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium opacity-70 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <span className="text-3xl grayscale brightness-150">{icon}</span>
    </div>
  );
};

export default DashboardView;
