import React from 'react';
import { GrandmaWisdom } from '../types';
import { Sparkles, Heart, Flame, ShieldCheck, Coffee, Utensils } from 'lucide-react';

interface CultureWisdomSectionProps {
  wisdomItems: GrandmaWisdom[];
}

export const CultureWisdomSection: React.FC<CultureWisdomSectionProps> = ({ wisdomItems }) => {
  const decalogoRules = [
    { num: '01', title: 'La prisa arruina el sofrito', desc: 'El ajo y la cebolla piden paciencia. Si los quemas por apuro, amargarás toda la comida.' },
    { num: '02', title: 'El fuego lento ablanda la carne y los días duros', desc: 'Cocinar despacio no es lentitud; es el arte de permitir que los jugos se encuentren.' },
    { num: '03', title: 'La sal se prueba tres veces', desc: 'Al dorar, cuando hierve y antes de servir. Nunca eches la sal con los ojos cerrados.' },
    { num: '04', title: 'Una pizca de dulce quita la acidez', desc: 'El tomate maduro agradece un toque de panela o azúcar para despertar su dulzura oculta.' },
    { num: '05', title: 'Las ollas de barro y hierro tienen memoria', desc: 'Cura tus cazuelas con manteca y ajo. Una cazuela bien cuidada cocina por sí sola.' },
    { num: '06', title: 'En esta casa siempre hay un plato para quien llegue', desc: 'Si tocan a la puerta a la hora del almuerzo, échale más agua a la sopa y sonríe.' },
    { num: '07', title: 'La sobremesa es más sagrada que el postre', desc: 'Nadie se levanta de la mesa hasta que se cuente el último chiste y se enfríe el café.' },
    { num: '08', title: 'El amor es el ingrediente que no se vende en frasco', desc: 'Quien cocina enojado agria el guiso. Cocina pensando en las caras felices de quienes amas.' }
  ];

  return (
    <section id="cultura" className="space-y-12">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] mb-2">
          Cultura, Memoria y Tradición Oral
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight mb-3">
          El Fogón de la Abuela: Cultura Viva y Familia
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          En los pueblos y hogares de nuestras tierras, la cocina nunca fue una simple habitación: fue el centro del universo familiar. Allí se escuchaban las noticias, se curaban las penas con caldo caliente y se transmitía la identidad de generación en generación.
        </p>
      </div>

      {/* El Decálogo de la Cocina de la Abuela */}
      <div className="card-paper p-6 sm:p-10 rounded-2xl border border-[#E8DFD3] space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-4">
          <Utensils className="w-5 h-5 text-[#9A3412]" />
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1C1917]">
              El Decálogo Sagrado de la Cocina de la Abuela
            </h3>
            <span className="text-xs text-[#78716C]">
              Mandamientos heredados para cocinar en paz y con buena mano
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {decalogoRules.map((rule) => (
            <div key={rule.num} className="flex items-start gap-4">
              <span className="font-serif-display text-2xl font-bold text-[#9A3412]/80 tabular-nums shrink-0">
                {rule.num}
              </span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1C1917]">
                  {rule.title}
                </h4>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secretos & Técnicas Tradicionales (Curar ollas, fogón, etc.) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B45309]" />
          <h3 className="font-serif-display text-2xl font-semibold text-[#1C1917]">
            Secretos del Fogón y Sabiduría Doméstica
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wisdomItems.map((item) => (
            <div
              key={item.id}
              className="card-paper p-6 rounded-xl border border-[#E8DFD3] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <span className="uppercase tracking-wider font-semibold text-[#9A3412]">
                    {item.category}
                  </span>
                  <span>Tradición oral</span>
                </div>
                <h4 className="font-serif-display text-lg font-semibold text-[#1C1917]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#78350F]">
                <p className="font-handwriting text-lg sm:text-xl leading-snug">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archival Family Quote Banner */}
      <div className="card-paper p-8 rounded-2xl bg-gradient-to-r from-[#FFFDF9] to-[#FAF7F2] border border-[#E8DFD3] text-center space-y-3">
        <Heart className="w-6 h-6 text-[#9A3412] mx-auto" />
        <blockquote className="font-serif-display italic text-xl sm:text-2xl text-[#1C1917] max-w-2xl mx-auto leading-relaxed">
          «El mejor sazón no se compra en el mercado; se hereda en los abrazos de la abuela y en la dicha de ver a toda la familia reunida los domingos.»
        </blockquote>
        <div className="text-xs font-semibold uppercase tracking-widest text-[#B45309]">
          Patrimonio Inmaterial de la Familia
        </div>
      </div>
    </section>
  );
};
