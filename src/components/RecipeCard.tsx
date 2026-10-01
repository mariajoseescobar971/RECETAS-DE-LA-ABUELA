import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, Heart, Sparkles, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenRecipe,
  onStartCooking
}) => {
  return (
    <article className="group card-paper rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-[#E8DFD3]">
      <div>
        {/* Visual Frame */}
        <div className="relative aspect-[4/3] bg-[#EFE8DC] overflow-hidden cursor-pointer" onClick={() => onOpenRecipe(recipe)}>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to stylized SVG canvas if network fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-[#F4EFE6]');
              }
            }}
          />
          {/* Favorite button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#78716C] hover:text-[#DC2626] transition-colors shadow-xs"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#78716C]'
              }`}
            />
          </button>

          {/* Quiet Category Overlay Banner */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-6 text-white flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide uppercase text-[#FDE68A]">
              {recipe.category}
            </span>
            <span className="text-xs text-stone-300 font-sans">
              {recipe.generation}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-2 font-medium">
            <span className="text-[#9A3412] font-semibold">{recipe.author}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{recipe.occasion}</span>
          </div>

          <h2
            onClick={() => onOpenRecipe(recipe)}
            className="font-serif-display text-xl font-semibold text-[#1C1917] hover:text-[#9A3412] transition-colors cursor-pointer mb-2.5 leading-snug line-clamp-2"
          >
            {recipe.title}
          </h2>

          <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-4">
            {recipe.story}
          </p>

          {/* Abuela's Secret callout teaser */}
          <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FEF3C7] mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B45309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Secreto de la Abuela:</span>
            </div>
            <p className="font-handwriting text-base text-[#78350F] leading-tight line-clamp-2">
              «{recipe.secret}»
            </p>
          </div>
        </div>
      </div>

      {/* Footer Utility & Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-[#F2ECE3] flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-[#78716C]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
            <span className="tabular-nums">{recipe.cookTime + recipe.prepTime} min</span>
          </span>
          <span className="flex items-center gap-1" title="Porciones base de la receta (M2)">
            <Users className="w-3.5 h-3.5 text-[#A8A29E]" />
            <span className="tabular-nums">Base: {recipe.baseServings || recipe.servings} p.</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenRecipe(recipe)}
            className="px-3 py-1.5 text-xs font-medium text-[#44403C] hover:text-[#1C1917] hover:bg-[#F5EFE6] rounded-md transition-colors"
          >
            Ver Receta
          </button>
          <button
            onClick={() => onStartCooking(recipe)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-md transition-colors shadow-2xs whitespace-nowrap"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Cocinar</span>
          </button>
        </div>
      </div>
    </article>
  );
};
