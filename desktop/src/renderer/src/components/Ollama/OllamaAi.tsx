import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import OllamaStatus from "./OllamaStatus";
import OllamaModels from "./OllamaModels";
import OllamaNotRunning from "./OllamaNotRunning";

interface OllamaAiProps {
  refreshKey?: number;
}

const OllamaAi: React.FC<OllamaAiProps> = ({ refreshKey }) => {
  const [ollamaStatus, setOllamaStatus] = useState<boolean | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkOllamaStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Ollama is running
      const statusResponse = await axios.get("http://localhost:8000/ollama");
      const isRunning = statusResponse.data;
      setOllamaStatus(isRunning);

      if (isRunning) {
        // If running, fetch models
        const modelsResponse = await axios.get("http://localhost:8000/models");
        const modelsData = modelsResponse.data;
        setModels(modelsData.models || []);
      }
    } catch (err) {
      console.error("Failed to check Ollama status:", err);
      setError("Failed to connect to Ollama service");
      setOllamaStatus(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOllamaStatus();
  }, [refreshKey]);

  const handleRefresh = () => {
    checkOllamaStatus();
  };

  return (
    <div className="flex-1 flex items-start justify-center pt-2 sm:pt-4 lg:pt-7 px-2 sm:px-4 lg:px-8" style={{ backgroundColor: '#fffde5' }}>
      <div className="flex flex-col items-center lg:items-start lg:flex-row gap-2 sm:gap-4 lg:gap-8 max-w-3xl w-full">
        {/* Left side - Ollama logo */}
        <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full p-1 sm:p-2 lg:p-3">
          <img 
            src="/src/assets/ollama.png" 
            alt="Ollama AI" 
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-28 lg:h-28 rounded-full object-cover"
          />
        </div>
        
        {/* Right side - Text content and status */}
        <div className="flex flex-col gap-1 sm:gap-2 lg:gap-3 text-center lg:text-left w-full">
          <h1 className="text-sm sm:text-lg lg:text-2xl xl:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
            Setup Local AI through Ollama
          </h1>
          <p className="text-xs sm:text-sm lg:text-lg xl:text-md text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
            Preceptor uses Ollama to ensure <span className="relative group underline underline-offset-2 text-purple-700 cursor-pointer hover:text-purple-900 hover:underline" tabIndex={0}>
              local AI processing
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-48 lg:w-64 xl:w-80 bg-white text-gray-800 text-xs lg:text-sm rounded-lg shadow-lg px-2 sm:px-3 lg:px-4 py-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity z-10 border border-gray-200" style={{ fontFamily: 'var(--font-body)' }}>
                Local AI processing means all computations and data analysis happen on your device, ensuring privacy and security.
              </span>
            </span> and keep your data secure. 
          </p>
          {/* Ollama Status Component */}
          <div
            className="mt-4 w-full"
            style={{
              border: 'none',
              background: 'none',
              borderRadius: 0,
              padding: 0,
              minHeight: 0,
              position: 'relative',
            }}
          >
            {/* Info bars at the top of the status area */}
            {ollamaStatus && !error && (
              <div
                style={{
                  background: '#e6f9e6',
                  color: '#1b5e20',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(15px, 1.5vw, 18px)',
                  borderRadius: 0,
                  padding: '2px 6px',
                  margin: '0 0 12px 0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
              >
                Ollama service is running
              </div>
            )}
            {models.length === 0 && !error && ollamaStatus && (
              <div
                style={{
                  background: '#fff9c4',
                  color: '#665c00',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(15px, 1.5vw, 18px)',
                  borderRadius: 0,
                  padding: '2px 6px',
                  margin: '0 0 12px 0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
              >
                No models found
              </div>
            )}
            {error && (
              <div
                style={{
                  background: '#ffeaea',
                  borderRadius: 0,
                  padding: '2px 6px',
                  color: '#a94442',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(15px, 1.5vw, 18px)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                  margin: 0,
                }}
              >
                Failed to connect to Ollama service
              </div>
            )}
            {loading ? (
              <div className="flex items-center px-4 py-3">
                <span className="text-base lg:text-lg xl:text-xl text-gray-500" style={{ fontFamily: 'var(--font-mono)' }}>Checking Ollama status...</span>
              </div>
            ) : !ollamaStatus ? (
              <OllamaNotRunning onRefresh={handleRefresh} />
            ) : models.length === 0 ? (
              <OllamaStatus onRefresh={handleRefresh} />
            ) : (
              <OllamaModels models={models} onRefresh={handleRefresh} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OllamaAi; 