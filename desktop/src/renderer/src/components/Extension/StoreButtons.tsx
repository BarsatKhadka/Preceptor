import { FaChrome, FaFirefox } from "react-icons/fa";
import { useAppStore } from "../../store";

export function StoreButtons() {
    const { isExtensionActive } = useAppStore();

    if (isExtensionActive) {
        return (
            <div style={{ width: '100%', marginTop: 16 }}>
                
                <a
                    href="https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#e3f2fd',
                        padding: '4px 8px',
                        margin: '0 0 8px 0',
                        fontFamily: 'monospace',
                        fontSize: 13,
                        color: '#1976d2',
                        textDecoration: 'none',
                        gap: 8,
                        justifyContent: 'flex-start',
                        transition: 'background 0.2s',
                    }}
                >
                    <FaChrome size={16} style={{ marginRight: 6, color: '#1976d2' }} />
                    Leave a Review on Chrome Web Store
                </a>
                <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/YOUR_EXTENSION_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#fff3e0',
                        padding: '4px 8px',
                        margin: '0 0 12px 0',
                        fontFamily: 'monospace',
                        fontSize: 13,
                        color: '#e65100',
                        textDecoration: 'none',
                        gap: 8,
                        justifyContent: 'flex-start',
                        transition: 'background 0.2s',
                    }}
                >
                    <FaFirefox size={16} style={{ marginRight: 6, color: '#e65100' }} />
                    Leave a Review on Firefox Add-ons
                </a>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', marginTop: 16 }}>
            <a
                href="https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#e3f2fd', // light blue
                    padding: '4px 8px',
                    margin: '0 0 8px 0',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: '#1976d2',
                    textDecoration: 'none',
                    gap: 8,
                    justifyContent: 'flex-start',
                    transition: 'background 0.2s',
                }}
            >
                <FaChrome size={16} style={{ marginRight: 6, color: '#1976d2' }} />
                Get on Chrome Web Store
            </a>
            <a
                href="https://addons.mozilla.org/en-US/firefox/addon/YOUR_EXTENSION_ID"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff3e0', // light orange
                    padding: '4px 8px',
                    margin: '0 0 12px 0',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: '#e65100',
                    textDecoration: 'none',
                    gap: 8,
                    justifyContent: 'flex-start',
                    transition: 'background 0.2s',
                }}
            >
                <FaFirefox size={16} style={{ marginRight: 6, color: '#e65100' }} />
                Get on Firefox Add-ons
            </a>
        </div>
    );
} 