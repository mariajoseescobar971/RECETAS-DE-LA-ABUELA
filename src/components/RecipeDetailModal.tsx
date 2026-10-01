import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';
import { X, Clock, Users, Flame, Heart, Sparkles, ChefHat, Printer, CalendarPlus, Check, HelpCircle, ArrowRightLeft } from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  onAssignToCook: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRequestSubstitute: (recipe: Recipe, ingredient: Ingredient) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onStartCooking,
  onAssignToCook,
  isFavorite,
  onToggleFavorite,
  onRequestSubstitute
}) => {
  if (!recipe) return null;

  // M2: Receta + porciones base (defaults to baseServings)
  const baseServings = recipe.baseServings || recipe.servings || 4;
  const [targetServings, setTargetServings] = useState<number>(baseServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scaleFactor = targetServings / baseServings;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl my-8 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header / Close bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D5] bg-[#FAF7F2]/90 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="font-semibold text-[#9A3412] uppercase tracking-wider">{recipe.category}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.generation}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className="p-2 text-[#78716C] hover:text-[#DC2626] rounded-full hover:bg-[#EFE8DC] transition-colors"
              title="Guardar en favoritas"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : ''}`} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#EFE8DC] transition-colors no-print"
              title="Imprimir receta"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#EFE8DC] transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] leading-tight">
                {recipe.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-[#78716C]">
                <span className="text-[#9A3412] font-semibold">{recipe.author}</span>
                <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                <span>{recipe.culturalOrigin}</span>
              </div>

              {/* Quick stats row */}
              <div className="flex items-center gap-4 text-xs text-[#57534E] pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A8A29E]" />
                  <span>Prep: <strong>{recipe.prepTime} min</strong> · Cocción: <strong>{recipe.cookTime} min</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#B45309]" />
                  <span>{recipe.difficulty}</span>
                </span>
              </div>
            </div>

            <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC] border border-[#E8DFD3]">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Family Memory Story & Culture */}
          <div className="p-5 rounded-xl bg-[#FFFDF9] border border-[#E8DFD3] space-y-2">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B45309]">
              Memoria de Familia y Cultura
            </div>
            <p className="font-serif-display italic text-[#44403C] text-sm sm:text-base leading-relaxed">
              «{recipe.story}»
            </p>
          </div>

          {/* Abuela's Secret in Handwritten Style */}
          <div className="p-5 rounded-xl bg-[#FFFBEB] border-2 border-dashed border-[#FCD34D] text-[#78350F] relative">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1">
              <Sparkles className="w-4 h-4 text-[#B45309]" />
              <span>El Secreto Inconfesable de la Abuela</span>
            </div>
            <p className="font-handwriting text-xl sm:text-2xl leading-snug">
              «{recipe.secret}»
            </p>
          </div>

          {/* P0/M1 & M2: Scalable Portions Conversion Box */}
          <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E2D8CA] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-[#9A3412]" />
                  <h3 className="font-serif-display text-lg font-bold text-[#1C1917]">
                    Conversión de Porciones (M1 + M2)
                  </h3>
                </div>
                <p className="text-xs text-[#78716C] mt-0.5">
                  Dato clave: <strong>Porciones base = {baseServings} personas</strong>. Convierte según los comensales hoy en casa.
                </p>
              </div>

              {/* Conversion Factor Badge */}
              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white border border-[#E8DFD3] text-[#9A3412]">
                  Factor: ×{Math.round(scaleFactor * 100) / 100}
                </span>
              </div>
            </div>

            {/* Stepper & Quick preset buttons (e.g. from 4 to 10 persons) */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#E8DFD3]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#78716C]">Porciones a preparar:</span>
                <button
                  type="button"
                  onClick={() => setTargetServings(Math.max(1, targetServings - 1))}
                  className="w-8 h-8 flex items-center justify-center bg-[#FAF7F2] text-[#44403C] rounded-lg font-bold hover:bg-[#F3EDE2] border border-[#E8DFD3] transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold tabular-nums text-[#1C1917]">
                  {targetServings}
                </span>
                <button
                  type="button"
                  onClick={() => setTargetServings(targetServings + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#FAF7F2] text-[#44403C] rounded-lg font-bold hover:bg-[#F3EDE2] border border-[#E8DFD3] transition-colors"
                >
                  +
                </button>
                <span className="text-xs text-[#78716C]">personas</span>
              </div>

              {/* Quick Preset buttons */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#A8A29E] hidden sm:inline">Ejemplos:</span>
                {[baseServings, 4, 6, 10, 12].filter((v, i, a) => a.indexOf(v) === i).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTargetServings(num)}
                    className={`px-2 py-1 rounded transition-colors font-medium ${
                      targetServings === num
                        ? 'bg-[#9A3412] text-white'
                        : 'bg-[#F3EDE2] text-[#57534E] hover:bg-[#EAE2D5]'
                    }`}
                  >
                    {num} pers.{num === baseServings ? ' (Base)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scalable Ingredients Section with AI substitution buttons */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFD3] pb-3">
              <div>
                <h3 className="font-serif-display text-xl font-semibold text-[#1C1917]">
                  Ingredientes Calculados ({targetServings} personas)
                </h3>
                <p className="text-xs text-[#78716C]">
                  Marca los que tengas listos o consulta un sustituto con IA si te falta alguno
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing) => {
                const scaledAmount = Math.round(ing.amount * scaleFactor * 10) / 10;
                const isChecked = !!checkedIngredients[ing.id];

                return (
                  <li
                    key={ing.id}
                    className={`flex flex-col justify-between p-3 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-[#EFECE6] border-[#DCD3C7] text-[#A8A29E]'
                        : 'bg-white border-[#EBE4DA] text-[#292524] hover:border-[#D5C7B4]'
                    }`}
                  >
                    <div
                      onClick={() => toggleIngredient(ing.id)}
                      className="flex items-start gap-3 cursor-pointer select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-[#4D5E3A] border-[#4D5E3A] text-white'
                            : 'border-[#D6CEBE] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="text-xs sm:text-sm flex-1">
                        <span className={`font-semibold tabular-nums ${isChecked ? 'line-through' : 'text-[#9A3412]'}`}>
                          {scaledAmount} {ing.unit}{' '}
                        </span>
                        <span className={isChecked ? 'line-through' : ''}>{ing.name}</span>
                        {scaleFactor !== 1 && (
                          <span className="text-[10px] text-[#A8A29E] block">
                            (Base: {ing.amount} {ing.unit} para {baseServings} p.)
                          </span>
                        )}
                        {ing.notes && (
                          <span className="text-xs text-[#78716C] block italic mt-0.5">
                            {ing.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* M5 Sello de IA: Button to ask for substitute */}
                    <div className="mt-2 pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#78716C]">¿No lo tienes?</span>
                      <button
                        type="button"
                        onClick={() => onRequestSubstitute(recipe, ing)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#B45309] hover:text-[#92400E] bg-[#FEF3C7] hover:bg-[#FDE68A] px-2 py-0.5 rounded transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-[#B45309]" />
                        <span>Sustituir con IA</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cooking Steps */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-xl font-semibold text-[#1C1917] border-b border-[#E8DFD3] pb-3">
              Preparación Paso a Paso
            </h3>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl bg-white border border-[#EBE4DA] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#9A3412]">
                    <span>Paso {step.stepNumber}</span>
                    {step.timerMinutes && (
                      <span className="flex items-center gap-1 text-[#78716C] font-normal">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-medium">{step.timerMinutes} minutos</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#292524] leading-relaxed">
                    {step.instruction}
                  </p>

                  {step.abuelaTip && (
                    <div className="pt-2 text-xs text-[#78350F] flex items-start gap-1.5 font-medium">
                      <span className="font-handwriting text-base font-bold">Consejo de la abuela:</span>
                      <span className="italic">{step.abuelaTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="px-6 py-4 border-t border-[#E8E0D5] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          <button
            onClick={() => onAssignToCook(recipe)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] bg-[#EFE8DC] hover:bg-[#E2D8CA] rounded-lg transition-colors"
          >
            <CalendarPlus className="w-4 h-4 text-[#B45309]" />
            <span>Asignar al Menú Semanal</span>
          </button>

          <button
            onClick={() => onStartCooking(recipe)}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg shadow-sm transition-colors"
          >
            <ChefHat className="w-4 h-4" />
            <span>Iniciar Modo Cocina Asistido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
