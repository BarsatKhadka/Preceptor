import icon from "../assets/icon.png";

export function Navbar(): React.JSX.Element {
    return (
        <nav className="w-full flex flex-row items-center justify-center sm:justify-start px-2 sm:px-3 md:px-8 py-1 sm:py-2 lg:py-4 border-b border-gray-200" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex flex-row items-center gap-1 sm:gap-2 lg:gap-3 sm:ml-[34%]">
                <img 
                    src={icon} 
                    alt="Preceptor Icon" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 object-cover"
                />
                <span className="text-sm sm:text-lg lg:text-xl xl:text-xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Preceptor</span>
            </div>
        </nav>
    );
}