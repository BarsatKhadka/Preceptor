import { MdExtension } from "react-icons/md";
import { StoreButtons } from "./StoreButtons";
import { ExtensionStatus } from "./ExtensionStatus";

export function Extension() {
    return (
        <div className="flex-1 flex items-start justify-center pt-4 sm:pt-6 lg:pt-7 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 max-w-3xl w-full">
                <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full p-2 sm:p-3" style={{ marginBottom: 150 }}>
                    <MdExtension size={60} className="sm:w-16 sm:h-16 lg:w-[105px] lg:h-[105px] text-black" />
                </div>
                {/* Right side - Text content */}
                <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left w-full">
                   
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Install browser extension
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Preceptor uses a browser extension to get the current tab name from your browser and pass it to local AI.
                    </p>
                    <ExtensionStatus />
                    <StoreButtons />
                </div>
            </div>
        </div>
    );
} 