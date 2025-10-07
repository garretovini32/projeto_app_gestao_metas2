
export enum GoalStatus {
  Todo = 'A fazer',
  InProgress = 'Em progresso',
  Done = 'Concluída',
}

export enum GoalPriority {
  Low = 'Baixa',
  Medium = 'Média',
  High = 'Alta',
}

export enum HabitFrequency {
  Daily = 'Diário',
  Weekly = 'Semanal',
}

export interface Milestone {
  id: string;
  text: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: GoalPriority;
  status: GoalStatus;
  milestones: Milestone[];
}

export interface HabitLog {
  date: string; // YYYY-MM-DD
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: HabitFrequency;
  reminderTime: string;
  logs: HabitLog[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  badges: Badge[];
}

export type ViewType = 'DASHBOARD' | 'GOALS' | 'HABITS' | 'REWARDS' | 'LIBRARY';

export interface SuggestedHabit {
    id: string;
    name: string;
    description: string;
    category: string;
    frequency: HabitFrequency;
}

export interface SuggestedGoal {
    id: string;
    title: string;
    description: string;
    category: string;
}
