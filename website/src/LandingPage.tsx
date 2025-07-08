import bgImage from "./assets/bgImage.png";
import { FaWindows, FaLinux, FaGithub, FaPlay } from "react-icons/fa";

export const LandingPage = () => {
    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');`}</style>
            <div
                className="min-h-screen w-full relative bg-no-repeat bg-cover bg-center antialiased"
                style={{ backgroundImage: `url(${bgImage})`, fontFamily: 'Inter, sans-serif' }}
            >
                {/* Headline Section - above Buddha eyes */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-full px-4 select-none">
                    <h1
                        className="text-5xl md:text-7xl font-extrabold mb-2 text-gray-300 drop-shadow-xl tracking-tight"
                    >
                        You said you wanted to focus
                    </h1>
                    <h2
                        className="text-3xl md:text-5xl font-extrabold text-gray-300 drop-shadow-lg tracking-tight"
                    >
                        Preceptor remembers
                    </h2>
                </div>

                {/* Download & Email Section - below the earth */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
                    <div className="flex flex-row gap-16 justify-center">
                        <button className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[#4f5b93] bg-[#020611] text-white text-lg font-medium transition-colors duration-200 hover:border-blue-400 focus:outline-none">
                            <FaWindows className="w-6 h-6" />
                            Download for Windows
                        </button>
                        <button className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[#4f5b93] bg-[#020611] text-white text-lg font-medium transition-colors duration-200 hover:border-blue-400 focus:outline-none">
                            <FaLinux className="w-6 h-6" />
                            Download for Linux
                        </button>
                    </div>
                    {/* Info Buttons Container */}
                    <div className="flex flex-row items-center justify-center gap-[120px] mt-8 mb-4">
                        <button className="flex items-center px-8 py-3 rounded-xl border border-[#4f5b93] bg-[#020611] text-white text-lg font-medium transition-colors duration-200 hover:border-blue-400 focus:outline-none">
                            <FaGithub className="w-6 h-6" />
                            What is Preceptor?
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#4f5b93] bg-[#020611] text-white text-lg font-medium transition-colors duration-200 hover:border-blue-400 focus:outline-none">
                            <FaPlay className="w-5 h-5" />
                            Watch Demo 
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-full max-w-xl mt-6 ml-[-50px]">
                        <span className="text-lg text-white/80">Enter your email to get notified when we launch!</span>
                        <form className="flex w-full gap-4 flex-nowrap" action="https://formspree.io/f/xovwoneo" method="POST">
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email address"
                                className="flex-1 px-6 py-4 rounded-xl border border-[#4f5b93] bg-[#020611] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 text-xl min-w-0"
                            />
                            <button type="submit" className="px-8 py-4 rounded-xl bg-[#04266d] text-white font-bold text-xl transition-colors duration-200 focus:outline-none" >
                                Join the Waitlist
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}