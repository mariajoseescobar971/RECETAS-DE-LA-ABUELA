import React, { useState } from 'react';
import { Recipe, Ingredient, CookingStep } from '../types';
import { X, Plus, Trash2, Sparkles, ChefHat, Upload, Image as ImageIcon } from 'lucide-react';
import { heroImg } from '../data/initialData';

interface AddRecipeModalProps {
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ onClose, onSaveRecipe }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [generation, setGeneration] = useState('');
  const [category, setCategory] = useState<Recipe['category']>('Platos Fuertes');
  const [prepTime, setPrepTime] = useState(25);
  const [cookTime, setCookTime] = useState(40);
  const [baseServings, setBaseServings] = useState(4); // M2: Receta + porciones base
  const [culturalOrigin, setCulturalOrigin] = useState('');
  const [story, setStory] = useState('');
  const [secret, setSecret] = useState('');
  const [occasion, setOccasion] = useState('Almuerzo dominical');

  // Photo state (File upload as Data URL or preset)
  const [imageUrl, setImageUrl] = useState<string>(heroImg);
  const [photoPreview, setPhotoPreview] = useState<string>(heroImg);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImageUrl(dataUrl);
      setPhotoPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Dynamic ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', amount: 500, unit: 'g' }
  ]);

  // Dynamic steps
  const [steps, setSteps] = useState<CookingStep[]>([
    { stepNumber: 1, instruction: '', timerMinutes: 10, abuelaTip: '' }
  ]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: '', amount: 100, unit: 'g' }
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      { stepNumber: steps.length + 1, instruction: '', timerMinutes: 5, abuelaTip: '' }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const filtered = steps.filter((_, i) => i !== index);
      const renumbered = filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
      setSteps(renumbered);
    }
  };

  const handleUpdateStep = (index: number, field: keyof CookingStep, value: string | number) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const validServings = Number(baseServings) || 4;

    const newRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      generation: generation.trim() || 'Receta de familia',
      category,
      prepTime: Number(prepTime) || 20,
      cookTime: Number(cookTime) || 30,
      difficulty: 'Paciencia y Cariño',
      baseServings: validServings, // M2: porciones base
      servings: validServings,
      imageUrl: imageUrl || heroImg,
      culturalOrigin: culturalOrigin.trim() || 'Cocina del hogar',
      story: story.trim() || 'Receta transmitida con cariño en la sobremesa familiar.',
      secret: secret.trim() || 'Cocinar a fuego lento y ponerle mucho amor.',
      occasion: occasion.trim() || 'Reunión familiar',
      favoriteCount: 1,
      ingredients: ingredients.filter((ing) => ing.name.trim() !== ''),
      steps: steps.filter((st) => st.instruction.trim() !== '')
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl my-8 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DFD3] flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D5] bg-[#FAF7F2] shrink-0">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9A3412]">
              P0 + M1: Guardar Receta Familiar
            </span>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C1917]">
              Inmortalizar Receta en el Dispositivo
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#EFE8DC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Photo Upload Section */}
          <div className="space-y-2 p-4 rounded-xl bg-white border border-[#E8DFD3]">
            <label className="block text-xs font-semibold text-[#44403C]">
              Foto del Plato (Cargada desde tu dispositivo o enlace) *
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-32 h-24 rounded-lg bg-[#EFE8DC] border border-[#E8DFD3] overflow-hidden shrink-0">
                <img
                  src={photoPreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 flex-1 w-full">
                <label className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#1C1917] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E8DFD3] rounded-lg transition-colors cursor-pointer w-full">
                  <Upload className="w-4 h-4 text-[#9A3412]" />
                  <span>Subir foto desde este dispositivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <div className="text-[11px] text-[#78716C]">
                  La imagen se guardará localmente con la receta para que nunca se pierda.
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Título del Plato *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Sancocho de Gallina Criolla de la Abuela..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Autor / Cocinero *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej. Abuela Elena, Bisabuela Rosa..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">
                Porciones Base (M2: Dato Clave) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={baseServings}
                onChange={(e) => setBaseServings(Number(e.target.value))}
                placeholder="Ej. 4 personas"
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412] font-semibold text-[#9A3412]"
              />
              <span className="text-[10px] text-[#78716C]">
                Porciones estándar para la que están calculados los ingredientes
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Recipe['category'])}
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              >
                <option value="Sopas y Cazuelas">Sopas y Cazuelas</option>
                <option value="Platos Fuertes">Platos Fuertes</option>
                <option value="Amasijos y Antojos">Amasijos y Antojos</option>
                <option value="Dulces y Postres">Dulces y Postres</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Generación / Época</label>
              <input
                type="text"
                value={generation}
                onChange={(e) => setGeneration(e.target.value)}
                placeholder="Ej. Tradición de 1958, Heredada en 1980..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Tiempo de Prep (min)</label>
              <input
                type="number"
                min="1"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Tiempo de Cocción (min)</label>
              <input
                type="number"
                min="1"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Origen Cultural / Regional</label>
              <input
                type="text"
                value={culturalOrigin}
                onChange={(e) => setCulturalOrigin(e.target.value)}
                placeholder="Ej. Tradición campesina de Antioquia, Costa Caribe..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>
          </div>

          {/* Story & Grandma Secret */}
          <div className="space-y-4 pt-2 border-t border-[#E8DFD3]">
            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">
                Historia o Memoria Familiar (¿Por qué es especial?)
              </label>
              <textarea
                rows={2}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Cuenta una anécdota de cuándo se cocinaba o quién la enseñó..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B45309] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>El Secreto de la Abuela (Truco especial de cocina)</span>
              </label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Ej. Añadir dos gotas de zumo de naranja o cilantro machacado en piedra..."
                className="w-full px-3 py-2 text-sm bg-[#FFFBEB] rounded-lg border border-[#FDE68A] text-[#78350F] focus:outline-none"
              />
            </div>
          </div>

          {/* Dynamic Ingredients */}
          <div className="space-y-3 pt-2 border-t border-[#E8DFD3]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#44403C] uppercase tracking-wider block">
                  Ingredientes (Calculados para {baseServings} porciones base)
                </span>
                <span className="text-[10px] text-[#78716C]">
                  La aplicación multiplicará estas cantidades cuando se convierta a más personas
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Ingrediente</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nombre del ingrediente (ej. Pollo, Papa...)"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3]"
                  />
                  <input
                    type="number"
                    placeholder="Cant."
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(idx, 'amount', Number(e.target.value))}
                    className="w-20 px-2 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3]"
                  />
                  <input
                    type="text"
                    placeholder="Unidad (g, ml, cda...)"
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                    className="w-24 px-2 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    disabled={ingredients.length === 1}
                    className="p-1.5 text-[#A8A29E] hover:text-[#DC2626] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Steps */}
          <div className="space-y-3 pt-2 border-t border-[#E8DFD3]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#44403C] uppercase tracking-wider">
                Pasos de Preparación
              </span>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Paso</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div key={st.stepNumber} className="p-3 bg-white rounded-xl border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9A3412]">Paso {st.stepNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      disabled={steps.length === 1}
                      className="text-[#A8A29E] hover:text-[#DC2626]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Instrucción de este paso..."
                    value={st.instruction}
                    onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded border border-[#E8DFD3]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Minutos de reloj (opcional)"
                      value={st.timerMinutes || ''}
                      onChange={(e) => handleUpdateStep(idx, 'timerMinutes', Number(e.target.value))}
                      className="px-2.5 py-1 text-xs bg-[#FAF7F2] rounded border border-[#E8DFD3]"
                    />
                    <input
                      type="text"
                      placeholder="Consejo de la abuela para este paso"
                      value={st.abuelaTip || ''}
                      onChange={(e) => handleUpdateStep(idx, 'abuelaTip', e.target.value)}
                      className="px-2.5 py-1 text-xs bg-[#FAF7F2] rounded border border-[#E8DFD3]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFD3]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#1C1917]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg shadow-sm transition-colors"
            >
              Guardar en este Dispositivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
