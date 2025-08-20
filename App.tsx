import React, { useState, useCallback } from 'react';
import { PromptData, Step } from './types';
import DeconstructStep from './components/DeconstructStep';
import DiagnoseStep from './components/DiagnoseStep';
import DevelopStep from './components/DevelopStep';
import DeliverStep from './components/DeliverStep';
import StepIndicator from './components/StepIndicator';
import { WandSparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Deconstruct);
  const [promptData, setPromptData] = useState<PromptData>({
    rawPrompt: '',
    coreTask: '',
    inputs: '',
    output: '',
    features: '',
  });
  const [diagnosedImprovements, setDiagnosedImprovements] = useState<string>('');
  const [finalPrompt, setFinalPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, Step.Deliver));
  }, []);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, Step.Deconstruct));
  }, []);
  
  const handleStartOver = useCallback(() => {
    setPromptData({
      rawPrompt: '',
      coreTask: '',
      inputs: '',
      output: '',
      features: '',
    });
    setDiagnosedImprovements('');
    setFinalPrompt('');
    setError(null);
    setCurrentStep(Step.Deconstruct);
  }, []);

  const updatePromptData = (data: Partial<PromptData>) => {
    setPromptData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case Step.Deconstruct:
        return (
          <DeconstructStep
            data={promptData}
            onUpdate={updatePromptData}
            onNext={handleNextStep}
          />
        );
      case Step.Diagnose:
        return (
          <DiagnoseStep
            promptData={promptData}
            improvements={diagnosedImprovements}
            setImprovements={setDiagnosedImprovements}
            onNext={handleNextStep}
            onBack={handlePrevStep}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
          />
        );
      case Step.Develop:
        return (
          <DevelopStep
            promptData={promptData}
            improvements={diagnosedImprovements}
            finalPrompt={finalPrompt}
            setFinalPrompt={setFinalPrompt}
            onNext={handleNextStep}
            onBack={handlePrevStep}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
          />
        );
      case Step.Deliver:
        return (
          <DeliverStep
            finalPrompt={finalPrompt}
            onStartOver={handleStartOver}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
            <WandSparklesIcon className="w-8 h-8 text-white" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                PromptGen
            </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Craft high-performance AI prompts using the 4-D methodology.
        </p>
      </header>
      
      <main className="w-full max-w-4xl">
        <StepIndicator currentStep={currentStep} />
        <div className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-black/50 p-6 sm:p-10 min-h-[400px]">
          {renderStep()}
        </div>
      </main>

      <footer className="w-full max-w-4xl mt-8 text-center text-gray-500 text-sm">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;