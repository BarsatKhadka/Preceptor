import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface HistoryPrecept {
  id: number;
  precept: string;
  movedAt?: string;
}

interface HistoryPreceptsProps {
  refreshKey?: number;
}

const HistoryPrecepts: React.FC<HistoryPreceptsProps> = ({ refreshKey }) => {
  const [historyPrecepts, setHistoryPrecepts] = useState<HistoryPrecept[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:8000/getAllHistoryPrecepts");
    setHistoryPrecepts(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshKey]);

  const handleDeleteAllHistory = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAllHistory = async () => {
    setShowDeleteConfirm(false);
    try {
      await axios.post("http://localhost:8000/deleteAllHistoryPrecepts");
      fetchHistory();
    } catch (err) {
      console.error("Failed to delete all history", err);
    }
  };

  const cancelDeleteAllHistory = () => {
    setShowDeleteConfirm(false);
  };

  return (
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
      {/* Delete All Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
            padding: '32px 28px',
            minWidth: 280,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            fontFamily: 'monospace',
          }}>
            <div style={{ fontSize: 17, color: '#222', marginBottom: 18, textAlign: 'center' }}>
              Are you sure you want to delete all history?
            </div>
            <div style={{ display: 'flex', gap: 18 }}>
              <button onClick={confirmDeleteAllHistory} style={{
                background: '#e11d48', color: '#fff', border: 'none', borderRadius: 6,
                padding: '8px 18px', fontFamily: 'monospace', fontSize: 15, fontWeight: 600,
                cursor: 'pointer',
              }}>Yes, Delete</button>
              <button onClick={cancelDeleteAllHistory} style={{
                background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 6,
                padding: '8px 18px', fontFamily: 'monospace', fontSize: 15, fontWeight: 600,
                cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPrecepts; 