import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.Deconstruct, name: 'Deconstruct' },
  { id: Step.Diagnose, name: 'Diagnose' },
  { id: Step.Develop, name: 'Develop' },
  { id: Step.Deliver, name: 'Deliver' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-300" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-gray-300 rounded-full">
                  <span className="text-black font-bold">{step.id}</span>
                </div>
                <span className="absolute -bottom-7 w-max text-center text-xs text-gray-300">{step.name}</span>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-gray-800 border-2 border-white rounded-full">
                  <span className="h-2.5 w-2.5 bg-white rounded-full" />
                </div>
                <span className="absolute -bottom-7 w-max text-center text-xs text-white font-semibold">{step.name}</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-gray-700 rounded-full">
                   <span className="text-gray-400 font-bold">{step.id}</span>
                </div>
                <span className="absolute -bottom-7 w-max text-center text-xs text-gray-500">{step.name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;