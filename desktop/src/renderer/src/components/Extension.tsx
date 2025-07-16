import { MdExtension } from "react-icons/md";

export function Extension() {
    return (
        <div className="flex-1 flex items-start justify-center pt-7 px-8" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex items-center gap-8 max-w-3xl">
                <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full p-3">
                    <MdExtension size={105} className="text-black" />
                </div>
                {/* Right side - Text content */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Install browser extension
                    </h1>
                    <p className="text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Preceptor uses a browser extension to get the current tab name from your browser and pass it to local AI.
                    </p>
                </div>
            </div>
        </div>
    );
} 