import * as React from "react";

interface OllamaNotRunningProps {
  onRefresh: () => void;
  error?: string;
}

const OllamaNotRunning: React.FC<OllamaNotRunningProps> = ({ onRefresh, error }) => {
  const getOSInstructions = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) {
      return {
        title: "Windows",
        installUrl: "https://ollama.ai/download/windows",
        commands: [
          "winget install Ollama.Ollama",
          "ollama serve"
        ]
      };
    } else if (platform.includes('mac')) {
      return {
        title: "macOS",
        installUrl: "https://ollama.ai/download/mac",
        commands: [
          "brew install ollama",
          "ollama serve"
        ]
      };
    } else {
      return {
        title: "Linux",
        installUrl: "https://ollama.ai/download/linux",
        commands: [
          "curl -fsSL https://ollama.ai/install.sh | sh",
          "ollama serve"
        ]
      };
    }
  };
  const osInfo = getOSInstructions();
  return (
    <div className="w-full" style={{ background: '#fafaf9', borderRadius: 8, padding: '16px 0', border: '1px solid #eee', marginTop: 8 }}>
      {error === 'Failed to connect to Ollama service' && (
        <div style={{
          background: '#ffeaea',
          borderRadius: 6,
          padding: '2px 6px',
          color: '#a94442',
          fontFamily: 'monospace',
          fontSize: 15,
          margin: '0 0 12px 0',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}>
          Failed to connect to Ollama service
        </div>
      )}
      <div className="flex items-center justify-between mb-2 px-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="font-mono text-base text-black">{'>'} Ollama not running</span>
        </div>
        <button onClick={onRefresh} className="underline text-sm text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <span className="font-mono text-sm text-gray-700 mb-1">Install Ollama on <b>{osInfo.title}</b>:</span>
        {osInfo.commands.map((command, idx) => (
          <span key={idx} className="font-mono text-sm text-black">$ {command}</span>
        ))}
        <a href={osInfo.installUrl} target="_blank" rel="noopener noreferrer" className="underline text-sm text-blue-700 hover:text-blue-900 mt-2 font-mono">Download for {osInfo.title}</a>
      </div>
    </div>
  );
};

export default OllamaNotRunning; 