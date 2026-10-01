import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { X, Volume2, VolumeX, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CookingModeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Step-specific timer
  const currentStep = recipe.steps[currentStepIndex];
  const stepTimerMinutes = currentStep.timerMinutes || 0;
  const [secondsRemaining, setSecondsRemaining] = useState(stepTimerMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Reset timer whenever step changes
  useEffect(() => {
    const mins = recipe.steps[currentStepIndex]?.timerMinutes || 0;
    setSecondsRemaining(mins * 60);
    setIsTimerRunning(false);
    stopSpeaking();
  }, [currentStepIndex, recipe]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Play gentle browser beep notification
            try {
              const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
              const osc = ctx.createOscillator();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
              osc.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.6);
            } catch {
              // Audio context not allowed or failed
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  // Speech synthesis
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakCurrentStep = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const textToSpeak = `Paso ${currentStep.stepNumber}. ${currentStep.instruction}. ${
      currentStep.abuelaTip ? `Consejo de la abuela: ${currentStep.abuelaTip}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // slightly calm cadence
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Finished all steps! Celebrate!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastStep = currentStepIndex === recipe.steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E8DFD3] flex flex-col overflow-hidden max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Step Progress */}
        <div className="px-6 py-4 border-b border-[#E8E0D5] bg-[#FAF7F2] flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold text-[#9A3412] tracking-wider">
              Modo Cocina Asistido · {recipe.title}
            </div>
            <div className="text-xs text-[#78716C]">
              Paso <span className="font-bold text-[#1C1917]">{currentStepIndex + 1}</span> de{' '}
              <span className="font-bold text-[#1C1917]">{recipe.steps.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={speakCurrentStep}
              className={`p-2 rounded-lg border transition-colors ${
                isSpeaking
                  ? 'bg-[#9A3412] text-white border-[#9A3412]'
                  : 'bg-white text-[#78716C] border-[#E8DFD3] hover:text-[#1C1917]'
              }`}
              title={isSpeaking ? 'Pausar voz' : 'Escuchar instrucción en voz alta'}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-lg hover:bg-[#EFE8DC] transition-colors"
              title="Salir del modo cocina"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EFE8DC] h-1.5">
          <div
            className="bg-[#9A3412] h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / recipe.steps.length) * 100}%` }}
          />
        </div>

        {/* Main Step Instruction Canvas */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto space-y-6 flex flex-col justify-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#B45309] uppercase tracking-widest block">
              Instrucción del Paso {currentStep.stepNumber}
            </span>
            <p className="font-serif-display text-2xl sm:text-3xl text-[#1C1917] leading-relaxed font-medium">
              {currentStep.instruction}
            </p>
          </div>

          {/* Abuela's Tip for this step */}
          {currentStep.abuelaTip && (
            <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#78350F]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                La Abuela te recuerda:
              </span>
              <p className="font-handwriting text-xl sm:text-2xl leading-snug">
                «{currentStep.abuelaTip}»
              </p>
            </div>
          )}

          {/* Step Timer if required */}
          {stepTimerMinutes > 0 && (
            <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E5DACD] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#9A3412]" />
                <div>
                  <div className="text-xs font-medium text-[#78716C]">Temporizador sugerido:</div>
                  <div className="text-2xl font-mono font-bold tracking-tight text-[#1C1917] tabular-nums">
                    {formatTimer(secondsRemaining)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isTimerRunning
                      ? 'bg-[#B45309] text-white hover:bg-[#92400E]'
                      : 'bg-[#9A3412] text-white hover:bg-[#7C2D12]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pausar' : 'Iniciar Reloj'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setSecondsRemaining(stepTimerMinutes * 60);
                  }}
                  className="p-2 text-[#78716C] hover:text-[#1C1917] bg-white border border-[#E5DACD] rounded-lg transition-colors"
                  title="Reiniciar temporizador"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-[#E8E0D5] bg-[#FAF7F2] flex items-center justify-between gap-3">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              currentStepIndex === 0
                ? 'text-[#A8A29E] bg-transparent cursor-not-allowed'
                : 'text-[#44403C] hover:text-[#1C1917] bg-[#EFE8DC] hover:bg-[#E2D8CA]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Paso Anterior</span>
          </button>

          <button
            onClick={handleNextStep}
            className={`flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white rounded-lg shadow-sm transition-colors ${
              isLastStep ? 'bg-[#15803D] hover:bg-[#166534]' : 'bg-[#9A3412] hover:bg-[#7C2D12]'
            }`}
          >
            {isLastStep ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Receta Terminada con Amor!</span>
              </>
            ) : (
              <>
                <span>Siguiente Paso</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
