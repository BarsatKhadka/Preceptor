import * as React from "react";
import axios from "axios";
import StatusCheck from "../StatusCheck";
import HistoryPrecepts from "./HistoryPrecepts";

export function Precepts() {
  const [currentPrecept, setCurrentPrecept] = React.useState<{id: number, content: string, time?: string} | null>(null);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [statusRefreshKey, setStatusRefreshKey] = React.useState(0);
  const [historyRefreshKey, setHistoryRefreshKey] = React.useState(0);

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

  React.useEffect(() => {
    fetchCurrent();
  }, []);

  const addPrecept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    await axios.post("http://localhost:8000/addCurrentPrecept", { precept: input.trim() });
    setInput("");
    await fetchCurrent();
    setHistoryRefreshKey(k => k + 1);
    setLoading(false);
  };

  const handleRefreshAll = () => {
    fetchCurrent();
    setStatusRefreshKey(k => k + 1);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-2 sm:pt-4 lg:pt-8 h-full min-h-0 border-l border-r border-gray-200 rounded-2xl shadow-sm px-2 sm:px-3 lg:px-8 py-2 sm:py-4 lg:py-8 relative overflow-y-auto" 
         style={{ backgroundColor: '#fffde5', backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #f3e9d2 32px)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-50/20 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-2 sm:gap-4 lg:gap-8">
        {/* Refresh Button on Top */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
          <span style={{
            background: '#f3f4f6',
            borderRadius: 6,
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.2vw, 16px)',
          }} onClick={handleRefreshAll}>
            <svg width="14" height="14" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
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
          <ul className="mb-2 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-2">
            {!currentPrecept && (
              <li style={{ color: '#888', fontStyle: 'italic', fontFamily: 'var(--font-precept)', fontSize: 'clamp(13px, 1.2vw, 16px)' }}>{'> Current precept : (none)'}</li>
            )}
            {currentPrecept && (
              <li>
                <span style={{
                  background: '#fff9c4',
                  borderRadius: 4,
                  padding: '1px 4px',
                  color: '#222',
                  fontFamily: 'var(--font-precept)',
                  fontSize: 'clamp(19px, 1.2vw, 19px)',
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
              borderRadius: 6,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '6px 12px',
              marginBottom: 12,
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              color: '#444',
            }}>
              {`Created at: ${new Date(currentPrecept.time).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
            </div>
          )}
          <form onSubmit={addPrecept} className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <input
              className="flex-1 rounded-md border border-gray-300 bg-white/80 px-2 sm:px-3 py-1 sm:py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition shadow"
              placeholder="Enter to set this as new precept"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 16px)' }}
            />
            <button
              type="submit"
              className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-md bg-black text-white font-semibold shadow hover:bg-black/80 transition disabled:opacity-60"
              disabled={loading || !input.trim()}
              style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(12px, 1.1vw, 16px)' }}
            >
              Set
            </button>
          </form>
        </div>
        {/* History Precepts */}
        <HistoryPrecepts refreshKey={historyRefreshKey} />
      </div>
    </div>
  );
}
