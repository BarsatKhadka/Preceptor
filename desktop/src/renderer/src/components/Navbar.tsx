import icon from "../assets/icon.png";

export function Navbar(): React.JSX.Element {
    return (
        <nav className="w-full flex flex-row items-center justify-center px-4 sm:px-8 lg:px-12 py-2 sm:py-4 border-b border-gray-200" style={{ backgroundColor: '#fffde5' }}>
            <div className="flex flex-row items-center gap-2 sm:gap-3">
                <img 
                    src={icon} 
                    alt="Preceptor Icon" 
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                />
                <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">Preceptor</span>
            </div>
        </nav>
    );
}