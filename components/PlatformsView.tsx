
import React from 'react';
import { SERVICES, PROVIDER_COLORS } from '../constants';

const PlatformsView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 h-full overflow-y-auto">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Services</h2>
          <p className="text-slate-400">Manage deployments and infrastructure across multiple clouds.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-700 flex items-center gap-2 transition-all">
          <span>+</span> Add Platform
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SERVICES.map(service => (
          <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all flex flex-col">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${PROVIDER_COLORS[service.provider]}`}>
                {service.provider}
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  service.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                  service.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <span className="text-[10px] text-slate-500 font-bold uppercase">{service.status}</span>
              </div>
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-white text-lg">{service.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{service.region} • Deploy {service.lastDeploy}</p>
              
              <div className="mt-4 bg-slate-950 rounded border border-slate-800 p-2 font-mono text-[10px] h-24 overflow-y-auto space-y-1">
                {service.logs.map((log, i) => (
                  <div key={i} className="text-slate-400 flex gap-2">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-slate-800/30 flex justify-between items-center">
              <a href={service.url} target="_blank" className="text-[10px] text-indigo-400 font-mono hover:underline truncate mr-2">{service.url}</a>
              <button className="text-slate-500 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="font-bold text-white mb-6">Global Deployment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800">
                <th className="pb-3 pl-4">Service</th>
                <th className="pb-3">Platform</th>
                <th className="pb-3">Trigger</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'API Server', platform: 'Railway', trigger: 'Commit a1b2c3d', duration: '45s', status: 'Success' },
                { name: 'Static Frontend', platform: 'Vercel', trigger: 'Commit a1b2c3d', duration: '1m 20s', status: 'Success' },
                { name: 'Edge Runner', platform: 'Fly.io', trigger: 'Schedule', duration: 'N/A', status: 'Failed' },
                { name: 'Workers', platform: 'Cloudflare', trigger: 'Manual', duration: '12s', status: 'Success' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pl-4 font-medium text-white">{row.name}</td>
                  <td className="py-4 text-slate-400">{row.platform}</td>
                  <td className="py-4 font-mono text-xs">{row.trigger}</td>
                  <td className="py-4 text-slate-400">{row.duration}</td>
                  <td className="py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${row.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs">View Logs</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PlatformsView;
