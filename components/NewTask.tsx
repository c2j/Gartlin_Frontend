import React, { useState, useEffect, useRef } from 'react';
import { ViewState, TaskConfig, Step } from '../types';
import { Play, Square, Pause, Save, Layout, GitMerge, FileCode, Video, Loader, Target, Plus, Camera, Clock } from 'lucide-react';
import CodeEditor from './CodeEditor';
import StepsVisualizer from './StepsVisualizer';

interface NewTaskProps {
  onStart: (config: TaskConfig) => void;
  onViewChange: (view: ViewState) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onStart, onViewChange }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'flow' | 'script'>('script');
  const [isRecording, setIsRecording] = useState(false);
  const [config, setConfig] = useState<TaskConfig>({
    name: 'Double 11 Full Link Stress Test 2026',
    description: 'Simulate real users from Home -> Product -> Cart -> Checkout -> Pay',
    tags: 'E-commerce | D11 | Baseline',
    mode: 'script',
    vus: 200,
    duration: 1800,
    thinkTimeStrategy: 'record',
    isDistributed: false,
    collectMetrics: true,
  });

  const [steps, setSteps] = useState<Step[]>([]);
  const recordingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate recording process
  useEffect(() => {
    if (isRecording) {
      const possibleSteps: Step[] = [
        { id: Date.now(), type: 'click', target: 'button:has-text("Add to Cart")' },
        { id: Date.now() + 1, type: 'waitForLoadState', target: 'networkidle' },
        { id: Date.now() + 2, type: 'expect', target: 'text=Added to Cart' },
        { id: Date.now() + 3, type: 'click', target: 'a:has-text("Checkout")' },
        { id: Date.now() + 4, type: 'think', target: '2000', duration: 2000 },
      ];

      let stepIndex = 0;
      recordingInterval.current = setInterval(() => {
        if (stepIndex < possibleSteps.length) {
            setSteps(prev => [...prev, possibleSteps[stepIndex]]);
            stepIndex++;
        }
      }, 1500);
    } else {
        if (recordingInterval.current) clearInterval(recordingInterval.current);
    }

    return () => {
        if (recordingInterval.current) clearInterval(recordingInterval.current);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
      setSteps([{ id: 1, type: 'goto', target: 'https://m.demo.com/' }]);
      setIsRecording(true);
  };

  const handleAddThinkTime = () => {
    const defaultDuration = "2000";
    const userInput = window.prompt("Enter think time duration in milliseconds:", defaultDuration);
    
    if (userInput !== null) {
        const duration = parseInt(userInput, 10);
        if (!isNaN(duration)) {
             setSteps(prev => [...prev, {
                 id: Date.now(),
                 type: 'think',
                 target: duration.toString(),
                 duration: duration
             }]);
        }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-y-auto">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 shadow-md">
        <button onClick={() => {}} className="text-gray-400 hover:text-white flex items-center gap-2">
          ← Back to Task List
        </button>
        <h1 className="text-xl font-bold text-white">Create Real-User Performance Task</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:bg-gray-700">
            Save Draft
          </button>
          <button
            onClick={() => onStart(config)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-500 shadow-lg shadow-blue-900/50 transition-all"
          >
            <Play size={16} fill="currentColor" /> Save & Run
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Mode Selection */}
        <div className="flex justify-center mb-8">
            <div className="bg-gray-800 p-1 rounded-full border border-gray-700 inline-flex">
                <button
                    onClick={() => setActiveTab('single')}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'single' ? 'bg-gray-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <Layout size={16} className="mr-2" /> Single Page
                </button>
                <button
                    onClick={() => setActiveTab('flow')}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'flow' ? 'bg-gray-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <GitMerge size={16} className="mr-2" /> Flow Mode
                </button>
                <button
                    onClick={() => setActiveTab('script')}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'script' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <FileCode size={16} className="mr-2" /> Playwright Script (Rec)
                </button>
            </div>
        </div>

        {/* Basic Info */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Test Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={config.name}
                        onChange={e => setConfig({...config, name: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Tags</label>
                    <input
                        type="text"
                        value={config.tags}
                        onChange={e => setConfig({...config, tags: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <textarea
                        value={config.description}
                        onChange={e => setConfig({...config, description: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-20 resize-none"
                    />
                </div>
            </div>
        </div>

        {/* Playwright Recording Area */}
        <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Left: Recorder Controls */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 flex flex-col gap-4 shadow-sm flex-1">
                     <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700 pb-2">Recorder</h3>
                     
                     <div className="grid grid-cols-3 gap-2">
                         {!isRecording ? (
                            <button onClick={handleStartRecording} className="col-span-3 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white p-3 rounded font-semibold transition shadow-inner">
                                <Target size={20} /> Start Rec
                            </button>
                         ) : (
                             <>
                                <button onClick={() => setIsRecording(false)} className="flex flex-col items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-500 text-white p-3 rounded font-medium transition">
                                    <Pause size={20} /> Pause
                                </button>
                                <button onClick={() => setIsRecording(false)} className="col-span-2 flex flex-col items-center justify-center gap-1 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded font-medium transition">
                                    <Square size={20} fill="currentColor" /> Stop
                                </button>
                             </>
                         )}
                     </div>

                     <div className="space-y-3 mt-2">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0" />
                            Auto-wait for LCP
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0" />
                            Record Network Requests
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <input type="checkbox" className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0" />
                            Screenshot every step
                        </label>
                     </div>
                     
                     <div className="border-t border-gray-700 my-2 pt-4 grid grid-cols-2 gap-2">
                        <button className="text-xs flex items-center justify-center gap-1 bg-gray-700 p-2 rounded hover:bg-gray-600">
                            <Plus size={14}/> Assertion
                        </button>
                        <button 
                            onClick={handleAddThinkTime}
                            className="text-xs flex items-center justify-center gap-1 bg-gray-700 p-2 rounded hover:bg-gray-600"
                        >
                            <Clock size={14}/> Think Time
                        </button>
                        <button className="text-xs flex items-center justify-center gap-1 bg-gray-700 p-2 rounded hover:bg-gray-600">
                            <Camera size={14}/> Screenshot
                        </button>
                        <button 
                            onClick={() => setSteps([])} 
                            className="text-xs flex items-center justify-center gap-1 bg-gray-700 p-2 rounded hover:bg-gray-600 text-red-400"
                        >
                            Clear All
                        </button>
                     </div>

                     <div className="mt-auto pt-4 text-xs text-gray-500 font-mono">
                         Browser: Chromium 114<br/>
                         Viewport: 1280x720 (Desktop)<br/>
                         User Agent: Mozilla/5.0...
                     </div>
                </div>
            </div>

            {/* Right: Live Preview */}
            <div className="col-span-12 lg:col-span-8 bg-black rounded-lg border-4 border-gray-800 shadow-xl overflow-hidden flex flex-col relative">
                {/* Browser Address Bar Mock */}
                <div className="bg-gray-800 p-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-1.5 ml-1">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 bg-gray-900 rounded px-3 py-1 text-xs text-gray-400 font-mono truncate ml-4 flex items-center justify-between">
                         <span>{steps.length > 0 ? 'https://m.demo.com/checkout' : 'about:blank'}</span>
                         <Loader size={12} className={isRecording ? "animate-spin" : "hidden"} />
                    </div>
                </div>
                {/* Viewport Content */}
                <div className="flex-1 bg-white relative group cursor-crosshair">
                     {isRecording ? (
                         <div className="absolute inset-0 bg-[url('https://picsum.photos/1280/800')] bg-cover opacity-90">
                            {/* Fake Overlay for Element Highlight */}
                            <div className="absolute top-1/4 left-1/4 w-48 h-12 border-2 border-red-500 bg-red-500/20 flex items-center justify-center pointer-events-none">
                                <span className="bg-red-500 text-white text-[10px] px-1 absolute -top-4 left-0">button:has-text("Add")</span>
                            </div>
                         </div>
                     ) : (
                         <div className="flex flex-col items-center justify-center h-full text-gray-400">
                             <Target size={48} className="mb-4 opacity-50"/>
                             <p>Ready to record</p>
                             <p className="text-sm">Click "Start Rec" to launch browser</p>
                         </div>
                     )}
                </div>
            </div>
        </div>

        {/* Generated Script Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
             <StepsVisualizer steps={steps} />
             <CodeEditor steps={steps} testName={config.name} />
        </div>

        {/* Load Config */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm">
             <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-700 pb-2">Load Configuration</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div>
                     <div className="flex justify-between mb-2">
                         <label className="text-sm font-medium text-gray-300">Virtual Users (VU)</label>
                         <span className="text-blue-400 font-mono font-bold">{config.vus}</span>
                     </div>
                     <input
                        type="range" min="1" max="5000" step="10"
                        value={config.vus}
                        onChange={e => setConfig({...config, vus: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                     />
                     <div className="flex justify-between text-xs text-gray-500 mt-1">
                         <span>1</span>
                         <span>5000</span>
                     </div>
                 </div>

                 <div>
                     <div className="flex justify-between mb-2">
                         <label className="text-sm font-medium text-gray-300">Duration (Sec)</label>
                         <span className="text-blue-400 font-mono font-bold">{config.duration}s</span>
                     </div>
                     <input
                        type="range" min="30" max="3600" step="30"
                        value={config.duration}
                        onChange={e => setConfig({...config, duration: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                     />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                         <span>30s</span>
                         <span>1h</span>
                     </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-300">Think Time Strategy</label>
                    <div className="flex bg-gray-900 rounded p-1">
                        {(['record', 'fixed', 'random'] as const).map(mode => (
                            <button
                                key={mode}
                                onClick={() => setConfig({...config, thinkTimeStrategy: mode})}
                                className={`flex-1 text-xs py-1.5 rounded capitalize ${config.thinkTimeStrategy === mode ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                 </div>
             </div>

             <div className="mt-6 pt-4 border-t border-gray-700 flex flex-wrap gap-6">
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" className="w-4 h-4 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-0" 
                        checked={config.isDistributed} onChange={e => setConfig({...config, isDistributed: e.target.checked})}
                     />
                     <span className="text-sm text-gray-300">Distributed Execution</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" className="w-4 h-4 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-0" defaultChecked />
                     <span className="text-sm text-gray-300">Retry on Failure (Max 2)</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" className="w-4 h-4 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-0" defaultChecked />
                     <span className="text-sm text-gray-300">Record Video</span>
                 </label>
             </div>
        </div>
      </div>
    </div>
  );
}

export default NewTask;