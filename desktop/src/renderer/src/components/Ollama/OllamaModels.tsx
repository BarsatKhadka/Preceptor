import * as React from "react";
import { useState } from "react";

interface OllamaModelsProps {
  models: string[];
  onRefresh: () => void;
}

const OllamaModels: React.FC<OllamaModelsProps> = ({ models, onRefresh }) => {
  const [currentModel, setCurrentModel] = useState<string>(models[0] || "");
  const handleUseModel = (modelName: string) => {
    setCurrentModel(modelName);
    // Optionally: API call to set model as active
  };
  return (
    <div className="w-full" style={{ background: '#fafaf9', borderRadius: 8, padding: '16px 0', border: '1px solid #eee', marginTop: 8 }}>
      <div className="flex items-center justify-between mb-2 px-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="font-mono text-base text-black">Available Models</span>
        </div>
        <button onClick={onRefresh} className="underline text-sm text-gray-600 hover:text-black p-0 bg-none border-none font-mono">Refresh</button>
      </div>
      <div className="flex flex-col gap-1 px-4">
        {models.map((model, idx) => (
          <div key={idx} className="flex items-center py-1 border-b border-gray-100 last:border-b-0">
            {currentModel === model ? (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 inline-block"></span>
                <span className="font-mono text-base text-black">{'>'} Current model: {model}</span>
              </>
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
  );
};

export default OllamaModels; 