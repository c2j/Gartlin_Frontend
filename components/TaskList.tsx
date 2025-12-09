import React from 'react';
import { Search, Filter, Play, Edit, Trash2, MoreHorizontal, FileText, Layout, GitMerge } from 'lucide-react';

const TaskList: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">Task List</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 w-16">ID</th>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Config (VUs / Duration)</th>
                <th className="px-6 py-4">Full Duration</th>
                <th className="px-6 py-4">Last Run</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { id: 1888, name: 'Double 11 Full Link Stress Test', mode: 'Script', icon: <FileText size={14} className="text-blue-400"/>, vus: 200, dur: '30m', fullDur: '31.2s', last: '2025-12-09' },
                { id: 1887, name: 'Login Page Capacity', mode: 'Single', icon: <Layout size={14} className="text-purple-400"/>, vus: 500, dur: '10m', fullDur: '1.2s', last: '2025-12-08' },
                { id: 1886, name: 'Checkout Funnel Analysis', mode: 'Flow', icon: <GitMerge size={14} className="text-green-400"/>, vus: 100, dur: '1h', fullDur: '15.4s', last: '2025-12-08' },
                { id: 1885, name: 'Search API Load', mode: 'Script', icon: <FileText size={14} className="text-blue-400"/>, vus: 50, dur: '5m', fullDur: '0.8s', last: '2025-12-07' },
                { id: 1884, name: 'Black Friday Prep - Home', mode: 'Single', icon: <Layout size={14} className="text-purple-400"/>, vus: 1000, dur: '2h', fullDur: '3.5s', last: '2025-12-05' },
              ].map((task) => (
                <tr key={task.id} className="hover:bg-gray-700/50 transition group">
                  <td className="px-6 py-4 text-gray-500 font-mono">#{task.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{task.name}</div>
                    <div className="text-xs text-gray-500">Ecommerce / Production</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-gray-900 w-max px-2 py-1 rounded text-xs border border-gray-700">
                        {task.icon}
                        {task.mode}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-400">
                    <span className="text-blue-300 font-bold">{task.vus}</span> VU / {task.dur}
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-400">
                     {task.fullDur}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {task.last}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-500" title="Run Now">
                            <Play size={14} />
                        </button>
                        <button className="p-1.5 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 hover:text-white" title="Edit">
                            <Edit size={14} />
                        </button>
                        <button className="p-1.5 bg-gray-700 text-gray-300 rounded hover:bg-red-900/50 hover:text-red-400" title="Delete">
                            <Trash2 size={14} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex justify-between items-center text-xs text-gray-500">
              <div>Showing 1-5 of 24 tasks</div>
              <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:bg-gray-700 disabled:opacity-50">Previous</button>
                  <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:bg-gray-700 text-white">1</button>
                  <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:bg-gray-700">2</button>
                  <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:bg-gray-700">3</button>
                  <button className="px-3 py-1 bg-gray-900 border border-gray-700 rounded hover:bg-gray-700">Next</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;