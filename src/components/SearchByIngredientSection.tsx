import React, { useState, useMemo } from 'react';
import { Recipe, Ingredient } from '../types';
import { Utensils, Check, X, Sparkles, ChefHat, Plus, Search, ArrowRight } from 'lucide-react';

interface SearchByIngredientSectionProps {
  recipes: Recipe[];
  onOpenRecipe: (recipe: Recipe) => void;
  onRequestSubstitute: (recipe: Recipe, ingredient: Ingredient) => void;
}

export const SearchByIngredientSection: React.FC<SearchByIngredientSectionProps> = ({
  recipes,
  onOpenRecipe,
  onRequestSubstitute
}) => {
  // Common pantry ingredients list for quick tapping
  const commonIngredients = [
    'Pollo', 'Papa', 'Cebolla', 'Tomate', 'Ajo', 'Cilantro',
    'Arroz', 'Leche', 'Canela', 'Carne', 'Yuca', 'Plátano verde',
    'Maíz / Mazorca', 'Harina de maíz', 'Zanahoria', 'Mantequilla'
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Pollo', 'Papa', 'Cebolla'
  ]);
  const [customInput, setCustomInput] = useState('');

  const toggleIngredient = (name: string) => {
    const formatted = name.trim();
    if (selectedIngredients.some((i) => i.toLowerCase() === formatted.toLowerCase())) {
      setSelectedIngredients(selectedIngredients.filter((i) => i.toLowerCase() !== formatted.toLowerCase()));
    } else {
      setSelectedIngredients([...selectedIngredients, formatted]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === customInput.trim().toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, customInput.trim()]);
    }
    setCustomInput('');
  };

  // Score each recipe based on selected ingredients
  const scoredRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    return recipes
      .map((recipe) => {
        const total = recipe.ingredients.length;
        const matching: Ingredient[] = [];
        const missing: Ingredient[] = [];

        recipe.ingredients.forEach((ing) => {
          const hasIt = selectedIngredients.some((sel) =>
            ing.name.toLowerCase().includes(sel.toLowerCase()) ||
            sel.toLowerCase().includes(ing.name.toLowerCase())
          );
          if (hasIt) {
            matching.push(ing);
          } else {
            missing.push(ing);
          }
        });

        const percentage = Math.round((matching.length / total) * 100);

        return {
          recipe,
          total,
          matching,
          missing,
          percentage
        };
      })
      .filter((item) => item.matching.length > 0)
      .sort((a, b) => b.percentage - a.percentage);
  }, [recipes, selectedIngredients]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] mb-1">
          Cocina sin desperdicios · P0 / M1
        </div>
        <h2 className="font-serif-display text-3xl font-semibold text-[#1C1917] leading-tight mb-2">
          Buscar Recetas por Ingredientes Disponibles
        </h2>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Selecciona lo que tienes en tu nevera o alacena. Te diremos qué recetas de la abuela puedes preparar hoy y qué ingredientes puedes sustituir con IA si te falta algo.
        </p>
      </div>

      {/* Selector Box */}
      <div className="card-paper p-6 rounded-2xl border border-[#E8DFD3] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#44403C]">
            ¿Qué tienes disponible en casa?
          </span>
          {selectedIngredients.length > 0 && (
            <button
              onClick={() => setSelectedIngredients([])}
              className="text-xs text-[#9A3412] hover:underline"
            >
              Limpiar selección ({selectedIngredients.length})
            </button>
          )}
        </div>

        {/* Quick buttons */}
        <div className="flex flex-wrap gap-2">
          {commonIngredients.map((item) => {
            const isSelected = selectedIngredients.some(
              (i) => i.toLowerCase() === item.toLowerCase()
            );
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleIngredient(item)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-[#9A3412] text-white shadow-2xs'
                    : 'bg-[#F3EDE2] text-[#44403C] hover:bg-[#EAE2D5]'
                }`}
              >
                {isSelected ? `✓ ${item}` : `+ ${item}`}
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <form onSubmit={handleAddCustom} className="flex gap-2 max-w-md pt-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Añadir otro ingrediente (ej. calabaza, choclo)..."
            className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-semibold text-[#1C1917] bg-[#EFE8DC] hover:bg-[#E2D8CA] rounded-lg transition-colors"
          >
            Añadir
          </button>
        </form>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="text-xs text-[#78716C]">
          Recetas coincidentes encontradas:{' '}
          <strong className="text-[#1C1917]">{scoredRecipes.length}</strong>
        </div>

        {scoredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scoredRecipes.map(({ recipe, total, matching, missing, percentage }) => (
              <div
                key={recipe.id}
                className="card-paper p-5 rounded-xl border border-[#E8DFD3] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A3412]">
                        {recipe.category}
                      </span>
                      <h3
                        onClick={() => onOpenRecipe(recipe)}
                        className="font-serif-display text-xl font-bold text-[#1C1917] hover:text-[#9A3412] cursor-pointer"
                      >
                        {recipe.title}
                      </h3>
                      <div className="text-xs text-[#78716C]">
                        Porciones base: <strong className="text-[#262320]">{recipe.baseServings} personas</strong>
                      </div>
                    </div>

                    {/* Match percentage meter */}
                    <div className="text-right shrink-0">
                      <div className="text-xl font-mono font-bold text-[#15803D] tabular-nums">
                        {percentage}%
                      </div>
                      <div className="text-[10px] text-[#78716C]">
                        {matching.length}/{total} ingredientes
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full ${percentage >= 70 ? 'bg-[#15803D]' : 'bg-[#B45309]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Ingredients breakdown */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[#15803D] font-semibold block mb-1">
                        ✓ Tienes ({matching.length}):
                      </span>
                      <div className="flex flex-wrap gap-1 text-[11px] text-[#44403C]">
                        {matching.map((m) => (
                          <span key={m.id} className="bg-[#DCFCE7] px-2 py-0.5 rounded text-[#166534]">
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {missing.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[#B45309] font-semibold block mb-1">
                          Te falta ({missing.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-[11px]">
                          {missing.map((m) => (
                            <button
                              key={m.id}
                              onClick={() => onRequestSubstitute(recipe, m)}
                              className="bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                              title="Pedir sustituto inteligente con IA a la Abuela"
                            >
                              <span>{m.name}</span>
                              <Sparkles className="w-2.5 h-2.5 text-[#B45309]" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                  <span className="text-xs text-[#78716C] italic">
                    «{recipe.secret.substring(0, 45)}...»
                  </span>
                  <button
                    onClick={() => onOpenRecipe(recipe)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12]"
                  >
                    <span>Ver Receta y Porciones</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-paper p-8 text-center rounded-xl border border-[#E8DFD3] space-y-2">
            <Utensils className="w-6 h-6 text-[#A8A29E] mx-auto" />
            <p className="font-serif-display text-base font-semibold text-[#1C1917]">
              No hay coincidencias con los ingredientes seleccionados
            </p>
            <p className="text-xs text-[#78716C]">
              Prueba seleccionando ingredientes básicos como Pollo, Papa, Leche o Arroz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
