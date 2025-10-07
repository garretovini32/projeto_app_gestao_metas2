
import React from 'react';
import { Habit } from '../types';
import { calculateStreak, isHabitCompletedToday } from '../utils/habits';
import { FireIcon, PlusIcon } from './Icons';

interface HabitCardProps {
    habit: Habit;
    onToggle: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
    const { currentStreak } = calculateStreak(habit.logs);
    const completedToday = isHabitCompletedToday(habit.logs);

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg flex items-center justify-between">
            <div className="flex items-center">
                 <button 
                    onClick={() => onToggle(habit.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 ${completedToday ? 'bg-green-500' : 'border-2 border-gray-600 hover:bg-gray-700'}`}
                >
                    {completedToday ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                         <div className="w-5 h-5 rounded-full bg-transparent"></div>
                    )}
                </button>
                <div>
                    <h3 className="text-xl font-bold text-text-primary">{habit.name}</h3>
                    <p className="text-sm text-text-secondary">{habit.description}</p>
                </div>
            </div>
            <div className="flex items-center text-orange-400">
                <FireIcon className="w-6 h-6 mr-1" />
                <span className="text-xl font-bold">{currentStreak}</span>
            </div>
        </div>
    );
};


interface HabitsProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  onAwardPoints: (points: number) => void;
}

const toYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];

const Habits: React.FC<HabitsProps> = ({ habits, setHabits, onAwardPoints }) => {

    const handleToggleHabit = (habitId: string) => {
        const todayStr = toYYYYMMDD(new Date());
        setHabits(prevHabits => 
            prevHabits.map(habit => {
                if (habit.id === habitId) {
                    const completed = isHabitCompletedToday(habit.logs);
                    if (!completed) {
                        onAwardPoints(10);
                    }
                    const newLogs = completed
                        ? habit.logs.filter(log => log.date !== todayStr)
                        : [...habit.logs, { date: todayStr }];
                    return { ...habit, logs: newLogs };
                }
                return habit;
            })
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Meus Hábitos</h1>
                    <p className="text-text-secondary mt-1">Construa consistência dia a dia.</p>
                </div>
                <button className="flex items-center bg-primary hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Novo Hábito
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {habits.map(habit => (
                    <HabitCard key={habit.id} habit={habit} onToggle={handleToggleHabit} />
                ))}
            </div>
        </div>
    );
};

export default Habits;
