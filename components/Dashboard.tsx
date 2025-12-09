import React from 'react';
import { Activity, Users, CheckCircle, AlertTriangle, Play, Server, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockActivityData = Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 2}h`,
  tests: Math.floor(Math.random() * 10) + 2,
  success: Math.floor(Math.random() * 100),
}));

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">System Overview & Recent Performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title="Total Tests Run" 
            value="1,284" 
            trend="+12% this week" 
            icon={<Play size={20} className="text-blue-400" />} 
            color="border-blue-500"
          />
          <StatCard 
            title="Avg Success Rate" 
            value="94.2%" 
            trend="-0.5% vs baseline" 
            icon={<CheckCircle size={20} className="text-green-400" />} 
            color="border-green-500"
          />
          <StatCard 
            title="Active Nodes" 
            value="8 / 10" 
            trend="2 nodes offline" 
            icon={<Server size={20} className="text-purple-400" />} 
            color="border-purple-500"
          />
          <StatCard 
            title="Total VUs Simulated" 
            value="450k+" 
            trend="Peak: 50k concurrent" 
            icon={<Users size={20} className="text-orange-400" />} 
            color="border-orange-500"
          />
        </div>

        {/* Main Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Test Execution Volume (24h)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockActivityData}>
                <defs>
                  <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Area type="monotone" dataKey="tests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Executions</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300">View All</button>
          </div>
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-750 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-3">Task Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">VUs</th>
                <th className="px-6 py-3">Executed By</th>
                <th className="px-6 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { name: 'Double 11 Full Link Stress Test', status: 'Passed', duration: '30m', vus: 200, user: 'Admin', time: '10 mins ago' },
                { name: 'Login API Baseline', status: 'Failed', duration: '5m', vus: 50, user: 'QA_Bot', time: '1 hour ago' },
                { name: 'Search Page Load', status: 'Passed', duration: '15m', vus: 100, user: 'Dev_Team', time: '3 hours ago' },
                { name: 'Checkout Flow V2', status: 'Warning', duration: '45m', vus: 500, user: 'Admin', time: 'Yesterday' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-3 font-medium text-white">{row.name}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs border ${
                      row.status === 'Passed' ? 'bg-green-900/30 text-green-400 border-green-800' :
                      row.status === 'Failed' ? 'bg-red-900/30 text-red-400 border-red-800' :
                      'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-mono">{row.duration}</td>
                  <td className="px-6 py-3 font-mono text-blue-300">{row.vus}</td>
                  <td className="px-6 py-3">{row.user}</td>
                  <td className="px-6 py-3 text-right text-gray-500">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <div className={`bg-gray-800 p-6 rounded-lg border-l-4 shadow-sm ${color}`}>
    <div className="flex justify-between items-start mb-2">
      <div className="text-gray-400 text-sm uppercase tracking-wide">{title}</div>
      {icon}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-gray-500">{trend}</div>
  </div>
);

export default Dashboard;