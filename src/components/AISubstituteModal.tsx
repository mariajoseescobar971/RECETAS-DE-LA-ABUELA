import React, { useState } from 'react';
import { Recipe, Ingredient, AISubstituteResult } from '../types';
import { Sparkles, AlertTriangle, X, Check, ChefHat, RefreshCw, BookOpen } from 'lucide-react';

interface AISubstituteModalProps {
  recipe: Recipe | null;
  initialIngredient?: Ingredient | null;
  onClose: () => void;
  onApplySubstitute?: (originalId: string, substituteText: string) => void;
}

export const AISubstituteModal: React.FC<AISubstituteModalProps> = ({
  recipe,
  initialIngredient,
  onClose,
  onApplySubstitute
}) => {
  const [missingIngredient, setMissingIngredient] = useState(initialIngredient?.name || '');
  const [currentAmount, setCurrentAmount] = useState(
    initialIngredient ? `${initialIngredient.amount} ${initialIngredient.unit}` : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AISubstituteResult | null>(null);

  const handleConsultAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!missingIngredient.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/substitute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeTitle: recipe?.title || 'Receta de la Abuela',
          category: recipe?.category || 'Cocina casera',
          missingIngredient: missingIngredient.trim(),
          currentAmount: currentAmount.trim() || 'según receta'
        })
      });

      if (!response.ok) {
        throw new Error('Error al consultar al fogón de la abuela');
      }

      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        throw new Error(json.error || 'No se pudo obtener el sustituto');
      }
    } catch (err: any) {
      console.error(err);
      setError('No pudimos conectar con el fogón en este momento. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl my-6 bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D5] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FEF3C7] text-[#B45309]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412]">
                Sello de IA · Cocina con lo que hay
              </div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1C1917]">
                Sustituto Inteligente de Ingredientes
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#EFE8DC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Recipe Context Badge */}
          {recipe && (
            <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EFE8DC] flex items-center justify-between text-xs">
              <span className="text-[#78716C]">
                Preparando: <strong className="text-[#1C1917]">{recipe.title}</strong>
              </span>
              <span className="text-[#9A3412] font-semibold">{recipe.category}</span>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleConsultAI} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">
                ¿Qué ingrediente te falta en la despensa o nevera?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={missingIngredient}
                  onChange={(e) => setMissingIngredient(e.target.value)}
                  placeholder="Ej. Cilantro cimarrón, Yuca fresca, Manteca, Leche condensada..."
                  className="flex-1 px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
                />
                <button
                  type="submit"
                  disabled={loading || !missingIngredient.trim()}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap shadow-xs ${
                    loading || !missingIngredient.trim()
                      ? 'bg-[#A8A29E] cursor-not-allowed'
                      : 'bg-[#9A3412] hover:bg-[#7C2D12]'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Consultando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pedir Sustituto</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick suggestions pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#78716C]">
              <span>Ejemplos comunes:</span>
              {['Cilantro cimarrón', 'Manteca', 'Yuca', 'Puerro / Cebolla larga', 'Achiote'].map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setMissingIngredient(ex);
                    setCurrentAmount('1 porción');
                  }}
                  className="px-2 py-0.5 rounded bg-[#F3EDE2] hover:bg-[#E8DFD3] text-[#44403C] transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </form>

          {/* Loading Indicator */}
          {loading && (
            <div className="p-8 text-center space-y-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B45309] animate-bounce">
                <ChefHat className="w-5 h-5" />
              </div>
              <p className="font-serif-display text-base font-semibold text-[#1C1917]">
                La Abuela está revisando la despensa casera...
              </p>
              <p className="text-xs text-[#78716C]">
                Calculando proporciones y analizando cómo cambiará el sabor y la textura
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs">
              {error}
            </div>
          )}

          {/* AI Result Card */}
          {result && !loading && (
            <div className="space-y-4 pt-2 border-t border-[#E8DFD3]">
              {/* Proposed Substitute */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#166534]">
                  Sustituto Recomendado por la Abuela:
                </span>
                <h4 className="font-serif-display text-xl font-bold text-[#14532D]">
                  {result.substituteIngredient}
                </h4>
                <div className="text-xs text-[#166534] pt-1">
                  <strong>Proporción sugerida:</strong> {result.ratioRecommendation}
                </div>
                {result.howToApply && (
                  <p className="text-xs text-[#15803D] pt-0.5">
                    <strong>Cómo incorporarlo:</strong> {result.howToApply}
                  </p>
                )}
              </div>

              {/* MANDATORY WARNING: Impact on the Final Result */}
              <div className="p-4 rounded-xl bg-[#FFFBEB] border-2 border-[#F59E0B]/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B45309] uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  <span>Advertencia de la Abuela: ¿Cómo altera el resultado?</span>
                </div>
                <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                  {result.warningImpactOnResult}
                </p>
              </div>

              {/* Grandma's Loving Tip */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-[#44403C] space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A3412]">
                  Palabras de la Abuela:
                </span>
                <p className="font-handwriting text-xl text-[#78350F] leading-snug">
                  «{result.abuelaAdvice}»
                </p>
              </div>

              {/* Action buttons */}
              {initialIngredient && onApplySubstitute && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onApplySubstitute(initialIngredient.id, result.substituteIngredient);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors shadow-2xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>Usar este sustituto en la receta</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
