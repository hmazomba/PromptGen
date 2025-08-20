import React, { useEffect, useState } from 'react';
import { PromptData } from '../types';
import { developPrompt } from '../services/geminiService';
import Loader from './Loader';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface DevelopStepProps {
  promptData: PromptData;
  improvements: string;
  finalPrompt: string;
  setFinalPrompt: (prompt: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const DevelopStep: React.FC<DevelopStepProps> = ({
  promptData,
  improvements,
  finalPrompt,
  setFinalPrompt,
  onNext,
  onBack,
  isLoading,
  setIsLoading,
  setError,
  error,
}) => {
  const handleDevelop = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await developPrompt(promptData, improvements);
      setFinalPrompt(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!finalPrompt && !isLoading && !error) {
      handleDevelop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Step 3: Develop</h2>
      <p className="mt-1 text-gray-400">Now, we'll synthesize everything into a final, structured prompt. You can edit it below.</p>

      <div className="mt-6">
        {isLoading && <div className="min-h-[250px]"><Loader text="Generating final prompt..." /></div>}
        {error && (
            <div className="min-h-[250px] text-center text-red-400 p-4">
                <p><strong>Error:</strong> {error}</p>
                <button
                    onClick={handleDevelop}
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
                >
                    Try Again
                </button>
            </div>
        )}
        {!isLoading && !error && (
          <textarea
            value={finalPrompt}
            onChange={(e) => setFinalPrompt(e.target.value)}
            rows={12}
            className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 transition font-mono"
            placeholder="Your final prompt will appear here..."
          />
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isLoading || !!error || !finalPrompt}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Finish & Deliver
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DevelopStep;