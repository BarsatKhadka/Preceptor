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
    // Here you could also make an API call to set the model as active
    console.log(`Using model: ${modelName}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Available Models</h3>
        </div>
        <button
          onClick={onRefresh}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Models List */}
      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <span className="font-mono text-gray-900">
              {currentModel === model ? `> Current model: ${model}` : model}
            </span>
            <button
              onClick={() => handleUseModel(model)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentModel === model
                  ? 'bg-gray-900 text-white cursor-default'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
              }`}
              disabled={currentModel === model}
            >
              {currentModel === model ? 'Active' : 'Use'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OllamaModels; 