import * as React from "react";
import axios from "axios";

interface StatusItem {
  name: string;
  status: 'loading' | 'running' | 'error' | 'not-found';
  message: string;
}

export default function StatusCheck() {
  const [statuses, setStatuses] = React.useState<StatusItem[]>([
    { name: 'Service', status: 'loading', message: '' },
    { name: 'Ollama', status: 'loading', message: '' },
    { name: 'Models', status: 'loading', message: '' },
    { name: 'Extension', status: 'loading', message: '' }
  ]);
  const [isChecking, setIsChecking] = React.useState(true);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const checkService = async () => {
    try {
      const response = await axios.get('http://localhost:8000/test', { timeout: 3000 });
      return response.data === true;
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
    try {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(false);
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
    setStatuses([
      { name: 'Service', status: 'loading', message: '' },
      { name: 'Ollama', status: 'loading', message: '' },
      { name: 'Models', status: 'loading', message: '' },
      { name: 'Extension', status: 'loading', message: '' }
    ]);
    setRefreshKey(prev => prev + 1); // trigger animation
    // Service
    const serviceRunning = await checkService();
    if (serviceRunning) {
      updateStatus(0, 'running', '');
    } // else, leave as loading (never error)
    // Ollama
    const ollamaRunning = await checkOllama();
    updateStatus(1, ollamaRunning ? 'running' : 'error', '');
    // Models
    const modelsFound = await checkModels();
    updateStatus(2, modelsFound ? 'running' : 'not-found', '');
    // Extension
    const extensionInstalled = await checkExtension();
    updateStatus(3, extensionInstalled ? 'running' : 'not-found', '');
    setIsChecking(false);
  };

  React.useEffect(() => {
    runChecks();
  }, []);

  const getStatusText = (item: StatusItem) => {
    if (item.status === 'loading') {
      return `> ${item.name} is loading`;
    }
    if (item.status === 'running') {
      return (
        <span style={{ color: 'green' }}>{`> ${item.name} loaded`}</span>
      );
    }
    if (item.status === 'not-found') {
      return (
        <span style={{ color: 'black' }}>{`> ${item.name} not found`}</span>
      );
    }
    if (item.status === 'error') {
      if (item.name === 'Ollama') {
        return (
          <span style={{ color: 'red' }}>{`> Ollama error (service needs to be loaded first)`}</span>
        );
      }
      return (
        <span style={{ color: 'red' }}>{`> ${item.name} error`}</span>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div></div>
        <button onClick={runChecks} disabled={isChecking} style={{ fontFamily: 'monospace', fontSize: 14, padding: '2px 10px', cursor: isChecking ? 'not-allowed' : 'pointer' }}>
          Refresh
        </button>
      </div>
      <div key={refreshKey}>
        {statuses.map((item, idx) => (
          <div
            key={item.name}
            style={{
              marginBottom: 4,
              fontFamily: 'monospace',
              fontSize: 15,
              opacity: 0,
              transform: 'translateY(30px)',
              animation: `slideUpFadeIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards`,
              animationDelay: `${idx * 120}ms`,
            }}
          >
            {getStatusText(item)}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
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