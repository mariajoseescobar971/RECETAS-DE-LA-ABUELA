import { Recipe, FamilyMember, WeeklyScheduleDay, GrandmaWisdom } from '../types';

import heroImg from '../assets/images/hero_abuela_kitchen_1790869617520.jpg';
import sancochoImg from '../assets/images/recipe_sancocho_stew_1790869628360.jpg';
import empanadasImg from '../assets/images/recipe_empanadas_artisan_1790869638240.jpg';
import arrozImg from '../assets/images/recipe_arroz_con_leche_1790869647625.jpg';

export { heroImg };

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'sancocho-abuela',
    title: 'Sancocho Criollo en Olla de Barro',
    author: 'Abuela Elena',
    generation: 'Tradición de 1954',
    category: 'Sopas y Cazuelas',
    prepTime: 35,
    cookTime: 75,
    difficulty: 'Paciencia y Cariño',
    baseServings: 6,
    servings: 6,
    imageUrl: sancochoImg,
    culturalOrigin: 'Tradición de campo y valles andinos',
    story: 'Elena prendía el fogón a las 8 de la mañana cuando sabía que venían los nietos. Decía que el secreto de un buen sancocho no está en las verduras, sino en la paciencia de dejar que la yuca y el plátano se deshagan suavemente en el caldo mientras suena la radio de fondo.',
    secret: 'Un atado de cilantro cimarrón fresco machacado en mortero de piedra con 3 dientes de ajo y comino recién tostado, agregado justo 10 minutos antes de apagar el fuego.',
    occasion: 'Almuerzo dominical y días de lluvia',
    favoriteCount: 48,
    ingredients: [
      { id: 'i1', name: 'Presas de pollo campesino o gallina', amount: 1200, unit: 'g' },
      { id: 'i2', name: 'Plátano verde en trozos partidos con la mano', amount: 2, unit: 'unidades' },
      { id: 'i3', name: 'Yuca fresca pelada y troceada', amount: 600, unit: 'g' },
      { id: 'i4', name: 'Mazorcas de maíz tierno en rodajas', amount: 3, unit: 'unidades' },
      { id: 'i5', name: 'Papas pastusas peladas enteras', amount: 4, unit: 'unidades' },
      { id: 'i6', name: 'Cebolla larga picada finamente', amount: 2, unit: 'tallos' },
      { id: 'i7', name: 'Dientes de ajo criollo', amount: 4, unit: 'dientes' },
      { id: 'i8', name: 'Cilantro fresco picado para servir', amount: 1, unit: 'manojo' },
      { id: 'i9', name: 'Agua pura de manantial o filtrada', amount: 3, unit: 'litros' },
      { id: 'i10', name: 'Sal marina gruesa y comino al gusto', amount: 1, unit: 'cda' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una olla grande o cazuela de barro, vierte el agua y agrega las presas de pollo, la cebolla larga y los dientes de ajo machacados con sal.',
        timerMinutes: 20,
        abuelaTip: 'Nunca laves el pollo con jabón, sólo sécalo bien y déjalo sudar con el ajo.'
      },
      {
        stepNumber: 2,
        instruction: 'Parte el plátano verde con las manos o con cuchara de palo (nunca cuchillo de metal, o se ennegrece) e incorpóralo con las rodajas de mazorca.',
        timerMinutes: 25,
        abuelaTip: 'El plátano verde le da el cuerpo espeso al caldo.'
      },
      {
        stepNumber: 3,
        instruction: 'Agrega la yuca y las papas. Cocina a fuego medio-bajo dejando entreabierta la tapa para que respire la cazuela.',
        timerMinutes: 20,
        abuelaTip: 'Pincha la yuca con un tenedor; cuando esté tierna como mantequilla, casi está listo.'
      },
      {
        stepNumber: 4,
        instruction: 'Incorpora el cilantro cimarrón y una pizca de comino tostado. Rectifica de sal marina, apaga y deja reposar 5 minutos tapado.',
        timerMinutes: 5,
        abuelaTip: 'El reposo es sagrado: asienta los jugos y amalgama el aroma.'
      },
      {
        stepNumber: 5,
        instruction: 'Sirve bien caliente en platos hondos con aguacate fresco, ají casero y arroz blanco al lado.',
        abuelaTip: 'El primer plato siempre se le sirve al que vino de más lejos.'
      }
    ]
  },
  {
    id: 'empanadas-abuela',
    title: 'Empanadas Doradas de la Abuela Elena',
    author: 'Abuela Elena',
    generation: 'Receta de 1962',
    category: 'Amasijos y Antojos',
    prepTime: 45,
    cookTime: 25,
    difficulty: 'Paciencia y Cariño',
    baseServings: 18,
    servings: 18,
    imageUrl: empanadasImg,
    culturalOrigin: 'Reunión familiar de tardes con café',
    story: 'Los viernes por la tarde, la mesa de madera del comedor se cubría con un mantel plástico blanco. Todos los primos tenían un rol: uno aplastaba la masa con la botella de vidrio, la abuela ponía la cucharada de guiso, y la tía cerraba los bordes con una taza de café invertida.',
    secret: 'Añadir dos cucharadas de manteca tibia derretida y dos gotas de zumo de naranja a la masa de maíz. Hace que al freír salgan pequeñas burbujas crocantes que no se ablandan jamás.',
    occasion: 'Merienda de cumpleaños o sábado de tertulia',
    favoriteCount: 65,
    ingredients: [
      { id: 'e1', name: 'Masa de maíz trillado o harina de maíz precocida', amount: 500, unit: 'g' },
      { id: 'e2', name: 'Carne de res o falda desmechada suavemente', amount: 350, unit: 'g' },
      { id: 'e3', name: 'Papas cocidas y ligeramente prensadas', amount: 300, unit: 'g' },
      { id: 'e4', name: 'Guiso sofrito con tomate maduro y cebolla', amount: 200, unit: 'g' },
      { id: 'e5', name: 'Manteca tibia o aceite de achiote', amount: 30, unit: 'ml' },
      { id: 'e6', name: 'Caldo de la cocción de la carne', amount: 350, unit: 'ml' },
      { id: 'e7', name: 'Aceite vegetal para dorar', amount: 500, unit: 'ml' },
      { id: 'e8', name: 'Sal y color natural de achiote', amount: 1, unit: 'cdta' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Amasa la harina de maíz con el caldo tibio de la carne, la manteca y la sal hasta obtener una masa tersa que no se pegue a las manos.',
        timerMinutes: 10,
        abuelaTip: 'Tápala con un paño húmedo para que no se reseque mientras armas el relleno.'
      },
      {
        stepNumber: 2,
        instruction: 'Prepara el relleno mezclando la carne desmechada, la papa machacada y el guiso de tomate sofrito a fuego lento.',
        timerMinutes: 15,
        abuelaTip: 'El relleno debe estar frío antes de armar las empanadas para no humedecer la masa.'
      },
      {
        stepNumber: 3,
        instruction: 'Forma bolitas con la masa, aplástalas entre dos plásticos finos, coloca una cucharada de relleno en el centro y dobla sellando con el borde de una taza.',
        abuelaTip: 'No llenes demasiado la empanada o reventará al entrar al aceite caliente.'
      },
      {
        stepNumber: 4,
        instruction: 'Fríe en abundante aceite a temperatura media-alta (180°C) hasta que la corteza esté dorada y crujiente.',
        timerMinutes: 6,
        abuelaTip: 'No pongas más de 3 al tiempo para no bajar la temperatura del caldero.'
      },
      {
        stepNumber: 5,
        instruction: 'Escurre en papel absorbente y sirve de inmediato con ají picado fino y rodajas de limón fresco.',
        abuelaTip: 'Se comen con los dedos, soplando despacito para no quemarse.'
      }
    ]
  },
  {
    id: 'arroz-con-leche-rosa',
    title: 'Arroz con Leche de la Bisabuela Rosa',
    author: 'Bisabuela Rosa',
    generation: 'Heirloom de 1948',
    category: 'Dulces y Postres',
    prepTime: 15,
    cookTime: 45,
    difficulty: 'Fácil',
    baseServings: 8,
    servings: 8,
    imageUrl: arrozImg,
    culturalOrigin: 'Celebraciones de Navidad y Santos patronales',
    story: 'La Bisabuela Rosa preparaba este postre en una olla de cobre brillante los días de San José y en Nochebuena. La casa entera se inundaba del perfume de la canela y la cáscara de naranja. El primer plato siempre era para el abuelo con extra canela espolvoreada formando una cruz.',
    secret: 'Cocinar primero el grano de arroz en poca agua con una astilla de canela y la piel amarilla de un limón sin nada de parte blanca. Cuando el grano reviente, se añade la leche caliente.',
    occasion: 'Sobremesa de fiesta y tardes festivas',
    favoriteCount: 82,
    ingredients: [
      { id: 'a1', name: 'Arroz de grano redondo o corto', amount: 200, unit: 'g' },
      { id: 'a2', name: 'Agua pura', amount: 400, unit: 'ml' },
      { id: 'a3', name: 'Leche entera cremosa pasteurizada', amount: 1000, unit: 'ml' },
      { id: 'a4', name: 'Leche condensada casera o tradicional', amount: 250, unit: 'g' },
      { id: 'a5', name: 'Ramas de canela en rama aromática', amount: 3, unit: 'unidades' },
      { id: 'a6', name: 'Piel de limón o naranja sin albedo blanco', amount: 2, unit: 'tiras' },
      { id: 'a7', name: 'Pizca de sal marina fina', amount: 0.5, unit: 'cdta' },
      { id: 'a8', name: 'Canela en polvo para espolvorear', amount: 1, unit: 'cda' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una cacerola de fondo grueso, hierve el arroz con el agua, una rama de canela, la cáscara de limón y la pizca de sal a fuego medio.',
        timerMinutes: 12,
        abuelaTip: 'La pizca de sal resalta la dulzura posterior de la leche.'
      },
      {
        stepNumber: 2,
        instruction: 'Cuando el agua se haya evaporado casi por completo y el grano esté tierno, retira la piel de limón y vierte la leche entera caliente.',
        timerMinutes: 5,
        abuelaTip: 'La leche siempre debe estar caliente al sumarla para no pasmar el arroz.'
      },
      {
        stepNumber: 3,
        instruction: 'Baja el fuego al mínimo y remueve constantemente con cuchara de madera en forma de ocho para que no se pegue al fondo.',
        timerMinutes: 20,
        abuelaTip: 'El ocho en la cuchara evita que se formen grumos o se queme la base.'
      },
      {
        stepNumber: 4,
        instruction: 'Añade la leche condensada despacio y continúa revolviendo 5 minutos más hasta lograr una consistencia sedosa y cremosa.',
        timerMinutes: 5,
        abuelaTip: 'Recuerda que al enfriar se espesa bastante; apágalo un poco más líquido de lo deseado.'
      },
      {
        stepNumber: 5,
        instruction: 'Vierte en copas o platos de cerámica y espolvorea con canela en polvo recién molida.',
        abuelaTip: 'Sabe a gloria tanto tibio como frío sacado de la nevera.'
      }
    ]
  },
  {
    id: 'guiso-pollo-olla-barro',
    title: 'Guiso Campero a Fuego Lento',
    author: 'Tía Carmen',
    generation: 'Tradición de 1978',
    category: 'Platos Fuertes',
    prepTime: 25,
    cookTime: 50,
    difficulty: 'Fácil',
    baseServings: 5,
    servings: 5,
    imageUrl: sancochoImg,
    culturalOrigin: 'Cocina de fogón casero',
    story: 'Carmen aprendió a cocinar cuando nació su primer hijo. Este guiso era el remedio infalible para el cansancio familiar. Decía que el tomate chonto bien maduro tiene un alma dulce que ningún condimento químico puede igualar jamás.',
    secret: 'Caramelizar media cucharadita de panela o azúcar morena con la cebolla antes de agregar los tomates maduros, y tapar con una hoja de plátano.',
    occasion: 'Almuerzo reconfortante de semana',
    favoriteCount: 39,
    ingredients: [
      { id: 'g1', name: 'Muslos o pechuga de pollo cortado en presas', amount: 900, unit: 'g' },
      { id: 'g2', name: 'Tomates chontos muy maduros rallados', amount: 5, unit: 'unidades' },
      { id: 'g3', name: 'Cebolla cabezona blanca picada finita', amount: 1, unit: 'unidad' },
      { id: 'g4', name: 'Papas sabaneras en cuartos', amount: 4, unit: 'unidades' },
      { id: 'g5', name: 'Zanahoria en rodajas delgadas', amount: 2, unit: 'unidades' },
      { id: 'g6', name: 'Pimiento rojo picado en cubos', amount: 1, unit: 'unidad' },
      { id: 'g7', name: 'Dientes de ajo triturados', amount: 3, unit: 'dientes' },
      { id: 'g8', name: 'Aceite de oliva virgen o manteca', amount: 2, unit: 'cda' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Dora las presas de pollo sazonadas con sal y pimienta en una cazuela amplia con aceite bien caliente hasta que tomen color dorado.',
        timerMinutes: 10,
        abuelaTip: 'Sellar bien la piel guarda los jugos internos de la carne.'
      },
      {
        stepNumber: 2,
        instruction: 'Retira el pollo y en el mismo fondo prepara el sofrito: saltea la cebolla, el ajo y el pimiento hasta que estén transparentes.',
        timerMinutes: 8,
        abuelaTip: 'El fondo caramelizado que dejó el pollo es donde habita todo el sabor.'
      },
      {
        stepNumber: 3,
        instruction: 'Agrega los tomates rallados, la zanahoria y las papas. Regresa el pollo a la cazuela con su jugo.',
        timerMinutes: 5,
        abuelaTip: 'No uses agua en exceso; el tomate maduro aportará su propio líquido dulce.'
      },
      {
        stepNumber: 4,
        instruction: 'Tapa y cocina a fuego suave hasta que las papas estén mantequillosas y la salsa espese.',
        timerMinutes: 25,
        abuelaTip: 'Mueve la cazuela por las asas en vaivén suave en lugar de meter la cuchara bruscamente.'
      }
    ]
  }
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'm-abuela',
    name: 'Abuela Elena',
    relation: 'La Gran Matriarca',
    color: '#9A3412', // Terracotta
    avatarSeed: 'Elena',
    specialtyDish: 'Sancocho Criollo y Empanadas Doradas',
    skillLevel: 'Maestro de la casa',
    timesCookedThisMonth: 12
  },
  {
    id: 'm-mama',
    name: 'Mamá Maricela',
    relation: 'Mamá',
    color: '#B45309', // Cinnamon Amber
    avatarSeed: 'Maricela',
    specialtyDish: 'Arroz con Pollo y Ensalada Rusa de Fiesta',
    skillLevel: 'Maestro de la casa',
    timesCookedThisMonth: 9
  },
  {
    id: 'm-papa',
    name: 'Papá Roberto',
    relation: 'Papá',
    color: '#15803D', // Forest Green
    avatarSeed: 'Roberto',
    specialtyDish: 'Asado al Carbón y Papas Saladas',
    skillLevel: 'Experto en parrilla',
    timesCookedThisMonth: 5
  },
  {
    id: 'm-camilo',
    name: 'Camilo (Hijo)',
    relation: 'Hijo mayor',
    color: '#0369A1', // Deep Sky
    avatarSeed: 'Camilo',
    specialtyDish: 'Pastas Caseras y Huevos Pericos',
    skillLevel: 'Cocinero de domingo',
    timesCookedThisMonth: 3
  },
  {
    id: 'm-valentina',
    name: 'Valentina (Nieta)',
    relation: 'Nieta menor',
    color: '#7C3AED', // Violet
    avatarSeed: 'Valentina',
    specialtyDish: 'Galletas de Canela y Batidos',
    skillLevel: 'Pinche aprendiz',
    timesCookedThisMonth: 2
  }
];

