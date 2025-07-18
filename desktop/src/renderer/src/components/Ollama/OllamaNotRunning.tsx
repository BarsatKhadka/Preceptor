import * as React from "react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";

interface OllamaNotRunningProps {
  onRefresh: () => void;
  error?: string;
}

const installCommand = "curl -fsSL https://ollama.com/install.sh | sh";

const osOptions = [
  {
    key: 'mac',
    label: 'macOS',
    logo: <FaApple size={28} color="#222" />,
    version: 'Requires macOS 12 Monterey or later',
  },
  {
    key: 'linux',
    label: 'Linux',
    logo: <FaLinux size={28} color="#222" />,
    version: '',
  },
  {
    key: 'win',
    label: 'Windows',
    logo: <FaWindows size={28} color="#222" />,
    version: 'Requires Windows 10 or later',
  },
];

function detectPlatform() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('mac')) return 'mac';
  if (platform.includes('win')) return 'win';
  return 'linux';
}

const OllamaNotRunning: React.FC<OllamaNotRunningProps> = ({ onRefresh, error }) => {
  const [selectedOS, setSelectedOS] = React.useState<string>(detectPlatform());

  // Copy to clipboard handler
  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
  };

  const selectedVersion = osOptions.find(os => os.key === selectedOS)?.version || '';

  return (
    <div className="w-full">
      {error === 'Failed to connect to Ollama service' && (
        <div style={{
          background: '#ffeaea',
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
      <div className="w-full flex flex-col items-center justify-center bg-white shadow-sm px-0" style={{ maxWidth: 420, margin: '24px auto 0 auto' }}>
        {/* Full-width gray bar at the top */}
        <div style={{
          width: '100%',
          background: '#f3f4f6',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 44,
        }}>
          <span className="font-mono text-base text-black">{'>'} Ollama is not running</span>
          <button onClick={onRefresh} className="underline text-sm text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
        </div>
        {/* Download Ollama Heading (now below gray bar) */}
        <div className="w-full flex flex-col items-center justify-center pt-6 pb-4">
          <h2 className="text-xl font-semibold text-black text-center">Download Ollama</h2>
        </div>
        {/* Inner content with padding */}
        <div style={{ width: '100%', padding: '0 20px' }}>
          <div className="flex items-center justify-center gap-3 mt-2 mb-4 w-full">
            {osOptions.map(os => (
              <button
                key={os.key}
                onClick={() => setSelectedOS(os.key)}
                style={{
                  background: selectedOS === os.key ? '#f3f4f6' : 'transparent',
                  borderRadius: 8,
                  border: 'none',
                  padding: '7px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  outline: selectedOS === os.key ? '2px solid #e5e7eb' : 'none',
                  transition: 'background 0.15s',
                  minWidth: 60,
                }}
              >
                {os.logo}
                <span className="text-xs mt-1 text-gray-700">{os.label}</span>
              </button>
            ))}
          </div>
          {/* Download/Install Section */}
          {selectedOS === 'linux' && (
            <>
              <div className="text-sm font-medium text-gray-900 mb-2 text-center">Install with one command:</div>
              <div className="w-full flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-2">
                <span className="font-mono text-xs text-gray-900 flex-1 select-all">{installCommand}</span>
                <button
                  onClick={handleCopy}
                  className="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs font-mono text-gray-700 border border-gray-300"
                  title="Copy to clipboard"
                  style={{ minWidth: 32 }}
                >
                  Copy
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1 mb-6">View script source • Manual install instructions</div>
            </>
          )}
          {selectedOS === 'mac' && (
            <>
              <button className="w-full mt-4 mb-2 py-2 rounded-full bg-black text-white text-base font-mono font-semibold hover:bg-gray-900 transition">Download for macOS</button>
              <div className="text-xs text-gray-500 text-center mb-6">{selectedVersion}</div>
            </>
          )}
          {selectedOS === 'win' && (
            <>
              <button className="w-full mt-4 mb-2 py-2 rounded-full bg-black text-white text-base font-mono font-semibold hover:bg-gray-900 transition">Download for Windows</button>
              <div className="text-xs text-gray-500 text-center mb-6">{selectedVersion}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OllamaNotRunning; 