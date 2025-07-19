import { MdExtension } from "react-icons/md";
import { StoreButtons } from "./StoreButtons";
import { ExtensionStatus } from "./ExtensionStatus";
import BrowserDetection from "./BrowserDetection";
import { useAppStore } from "../../store";

export function Extension() {
    const { isExtensionActive } = useAppStore();

    return (
        <div className="flex-1 flex items-start justify-center pt-2 sm:pt-4 lg:pt-7 px-2 sm:px-4 lg:px-8" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-2 sm:gap-4 lg:gap-8 max-w-3xl w-full">
                {/* Left side - Extension logo */}
                <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full p-1 sm:p-2 lg:p-3">
                    <MdExtension size={40} className="sm:w-12 sm:h-12 lg:w-[105px] lg:h-[105px] text-black" />
                </div>
                
                {/* Right side - Text content and status */}
                <div className="flex flex-col gap-1 sm:gap-2 lg:gap-3 text-center lg:text-left w-full">
                    <h1 className="text-sm sm:text-lg lg:text-2xl xl:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                        Install browser extension
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-lg xl:text-md text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                        Preceptor uses a browser extension to get the current tab name from your browser and pass it to local AI.
                    </p>
                    
                    {/* Extension Status Component */}
                    <div className="mt-2 sm:mt-4 w-full">
                        <ExtensionStatus />
                        <BrowserDetection />
                        <StoreButtons />
                    </div>
                </div>
            </div>
        </div>
    );
} 