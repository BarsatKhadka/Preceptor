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
    <div className="w-full" style={{ background: '#fafaf9', borderRadius: 8, padding: '16px 0', border: '1px solid #eee', marginTop: 8 }}>
      <div className="flex items-center justify-between mb-2 px-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
          <span className="font-mono text-base text-black">{'>'} No models installed</span>
        </div>
        <button onClick={onRefresh} className="underline text-sm text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <span className="font-mono text-sm text-gray-700 mb-1">Install models on <b>{osInfo.title}</b>:</span>
        {osInfo.commands.map((command, idx) => (
          <span key={idx} className="font-mono text-sm text-black">$ {command}</span>
        ))}
        <span className="font-mono text-xs text-gray-500 mt-2">Run these in your terminal, then refresh.</span>
      </div>
    </div>
  );
};

export default OllamaStatus; 