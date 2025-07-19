import * as React from "react";
import { useAppStore } from "../../store";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";

interface OllamaModelsProps {
  models: string[];
  onRefresh: () => void;
}

const osOptions = [
  {
    key: 'win',
    label: 'Windows',
    logo: <FaWindows size={16} color="#222" />,
    terminal: 'Powershell',
  },
  {
    key: 'mac',
    label: 'macOS',
    logo: <FaApple size={16} color="#222" />,
    terminal: 'Terminal',
  },
  {
    key: 'linux',
    label: 'Linux',
    logo: <FaLinux size={16} color="#222" />,
    terminal: 'Terminal',
  },
];

function detectPlatform() {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('mac')) return 'mac';
  if (platform.includes('win')) return 'win';
  return 'linux';
}

const OllamaModels: React.FC<OllamaModelsProps> = ({ models, onRefresh }) => {
  const currentModel = useAppStore((state) => state.currentModel);
  const setCurrentModel = useAppStore((state) => state.setCurrentModel);
  const [removeIdx, setRemoveIdx] = React.useState<number | null>(null);
  const [selectedOS, setSelectedOS] = React.useState<string>(detectPlatform());

  const handleUseModel = (modelName: string) => {
    setCurrentModel(modelName);
  };

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
        <span className="text-sm lg:text-base xl:text-lg text-black" style={{ fontFamily: 'var(--font-mono)' }}>{'>'} Available Models</span>
        <button onClick={onRefresh} className="underline text-xs lg:text-sm text-gray-600 hover:text-black p-0 bg-none border-none" style={{ fontFamily: 'var(--font-mono)' }}>Refresh</button>
      </div>
      {/* Models List */}
      <div style={{ width: '100%', padding: '0 16px' }}>
        <div className="flex flex-col items-center gap-1 mb-3">
          {models.map((model, idx) => (
            <React.Fragment key={model}>
              <div className="flex items-center justify-between w-full py-1 border-b border-gray-100 last:border-b-0">
                {currentModel === model ? (
                  <span className="text-sm lg:text-base text-black" style={{ fontFamily: 'var(--font-mono)' }}> Current model: {model}</span>
                ) : (
                  <span className="text-sm lg:text-base text-black" style={{ fontFamily: 'var(--font-mono)' }}>{model}</span>
                )}
                <div className="flex items-center gap-1">
                  <button onClick={() => setRemoveIdx(removeIdx === idx ? null : idx)} className="underline text-xs lg:text-sm text-red-600 hover:text-red-800 p-0 bg-none border-none" style={{ fontFamily: 'var(--font-body)' }}>{removeIdx === idx ? 'Close' : 'Remove'}</button>
                  {currentModel !== model && (
                    <button onClick={() => handleUseModel(model)} className="underline text-xs lg:text-sm text-gray-600 hover:text-black p-0 bg-none border-none" style={{ fontFamily: 'var(--font-body)' }}>Use</button>
                  )}
                </div>
              </div>
              {removeIdx === idx && (
                <div className="w-full flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-sm px-0 py-3 mb-2" style={{ border: '1px solid #eee' }}>
                  <div className="text-sm lg:text-base font-semibold text-black text-center mb-2" style={{ fontFamily: 'var(--font-body)' }}>Remove a model</div>
                  {/* OS Selector */}
                  <div className="flex items-center justify-center gap-1 mb-3 px-2 w-full">
                    {osOptions.map(os => (
                      <button
                        key={os.key}
                        onClick={() => setSelectedOS(os.key)}
                        style={{
                          background: selectedOS === os.key ? '#f3f4f6' : 'transparent',
                          borderRadius: 6,
                          border: 'none',
                          padding: '4px 6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          outline: selectedOS === os.key ? '2px solid #e5e7eb' : 'none',
                          transition: 'background 0.15s',
                          minWidth: 40,
                        }}
                      >
                        {os.logo}
                        <span className="text-xs lg:text-sm mt-1 text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>{os.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full max-w-xs mx-auto">
                    <div className="text-xs lg:text-sm text-black text-left w-full mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                      1) Open {selectedOS === 'win' ? 'Powershell' : 'Terminal'}
                    </div>
                    <div className="w-full flex items-center bg-gray-100 border border-gray-200 rounded-md px-2 py-1 mb-1">
                      <span className="text-xs lg:text-sm text-gray-900 flex-1 select-all" style={{ fontFamily: 'var(--font-mono)' }}>ollama rm {model}</span>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OllamaModels; 