import * as React from "react";
import axios from "axios";
import StatusCheck from "./StatusCheck";

export function Precepts() {
  const [currentPrecept, setCurrentPrecept] = React.useState<{id: number, content: string, time?: string} | null>(null);
  const [historyPrecepts, setHistoryPrecepts] = React.useState<{id: number, precept: string, movedAt?: string}[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 lg:pt-8 h-full min-h-0 border-l border-r border-gray-200 rounded-2xl shadow-sm px-3 sm:px-4 md:px-8 py-4 sm:py-6 lg:py-8 relative overflow-hidden" 
         style={{ backgroundColor: '#fffde5', backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, #f3e9d2 32px)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-50/20 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {/* Status Check */}
        <div>
          <StatusCheck />
        </div>
        {/* Current Precept */}
        <div>
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-gray-700 mb-2 tracking-wide text-center" style={{ fontFamily: "'IBM Plex Serif', serif", letterSpacing: '0.04em' }}>
            Current Precept
          </h2>
          <ul className="mb-3 sm:mb-4 space-y-2">
            {!currentPrecept && <li className="text-gray-400 italic text-sm sm:text-base">No precept set yet.</li>}
            {currentPrecept && (
              <li className="text-gray-700 font-mono pl-2 text-sm sm:text-base">{currentPrecept.content}</li>
            )}
          </ul>
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
              className="px-3 sm:px-4 py-2 rounded-md bg-pink-400 text-white font-semibold shadow hover:bg-pink-500 transition disabled:opacity-60 text-sm sm:text-base"
              disabled={loading || !input.trim()}
            >
              Set
            </button>
          </form>
        </div>
        {/* History Precepts */}
        <div>
          <h3 className="text-base sm:text-lg font-serif font-semibold text-gray-600 mb-2 tracking-wide" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
            History
          </h3>
          <ul className="space-y-2">
            {historyPrecepts.length === 0 && <li className="text-gray-300 italic text-sm sm:text-base">No history yet.</li>}
            {historyPrecepts.map((p) => (
              <li key={p.id} className="text-gray-500 font-mono pl-2 text-sm sm:text-base">{p.precept}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
