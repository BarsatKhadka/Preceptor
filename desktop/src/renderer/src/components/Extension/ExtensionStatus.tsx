import { useState, useEffect } from "react";
import { MdExtension } from "react-icons/md";
import { useAppStore } from "../../store";

export function ExtensionStatus() {
    const [loading, setLoading] = useState(true);
    const { isExtensionActive, setExtensionStatus } = useAppStore();

    useEffect(() => {
        const checkExtensionStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/extension-status');
                const data = await response.json();
                setExtensionStatus(data.active);
            } catch (error) {
                console.error('Failed to fetch extension status:', error);
                setExtensionStatus(false);
            } finally {
                setLoading(false);
            }
        };

        checkExtensionStatus();
        // Check status every 10 seconds
        const interval = setInterval(checkExtensionStatus, 10000);
        
        return () => clearInterval(interval);
    }, [setExtensionStatus]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f5f5f5',
                padding: '6px 12px',
                margin: '0 0 12px 0',
                fontFamily: 'monospace',
                fontSize: 15,
                color: '#666',
                gap: 10,
                justifyContent: 'flex-start',
            }}>
                Checking extension status...
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: isExtensionActive ? '#e8f5e8' : '#ffe8e8', // light green or light red
            padding: '2px 6px',
            margin: '0 0 126px 0',
            fontFamily: 'monospace',
            fontSize: 15,
            color: isExtensionActive ? '#2e7d32' : '#d32f2f', // dark green or dark red
            gap: 10,
            justifyContent: 'flex-start',
        }}>
            Extension is {isExtensionActive ? 'running' : 'not running'}
        </div>
    );
} 