
import { Repo, ServiceStatus, PlatformProvider, EdgeNode } from './types';

export const REPOS: Repo[] = [
  {
    id: '1',
    name: 'nexus-frontend',
    type: 'frontend',
    stars: 124,
    lastCommit: { message: 'feat: add forensic dashboard', author: 'dev_user', date: '2023-10-25T14:30:00Z', hash: 'a1b2c3d' },
    branches: ['main', 'develop', 'feat/forensics'],
    syncStatus: 'synced',
    healthScore: 92
  },
  {
    id: '2',
    name: 'nexus-backend-api',
    type: 'backend',
    stars: 89,
    lastCommit: { message: 'fix: auth middleware latency', author: 'lead_dev', date: '2023-10-26T09:15:00Z', hash: 'e5f6g7h' },
    branches: ['main', 'staging'],
    syncStatus: 'behind',
    healthScore: 78
  },
  {
    id: '3',
    name: 'nexus-runners',
    type: 'runner',
    stars: 45,
    lastCommit: { message: 'chore: update bash scripts', author: 'ops_guru', date: '2023-10-24T18:45:00Z', hash: 'i9j0k1l' },
    branches: ['main'],
    syncStatus: 'synced',
    healthScore: 98
  },
  {
    id: '4',
    name: 'nexus-edge-cdn',
    type: 'cdn',
    stars: 32,
    lastCommit: { message: 'perf: optimize cache rules', author: 'edge_master', date: '2023-10-26T11:00:00Z', hash: 'm2n3o4p' },
    branches: ['main'],
    syncStatus: 'diverged',
    healthScore: 65
  }
];

export const SERVICES: ServiceStatus[] = [
  { id: 's1', name: 'API Server', provider: 'Railway', status: 'online', region: 'us-east', lastDeploy: '2h ago', url: 'https://api.nexus.app', logs: ['Listening on port 8080', 'Database connected', 'Ready for requests'] },
  { id: 's2', name: 'Static Frontend', provider: 'Vercel', status: 'online', region: 'global', lastDeploy: '10m ago', url: 'https://nexus.app', logs: ['Build successful', 'Deployed to production'] },
  { id: 's3', name: 'PostgreSQL Main', provider: 'Neon', status: 'online', region: 'us-west', lastDeploy: 'N/A', url: 'postgresql://nexus_db...', logs: ['Primary node active', 'Read replica online'] },
  { id: 's4', name: 'Workers', provider: 'Cloudflare', status: 'degraded', region: 'global', lastDeploy: '5h ago', url: 'https://workers.nexus.app', logs: ['High CPU usage detected', 'Retrying deployment'] },
  { id: 's5', name: 'Background Jobs', provider: 'Render', status: 'online', region: 'eu-central', lastDeploy: '1d ago', url: 'https://jobs.nexus.app', logs: ['Queue processor running', 'Health check passed'] },
  { id: 's6', name: 'Site Edge', provider: 'Netlify', status: 'online', region: 'global', lastDeploy: '3d ago', url: 'https://site.netlify.app', logs: ['Static site serving...'] },
  { id: 's7', name: 'Edge Runner', provider: 'Fly.io', status: 'offline', region: 'sea', lastDeploy: '2d ago', url: 'https://edge.fly.dev', logs: ['Machine stopped', 'Memory limit reached'] }
];

export const EDGE_NODES: EdgeNode[] = [
  { id: 'n1', location: 'San Francisco, US', latency: 12, status: 'active', requestsPerSecond: 450 },
  { id: 'n2', location: 'London, UK', latency: 28, status: 'active', requestsPerSecond: 320 },
  { id: 'n3', location: 'Tokyo, JP', latency: 110, status: 'active', requestsPerSecond: 180 },
  { id: 'n4', location: 'Sao Paulo, BR', latency: 95, status: 'active', requestsPerSecond: 120 },
  { id: 'n5', location: 'Sydney, AU', latency: 145, status: 'inactive', requestsPerSecond: 0 }
];

export const PROVIDER_COLORS: Record<PlatformProvider, string> = {
  Railway: 'bg-indigo-500',
  Render: 'bg-emerald-500',
  Vercel: 'bg-white text-black',
  Neon: 'bg-green-400',
  Netlify: 'bg-teal-400',
  Cloudflare: 'bg-orange-500',
  'Fly.io': 'bg-purple-600'
};
