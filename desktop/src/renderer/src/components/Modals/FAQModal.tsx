import React, { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is a precept?",
    answer: "A precept is your personal commitment or rule to help you stay focused and achieve your goals. For example, 'I will avoid social media during work hours' or 'I will read for 30 minutes every day.'"
  },
  {
    question: "How do I set a new precept?",
    answer: "Simply type your precept in the input field and click 'Set'. Your new precept will become your current focus and will be displayed prominently."
  },
  {
    question: "What is Ollama and why do I need it?",
    answer: "Ollama is a local AI service that runs on your device. Preceptor uses it to provide AI-powered features while keeping your data private and secure on your local machine."
  },
  {
    question: "How do I install the browser extension?",
    answer: "Click on the 'Install Extension' button in the Extension section. This will take you to the Chrome Web Store where you can install the Preceptor browser extension."
  },
  {
    question: "Can I have multiple precepts at once?",
    answer: "Currently, Preceptor focuses on one precept at a time to help you maintain clear focus. You can change your precept anytime by setting a new one."
  },
  {
    question: "How do I view my precept history?",
    answer: "Your precept history is automatically displayed in the History section below your current precept. You can see all your previous precepts and when they were created."
  },
  {
    question: "Is my data stored locally?",
    answer: "Yes! All your precepts and data are stored locally on your device. We use local AI processing through Ollama to ensure your privacy and data security."
  },
  {
    question: "How do I refresh the status?",
    answer: "Click the 'Refresh' button in the top-right corner of the Precepts section to manually refresh the status of Ollama and browser extension."
  }
];

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#fffde5' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
            Frequently Asked Questions
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
        <div className="p-6">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    viewBox="0 0 24 24"
                    className={`transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 