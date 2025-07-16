export function OllamaAi() {
    return (
        <div className="flex-1 flex items-start justify-center pt-8 px-8 bg-white" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex items-center gap-8 max-w-3xl">

                <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <img 
                        src="/src/assets/ollama.png" 
                        alt="Ollama AI" 
                        className="w-28 h-28 rounded-full object-cover"
                    />
                </div>
                {/* Right side - Text content */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Setup Local AI through Ollama
                    </h1>
                    <p className="text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Preceptor uses Ollama to ensure <span className="relative group underline underline-offset-2 text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" tabIndex={0}>
                            local AI processing
                            <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white text-gray-800 text-xs rounded-lg shadow-lg px-4 py-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity z-10 border border-gray-200">
                                Local AI processing means all computations and data analysis happen on your device, ensuring privacy and security.
                            </span>
                        </span> and keep your data secure. 
                    </p>
                </div>
            </div>
        </div>
    );
} 