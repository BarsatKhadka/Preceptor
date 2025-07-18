import { useState, useEffect } from "react";
import { MdExtension } from "react-icons/md";

export function ExtensionStatus() {
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkExtensionStatus = async () => {
            try {
                const response = await fetch('http://localhost:8000/extension-status');
                const data = await response.json();
                setIsActive(data.active);
            } catch (error) {
                console.error('Failed to fetch extension status:', error);
                setIsActive(false);
            } finally {
                setLoading(false);
            }
        };

        checkExtensionStatus();
        // Check status every 30 seconds
        const interval = setInterval(checkExtensionStatus, 30000);
        
        return () => clearInterval(interval);
    }, []);

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
            background: isActive ? '#e8f5e8' : '#ffe8e8', // light green or light red
            padding: '2px 6px',
            margin: '0 0 12px 0',
            fontFamily: 'monospace',
            marginTop: 6,
            fontSize: 15,
            color: isActive ? '#2e7d32' : '#d32f2f', // dark green or dark red
            gap: 10,
            justifyContent: 'flex-start',
        }}>
            Extension is {isActive ? 'running' : 'not running'}
        </div>
    );
} 