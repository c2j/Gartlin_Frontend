import React, { useState } from 'react';
import Layout from './components/Layout';
import NewTask from './components/NewTask';
import Monitor from './components/Monitor';
import Report from './components/Report';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import Nodes from './components/Nodes';
import Templates from './components/Templates';
import Settings from './components/Settings';
import { ViewState, TaskConfig } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.NEW_TASK);
  const [activeTask, setActiveTask] = useState<TaskConfig | null>(null);

  const handleStartTask = (config: TaskConfig) => {
    setActiveTask(config);
    setCurrentView(ViewState.MONITOR);
  };

  const handleStopTask = () => {
    // In a real app, this would confirm termination
    setCurrentView(ViewState.REPORT);
  };

  const handleFinishTask = () => {
    setCurrentView(ViewState.REPORT);
  };

  const handleRestart = () => {
      setCurrentView(ViewState.NEW_TASK);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.TASK_LIST:
        return <TaskList />;
      case ViewState.NODES:
        return <Nodes />;
      case ViewState.TEMPLATES:
        return <Templates />;
      case ViewState.SETTINGS:
        return <Settings />;
      case ViewState.NEW_TASK:
        return <NewTask onStart={handleStartTask} onViewChange={setCurrentView} />;
      case ViewState.MONITOR:
        return <Monitor onStop={handleStopTask} onFinish={handleFinishTask} />;
      case ViewState.REPORT:
        return <Report onRestart={handleRestart} />;
      default:
        return <NewTask onStart={handleStartTask} onViewChange={setCurrentView} />;
    }
  };

  return (
    <Layout activeView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;