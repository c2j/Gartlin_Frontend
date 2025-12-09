import React, { useEffect, useState } from 'react';
import { ViewState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader, AlertTriangle, CheckCircle, StopCircle, Clock, Activity, FileText } from 'lucide-react';

interface MonitorProps {
  onStop: () => void;
  onFinish: () => void;
}

const mockChartData = Array.from({ length: 20 }, (_, i) => ({
  time: `14:${30 + i}`,
  lcp: 2000 + Math.random() * 1500,
  tti: 3000 + Math.random() * 2000,
  duration: 25000 + Math.random() * 5000,
  successRate: 95 + Math.random() * 5
}));

const Monitor: React.FC<MonitorProps> = ({ onStop, onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(timer);
          onFinish();
          return 100;
        }
        return old + 0.5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto">
      {/* Header Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-lg">
          <div className="flex items-center gap-4">
              <button onClick={onStop} className="text-gray-400 hover:text-white">← Back</button>
              <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-blue-500">#1888</span> Double 11 Full Link Stress Test
                      <span className="px-2 py-0.5 rounded-full bg-green-900/50 text-green-400 text-xs border border-green-800 animate-pulse">Running</span>
                  </h2>
                  <div className="text-xs text-gray-500 font-mono mt-1">
                      Target: 200 VU | Mode: Script | Distributed: No
                  </div>
              </div>
          </div>
          <button onClick={onStop} className="bg-red-900/20 text-red-400 border border-red-800 px-4 py-2 rounded hover:bg-red-900/40 flex items-center gap-2">
              <StopCircle size={16} /> Stop Task
          </button>
      </div>

      {/* Progress & Stats */}
      <div className="px-6 py-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
             <div className="flex justify-between text-sm mb-2 text-gray-400">
                 <span>Progress: {Math.floor(progress)}%</span>
                 <span>Remaining: 4m 21s</span>
                 <span className="text-green-400 font-bold">RPS: 6.42</span>
             </div>
             <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                 <div className="bg-gradient-to-r from-blue-600 to-purple-500 h-3 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
             </div>
          </div>

          {/* Waterfall / Funnel Chart */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Real User Path Waterfall</h3>
              <div className="space-y-3 font-mono text-sm">
                  {[
                      { name: '1 Visit Home', val: 100, time: '2.3s', delta: '', color: 'bg-blue-600' },
                      { name: '2 Click Product', val: 99.8, time: '4.2s', delta: '+1.9s', color: 'bg-blue-600' },
                      { name: '3 Add to Cart', val: 96.2, time: '11.0s', delta: '+6.8s', color: 'bg-yellow-600', alert: true },
                      { name: '4 Assertion', val: 96.2, time: '11.1s', delta: '0.1s', color: 'bg-blue-600' },
                      { name: '5 Checkout', val: 94.7, time: '16.5s', delta: '+5.4s', color: 'bg-blue-600' },
                      { name: '6 Submit Order', val: 93.1, time: '24.4s', delta: '+7.9s', color: 'bg-blue-600' },
                  ].map((step, idx) => (
                      <div key={idx} className="flex items-center group">
                          <div className="w-32 text-gray-400 truncate text-right mr-4">{step.name}</div>
                          <div className="flex-1 bg-gray-900/50 rounded-r h-8 relative flex items-center">
                              <div className={`h-8 rounded-r ${step.color} transition-all duration-1000 flex items-center px-2 text-white/90 text-xs`} style={{ width: `${step.val}%` }}>
                                  {step.val}%
                              </div>
                              {step.alert && <AlertTriangle size={14} className="text-yellow-500 ml-2 animate-bounce" />}
                          </div>
                          <div className="w-24 text-right text-gray-300">{step.time}</div>
                          <div className="w-20 text-right text-gray-500 text-xs">{step.delta}</div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Real-time Trends */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex justify-between">
                  <span>Core Metrics (p90)</span>
                  <div className="flex gap-4 text-xs font-normal">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> LCP</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> TTI</span>
                  </div>
              </h3>
              <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                            itemStyle={{ color: '#e5e7eb' }}
                          />
                          <Line type="monotone" dataKey="lcp" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                          <Line type="monotone" dataKey="tti" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
                      </LineChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Steps Detail Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-sm">
               <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-gray-750 text-xs uppercase text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Step</th>
                            <th className="px-6 py-3">p50</th>
                            <th className="px-6 py-3">p90</th>
                            <th className="px-6 py-3">Success %</th>
                            <th className="px-6 py-3">JS Heap</th>
                            <th className="px-6 py-3">FPS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <tr className="hover:bg-gray-700/50">
                            <td className="px-6 py-3">1 Visit Home</td>
                            <td className="px-6 py-3 font-mono text-green-400">1.2s</td>
                            <td className="px-6 py-3 font-mono text-green-400">2.3s</td>
                            <td className="px-6 py-3">100%</td>
                            <td className="px-6 py-3">142MB</td>
                            <td className="px-6 py-3">58</td>
                        </tr>
                        <tr className="hover:bg-gray-700/50 bg-red-900/10">
                            <td className="px-6 py-3 flex items-center gap-2">
                                3 Add to Cart
                                <span className="text-xs bg-red-900 text-red-200 px-1 rounded">Slow</span>
                            </td>
                            <td className="px-6 py-3 font-mono text-yellow-500">4.1s</td>
                            <td className="px-6 py-3 font-mono text-red-400 font-bold">6.8s</td>
                            <td className="px-6 py-3 text-yellow-400">96.2%</td>
                            <td className="px-6 py-3 text-red-400">312MB ↑</td>
                            <td className="px-6 py-3 text-yellow-500">28</td>
                        </tr>
                    </tbody>
               </table>
          </div>

          {/* Top Errors */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm">
               <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Top 5 Errors</h3>
               <ul className="space-y-3">
                   <li className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 rounded text-sm hover:bg-red-900/20 cursor-pointer">
                       <span className="text-red-300 font-mono">Locator.click: Timeout 30000ms exceeded</span>
                       <span className="bg-red-900/50 text-red-200 px-2 py-1 rounded text-xs">x489</span>
                   </li>
                   <li className="flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 rounded text-sm hover:bg-red-900/20 cursor-pointer">
                       <span className="text-red-300 font-mono">Navigation timeout (checkout)</span>
                       <span className="bg-red-900/50 text-red-200 px-2 py-1 rounded text-xs">x212</span>
                   </li>
               </ul>
          </div>
      </div>
    </div>
  );
};

export default Monitor;
