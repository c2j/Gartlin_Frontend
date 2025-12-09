import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, PlusCircle, List, Server, ShoppingBag, Settings, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-900 font-sans">
      {/* Global Header */}
      <header className="h-14 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(ViewState.DASHBOARD)}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center font-bold text-white text-lg">G</div>
            <span className="text-gray-200 font-semibold tracking-tight text-lg">Gartlin <span className="text-gray-500 text-xs font-normal">v2.5.0</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                <User size={16} /> Admin ▼
            </div>
            <div className="cursor-pointer hover:text-white">Dark Mode</div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        
        <div className="flex flex-col flex-1 overflow-hidden">
             {/* Secondary Navigation Bar */}
            <nav className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-4 shrink-0">
                <div className="flex space-x-1">
                    <NavButton 
                        icon={<LayoutDashboard size={16}/>} 
                        label="Dashboard" 
                        active={activeView === ViewState.DASHBOARD} 
                        onClick={() => onNavigate(ViewState.DASHBOARD)}
                    />
                    <NavButton 
                        icon={<PlusCircle size={16}/>} 
                        label="New Task" 
                        active={activeView === ViewState.NEW_TASK} 
                        onClick={() => onNavigate(ViewState.NEW_TASK)} 
                    />
                    <NavButton 
                        icon={<List size={16}/>} 
                        label="Task List" 
                        active={activeView === ViewState.TASK_LIST} 
                        onClick={() => onNavigate(ViewState.TASK_LIST)} 
                    />
                    <NavButton 
                        icon={<Server size={16}/>} 
                        label="Nodes" 
                        active={activeView === ViewState.NODES} 
                        onClick={() => onNavigate(ViewState.NODES)} 
                    />
                    <NavButton 
                        icon={<ShoppingBag size={16}/>} 
                        label="Templates" 
                        active={activeView === ViewState.TEMPLATES} 
                        onClick={() => onNavigate(ViewState.TEMPLATES)} 
                    />
                    <NavButton 
                        icon={<Settings size={16}/>} 
                        label="Settings" 
                        active={activeView === ViewState.SETTINGS} 
                        onClick={() => onNavigate(ViewState.SETTINGS)} 
                    />
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden">
                {children}
            </main>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
            active 
            ? 'bg-gray-800 text-white shadow-sm' 
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
        }`}
    >
        {icon}
        {label}
    </button>
);

export default Layout;