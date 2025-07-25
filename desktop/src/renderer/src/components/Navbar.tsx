import icon from "../assets/icon.png";
import { IoSettings } from "react-icons/io5";
import { IoHelpCircle } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { SettingsModal } from "./Modals/SettingsModal";
import { FAQModal } from "./Modals/FAQModal";
import { ReportIssueModal } from "./Modals/ReportIssueModal";

export function Navbar(): React.JSX.Element {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isFAQOpen, setIsFAQOpen] = useState(false);
    const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
    return (
        <>
            <nav className="w-full flex flex-row items-center justify-center sm:justify-start px-2 sm:px-3 md:px-8 py-1 sm:py-2 lg:py-4 border-b border-gray-200 relative" style={{ backgroundColor: '#fffde5' }}>
            {/* Settings, FAQ, and Report Issue Buttons - Right Side */}
            <div className="absolute right-4 sm:right-6 md:right-8 flex flex-row items-center gap-2 sm:gap-3">
                <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 hover:bg-white transition-colors" 
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1vw, 13px)' }}
                >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Settings
                </button>
                <button 
                    onClick={() => setIsFAQOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 hover:bg-white transition-colors" 
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1vw, 13px)' }}
                >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                    </svg>
                    FAQ
                </button>
                <button 
                    onClick={() => setIsReportIssueOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 hover:bg-white transition-colors" 
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1vw, 13px)' }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Report Issue
                </button>
            </div>
            
            <div className="flex flex-row items-center gap-1 sm:gap-2 lg:gap-3 sm:ml-[34%]">
                <img 
                    src={icon} 
                    alt="Preceptor Icon" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 object-cover"
                />
                <span className="text-sm sm:text-lg lg:text-xl xl:text-xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>Preceptor</span>
            </div>
        </nav>
        
        {/* Modals */}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
        <ReportIssueModal isOpen={isReportIssueOpen} onClose={() => setIsReportIssueOpen(false)} />
    </>
    );
}