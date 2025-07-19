import { useState, useEffect } from "react";
import { useAppStore } from "../../store";

export function ExtensionStatus() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { isExtensionActive, setExtensionStatus } = useAppStore();

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
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await checkExtensionStatus();
    };

    useEffect(() => {
        checkExtensionStatus();
        // Check status every 3 seconds
        const interval = setInterval(checkExtensionStatus, 3000);
        
        return () => clearInterval(interval);
    }, [setExtensionStatus]);

    if (loading || refreshing) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f5f5f5',
                padding: '4px 8px',
                margin: '0 0 8px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                color: '#666',
                gap: 8,
                justifyContent: 'space-between',
            }}>
                <span>Checking extension status...</span>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: refreshing ? 'not-allowed' : 'pointer',
                        padding: 0,
                        color: '#666',
                        textDecoration: 'underline',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(13px, 1.2vw, 16px)',
                        opacity: refreshing ? 0.6 : 1,
                    }}
                >
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: isExtensionActive ? '#e8f5e8' : '#ffe8e8', // light green or light red
            padding: '1px 4px',
            margin: '0 0 8px 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            color: isExtensionActive ? '#2e7d32' : '#d32f2f', // dark green or dark red
            gap: 8,
            justifyContent: 'space-between',
        }}>
            <span>Extension is {isExtensionActive ? 'running' : 'not running'}</span>
            <button
                onClick={handleRefresh}
                disabled={refreshing}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: refreshing ? 'not-allowed' : 'pointer',
                    padding: 0,
                    color: isExtensionActive ? '#2e7d32' : '#d32f2f',
                    textDecoration: 'underline',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(13px, 1.2vw, 16px)',
                    opacity: refreshing ? 0.6 : 1,
                }}
            >
                {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
        </div>
    );
} 