
export type PlatformProvider = 'Railway' | 'Render' | 'Vercel' | 'Neon' | 'Netlify' | 'Cloudflare' | 'Fly.io';

export interface Repo {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'runner' | 'cdn' | 'search' | 'core';
  stars: number;
  lastCommit: {
    message: string;
    author: string;
    date: string;
    hash: string;
  };
  branches: string[];
  syncStatus: 'synced' | 'behind' | 'diverged';
  healthScore: number;
}

export interface ServiceStatus {
  id: string;
  name: string;
  provider: PlatformProvider;
  status: 'online' | 'offline' | 'building' | 'degraded';
  region: string;
  lastDeploy: string;
  url: string;
  logs: string[];
}

export interface ForensicReport {
  repoId: string;
  findings: {
    type: 'trash' | 'duplicate' | 'framework' | 'dependency' | 'structure';
    severity: 'low' | 'medium' | 'high';
    message: string;
    file?: string;
  }[];
  timestamp: string;
}

export interface RunnerJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  startTime: string;
  duration?: string;
  logs: string[];
}

export interface EdgeNode {
  id: string;
  location: string;
  latency: number;
  status: 'active' | 'inactive';
  requestsPerSecond: number;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}
