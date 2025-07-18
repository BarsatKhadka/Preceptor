import * as React from "react";
import { useModelStore } from "../../store";

interface OllamaModelsProps {
  models: string[];
  onRefresh: () => void;
}

const OllamaModels: React.FC<OllamaModelsProps> = ({ models, onRefresh }) => {
  const currentModel = useModelStore((state) => state.currentModel);
  const setCurrentModel = useModelStore((state) => state.setCurrentModel);
  const handleUseModel = (modelName: string) => {
    setCurrentModel(modelName);
  };
  return (
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
        <span className="font-mono text-base text-black">{'>'} Available Models</span>
        <button onClick={onRefresh} className="underline text-sm text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
      </div>
      {/* Models List */}
      <div style={{ width: '100%', padding: '0 20px' }}>
        <div className="flex flex-col items-center gap-1 mb-4">
          {models.map((model, idx) => (
            <div key={idx} className="flex items-center justify-between w-full py-2 border-b border-gray-100 last:border-b-0">
              {currentModel === model ? (
                <span className="font-mono text-base text-black">{'>'} Current model: {model}</span>
              ) : (
                <>
                  <span className="font-mono text-base text-black">{model}</span>
                  <button onClick={() => handleUseModel(model)} className="ml-3 underline text-xs text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Use</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OllamaModels; 