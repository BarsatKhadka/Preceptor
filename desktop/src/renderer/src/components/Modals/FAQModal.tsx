import * as React from 'react';
import { useState } from 'react';

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
    question: "Does Preceptor spy on me or record my screen?",
    answer: "No. Preceptor does not record your screen or capture any visuals. It only checks your current tab name to understand your focus context — and even that data is never stored."
  },
  {
    question: "What kind of data does Preceptor collect?",
    answer: "Preceptor only reads the name of your current browser or app tab. This data is fed into the local AI in real-time and is not stored or sent anywhere."
  },
  {
    question: "Where is my data stored?",
    answer: "Your \"precepts\" (goal reminders and history) are stored locally on your computer. Preceptor does not use the cloud, and your data stays fully on your device."
  },
  {
    question: "Can I delete my data?",
    answer: "Yes. You can permanently delete your precept history anytime by clicking \"Delete\" in the app."
  },
  {
    question: "How does Preceptor help me stay focused?",
    answer: "Preceptor gently reminds you of your goals based on your current activity. If you're drifting off-task, it nudges you back toward your intended focus using your own goals and precepts."
  },
  {
    question: "Can I customize my goals and reminders?",
    answer: "Yes, you can define your own goals (called \"precepts\") and tailor the reminders to your workflow and preferences."
  },
  {
    question: "Does Preceptor work offline?",
    answer: "Yes. After a one-time setup of your local AI model, Preceptor runs fully offline — no internet connection is needed after that."
  },
  {
    question: "Can I pause or disable Preceptor temporarily?",
    answer: "Yes, you can pause or turn off Preceptor anytime from within the app."
  },
  {
    question: "What platforms does Preceptor support?",
    answer: "Preceptor supports Windows, macOS, and Linux operating systems."
  },
  {
    question: "Does it affect system performance?",
    answer: "Preceptor is lightweight and optimized to run in the background without slowing down your system."
  },
  {
    question: "Can I integrate Preceptor with other productivity tools?",
    answer: "Currently, Preceptor works as a standalone application. Integration with other productivity tools may be available in future updates."
  },
  {
    question: "How do I install and set up Preceptor?",
    answer: "Download Preceptor for your platform, install it, and follow the setup guide to configure your local AI model and browser extension."
  },
  {
    question: "Is Preceptor open source?",
    answer: "Yes, Preceptor is 100% open source and free to use."
  },
  {
    question: "What should I do if something's not working?",
    answer: "You can check the documentation or open an issue on the GitHub repo for help."
  },
  {
    question: "Who is Preceptor for?",
    answer: "Preceptor is for anyone looking to stay focused — whether you're a student, professional, coder, writer, or just want help sticking to your goals."
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