export const INITIAL_WEEKLY_SCHEDULE: WeeklyScheduleDay[] = [
  { dayName: 'Lunes', assignedMemberId: 'm-mama', recipeId: 'guiso-pollo-olla-barro', notes: 'Almuerzo familiar de arranque de semana' },
  { dayName: 'Martes', assignedMemberId: 'm-camilo', recipeId: null, notes: 'Día de pastas y ensalada fresca' },
  { dayName: 'Miércoles', assignedMemberId: 'm-abuela', recipeId: 'arroz-con-leche-rosa', notes: 'Tarde de postre y café de sobremesa' },
  { dayName: 'Jueves', assignedMemberId: 'm-mama', recipeId: null, notes: 'Sopita casera liviana' },
  { dayName: 'Viernes', assignedMemberId: 'm-valentina', recipeId: 'empanadas-abuela', notes: 'Tarde de empanadas con los primos' },
  { dayName: 'Sábado', assignedMemberId: 'm-papa', recipeId: null, notes: 'Día de asado en el patio' },
  { dayName: 'Domingo', assignedMemberId: 'm-abuela', recipeId: 'sancocho-abuela', notes: 'El gran almuerzo dominical con toda la familia' }
];

export const GRANDMA_WISDOM: GrandmaWisdom[] = [
  {
    id: 'w1',
    title: 'La prisa es enemiga del sofrito',
    description: 'La cebolla y el tomate no deben quemarse ni apurarse. Deben sudar suavemente hasta que el aceite brille y la acidez se vuelva dulzura natural.',
    category: 'El Fuego y la Sal',
    quote: '«En la cocina, el tiempo no se pierde: se regala en forma de cariño.»'
  },
  {
    id: 'w2',
    title: 'Cómo curar una olla o cazuela de barro',
    description: 'Frota el interior y exterior de la cazuela con un diente de ajo entero y un poco de manteca. Luego ponla a hervir llena de agua con leche una tarde entera antes de usarla por primera vez. Así cerrará sus poros y durará 50 años.',
    category: 'Curar Ollas',
    quote: '«El barro tiene memoria: si lo tratas bien, nunca te quemará la comida.»'
  },
  {
    id: 'w3',
    title: 'La sal se prueba tres veces',
    description: 'Se prueba al inicio al dorar, a la mitad cuando los caldos rompen hervor, y al final después de reposar cinco minutos. Quien sala de un solo golpe arruina la mesa.',
    category: 'El Fuego y la Sal',
    quote: '«La sal no es para que sepa a sal, sino para que cada ingrediente cante su propia nota.»'
  },
  {
    id: 'w4',
    title: 'El amor por la sobremesa familiar',
    description: 'Comer no es solo alimentarse, es escucharse. En la mesa de la abuela nadie se levantaba hasta que el último café estuviera frío y la última anécdota contada.',
    category: 'Cultura Familiar',
    quote: '«Los problemas de la casa se arreglan con el mantel puesto y un plato humeante delante.»'
  }
];
