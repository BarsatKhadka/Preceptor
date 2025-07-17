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
    <div className="flex-1 flex items-start justify-center pt-4 sm:pt-6 lg:pt-7 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fffde5' }}>
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 max-w-3xl w-full">
        {/* Left side - Ollama logo */}
        <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full p-2 sm:p-3">
          <img 
            src="/src/assets/ollama.png" 
            alt="Ollama AI" 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full object-cover"
          />
        </div>
        
        {/* Right side - Text content and status */}
        <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Setup Local AI through Ollama
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
            Preceptor uses Ollama to ensure <span className="relative group underline underline-offset-2 text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" tabIndex={0}>
              local AI processing
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 sm:w-64 bg-white text-gray-800 text-xs rounded-lg shadow-lg px-3 sm:px-4 py-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity z-10 border border-gray-200">
                Local AI processing means all computations and data analysis happen on your device, ensuring privacy and security.
              </span>
            </span> and keep your data secure. 
          </p>
          
          {/* Ollama Status Component */}
          <div className="mt-4">
            {loading && (
              <div style={{
                background: '#f8f9fa',
                borderRadius: 12,
                padding: '16px 20px',
                border: '1px solid #e9ecef',
                fontFamily: 'monospace',
                fontSize: 15,
                color: '#6c757d',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Checking Ollama status...
              </div>
            )}

            {error && (
              <div style={{
                background: '#f8d7da',
                borderRadius: 12,
                padding: '16px 20px',
                border: '1px solid #f5c6cb',
                fontFamily: 'monospace',
                fontSize: 15,
                color: '#721c24',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            {!loading && !error && !ollamaStatus && (
              <OllamaNotRunning onRefresh={handleRefresh} />
            )}

            {!loading && !error && ollamaStatus && models.length === 0 && (
              <OllamaStatus onRefresh={handleRefresh} />
            )}

            {!loading && !error && ollamaStatus && models.length > 0 && (
              <OllamaModels models={models} onRefresh={handleRefresh} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OllamaAi; 