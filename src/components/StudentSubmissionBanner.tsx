import React, { useState, useEffect } from 'react';
import { StudentSubmission, Recipe } from '../types';
import { GraduationCap, GitBranch, Check, Copy, Download, Upload, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface StudentSubmissionBannerProps {
  recipes: Recipe[];
  onImportRecipes: (imported: Recipe[]) => void;
}

export const StudentSubmissionBanner: React.FC<StudentSubmissionBannerProps> = ({
  recipes,
  onImportRecipes
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [student, setStudent] = useState<StudentSubmission>(() => {
    try {
      const saved = localStorage.getItem('abuela_student_info');
      return saved
        ? JSON.parse(saved)
        : { studentName: '', repositoryUrl: '' };
    } catch {
      return { studentName: '', repositoryUrl: '' };
    }
  });

  useEffect(() => {
    localStorage.setItem('abuela_student_info', JSON.stringify(student));
  }, [student]);

  const handleCopySubmission = () => {
    const text = `RECETARIO DE LA ABUELA
Cultura y familia

Problema: Las recetas de la familia se pierden cuando nadie las escribe.
Usuario: Quien cocina en casa.

Las tres funciones mínimas (P0 + M1):
1. Guardar una receta con ingredientes, pasos y foto.
2. Convertir las porciones (de 4 a 10 personas, por ejemplo).
3. Buscar recetas por ingrediente disponible.

Dato clave que maneja (M2):
Receta + porciones base.

Sello de IA (M5):
La IA propone un sustituto cuando falta un ingrediente y advierte si el cambio altera el resultado.

Dónde guardar:
Recetario guardado en el dispositivo (localStorage + Backup JSON).

ESTUDIANTE: ${student.studentName || '_________________________________'}
REPOSITORIO: ${student.repositoryUrl || '_______________________________'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(recipes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `recetario_abuela_respaldo_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportRecipes(parsed);
          alert('¡Recetario importado y guardado en tu dispositivo correctamente!');
        }
      } catch (err) {
        alert('Archivo JSON no válido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="card-paper rounded-xl border border-[#E8DFD3] overflow-hidden bg-gradient-to-r from-[#FFFDF9] to-[#FAF7F2]">
      {/* Header bar toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F5EFE6]/50 transition-colors"
      >
        <div className="flex items-center gap-2.5 text-xs text-[#44403C]">
          <GraduationCap className="w-4 h-4 text-[#9A3412]" />
          <span className="font-semibold uppercase tracking-wider text-[#9A3412]">
            Ficha de Entrega & Proyecto Académico
          </span>
          <span className="hidden sm:inline text-[#A8A29E]">·</span>
          <span className="hidden sm:inline text-[#78716C]">
            {student.studentName ? `Estudiante: ${student.studentName}` : 'Haga clic para completar datos de entrega'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#78716C]">
          <span>{isOpen ? 'Ocultar' : 'Ver Ficha'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded details */}
      {isOpen && (
        <div className="p-6 border-t border-[#E8DFD3] space-y-6 text-xs text-[#44403C]">
          {/* Rubric Alignment Check */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] space-y-1">
              <span className="font-bold text-[#9A3412] block">P0 + M1: Tres Funciones</span>
              <p className="text-[11px] text-[#57534E]">
                1. Guardar receta + foto + pasos.<br />
                2. Convertir porciones (base a objetivo).<br />
                3. Buscar por ingrediente disponible.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] space-y-1">
              <span className="font-bold text-[#9A3412] block">M2: Dato Clave</span>
              <p className="text-[11px] text-[#57534E]">
                Receta + <strong>Porciones base</strong> explícitas y recálculo matemático de ingredientes.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] space-y-1">
              <span className="font-bold text-[#9A3412] block">M5: Sello de IA</span>
              <p className="text-[11px] text-[#57534E]">
                Gemini propone sustitutos caseros y <strong>advierte cómo altera el resultado</strong>.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] space-y-1">
              <span className="font-bold text-[#9A3412] block">Dónde Guardar</span>
              <p className="text-[11px] text-[#57534E]">
                Recetario guardado en el dispositivo (localStorage + respaldo JSON exportable).
              </p>
            </div>
          </div>

          {/* Student Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E8DFD3]">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">
                ESTUDIANTE:
              </label>
              <input
                type="text"
                value={student.studentName}
                onChange={(e) => setStudent({ ...student, studentName: e.target.value })}
                placeholder="Nombre completo del estudiante..."
                className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716C] mb-1">
                REPOSITORIO:
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={student.repositoryUrl}
                  onChange={(e) => setStudent({ ...student, repositoryUrl: e.target.value })}
                  placeholder="https://github.com/usuario/recetario-abuela..."
                  className="flex-1 px-3 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#9A3412]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons: Copy & Device Storage Backup */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-[#EFE8DC] hover:bg-[#E2D8CA] rounded-lg transition-colors"
                title="Descargar copia de las recetas en este dispositivo"
              >
                <Download className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>Exportar Respaldo al Dispositivo</span>
              </button>

              <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#1C1917] bg-[#EFE8DC] hover:bg-[#E2D8CA] rounded-lg transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Importar JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={handleCopySubmission}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Ficha de Entrega Copiada!' : 'Copiar Texto de Entrega'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
