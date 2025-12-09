import React from 'react';
import { Step } from '../types';
import { Play, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react';

interface StepsVisualizerProps {
  steps: Step[];
}

const StepsVisualizer: React.FC<StepsVisualizerProps> = ({ steps }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-800 text-xs uppercase text-gray-400 sticky top-0">
          <tr>
            <th className="px-4 py-2 w-12">#</th>
            <th className="px-4 py-2 w-24">Type</th>
            <th className="px-4 py-2">Target / Code</th>
            <th className="px-4 py-2 w-32 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {steps.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500 italic">
                No steps recorded yet. Start recording to add steps.
              </td>
            </tr>
          ) : (
            steps.map((step, index) => (
              <tr key={step.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3 text-gray-500 font-mono">{index + 1}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    step.type === 'expect' ? 'bg-green-900 text-green-300' :
                    step.type === 'goto' ? 'bg-blue-900 text-blue-300' :
                    step.type === 'think' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {step.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-gray-300 truncate max-w-xs">
                  {step.target}
                  {step.type === 'expect' && (
                     <span className="ml-2 inline-flex items-center text-green-500 text-xs">
                       <CheckCircle className="w-3 h-3 mr-1" /> 100%
                     </span>
                  )}
                  {step.type === 'think' && (
                      <span className="ml-2 inline-flex items-center text-yellow-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" /> {step.duration}ms
                      </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-gray-500 hover:text-green-400"><Play size={14} /></button>
                    <button className="text-gray-500 hover:text-blue-400"><Edit2 size={14} /></button>
                    <button className="text-gray-500 hover:text-red-400"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="p-2 border-t border-gray-700 bg-gray-800 flex justify-between text-xs text-blue-400">
          <button className="hover:text-blue-300">+ Insert Step</button>
          <button className="hover:text-blue-300">+ Insert Assertion</button>
          <button className="hover:text-blue-300">+ Insert Wait</button>
      </div>
    </div>
  );
};

export default StepsVisualizer;
