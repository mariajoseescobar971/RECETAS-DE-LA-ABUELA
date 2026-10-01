import React from 'react';
import { Sparkles, PlusCircle, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: 'recetas' | 'ingredientes' | 'quien-cocina' | 'cultura' | 'consejos';
  onSelectTab: (tab: 'recetas' | 'ingredientes' | 'quien-cocina' | 'cultura' | 'consejos') => void;
  onOpenAddModal: () => void;
  onTriggerRoulette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAddModal,
  onTriggerRoulette
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); onSelectTab('recetas'); }} 
          className="font-serif-display text-2xl font-bold tracking-tight text-[#262320] hover:text-[#9A3412] transition-colors whitespace-nowrap"
        >
          Recetario de la Abuela
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => onSelectTab('recetas')}
            className={`transition-colors relative py-1 hover:text-[#1C1917] whitespace-nowrap ${
              activeTab === 'recetas' ? 'text-[#9A3412] font-semibold' : ''
            }`}
          >
            Recetario
            {activeTab === 'recetas' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('ingredientes')}
            className={`transition-colors relative py-1 hover:text-[#1C1917] whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'ingredientes' ? 'text-[#9A3412] font-semibold' : ''
            }`}
          >
            <span>Buscar por Ingrediente</span>
            {activeTab === 'ingredientes' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('quien-cocina')}
            className={`transition-colors relative py-1 hover:text-[#1C1917] whitespace-nowrap ${
              activeTab === 'quien-cocina' ? 'text-[#9A3412] font-semibold' : ''
            }`}
          >
            ¿Quién Cocina?
            {activeTab === 'quien-cocina' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('cultura')}
            className={`transition-colors relative py-1 hover:text-[#1C1917] whitespace-nowrap ${
              activeTab === 'cultura' ? 'text-[#9A3412] font-semibold' : ''
            }`}
          >
            Cultura y Familia
            {activeTab === 'cultura' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('consejos')}
            className={`transition-colors relative py-1 hover:text-[#1C1917] whitespace-nowrap ${
              activeTab === 'consejos' ? 'text-[#9A3412] font-semibold' : ''
            }`}
          >
            Secretos
            {activeTab === 'consejos' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A3412] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onTriggerRoulette}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#78350F] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D]/60 rounded-lg transition-colors whitespace-nowrap"
            title="Sortear cocinero de hoy"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Ruleta</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Guardar Receta</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for easy thumb tap */}
      <div className="flex lg:hidden border-t border-[#E8E0D5] bg-[#FAF7F2] px-3 py-2 justify-around text-xs font-medium text-[#78716C] overflow-x-auto">
        <button
          onClick={() => onSelectTab('recetas')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'recetas' ? 'text-[#9A3412] font-bold' : ''}`}
        >
          Recetario
        </button>
        <button
          onClick={() => onSelectTab('ingredientes')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'ingredientes' ? 'text-[#9A3412] font-bold' : ''}`}
        >
          Por Ingrediente
        </button>
        <button
          onClick={() => onSelectTab('quien-cocina')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'quien-cocina' ? 'text-[#9A3412] font-bold' : ''}`}
        >
          ¿Quién Cocina?
        </button>
        <button
          onClick={() => onSelectTab('cultura')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'cultura' ? 'text-[#9A3412] font-bold' : ''}`}
        >
          Cultura
        </button>
        <button
          onClick={() => onSelectTab('consejos')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'consejos' ? 'text-[#9A3412] font-bold' : ''}`}
        >
          Secretos
        </button>
      </div>
    </header>
  );
};
