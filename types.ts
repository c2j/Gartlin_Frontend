export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  NEW_TASK = 'NEW_TASK',
  TASK_LIST = 'TASK_LIST',
  NODES = 'NODES',
  TEMPLATES = 'TEMPLATES',
  SETTINGS = 'SETTINGS',
  MONITOR = 'MONITOR',
  REPORT = 'REPORT'
}

export interface Step {
  id: number;
  type: 'goto' | 'click' | 'waitForLoadState' | 'expect' | 'think' | 'fill';
  target: string;
  description?: string;
  duration?: number;
  status?: 'pending' | 'running' | 'passed' | 'failed';
}

export interface TaskConfig {
  name: string;
  description: string;
  tags: string;
  mode: 'single' | 'flow' | 'script';
  vus: number;
  duration: number; // seconds
  thinkTimeStrategy: 'record' | 'fixed' | 'random';
  isDistributed: boolean;
  collectMetrics: boolean;
}

export interface ChartDataPoint {
  time: string;
  lcp: number;
  tti: number;
  duration: number;
  successRate: number;
}