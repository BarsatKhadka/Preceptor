import * as React from "react";
import axios from "axios";
import StatusCheck from "./StatusCheck";

export function Precepts() {
  const [currentPrecept, setCurrentPrecept] = React.useState<{id: number, content: string, time?: string} | null>(null);
  const [historyPrecepts, setHistoryPrecepts] = React.useState<{id: number, precept: string, movedAt?: string}[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [statusRefreshKey, setStatusRefreshKey] = React.useState(0);

  const fetchCurrent = async () => {
    const res = await axios.get("http://localhost:8000/getAllCurrentPrecepts");
    // Expecting { preceptData: [id, content, time] }
    if (Array.isArray(res.data.preceptData) && res.data.preceptData.length > 1) {
      setCurrentPrecept({
        id: res.data.preceptData[0],
        content: res.data.preceptData[1],
        time: res.data.preceptData[2]
      });
    } else {
      setCurrentPrecept(null);
    }
  };

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:8000/getAllHistoryPrecepts");
    // Expecting an array of {id, precept, movedAt}
    setHistoryPrecepts(Array.isArray(res.data) ? res.data : []);
  };

  React.useEffect(() => {
    fetchCurrent();
    fetchHistory();
  }, []);

  const addPrecept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    await axios.post("http://localhost:8000/addCurrentPrecept", { precept: input.trim() });
    setInput("");
    await fetchCurrent();
    await fetchHistory();
    setLoading(false);
  };

  const handleRefreshAll = () => {
    fetchCurrent();
    fetchHistory();
    setStatusRefreshKey(k => k + 1);
  };

  const handleDeleteAllHistory = async () => {
    await axios.post("http://localhost:8000/deleteAllHistoryPrecepts");
    fetchHistory();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 lg:pt-8 h-full min-h-0 border-l border-r border-gray-200 rounded-2xl shadow-sm px-3 sm:px-4 md:px-8 py-4 sm:py-6 lg:py-8 relative overflow-hidden" 
         style={{ backgroundColor: '#fffde5', backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #f3e9d2 32px)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-50/20 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {/* Refresh Button on Top */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <span style={{
            background: '#f3f4f6',
            borderRadius: 8,
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontFamily: 'monospace',
            fontSize: 15,
          }} onClick={handleRefreshAll}>
            <svg width="16" height="16" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
              <path d="M4 4v5h5M20 20v-5h-5"/><path d="M5.07 19A9 9 0 1 1 12 21a9 9 0 0 1-6.93-2"/></svg>
            Refresh
          </span>
        </div>
        {/* Status Check */}
        <div>
          <StatusCheck key={statusRefreshKey} />
        </div>
        {/* Current Precept */}
        <div>
          <ul className="mb-3 sm:mb-4 space-y-2">
            {!currentPrecept && (
              <li style={{ color: '#888', fontStyle: 'italic', fontFamily: 'monospace', fontSize: 15 }}>{'> Current precept : (none)'}</li>
            )}
            {currentPrecept && (
              <li>
                <span style={{
                  background: '#fff9c4',
                  borderRadius: 6,
                  padding: '2px 6px',
                  color: '#222',
                  fontFamily: 'monospace',
                  fontSize: 15,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}>{`> Current precept : ${currentPrecept.content}`}</span>
              </li>
            )}
          </ul>
          {/* Created at box */}
          {currentPrecept && currentPrecept.time && (
            <div style={{
              background: '#f7f7f7',
              borderRadius: 8,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '8px 16px',
              marginBottom: 16,
              display: 'inline-block',
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#444',
            }}>
              {`Created at: ${new Date(currentPrecept.time).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
            </div>
          )}
          <form onSubmit={addPrecept} className="flex flex-col sm:flex-row gap-2">
            <input
              className="flex-1 rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition text-sm font-mono shadow"
              placeholder="Enter to set this as new precept"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 rounded-md bg-black text-white font-semibold shadow hover:bg-black/80 transition disabled:opacity-60 text-sm sm:text-base"
              disabled={loading || !input.trim()}
            >
              Set
            </button>
          </form>
        </div>
        {/* History Precepts */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, justifyContent: 'space-between' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f3f4f6',
              borderRadius: 8,
              padding: '6px 16px',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
              color: '#555',
              fontFamily: 'monospace',
              fontSize: 15,
            }}>
              <svg width="16" height="16" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              History
            </span>
            <button onClick={handleDeleteAllHistory} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: '#f3f4f6', border: 'none', color: '#e11d48',
              fontFamily: 'monospace', fontSize: 15, cursor: 'pointer',
              padding: '6px 16px', borderRadius: 8,
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
            title="Delete all history"
            >
              <svg width="16" height="16" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
              Delete All
            </button>
          </div>
          <ul className="space-y-3" style={{ maxHeight: 480, overflowY: 'auto', paddingRight: 2 }}>
            {historyPrecepts.length === 0 && <li className="text-gray-300 italic text-sm sm:text-base">No history yet.</li>}
            {historyPrecepts.map((p) => (
              <li key={p.id} style={{
                background: '#fff9c4',
                borderRadius: 10,
                border: '1.5px solid #e5e7eb',
                boxShadow: '0 1px 6px 0 rgba(180,160,100,0.07)',
                padding: '10px 16px',
                fontFamily: 'monospace',
                color: '#222',
                fontSize: 15,
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                wordBreak: 'break-word',
              }}>
                <span>{p.precept}</span>
                {p.movedAt && (
                  <span style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {`moved at: ${new Date(p.movedAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
