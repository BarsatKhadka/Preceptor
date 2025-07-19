import { useState } from 'react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ isOpen, onClose }) => {
  const [issueText, setIssueText] = useState('');

  const handleEmailReport = () => {
    const subject = encodeURIComponent('Feature Request - Preceptor');
    const body = encodeURIComponent(issueText);
    const mailtoLink = `mailto:khadkabarsat598@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  const handleGitHubReport = () => {
    const title = encodeURIComponent('Feature Request');
    const body = encodeURIComponent(issueText);
    const githubUrl = `https://github.com/BarsatKhadka/Preceptor/issues/new?title=${title}&body=${body}`;
    window.open(githubUrl, '_blank');
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#fffde5' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
            Report Issue / Feature Request
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
          {/* Description */}
          <div>
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Please describe the issue you're experiencing or the feature you'd like to request. Be as detailed as possible to help us understand and address your needs.
            </p>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Issue Description / Feature Request
            </label>
            <textarea
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder="Describe the issue or feature request here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Character Count */}
          <div className="text-sm text-gray-500 text-right" style={{ fontFamily: 'var(--font-body)' }}>
            {issueText.length} characters
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
            onClick={handleEmailReport}
            disabled={!issueText.trim()}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send via Email
          </button>
          <button
            onClick={handleGitHubReport}
            disabled={!issueText.trim()}
            className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Send to GitHub
          </button>
        </div>
        </div>
      </div>
  );
}; 