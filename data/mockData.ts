
import { User, Goal, Habit, GoalStatus, GoalPriority, HabitFrequency, Badge, SuggestedGoal, SuggestedHabit } from '../types';

export const mockBadges: Badge[] = [
  { id: 'badge-1', name: 'Iniciante', description: 'Comece sua jornada.', icon: '🚀' },
  { id: 'badge-2', name: 'Consistente', description: 'Complete um hábito por 7 dias seguidos.', icon: '🗓️' },
  { id: 'badge-3', name: 'Finalizador', description: 'Conclua sua primeira meta.', icon: '🏆' },
  { id: 'badge-4', name: 'Pontual', description: 'Ganhe 500 pontos.', icon: '💯' },
  { id: 'badge-5', name: 'Estrategista', description: 'Tenha 5 metas ativas.', icon: '🗺️' },
  { id: 'badge-6', name: 'Mestre dos Hábitos', description: 'Tenha 5 hábitos ativos.', icon: '🧘' },
  { id: 'badge-7', name: 'Foguete', description: 'Complete 3 metas em um mês.', icon: '☄️' },
  { id: 'badge-8', name: 'Visionário', description: 'Acumule 2000 pontos.', icon: '✨' },
];

export const mockUser: User = {
  id: 'user-1',
  username: 'Alex',
  email: 'alex@example.com',
  points: 275,
  badges: [mockBadges[0], mockBadges[2]],
};

const today = new Date();
const toYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Aprender React Avançado',
    description: 'Dominar Hooks, Context API, e performance optimization.',
    dueDate: new Date(today.getFullYear(), today.getMonth() + 2, 15).toISOString().split('T')[0],
    category: 'Desenvolvimento Pessoal',
    priority: GoalPriority.High,
    status: GoalStatus.InProgress,
    milestones: [
      { id: 'm-1-1', text: 'Concluir curso de Hooks', completed: true },
      { id: 'm-1-2', text: 'Criar um projeto com Context API', completed: true },
      { id: 'm-1-3', text: 'Estudar sobre React.memo e useMemo', completed: false },
      { id: 'm-1-4', text: 'Implementar virtualização de lista', completed: false },
    ],
  },
  {
    id: 'goal-2',
    title: 'Correr uma maratona de 5km',
    description: 'Treinar consistentemente para completar uma corrida de 5km sem parar.',
    dueDate: new Date(today.getFullYear(), today.getMonth() + 3, 1).toISOString().split('T')[0],
    category: 'Saúde & Fitness',
    priority: GoalPriority.Medium,
    status: GoalStatus.Todo,
    milestones: [
      { id: 'm-2-1', text: 'Comprar tênis de corrida', completed: true },
      { id: 'm-2-2', text: 'Correr 1km sem parar', completed: false },
      { id: 'm-2-3', text: 'Correr 3km sem parar', completed: false },
      { id: 'm-2-4', text: 'Correr 5km sem parar', completed: false },
    ],
  },
   {
    id: 'goal-3',
    title: 'Ler 12 livros no ano',
    description: 'Manter o hábito de leitura, lendo um livro por mês.',
    dueDate: new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0],
    category: 'Desenvolvimento Pessoal',
    priority: GoalPriority.Low,
    status: GoalStatus.Done,
    milestones: Array.from({length: 12}, (_, i) => ({ id: `m-3-${i+1}`, text: `Ler livro ${i+1}`, completed: i < 5 })),
  },
];

export const mockHabits: Habit[] = [
  {
    id: 'habit-1',
    name: 'Meditar 10 minutos',
    description: 'Praticar meditação mindfulness para melhorar o foco e reduzir o estresse.',
    frequency: HabitFrequency.Daily,
    reminderTime: '07:00',
    logs: [
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 5))) },
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 4))) },
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 3))) },
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 1))) },
    ],
  },
  {
    id: 'habit-2',
    name: 'Estudar Inglês',
    description: 'Fazer uma lição no Duolingo ou app similar.',
    frequency: HabitFrequency.Daily,
    reminderTime: '20:00',
    logs: Array.from({ length: 15 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (i + 1));
        return { date: toYYYYMMDD(d) };
    }),
  },
  {
    id: 'habit-3',
    name: 'Ir à academia',
    description: 'Treino de musculação focado em força.',
    frequency: HabitFrequency.Weekly,
    reminderTime: '18:00',
    logs: [
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 8))) },
        { date: toYYYYMMDD(new Date(new Date().setDate(today.getDate() - 2))) },
    ],
  },
];

export const mockSuggestedHabits: SuggestedHabit[] = [
    { id: 'sh-1', name: 'Beber 2L de água', description: 'Manter-se hidratado ao longo do dia para mais energia e saúde.', category: 'Saúde', frequency: HabitFrequency.Daily },
    { id: 'sh-2', name: 'Ler 10 páginas de um livro', description: 'Cultivar o hábito da leitura diária para expandir o conhecimento.', category: 'Desenvolvimento Pessoal', frequency: HabitFrequency.Daily },
    { id: 'sh-3', name: 'Caminhada de 30 minutos', description: 'Uma caminhada diária para melhorar a saúde cardiovascular e o humor.', category: 'Saúde & Fitness', frequency: HabitFrequency.Daily },
    { id: 'sh-4', name: 'Planejar o dia seguinte', description: 'Organizar as tarefas da noite para um dia mais produtivo.', category: 'Produtividade', frequency: HabitFrequency.Daily },
    { id: 'sh-5', name: 'Praticar gratidão', description: 'Anotar três coisas pelas quais você é grato para uma mentalidade positiva.', category: 'Bem-estar', frequency: HabitFrequency.Daily },
    { id: 'sh-6', name: 'Estudar um novo idioma por 15 min', description: 'Aprender vocabulário ou fazer uma lição rápida.', category: 'Aprendizado', frequency: HabitFrequency.Daily },
];

export const mockSuggestedGoals: SuggestedGoal[] = [
    { id: 'sg-1', title: 'Aprender a cozinhar 5 pratos novos', description: 'Expandir suas habilidades culinárias e ter mais opções para refeições caseiras.', category: 'Estilo de Vida' },
    { id: 'sg-2', title: 'Organizar o guarda-roupa', description: 'Separar roupas para doação e organizar o espaço para mais praticidade.', category: 'Organização' },
    { id: 'sg-3', title: 'Criar um orçamento mensal', description: 'Controlar suas finanças para economizar e atingir objetivos financeiros.', category: 'Finanças' },
    { id: 'sg-4', title: 'Fazer um curso online', description: 'Adquirir uma nova habilidade ou aprofundar-se em uma área de interesse.', category: 'Carreira' },
    { id: 'sg-5', title: 'Montar um jardim de ervas', description: 'Cultivar suas próprias ervas para usar na cozinha.', category: 'Hobbies' },
    { id: 'sg-6', title: 'Visitar um lugar novo na sua cidade', description: 'Explorar sua própria cidade e descobrir novos pontos turísticos ou parques.', category: 'Lazer' },
];
