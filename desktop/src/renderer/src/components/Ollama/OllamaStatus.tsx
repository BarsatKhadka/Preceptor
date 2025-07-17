import * as React from "react";

interface OllamaStatusProps {
  onRefresh: () => void;
}

const OllamaStatus: React.FC<OllamaStatusProps> = ({ onRefresh }) => {
  const getOSInstructions = () => {
    const platform = navigator.platform.toLowerCase();
    
    if (platform.includes('win')) {
      return {
        title: "Windows",
        commands: [
          "ollama pull llama2",
          "ollama pull codellama",
          "ollama pull mistral"
        ]
      };
    } else if (platform.includes('mac')) {
      return {
        title: "macOS",
        commands: [
          "ollama pull llama2",
          "ollama pull codellama", 
          "ollama pull mistral"
        ]
      };
    } else {
      return {
        title: "Linux",
        commands: [
          "ollama pull llama2",
          "ollama pull codellama",
          "ollama pull mistral"
        ]
      };
    }
  };

  const osInfo = getOSInstructions();

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">No Models Installed</h3>
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
          Install models on <strong>{osInfo.title}</strong>:
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

        <p className="text-sm text-gray-500">
          Run these commands in your terminal, then refresh to see available models.
        </p>
      </div>
    </div>
  );
};

export default OllamaStatus; 