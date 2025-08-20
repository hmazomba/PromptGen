import React, { useEffect } from 'react';
import { PromptData } from '../types';
import { getImprovements } from '../services/geminiService';
import Loader from './Loader';
import { ArrowLeftIcon, ArrowRightIcon, WandSparklesIcon } from './Icons';

interface DiagnoseStepProps {
  promptData: PromptData;
  improvements: string;
  setImprovements: (improvements: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const DiagnoseStep: React.FC<DiagnoseStepProps> = ({
  promptData,
  improvements,
  setImprovements,
  onNext,
  onBack,
  isLoading,
  setIsLoading,
  error,
  setError,
}) => {
  const handleDiagnose = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getImprovements(promptData);
      setImprovements(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Automatically diagnose if improvements haven't been fetched yet
    if (!improvements && !isLoading && !error) {
      handleDiagnose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Step 2: Diagnose</h2>
      <p className="mt-1 text-gray-400">Let's get an AI-powered second opinion to find areas for improvement.</p>

      <div className="mt-6 min-h-[250px] p-4 bg-black/50 rounded-lg border border-gray-700">
        {isLoading && <Loader text="Diagnosing prompt..." />}
        {error && (
          <div className="text-center text-red-400 p-4">
            <p><strong>Error:</strong> {error}</p>
            <button
                onClick={handleDiagnose}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
            >
                Try Again
            </button>
          </div>
        )}
        {!isLoading && !error && improvements && (
          <div className="prose prose-invert prose-sm max-w-none prose-ul:list-disc prose-ul:pl-5 prose-li:my-1">
            <h3 className="text-gray-300 font-semibold mb-2">Suggested Improvements:</h3>
            <div dangerouslySetInnerHTML={{ __html: improvements.replace(/\n/g, '<br />') }} />
          </div>
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
          disabled={isLoading || !!error || !improvements}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Develop Prompt
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DiagnoseStep;