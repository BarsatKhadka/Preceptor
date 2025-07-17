import * as React from "react";

interface OllamaNotRunningProps {
  onRefresh: () => void;
}

const OllamaNotRunning: React.FC<OllamaNotRunningProps> = ({ onRefresh }) => {
  const getOSInstructions = () => {
    const platform = navigator.platform.toLowerCase();
    
    if (platform.includes('win')) {
      return {
        title: "Windows",
        installUrl: "https://ollama.ai/download/windows",
        commands: [
          "winget install Ollama.Ollama",
          "ollama serve"
        ],
        description: "Download and install Ollama from the official website, then start the service."
      };
    } else if (platform.includes('mac')) {
      return {
        title: "macOS",
        installUrl: "https://ollama.ai/download/mac",
        commands: [
          "brew install ollama",
          "ollama serve"
        ],
        description: "Install via Homebrew or download from the official website, then start the service."
      };
    } else {
      return {
        title: "Linux",
        installUrl: "https://ollama.ai/download/linux",
        commands: [
          "curl -fsSL https://ollama.ai/install.sh | sh",
          "ollama serve"
        ],
        description: "Install using the official install script, then start the service."
      };
    }
  };

  const osInfo = getOSInstructions();

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Ollama Not Running</h3>
        </div>
        <button
          onClick={onRefresh}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-gray-700">
          Install Ollama on <strong>{osInfo.title}</strong>:
        </p>
        
        <div className="space-y-2">
          {osInfo.commands.map((command, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-400 text-sm">$</span>
              <code className="font-mono text-sm text-gray-900">
                {command}
              </code>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <a
            href={osInfo.installUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Download for {osInfo.title}
          </a>
          <span className="text-sm text-gray-500">
            After installation, refresh to check status
          </span>
        </div>
      </div>
    </div>
  );
};

export default OllamaNotRunning; 