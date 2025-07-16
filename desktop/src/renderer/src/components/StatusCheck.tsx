import * as React from "react";
import axios from "axios";

interface StatusItem {
  name: string;
  status: 'loading' | 'running' | 'error' | 'not-found';
  message: string;
}

export default function StatusCheck() {
  const [statuses, setStatuses] = React.useState<StatusItem[]>([
    { name: 'Service', status: 'loading', message: 'Checking service...' },
    { name: 'Ollama', status: 'loading', message: 'Checking Ollama...' },
    { name: 'Models', status: 'loading', message: 'Checking models...' },
    { name: 'Extension', status: 'loading', message: 'Checking extension...' }
  ]);
  const [isChecking, setIsChecking] = React.useState(true);

  const checkService = async () => {
    try {
      const response = await axios.get('http://localhost:8000/test', { timeout: 3000 });
      return response.data === true; // Check if response is exactly true
    } catch {
      return false;
    }
  };

  const checkOllama = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ollama', { timeout: 3000 });
      return response.data === true; 
    } catch {
      return false;
    }
  };

  const checkModels = async () => {
    try {
      const response = await axios.get('http://localhost:8000/models', { timeout: 3000 });
      return response.data?.models?.length > 0;
    } catch {
      return false;
    }
  };

  const checkExtension = async () => {
    // Check if browser extension is installed by trying to communicate with it
    try {
      // This is a placeholder - in a real implementation, you'd check for the extension
      // For now, we'll simulate the check
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          // Simulate extension check - you can replace this with actual extension detection
          resolve(false); // Set to true if extension is detected
        }, 1000);
      });
    } catch {
      return false;
    }
  };

  const updateStatus = (index: number, status: 'loading' | 'running' | 'error' | 'not-found', message: string) => {
    setStatuses(prev => prev.map((item, i) => 
      i === index ? { ...item, status, message } : item
    ));
  };

  const runChecks = async () => {
    setIsChecking(true);
    
    // Reset all statuses to loading first
    setStatuses([
      { name: 'Service', status: 'loading', message: 'Checking service...' },
      { name: 'Ollama', status: 'loading', message: 'Checking Ollama...' },
      { name: 'Models', status: 'loading', message: 'Checking models...' },
      { name: 'Extension', status: 'loading', message: 'Checking extension...' }
    ]);
    
    // Check service
    const serviceRunning = await checkService();
    updateStatus(0, serviceRunning ? 'running' : 'error', 
      serviceRunning ? 'Service running' : 'Service not responding');
    
    await new Promise(resolve => setTimeout(resolve, 300)); // Animation delay
    
    // Check Ollama
    const ollamaRunning = await checkOllama();
    updateStatus(1, ollamaRunning ? 'running' : 'error', 
      ollamaRunning ? 'Ollama running' : 'Ollama not running');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check models
    const modelsFound = await checkModels();
    updateStatus(2, modelsFound ? 'running' : 'not-found', 
      modelsFound ? 'Models available' : 'No models found');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check extension
    const extensionInstalled = await checkExtension();
    updateStatus(3, extensionInstalled ? 'running' : 'not-found', 
      extensionInstalled ? 'Extension connected' : 'Extension not found');
    
    setIsChecking(false);
  };

  React.useEffect(() => {
    runChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return (
          <div className="w-4 h-4 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin"></div>
        );
      case 'running':
        return (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case 'error':
        return (
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case 'not-found':
        return (
          <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'not-found':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-sm sm:text-base font-medium text-gray-700">Status Check</h1>
        <button
          onClick={runChecks}
          disabled={isChecking}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
          title="Refresh status"
        >
          <svg 
            className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Refresh
        </button>
      </div>
      <div className="space-y-2">
        {statuses.map((item, index) => (
          <div 
            key={item.name}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ease-in-out ${
              item.status === 'loading' ? 'bg-gray-50' : 
              item.status === 'running' ? 'bg-green-50' :
              item.status === 'error' ? 'bg-red-50' : 'bg-yellow-50'
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            {getStatusIcon(item.status)}
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">{item.name}:</span>
              <span className={`text-sm ml-2 ${getStatusColor(item.status)}`}>
                {item.message}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}