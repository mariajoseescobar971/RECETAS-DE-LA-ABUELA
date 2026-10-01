/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Recipe, FamilyMember, WeeklyScheduleDay, Ingredient } from './types';
import {
  INITIAL_RECIPES,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_WEEKLY_SCHEDULE,
  GRANDMA_WISDOM
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { WhoCooksSection } from './components/WhoCooksSection';
import { CultureWisdomSection } from './components/CultureWisdomSection';
import { AddRecipeModal } from './components/AddRecipeModal';
import { AISubstituteModal } from './components/AISubstituteModal';
import { SearchByIngredientSection } from './components/SearchByIngredientSection';
import { StudentSubmissionBanner } from './components/StudentSubmissionBanner';

import { Search, Heart, SlidersHorizontal, BookOpen, Utensils, Sparkles, ChefHat } from 'lucide-react';

export default function App() {
  // Recipes state with localStorage persistence (Guardado en el dispositivo)
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('abuela_recipes');
      return saved ? JSON.parse(saved) : INITIAL_RECIPES;
    } catch {
      return INITIAL_RECIPES;
    }
  });

  // Family members state
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('abuela_family');
      return saved ? JSON.parse(saved) : INITIAL_FAMILY_MEMBERS;
    } catch {
      return INITIAL_FAMILY_MEMBERS;
    }
  });

  // Weekly schedule
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleDay[]>(() => {
    try {
      const saved = localStorage.getItem('abuela_schedule');
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SCHEDULE;
    } catch {
      return INITIAL_WEEKLY_SCHEDULE;
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('abuela_favorites');
      return saved ? JSON.parse(saved) : ['sancocho-abuela', 'arroz-con-leche-rosa'];
    } catch {
      return ['sancocho-abuela', 'arroz-con-leche-rosa'];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('abuela_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('abuela_family', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('abuela_schedule', JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  useEffect(() => {
    localStorage.setItem('abuela_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'recetas' | 'ingredientes' | 'quien-cocina' | 'cultura' | 'consejos'>('recetas');

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Modals state
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);

  // M5: AI Substitute Modal State
  const [substituteTarget, setSubstituteTarget] = useState<{
    recipe: Recipe | null;
    ingredient: Ingredient | null;
  } | null>(null);

  // Favorite toggle handler
  const handleToggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  // Add new recipe handler
  const handleSaveNewRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    setSelectedRecipeDetail(newRecipe);
  };

  // Add new family member
  const handleAddFamilyMember = (newMember: FamilyMember) => {
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  // Import recipes handler
  const handleImportRecipes = (imported: Recipe[]) => {
    setRecipes(imported);
  };

  // Apply substitute to recipe
  const handleApplySubstitute = (originalId: string, substituteText: string) => {
    if (!substituteTarget?.recipe) return;

    const targetRecipeId = substituteTarget.recipe.id;
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id !== targetRecipeId) return r;
        return {
          ...r,
          ingredients: r.ingredients.map((ing) => {
            if (ing.id !== originalId) return ing;
            return {
              ...ing,
              notes: `Sustituido por: ${substituteText}`
            };
          })
        };
      })
    );

    // Also update current active recipe detail modal if open
    if (selectedRecipeDetail && selectedRecipeDetail.id === targetRecipeId) {
      setSelectedRecipeDetail((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ingredients: prev.ingredients.map((ing) => {
            if (ing.id !== originalId) return ing;
            return {
              ...ing,
              notes: `Sustituido por: ${substituteText}`
            };
          })
        };
      });
    }
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchesCategory = selectedCategory === 'Todas' || r.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.secret.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients.some((ing) => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFav = !onlyFavorites || favorites.includes(r.id);

      return matchesCategory && matchesSearch && matchesFav;
    });
  }, [recipes, selectedCategory, searchQuery, onlyFavorites, favorites]);

  // Categories list
  const categories = ['Todas', 'Sopas y Cazuelas', 'Platos Fuertes', 'Amasijos y Antojos', 'Dulces y Postres'];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#262320] flex flex-col font-sans selection:bg-[#B45309]/20 selection:text-[#78350F]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAddModal={() => setIsAddRecipeOpen(true)}
        onTriggerRoulette={() => {
          setActiveTab('quien-cocina');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* Student Project Academic Submission & Backup Bar */}
        <StudentSubmissionBanner
          recipes={recipes}
          onImportRecipes={handleImportRecipes}
        />

        {/* Editorial Hero Banner */}
        <HeroBanner
          recipeCount={recipes.length}
          familyCount={familyMembers.length}
          onExploreRecipes={() => {
            setActiveTab('recetas');
            document.getElementById('recetario-cuaderno')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRoulette={() => {
            setActiveTab('quien-cocina');
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }}
        />

        {/* Tab 1: Recetario Patrimonial */}
        {activeTab === 'recetas' && (
          <section id="recetario-cuaderno" className="space-y-8">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#E8DFD3]">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412]">
                  Cuaderno de Manuscritos · Porciones Base
                </div>
                <h2 className="font-serif-display text-3xl font-semibold text-[#1C1917]">
                  Las Recetas del Baúl
                </h2>
                <p className="text-xs text-[#57534E]">
                  Platos auténticos con porciones base configuradas, notas marginales y conversión matemática de porciones
                </p>
              </div>

              {/* Search Bar & Favorites Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por plato, ingrediente o abuela..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412] placeholder:text-[#A8A29E]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#A8A29E] hover:text-[#262320]"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    onlyFavorites
                      ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626] font-semibold'
                      : 'bg-white border-[#E8DFD3] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-[#DC2626]' : ''}`} />
                  <span>Favoritas ({favorites.length})</span>
                </button>
              </div>
            </div>

            {/* Interactive Segmented Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#9A3412] text-white shadow-2xs'
                      : 'bg-[#F3EDE2] text-[#57534E] hover:bg-[#EAE2D5] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recipe Cards Grid */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenRecipe={(r) => setSelectedRecipeDetail(r)}
                    onStartCooking={(r) => setCookingRecipe(r)}
                  />
                ))}
              </div>
            ) : (
              <div className="card-paper p-12 text-center rounded-2xl border border-[#E8DFD3] space-y-3">
                <BookOpen className="w-8 h-8 text-[#A8A29E] mx-auto" />
                <h3 className="font-serif-display text-lg font-semibold text-[#1C1917]">
                  No se encontraron recetas con esos criterios
                </h3>
                <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                  Prueba cambiando la búsqueda o agregando una nueva receta de tu propia familia al recetario.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todas');
                    setSearchQuery('');
                    setOnlyFavorites(false);
                  }}
                  className="mt-2 text-xs font-semibold text-[#9A3412] hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: P0/M1: Buscar por Ingredientes Disponibles */}
        {activeTab === 'ingredientes' && (
          <SearchByIngredientSection
            recipes={recipes}
            onOpenRecipe={(r) => setSelectedRecipeDetail(r)}
            onRequestSubstitute={(recipe, ingredient) => {
              setSubstituteTarget({ recipe, ingredient });
            }}
          />
        )}

        {/* Tab 3: ¿Quién Cocina en Casa? */}
        {activeTab === 'quien-cocina' && (
          <WhoCooksSection
            familyMembers={familyMembers}
            weeklySchedule={weeklySchedule}
            recipes={recipes}
            onUpdateSchedule={setWeeklySchedule}
            onAddFamilyMember={handleAddFamilyMember}
            onSelectRecipeToCook={(recipe) => {
              setSelectedRecipeDetail(recipe);
            }}
          />
        )}

        {/* Tab 4: Cultura y Familia */}
        {activeTab === 'cultura' && (
          <CultureWisdomSection wisdomItems={GRANDMA_WISDOM} />
        )}

        {/* Tab 5: Secretos y Fogón */}
        {activeTab === 'consejos' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] mb-2">
                Notas al Margen y Sabiduría Doméstica
              </div>
              <h2 className="font-serif-display text-3xl font-semibold text-[#1C1917] mb-2">
                Secretos Culinarios de la Abuela
              </h2>
              <p className="text-sm text-[#57534E]">
                Trucos que no aparecen en libros modernos de gastronomía, probados durante décadas en fogones de leña y cazuelas de barro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="card-paper p-6 rounded-xl border border-[#E8DFD3] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#78716C]">
                    <span className="font-semibold text-[#9A3412]">{recipe.author}</span>
                    <span>{recipe.generation}</span>
                  </div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                    {recipe.title}
                  </h3>
                  <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#78350F]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                      El Secreto:
                    </span>
                    <p className="font-handwriting text-xl leading-snug">
                      «{recipe.secret}»
                    </p>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedRecipeDetail(recipe)}
                      className="text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12] hover:underline"
                    >
                      Ver receta completa →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Archival Editorial Footer */}
      <footer className="mt-16 border-t border-[#E8E0D5] bg-[#FAF7F2] py-8 text-center text-xs text-[#78716C] space-y-2">
        <p className="font-serif-display text-base font-semibold text-[#262320]">
          Recetario de la Abuela · Cultura, Familia y Quién Cocina en Casa
        </p>
        <p>
          Problema resuelto: Las recetas de la familia ya no se pierden. Guardadas de forma segura en este dispositivo.
        </p>
        <div className="text-[11px] text-[#A8A29E] pt-2">
          Conservado con amor para la familia · {new Date().getFullYear()}
        </div>
      </footer>

      {/* Recipe Detail Modal with Portions Converter (P0/M1 + M2) */}
      <RecipeDetailModal
        recipe={selectedRecipeDetail}
        onClose={() => setSelectedRecipeDetail(null)}
        onStartCooking={(r) => {
          setSelectedRecipeDetail(null);
          setCookingRecipe(r);
        }}
        onAssignToCook={() => {
          setSelectedRecipeDetail(null);
          setActiveTab('quien-cocina');
        }}
        isFavorite={selectedRecipeDetail ? favorites.includes(selectedRecipeDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequestSubstitute={(recipe, ingredient) => {
          setSubstituteTarget({ recipe, ingredient });
        }}
      />

      {/* Cooking Mode Focus Modal */}
      <CookingModeModal
        recipe={cookingRecipe}
        onClose={() => setCookingRecipe(null)}
      />

      {/* Add New Recipe Modal (P0/M1 + M2: Foto, Ingredientes, Pasos, Porciones Base) */}
      {isAddRecipeOpen && (
        <AddRecipeModal
          onClose={() => setIsAddRecipeOpen(false)}
          onSaveRecipe={handleSaveNewRecipe}
        />
      )}

      {/* M5 Sello de IA: Modal de Sustituto Inteligente con Advertencia de Impacto */}
      {substituteTarget && (
        <AISubstituteModal
          recipe={substituteTarget.recipe}
          initialIngredient={substituteTarget.ingredient}
          onClose={() => setSubstituteTarget(null)}
          onApplySubstitute={handleApplySubstitute}
        />
      )}
    </div>
  );
}
