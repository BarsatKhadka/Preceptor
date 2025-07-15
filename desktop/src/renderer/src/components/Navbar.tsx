import icon from "../assets/icon.png";

export function Navbar(): React.JSX.Element {
    return (
        <nav className="w-full flex flex-row items-center px-12 py-8">
            <div className="flex flex-row items-center gap-3">
                <img 
                    src={icon} 
                    alt="Preceptor Icon" 
                    className="w-16 h-16 translate-y-5 -translate-x-1"
                />
                <span className="text-xl font-bold text-gray-900 mt-8 tracking-wide">Preceptor</span>
            </div>
        </nav>
    );
}