import React from 'react';
import { PromptData } from '../types';
import { ArrowRightIcon } from './Icons';

interface DeconstructStepProps {
  data: PromptData;
  onUpdate: (data: Partial<PromptData>) => void;
  onNext: () => void;
}

const LabeledInput: React.FC<{
  id: keyof PromptData;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}> = ({ id, label, placeholder, value, onChange, isTextarea = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
            {label}
        </label>
        {isTextarea ? (
            <textarea
                id={id}
                name={id}
                rows={2}
                className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 transition"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        ) : (
             <input
                id={id}
                name={id}
                type="text"
                className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 transition"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e as any)}
            />
        )}
    </div>
);


const DeconstructStep: React.FC<DeconstructStepProps> = ({ data, onUpdate, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onUpdate({ [e.target.name]: e.target.value });
  };
  
  const canProceed = data.coreTask.trim() !== '' && data.output.trim() !== '';

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Step 1: Deconstruct</h2>
      <p className="mt-1 text-gray-400">Break down your idea. The more specific you are, the better the result.</p>
      
      <div className="mt-6 space-y-6">
        <div>
            <label htmlFor="rawPrompt" className="block text-sm font-medium text-gray-300 mb-1">
                Your initial prompt (optional)
            </label>
            <textarea
                id="rawPrompt"
                name="rawPrompt"
                rows={3}
                className="block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 transition"
                placeholder="e.g., 'Make a social media post about my new product'"
                value={data.rawPrompt}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInput id="coreTask" label="Core Task" placeholder="What is the main goal? e.g., 'Generate 3 tweets'" value={data.coreTask} onChange={handleChange} isTextarea={false} />
            <LabeledInput id="output" label="Desired Output" placeholder="What should the result look like? e.g., 'JSON array of strings'" value={data.output} onChange={handleChange} isTextarea={false} />
        </div>
        <LabeledInput id="inputs" label="Inputs" placeholder="What data will the AI use? e.g., 'Product name, features, target audience'" value={data.inputs} onChange={handleChange} />
        <LabeledInput id="features" label="Critical Features & Constraints" placeholder="What are the rules? e.g., 'Max 280 chars, use 2 hashtags, professional tone'" value={data.features} onChange={handleChange} />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Diagnose Prompt
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DeconstructStep;