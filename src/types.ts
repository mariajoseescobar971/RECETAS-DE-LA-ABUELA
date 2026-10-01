export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface CookingStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  abuelaTip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  author: string; // e.g. "Abuela Elena", "Bisabuela Rosa", "Tía Carmen"
  generation: string; // e.g. "Generación de 1948", "Heredada de 1965"
  category: 'Sopas y Cazuelas' | 'Platos Fuertes' | 'Amasijos y Antojos' | 'Dulces y Postres';
  prepTime: number; // minutes
  cookTime: number; // minutes
  difficulty: 'Fácil' | 'Paciencia y Cariño' | 'Día Festivo';
  baseServings: number; // M2: Receta + porciones base
  servings: number;
  imageUrl: string;
  culturalOrigin: string; // e.g. "Valle del Cauca / Tradición Dominical"
  story: string; // Emotional and cultural family anecdote
  secret: string; // "El Secreto de la Abuela"
  occasion: string; // "Almuerzo de domingo", "Tarde de lluvia", "Fiesta familiar"
  ingredients: Ingredient[];
  steps: CookingStep[];
  favoriteCount: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // "Mamá", "Papá", "Abuela", "Hijo mayor", "Tío", "Nieto"
  color: string;
  avatarSeed: string;
  specialtyDish: string;
  skillLevel: 'Maestro de la casa' | 'Cocinero de domingo' | 'Experto en parrilla' | 'Pinche aprendiz';
  timesCookedThisMonth: number;
}

export interface WeeklyScheduleDay {
  dayName: string; // "Lunes", "Martes", ...
  assignedMemberId: string | null;
  recipeId: string | null;
  notes?: string;
}

export interface GrandmaWisdom {
  id: string;
  title: string;
  description: string;
  category: 'Curar Ollas' | 'El Fuego y la Sal' | 'Masa y Harina' | 'Cultura Familiar';
  quote: string;
}

export interface AISubstituteResult {
  originalIngredient: string;
  substituteIngredient: string;
  ratioRecommendation: string;
  howToApply: string;
  warningImpactOnResult: string;
  abuelaAdvice: string;
  source?: string;
}

export interface StudentSubmission {
  studentName: string;
  repositoryUrl: string;
}
