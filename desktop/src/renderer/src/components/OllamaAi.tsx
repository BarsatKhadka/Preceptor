export function OllamaAi() {
    return (
        <div className="flex-1 flex items-start justify-center pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 bg-white" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 max-w-3xl w-full">

                <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full p-2 sm:p-3">
                    <img 
                        src="/src/assets/ollama.png" 
                        alt="Ollama AI" 
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full object-cover"
                    />
                </div>
                {/* Right side - Text content */}
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
                </div>
            </div>
        </div>
    );
} 