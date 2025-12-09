import React from 'react';
import { Server, Cpu, HardDrive, Activity, Wifi, AlertCircle } from 'lucide-react';

const Nodes: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Cluster Nodes</h1>
                <p className="text-gray-400">Manage distributed execution agents and monitor resource usage.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-medium text-sm flex items-center gap-2">
                <Server size={16} /> Add Node
            </button>
        </div>

        {/* Cluster Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start text-gray-400 text-sm font-medium">
                    <span>TOTAL CPU CORES</span>
                    <Cpu size={18} />
                </div>
                <div className="text-3xl font-bold text-white">64 <span className="text-sm font-normal text-gray-500">Cores</span></div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-500 h-full w-[45%]"></div>
                </div>
                <div className="text-xs text-right text-gray-500 mt-1">45% Utilized</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col justify-between h-32">
                 <div className="flex justify-between items-start text-gray-400 text-sm font-medium">
                    <span>TOTAL MEMORY</span>
                    <HardDrive size={18} />
                </div>
                <div className="text-3xl font-bold text-white">128 <span className="text-sm font-normal text-gray-500">GB</span></div>
                 <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-500 h-full w-[62%]"></div>
                </div>
                <div className="text-xs text-right text-gray-500 mt-1">62% Utilized</div>
            </div>
             <div className="bg-gradient-to-br from-gray-800 to-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col justify-between h-32">
                 <div className="flex justify-between items-start text-gray-400 text-sm font-medium">
                    <span>NETWORK I/O</span>
                    <Activity size={18} />
                </div>
                <div className="text-3xl font-bold text-white">1.2 <span className="text-sm font-normal text-gray-500">GB/s</span></div>
                 <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-green-500 h-full w-[20%]"></div>
                </div>
                <div className="text-xs text-right text-gray-500 mt-1">Normal Load</div>
            </div>
        </div>

        {/* Node List */}
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Active Agents</h3>
            {[
                { name: 'Master-Control-01', role: 'Controller', status: 'Online', cpu: 12, mem: 42, task: 'Orchestrating #1888', vus: 0 },
                { name: 'Worker-Node-AWS-01', role: 'Worker', status: 'Online', cpu: 78, mem: 85, task: 'Running #1888 (Chunk A)', vus: 65 },
                { name: 'Worker-Node-AWS-02', role: 'Worker', status: 'Online', cpu: 72, mem: 81, task: 'Running #1888 (Chunk B)', vus: 65 },
                { name: 'Worker-Node-GCP-01', role: 'Worker', status: 'Online', cpu: 65, mem: 70, task: 'Running #1888 (Chunk C)', vus: 70 },
                { name: 'Worker-Node-Azure-01', role: 'Worker', status: 'Offline', cpu: 0, mem: 0, task: '-', vus: 0 },
            ].map((node, idx) => (
                <div key={idx} className={`bg-gray-800 border ${node.status === 'Online' ? 'border-gray-700' : 'border-red-900/50'} rounded-lg p-4 flex items-center justify-between shadow-sm transition hover:bg-gray-800/80`}>
                    <div className="flex items-center gap-4 w-1/4">
                        <div className={`w-3 h-3 rounded-full ${node.status === 'Online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
                        <div>
                            <div className="font-bold text-white text-sm">{node.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                {node.role === 'Controller' ? <Server size={10} /> : <HardDrive size={10} />}
                                {node.role}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 px-4">
                        {node.status === 'Online' ? (
                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900/50 py-1.5 px-3 rounded border border-gray-700/50 font-mono">
                                <Activity size={12} className="text-blue-400" />
                                {node.task}
                            </div>
                        ) : (
                             <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/10 py-1.5 px-3 rounded border border-red-900/30 font-mono">
                                <AlertCircle size={12} /> Connection Lost
                            </div>
                        )}
                    </div>

                    <div className="w-1/3 flex gap-6 items-center">
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>CPU</span>
                                <span>{node.cpu}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${node.cpu > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${node.cpu}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>MEM</span>
                                <span>{node.mem}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${node.mem > 80 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${node.mem}%` }}></div>
                            </div>
                        </div>
                        <div className="w-16 text-right">
                             <div className="text-xl font-bold text-white">{node.vus}</div>
                             <div className="text-[10px] text-gray-500 uppercase">Active VUs</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Nodes;