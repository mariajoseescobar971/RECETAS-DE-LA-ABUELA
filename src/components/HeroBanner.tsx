import React from 'react';
import { heroImg } from '../data/initialData';
import { BookOpen, Users, UtensilsCrossed, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  recipeCount: number;
  familyCount: number;
  onExploreRecipes: () => void;
  onOpenRoulette: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  recipeCount,
  familyCount,
  onExploreRecipes,
  onOpenRoulette
}) => {
  return (
    <section className="relative overflow-hidden card-paper rounded-2xl mb-12 border border-[#E8DFD3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
        {/* Editorial Text Content */}
        <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6]">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] mb-3">
              Herencia Culinaria Familiar · Cuaderno Manuscrito
            </div>
            
            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917] leading-[1.15] mb-4 text-balance">
              El sabor que une las generaciones en la mesa
            </h1>
            
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl mb-6">
              Recetas que no se miden en gramos exactos, sino en puñados de cariño, fuego lento y recuerdos de sobremesa. Conserva la sabiduría de las abuelas y organiza quién cocina hoy en casa sin discusiones.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#78716C] mb-8 font-medium">
              <span className="flex items-center gap-1.5 text-[#292524]">
                <BookOpen className="w-4 h-4 text-[#9A3412]" />
                <span className="tabular-nums font-semibold">{recipeCount}</span> recetas patrimoniales
              </span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span className="flex items-center gap-1.5 text-[#292524]">
                <Users className="w-4 h-4 text-[#B45309]" />
                <span className="tabular-nums font-semibold">{familyCount}</span> cocineros en casa
              </span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span className="flex items-center gap-1.5 text-[#292524]">
                <UtensilsCrossed className="w-4 h-4 text-[#4D5E3A]" />
                Modo cocina asistido
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EAE2D7]">
            <button
              onClick={onExploreRecipes}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors shadow-xs"
            >
              Abrir Cuaderno de Recetas
            </button>
            <button
              onClick={onOpenRoulette}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#44403C] hover:text-[#1C1917] bg-[#F5EFE6] hover:bg-[#EBE2D5] border border-[#E2D8CA] rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>¿Quién cocina hoy? Sortear</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Presentation */}
        <div className="lg:col-span-5 relative bg-[#EFE8DC] min-h-[260px] lg:min-h-full">
          <img
            src={heroImg}
            alt="Mesa de madera rústica con cuaderno de recetas de la abuela, harina y utensilios antiguos"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#F5EFE6]/30 lg:to-transparent" />
          
          {/* Authentic handwritten sticky memo overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 rounded-lg bg-[#FFFBEB]/95 border border-[#FDE68A] shadow-md backdrop-blur-xs text-[#78350F]">
            <p className="font-handwriting text-lg sm:text-xl leading-tight">
              «Hijo, la comida nunca se apura. El secreto siempre está en el sofrito y en llamar a todos a comer al mismo tiempo.»
            </p>
            <div className="text-[11px] font-sans tracking-wide uppercase font-semibold text-[#92400E] mt-1 text-right">
              — Cuaderno de la Abuela
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
