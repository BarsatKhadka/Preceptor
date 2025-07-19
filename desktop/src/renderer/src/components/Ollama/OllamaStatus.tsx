import * as React from "react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";

interface OllamaStatusProps {
  onRefresh: () => void;
}

const osOptions = [
  {
    key: 'win',
    label: 'Windows',
    logo: <FaWindows size={20} color="#222" />,
    commands: [
      "ollama pull llama2",
      "ollama pull codellama",
      "ollama pull mistral"
    ],
    title: 'Windows',
  },
  {
    key: 'mac',
    label: 'macOS',
    logo: <FaApple size={20} color="#222" />,
    commands: [
      "ollama pull llama2",
      "ollama pull codellama",
      "ollama pull mistral"
    ],
    title: 'macOS',
  },
  {
    key: 'linux',
    label: 'Linux',
    logo: <FaLinux size={20} color="#222" />,
    commands: [
      "ollama pull llama2",
      "ollama pull codellama",
      "ollama pull mistral"
    ],
    title: 'Linux',
  },
];

function detectPlatform() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('mac')) return 'mac';
  if (platform.includes('win')) return 'win';
  return 'linux';
}

const OllamaStatus: React.FC<OllamaStatusProps> = ({ onRefresh }) => {
  const [selectedOS, setSelectedOS] = React.useState<string>(detectPlatform());
  const osInfo = osOptions.find(os => os.key === selectedOS) || osOptions[2];

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-sm px-0" style={{ maxWidth: 420, margin: '16px auto 0 auto' }}>
      {/* Full-width gray bar at the top */}
      <div style={{
        width: '100%',
        background: '#f3f4f6',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: 36,
      }}>
        <span className="font-mono text-sm text-black">{'>'} No models installed</span>
        <button onClick={onRefresh} className="underline text-xs text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
      </div>
      {/* Install Models Heading */}
      <div className="w-full flex flex-col items-center justify-center pt-4 pb-3">
        <h2 className="text-lg font-semibold text-black text-center">Install Models</h2>
      </div>
      {/* OS Selector */}
      <div className="flex items-center justify-center gap-2 mt-1 mb-3 px-2 w-full">
        {osOptions.map(os => (
          <button
            key={os.key}
            onClick={() => setSelectedOS(os.key)}
            style={{
              background: selectedOS === os.key ? '#f3f4f6' : 'transparent',
              borderRadius: 6,
              border: 'none',
              padding: '5px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              outline: selectedOS === os.key ? '2px solid #e5e7eb' : 'none',
              transition: 'background 0.15s',
              minWidth: 50,
            }}
          >
            {os.logo}
            <span className="text-xs mt-1 text-gray-700">{os.label}</span>
          </button>
        ))}
      </div>
      {/* Install models guide for selected OS */}
      <div style={{ width: '100%', padding: '0 16px' }}>
        <div className="text-xs font-medium text-gray-900 mt-1 mb-1 text-center">Install models on <b>{osInfo.title}</b>:</div>
        <div className="flex flex-col items-center gap-1 mb-3">
          {osInfo.commands.map((command, idx) => (
            <span key={idx} className="font-mono text-xs text-black">$ {command}</span>
          ))}
        </div>
        <div className="text-xs text-gray-500 text-center mb-4">Run these in your terminal, then refresh.</div>
      </div>
    </div>
  );
};

export default OllamaStatus;  