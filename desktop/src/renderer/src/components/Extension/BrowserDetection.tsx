import * as React from "react";

const browserStores = [
  {
    key: 'chrome',
    label: 'Chrome',
    store: 'Chrome Web Store',
  },
  {
    key: 'firefox',
    label: 'Firefox',
    store: 'Firefox Add-ons',
  },
];

// Map common browser name keywords to store keys
const keywordToBrowserKey: Record<string, string> = {
  chrome: 'chrome',
  google: 'chrome',
  edge: 'chrome',
  microsoft: 'chrome',
  opera: 'chrome',
  brave: 'chrome',
  firefox: 'firefox',
  mozilla: 'firefox',
  zen: 'firefox',
  vivaldi: 'chrome',
  chromium: 'chrome',
};

// Normalize user input: lowercase, trim spaces, remove punctuation
function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ');
}

// Match user input by keyword inclusion
function mapInputToBrowserKey(input: string): string | null {
  const norm = normalize(input);
  for (const keyword in keywordToBrowserKey) {
    if (norm.includes(keyword)) {
      return keywordToBrowserKey[keyword];
    }
  }
  return null;
}

// Get store from browser key
function detectStoreFromInput(input: string): string {
  const key = mapInputToBrowserKey(input);
  if (!key) return ''; // unknown browser
  const browser = browserStores.find(b => b.key === key);
  return browser ? browser.store : '';
}

function detectBrowser(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('firefox')) return 'firefox';
  if (userAgent.includes('chrome') || userAgent.includes('edg') || userAgent.includes('opera')) return 'chrome';
  return 'chrome'; // default
}

const BrowserDetection: React.FC = () => {
  const [browserName, setBrowserName] = React.useState<string>('');
  const [detectedStore, setDetectedStore] = React.useState<string>('');

  const handleBrowserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setBrowserName(name);
    setDetectedStore(detectStoreFromInput(name));
  };

  const handleAutoDetect = () => {
    const detected = detectBrowser();
    const browser = browserStores.find(b => b.key === detected);
    if (browser) {
      setBrowserName(browser.label);
      setDetectedStore(browser.store);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-sm px-0" style={{ maxWidth: 420, margin: '24px auto 0 auto' }}>
      {/* Full-width gray bar at the top */}
      <div style={{
        width: '100%',
        background: '#f3f4f6',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 24px',
        height: 44,
      }}>
        <span className="font-mono text-base text-black">{'>'} Which store does your browser use?</span>
      </div>
      
      {/* Browser Detection Input */}
      <div style={{ width: '100%', padding: '20px' }}>
        <div className="flex flex-col items-center gap-4">
          {/* Input field */}
          <div className="w-full flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter your browser name"
              value={browserName}
              onChange={handleBrowserNameChange}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleAutoDetect}
              style={{
                padding: '8px 12px',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#374151',
              }}
            >
              Auto
            </button>
          </div>
          
          {/* Store display */}
          {detectedStore && (
            <div className="w-full flex items-center justify-between py-2 px-3 bg-gray-50 border border-gray-200 rounded-md">
              <span className="font-mono text-sm text-gray-700">Store:</span>
              <span className="font-mono text-sm font-semibold text-black">{detectedStore}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowserDetection; 