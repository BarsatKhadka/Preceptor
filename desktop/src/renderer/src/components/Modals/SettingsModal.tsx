import * as React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#fffde5' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              General
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>Show notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              About
            </h3>
            <div className="space-y-2 text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              <p>Preceptor v1.0.0</p>
              <p>A personal productivity tool for setting and tracking precepts.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}; 