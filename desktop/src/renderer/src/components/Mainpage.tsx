import { OllamaAi } from './OllamaAi';
import { Precepts } from './Precepts';
import { Extension } from './Extension';

export default function MainPage() {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between items-stretch min-h-screen">
        {/* Logo section - takes full width on small/medium, hidden on large */}
        <div className="lg:hidden flex-1 flex items-center justify-center pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fffde5' }}>
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full p-3 sm:p-4">
              <img 
                src="/src/assets/ollama.png" 
                alt="Preceptor Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                Preceptor
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your local AI companion for productivity and learning
              </p>
            </div>
          </div>
        </div>
        
        {/* Original sections - hidden on small/medium, visible on large */}
        <div className="hidden lg:block flex-1">
          <OllamaAi />
        </div>
        <Precepts />
        <div className="hidden lg:block flex-1">
          <Extension />
        </div>
      </div>
    </>
  );
}   