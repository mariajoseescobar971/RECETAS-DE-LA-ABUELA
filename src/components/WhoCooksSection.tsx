import React, { useState } from 'react';
import { FamilyMember, WeeklyScheduleDay, Recipe } from '../types';
import { Sparkles, Users, Award, Calendar, Check, Plus, RefreshCw, ChefHat, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WhoCooksSectionProps {
  familyMembers: FamilyMember[];
  weeklySchedule: WeeklyScheduleDay[];
  recipes: Recipe[];
  onUpdateSchedule: (newSchedule: WeeklyScheduleDay[]) => void;
  onAddFamilyMember: (member: FamilyMember) => void;
  onSelectRecipeToCook: (recipe: Recipe) => void;
}

export const WhoCooksSection: React.FC<WhoCooksSectionProps> = ({
  familyMembers,
  weeklySchedule,
  recipes,
  onUpdateSchedule,
  onAddFamilyMember,
  onSelectRecipeToCook
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<FamilyMember | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [suggestedRecipe, setSuggestedRecipe] = useState<Recipe | null>(null);

  // New member modal form state
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [newMemberSpecialty, setNewMemberSpecialty] = useState('');
  const [newMemberSkill, setNewMemberSkill] = useState<FamilyMember['skillLevel']>('Cocinero de domingo');

  // Spin the family cooking wheel
  const handleSpinRoulette = () => {
    if (isSpinning || familyMembers.length === 0) return;

    setIsSpinning(true);
    setSelectedWinner(null);
    setSuggestedRecipe(null);

    // Pick random winner
    const randomIndex = Math.floor(Math.random() * familyMembers.length);
    const winner = familyMembers[randomIndex];

    // Compute extra full spins (5 to 8 rotations) + segment angle
    const segmentAngle = 360 / familyMembers.length;
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    // Align wheel indicator at top
    const targetDeg = rotationDegrees + extraSpins + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    setRotationDegrees(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedWinner(winner);

      // Also pick a suggested Abuela recipe for them!
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setSuggestedRecipe(randomRecipe);

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.55 }
      });
    }, 3200);
  };

  const handleAssignToday = (dayName: string, memberId: string) => {
    const updated = weeklySchedule.map(day => {
      if (day.dayName === dayName) {
        return { ...day, assignedMemberId: memberId };
      }
      return day;
    });
    onUpdateSchedule(updated);
  };

  const handleAssignRecipeToDay = (dayName: string, recipeId: string) => {
    const updated = weeklySchedule.map(day => {
      if (day.dayName === dayName) {
        return { ...day, recipeId: recipeId === '' ? null : recipeId };
      }
      return day;
    });
    onUpdateSchedule(updated);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const colors = ['#9A3412', '#B45309', '#15803D', '#0369A1', '#7C3AED', '#BE185D', '#4D5E3A'];
    const newMember: FamilyMember = {
      id: `m-${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation.trim() || 'Familiar',
      color: colors[familyMembers.length % colors.length],
      avatarSeed: newMemberName.trim(),
      specialtyDish: newMemberSpecialty.trim() || 'Plato sorpresa con amor',
      skillLevel: newMemberSkill,
      timesCookedThisMonth: 0
    };

    onAddFamilyMember(newMember);
    setNewMemberName('');
    setNewMemberRelation('');
    setNewMemberSpecialty('');
    setIsAddingMember(false);
  };

  return (
    <section id="quien-cocina" className="space-y-12">
      {/* Section Header */}
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] mb-2">
          Dinámica Familiar y Organización en Casa
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight mb-3">
          ¿Quién cocina hoy en casa?
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          En la mesa de la abuela todos comen, y en la cocina de la casa todos participan. Usa la ruleta para sortear el turno de hoy o revisa el calendario semanal para repartir el cariño culinario en familia.
        </p>
      </div>

      {/* Main Roulette & Winner Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-paper p-6 sm:p-10 rounded-2xl border border-[#E8DFD3]">
        {/* Roulette Wheel Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Top Indicator Arrow */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-[#9A3412] drop-shadow-md" />

            {/* Rotating SVG Wheel */}
            <div
              className="w-full h-full rounded-full border-4 border-[#262320] shadow-xl overflow-hidden transition-transform duration-[3200ms] cubic-bezier(0.12, 0.8, 0.25, 1)"
              style={{
                transform: `rotate(${rotationDegrees}deg)`
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {familyMembers.map((member, index) => {
                  const total = familyMembers.length;
                  const sliceAngle = 360 / total;
                  const startAngle = index * sliceAngle;
                  const endAngle = (index + 1) * sliceAngle;

                  // Coordinates on unit circle
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);

                  const largeArcFlag = sliceAngle > 180 ? 1 : 0;
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                  // Text position in middle of wedge
                  const midAngle = startAngle + sliceAngle / 2;
                  const midRad = ((midAngle - 90) * Math.PI) / 180;
                  const textX = 50 + 32 * Math.cos(midRad);
                  const textY = 50 + 32 * Math.sin(midRad);

                  return (
                    <g key={member.id}>
                      <path d={pathData} fill={member.color} stroke="#FAF7F2" strokeWidth="1" />
                      <text
                        x={textX}
                        y={textY}
                        fill="#FFFFFF"
                        fontSize="4"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                      >
                        {member.name.length > 10 ? member.name.substring(0, 9) + '…' : member.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Hub */}
            <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF7F2] border-4 border-[#262320] flex items-center justify-center shadow-md">
              <ChefHat className="w-6 h-6 text-[#9A3412]" />
            </div>
          </div>

          {/* Spin Action Button */}
          <button
            onClick={handleSpinRoulette}
            disabled={isSpinning}
            className={`mt-6 flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl text-white shadow-md transition-all ${
              isSpinning
                ? 'bg-[#A8A29E] cursor-not-allowed scale-95'
                : 'bg-[#9A3412] hover:bg-[#7C2D12] hover:scale-102 active:scale-98'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSpinning ? 'Girando la olla familiar...' : '¡Girar Ruleta del Cocinero!'}</span>
          </button>
        </div>

        {/* Selected Result Box */}
        <div className="lg:col-span-6 bg-[#FAF7F2] rounded-xl p-6 sm:p-8 border border-[#E8DFD3] space-y-5">
          {selectedWinner ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>¡El veredicto de la ruleta!</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  ¡Hoy le toca cocinar a {selectedWinner.name}!
                </h3>
                <p className="text-xs text-[#78716C]">
                  {selectedWinner.relation} · Nivel: <strong className="text-[#44403C]">{selectedWinner.skillLevel}</strong>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#E8DFD3] space-y-1.5">
                <span className="text-xs font-semibold text-[#78716C] block">Especialidad de la casa:</span>
                <p className="text-sm font-medium text-[#292524]">
                  {selectedWinner.specialtyDish}
                </p>
              </div>

              {suggestedRecipe && (
                <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <span className="text-xs font-bold text-[#B45309] block uppercase tracking-wider">
                    Receta sugerida del baúl de la abuela:
                  </span>
                  <div className="font-serif-display text-base font-semibold text-[#1C1917]">
                    {suggestedRecipe.title}
                  </div>
                  <p className="text-xs text-[#78350F] line-clamp-1 italic">
                    «{suggestedRecipe.secret}»
                  </p>
                  <button
                    onClick={() => onSelectRecipeToCook(suggestedRecipe)}
                    className="mt-2 text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12] underline"
                  >
                    Ver detalles y preparar esta receta →
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const todayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][new Date().getDay()];
                    handleAssignToday(todayName, selectedWinner.id);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors shadow-2xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Fijar en el calendario de hoy</span>
                </button>
                <button
                  onClick={handleSpinRoulette}
                  className="px-3 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-white border border-[#E8DFD3] rounded-lg transition-colors"
                >
                  Girar otra vez
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F3EDE2] flex items-center justify-center text-[#9A3412]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-[#1C1917]">
                ¿Indecisos sobre quién se pone el delantal?
              </h3>
              <p className="text-xs text-[#57534E] max-w-sm mx-auto leading-relaxed">
                Toca el botón para hacer girar la ruleta. Se elegirá democráticamente al cocinero de hoy junto con una sugerencia de receta de la abuela.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Family Members Roster */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#1C1917]">
              Los Cocineros del Hogar
            </h3>
            <p className="text-xs text-[#78716C]">
              Cada miembro de la familia aporta un sazón único a la sobremesa
            </p>
          </div>

          <button
            onClick={() => setIsAddingMember(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#9A3412] hover:text-[#7C2D12] bg-[#FFFBEB] border border-[#FDE68A] rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Familiar</span>
          </button>
        </div>

        {/* Member cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="card-paper p-4 rounded-xl border border-[#E8DFD3] flex items-start gap-3.5"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs"
                style={{ backgroundColor: member.color }}
              >
                {member.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#1C1917] truncate">{member.name}</h4>
                  <span className="text-[11px] text-[#78716C] font-mono tabular-nums">
                    {member.timesCookedThisMonth}x mes
                  </span>
                </div>
                <div className="text-xs text-[#9A3412] font-medium">{member.relation}</div>
                <div className="text-xs text-[#57534E] truncate mt-1">
                  Especialidad: <span className="text-[#262320] font-medium">{member.specialtyDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Form Modal */}
      {isAddingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateMember}
            className="w-full max-w-md bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFD3] shadow-2xl space-y-4"
          >
            <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
              Nuevo Cocinero de la Familia
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Nombre</label>
              <input
                type="text"
                required
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Ej. Tío Fernando, Sofía..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Parentesco</label>
              <input
                type="text"
                value={newMemberRelation}
                onChange={(e) => setNewMemberRelation(e.target.value)}
                placeholder="Ej. Primo, Cuñada, Hijo menor..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Plato Estrella / Especialidad</label>
              <input
                type="text"
                value={newMemberSpecialty}
                onChange={(e) => setNewMemberSpecialty(e.target.value)}
                placeholder="Ej. Tortilla española, Sopa de verduras..."
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">Nivel en la Cocina</label>
              <select
                value={newMemberSkill}
                onChange={(e) => setNewMemberSkill(e.target.value as FamilyMember['skillLevel'])}
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              >
                <option value="Maestro de la casa">Maestro de la casa</option>
                <option value="Cocinero de domingo">Cocinero de domingo</option>
                <option value="Experto en parrilla">Experto en parrilla</option>
                <option value="Pinche aprendiz">Pinche aprendiz</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#1C1917]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors"
              >
                Guardar Cocinero
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Weekly Schedule Planner */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#9A3412]" />
          <div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#1C1917]">
              Calendario Semanal de Turnos y Platos
            </h3>
            <p className="text-xs text-[#78716C]">
              Asigna quién cocina cada día y qué plato del recetario preparará
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {weeklySchedule.map((day) => {
            const assignedMember = familyMembers.find(m => m.id === day.assignedMemberId);
            const scheduledRecipe = recipes.find(r => r.id === day.recipeId);

            return (
              <div
                key={day.dayName}
                className="card-paper p-3.5 rounded-xl border border-[#E8DFD3] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-1.5 mb-2">
                    <span className="font-bold text-xs text-[#1C1917] uppercase tracking-wide">
                      {day.dayName}
                    </span>
                    {day.dayName === 'Domingo' && (
                      <span className="text-[10px] text-[#9A3412] font-semibold">Festín</span>
                    )}
                  </div>

                  {/* Assign Cook Selector */}
                  <div className="space-y-1 mb-2">
                    <label className="text-[10px] uppercase font-semibold text-[#78716C] block">
                      Cocinero:
                    </label>
                    <select
                      value={day.assignedMemberId || ''}
                      onChange={(e) => handleAssignToday(day.dayName, e.target.value)}
                      className="w-full text-xs py-1 px-1.5 bg-white border border-[#E8DFD3] rounded font-medium text-[#292524] truncate"
                    >
                      <option value="">(Sin asignar)</option>
                      {familyMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assign Recipe Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-[#78716C] block">
                      Receta:
                    </label>
                    <select
                      value={day.recipeId || ''}
                      onChange={(e) => handleAssignRecipeToDay(day.dayName, e.target.value)}
                      className="w-full text-xs py-1 px-1.5 bg-white border border-[#E8DFD3] rounded font-medium text-[#292524] truncate"
                    >
                      <option value="">(Menú del día)</option>
                      {recipes.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status card preview */}
                <div className="p-2 rounded bg-[#FAF7F2] border border-[#EFE8DC] text-[11px] text-[#57534E]">
                  {assignedMember ? (
                    <div className="flex items-center gap-1.5 truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: assignedMember.color }}
                      />
                      <span className="truncate font-semibold text-[#1C1917]">
                        {assignedMember.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#A8A29E] italic">Turno libre</span>
                  )}
                  {scheduledRecipe && (
                    <div className="font-serif-display text-xs text-[#9A3412] truncate mt-1">
                      {scheduledRecipe.title}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
