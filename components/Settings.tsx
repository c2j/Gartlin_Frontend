import React, { useState } from 'react';
import { Save, Shield, Globe, Bell, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200 overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
          {/* Settings Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 pt-6">
              <div className="px-6 mb-6">
                  <h1 className="text-xl font-bold text-white">Settings</h1>
              </div>
              <nav className="space-y-1 px-3">
                  {[
                      { id: 'general', label: 'General', icon: <Globe size={18} /> },
                      { id: 'security', label: 'Security & API', icon: <Shield size={18} /> },
                      { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
                      { id: 'storage', label: 'Data & Storage', icon: <Database size={18} /> },
                  ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition ${
                            activeTab === item.id 
                            ? 'bg-blue-600/10 text-blue-400' 
                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }`}
                      >
                          {item.icon}
                          {item.label}
                      </button>
                  ))}
              </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-gray-900">
              <div className="max-w-3xl">
                  {activeTab === 'general' && (
                      <div className="space-y-6">
                          <div>
                              <h2 className="text-lg font-medium text-white border-b border-gray-700 pb-2 mb-4">General Configuration</h2>
                              <div className="space-y-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-400 mb-1">Instance Name</label>
                                      <input type="text" defaultValue="Gartlin-Production-Cluster" className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-400 mb-1">Global Timeout (ms)</label>
                                      <input type="number" defaultValue="30000" className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                                      <p className="text-xs text-gray-500 mt-1">Default timeout for all Playwright actions unless overridden.</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                      <input type="checkbox" id="darkmode" defaultChecked className="w-4 h-4 bg-gray-800 border-gray-600 rounded text-blue-600" />
                                      <label htmlFor="darkmode" className="text-sm text-gray-300">Force Dark Mode on Reports</label>
                                  </div>
                              </div>
                          </div>
                          <div className="pt-4">
                              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center gap-2">
                                  <Save size={16} /> Save Changes
                              </button>
                          </div>
                      </div>
                  )}

                  {activeTab === 'security' && (
                      <div className="space-y-6">
                           <div>
                              <h2 className="text-lg font-medium text-white border-b border-gray-700 pb-2 mb-4">API Keys & Access</h2>
                              <div className="space-y-4">
                                   <div>
                                      <label className="block text-sm font-medium text-gray-400 mb-1">Master API Key</label>
                                      <div className="flex gap-2">
                                        <input type="password" value="************************" readOnly className="flex-1 bg-gray-800 border border-gray-600 rounded p-2 text-gray-500 font-mono" />
                                        <button className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Reveal</button>
                                        <button className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Regenerate</button>
                                      </div>
                                  </div>
                                   <div>
                                      <label className="block text-sm font-medium text-gray-400 mb-1">Allowed IP Range</label>
                                      <textarea rows={3} defaultValue="192.168.1.0/24&#10;10.0.0.0/8" className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"></textarea>
                                  </div>
                              </div>
                           </div>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;