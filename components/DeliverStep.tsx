import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface DeliverStepProps {
  finalPrompt: string;
  onStartOver: () => void;
}

const DeliverStep: React.FC<DeliverStepProps> = ({ finalPrompt, onStartOver }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
        Your Optimized Prompt is Ready!
      </h2>
      <p className="mt-2 text-gray-400">Use this structured prompt in your favorite AI tool for better results.</p>

      <div className="mt-6 text-left relative">
        <div className="prose prose-invert max-w-none bg-gray-900 p-6 rounded-lg border border-gray-700 font-mono text-sm leading-relaxed">
            <pre className="p-0 m-0 bg-transparent whitespace-pre-wrap break-words">
                <code>{finalPrompt}</code>
            </pre>
        </div>
         <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          aria-label="Copy prompt"
        >
          {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
        </button>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105"
        >
          Optimize Another Prompt
        </button>
      </div>
    </div>
  );
};

export default DeliverStep;