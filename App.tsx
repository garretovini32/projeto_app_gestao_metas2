
import React, { useState } from 'react';
import { ViewType, Goal, Habit, User, SuggestedGoal, SuggestedHabit, GoalStatus, GoalPriority } from './types';
import { mockGoals, mockHabits, mockUser, mockBadges, mockSuggestedGoals, mockSuggestedHabits } from './data/mockData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import Habits from './components/Habits';
import Rewards from './components/Rewards';
import Library from './components/Library';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('DASHBOARD');
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [user, setUser] = useState<User>(mockUser);

  const handleAwardPoints = (points: number) => {
    setUser(prevUser => ({...prevUser, points: prevUser.points + points}));
    // Here you could add logic to check if a new badge is unlocked
  };
  
  const handleAddSuggestedGoal = (suggestedGoal: SuggestedGoal) => {
    const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        title: suggestedGoal.title,
        description: suggestedGoal.description,
        category: suggestedGoal.category,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0], // Default due date 3 months from now
        priority: GoalPriority.Medium,
        status: GoalStatus.Todo,
        milestones: [
            { id: `m-${Date.now()}-1`, text: 'Planejar primeiros passos', completed: false },
            { id: `m-${Date.now()}-2`, text: 'Atingir 50% do progresso', completed: false },
            { id: `m-${Date.now()}-3`, text: 'Finalizar a meta', completed: false },
        ]
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleAddSuggestedHabit = (suggestedHabit: SuggestedHabit) => {
    const newHabit: Habit = {
        id: `habit-${Date.now()}`,
        name: suggestedHabit.name,
        description: suggestedHabit.description,
        frequency: suggestedHabit.frequency,
        reminderTime: '08:00', // Default reminder
        logs: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const renderView = () => {
    switch (view) {
      case 'GOALS':
        return <Goals goals={goals} setGoals={setGoals} onAwardPoints={handleAwardPoints} />;
      case 'HABITS':
        return <Habits habits={habits} setHabits={setHabits} onAwardPoints={handleAwardPoints} />;
      case 'REWARDS':
        return <Rewards user={user} availableBadges={mockBadges} />;
      case 'LIBRARY':
        return <Library suggestedGoals={mockSuggestedGoals} suggestedHabits={mockSuggestedHabits} onAddGoal={handleAddSuggestedGoal} onAddHabit={handleAddSuggestedHabit} />;
      case 'DASHBOARD':
      default:
        return <Dashboard goals={goals} habits={habits} userName={user.username} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <Sidebar user={user} currentView={view} setView={setView} />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
