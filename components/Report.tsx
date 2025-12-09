import React from 'react';
import { ViewState } from '../types';
import { CheckCircle, AlertTriangle, Download, RefreshCw, Bookmark } from 'lucide-react';

interface ReportProps {
  onRestart: () => void;
}

const Report: React.FC<ReportProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto">
      {/* Report Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-8">
        <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-400 text-sm">#1888</span>
            <span className="bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wide">
                Warning
            </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Double 11 Full Link Stress Test</h1>
        <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>200 VU × 30min</span>
            <span>Finished: 2025-12-09 14:58</span>
            <span>Success Rate: 92.8% (Threshold 95%)</span>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                  { label: 'LCP p90', value: '3.2s', status: 'good', color: 'text-green-400', border: 'border-green-800' },
                  { label: 'TTI p90', value: '9.8s', status: 'warn', color: 'text-yellow-400', border: 'border-yellow-800' },
                  { label: 'Success Rate', value: '92.8%', status: 'fail', color: 'text-red-400', border: 'border-red-800' },
                  { label: 'Avg Duration', value: '31.2s', status: 'info', color: 'text-blue-400', border: 'border-blue-800' },
              ].map((metric, idx) => (
                  <div key={idx} className={`bg-gray-800 p-6 rounded-lg border-l-4 shadow-sm ${metric.border.replace('border-', 'border-l-')}`}>
                      <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">{metric.label}</div>
                      <div className={`text-4xl font-mono font-bold ${metric.color}`}>{metric.value}</div>
                      <div className="mt-2 text-xs flex items-center gap-1 text-gray-500">
                          <div className={`w-2 h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}></div>
                          {metric.status === 'good' ? 'Excellent' : metric.status === 'warn' ? 'Warning' : metric.status === 'fail' ? 'Below Threshold' : 'Info'}
                      </div>
                  </div>
              ))}
          </div>

          {/* Analysis Section (Mocked Image/Visual) */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-white">Performance Bottleneck Analysis</h3>
                   <button className="text-blue-400 text-sm hover:underline">View Full Trace Analysis</button>
               </div>
               
               <div className="bg-gray-900 rounded p-6 flex flex-col gap-4">
                   <div className="flex items-center text-sm text-gray-300">
                       <span className="w-8 font-mono text-gray-500">1</span>
                       <span className="w-32">Home</span>
                       <div className="flex-1 bg-green-900/30 h-8 rounded relative mx-4">
                           <div className="bg-green-600 h-8 rounded w-[10%]"></div>
                       </div>
                       <span className="w-16 text-right font-mono">2.3s</span>
                   </div>
                   <div className="flex items-center text-sm text-gray-300">
                       <span className="w-8 font-mono text-gray-500">2</span>
                       <span className="w-32">Product</span>
                       <div className="flex-1 bg-green-900/30 h-8 rounded relative mx-4">
                           <div className="bg-green-600 h-8 rounded w-[18%]"></div>
                       </div>
                       <span className="w-16 text-right font-mono">4.2s</span>
                   </div>
                   <div className="flex items-center text-sm text-gray-300">
                       <span className="w-8 font-mono text-gray-500">3</span>
                       <span className="w-32 text-red-300 font-bold">Add to Cart</span>
                       <div className="flex-1 bg-red-900/30 h-8 rounded relative mx-4 border border-red-900">
                           <div className="bg-red-600 h-8 rounded w-[45%] flex items-center justify-end px-2 text-white text-xs">Major Dropoff</div>
                       </div>
                       <span className="w-16 text-right font-mono text-red-400 font-bold">11.0s</span>
                   </div>
                   <div className="flex items-center text-sm text-gray-300">
                       <span className="w-8 font-mono text-gray-500">4</span>
                       <span className="w-32">Checkout</span>
                       <div className="flex-1 bg-green-900/30 h-8 rounded relative mx-4">
                           <div className="bg-green-600 h-8 rounded w-[60%]"></div>
                       </div>
                       <span className="w-16 text-right font-mono">16.5s</span>
                   </div>
               </div>
          </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0 z-20 flex justify-center gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition">
               <Download size={16} /> HTML Report
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition">
               <Download size={16} /> JSON
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition">
               <Download size={16} /> PDF
           </button>
           <div className="w-px bg-gray-600 mx-2"></div>
           <button onClick={onRestart} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium shadow-lg shadow-blue-900/50 transition">
               <RefreshCw size={16} /> Re-run Test
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-500 text-gray-300 hover:text-white rounded transition">
               <Bookmark size={16} /> Save as Baseline
           </button>
      </div>
    </div>
  );
};

export default Report;
