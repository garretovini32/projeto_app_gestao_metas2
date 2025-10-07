
import React, { useState } from 'react';
import { SuggestedGoal, SuggestedHabit } from '../types';
import { PlusIcon } from './Icons';

interface LibraryProps {
  suggestedGoals: SuggestedGoal[];
  suggestedHabits: SuggestedHabit[];
  onAddGoal: (goal: SuggestedGoal) => void;
  onAddHabit: (habit: SuggestedHabit) => void;
}

const Library: React.FC<LibraryProps> = ({ suggestedGoals, suggestedHabits, onAddGoal, onAddHabit }) => {
  const [activeTab, setActiveTab] = useState<'habits' | 'goals'>('habits');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddGoal = (goal: SuggestedGoal) => {
    onAddGoal(goal);
    setAddedItems(prev => new Set(prev).add(goal.id));
  };
  
  const handleAddHabit = (habit: SuggestedHabit) => {
    onAddHabit(habit);
    setAddedItems(prev => new Set(prev).add(habit.id));
  };

  const renderTabs = () => (
    <div className="flex border-b border-gray-700 mb-6">
      <button
        onClick={() => setActiveTab('habits')}
        className={`px-4 py-2 text-lg font-medium transition-colors ${
          activeTab === 'habits'
            ? 'border-b-2 border-primary text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        Hábitos Sugeridos
      </button>
      <button
        onClick={() => setActiveTab('goals')}
        className={`px-4 py-2 text-lg font-medium transition-colors ${
          activeTab === 'goals'
            ? 'border-b-2 border-primary text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        Metas Sugeridas
      </button>
    </div>
  );
  
  const renderHabits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {suggestedHabits.map(habit => (
        <div key={habit.id} className="bg-surface p-6 rounded-xl shadow-lg flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
          <div>
            <span className="text-xs font-semibold bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">{habit.category}</span>
            <h3 className="text-xl font-bold text-text-primary mt-3">{habit.name}</h3>
            <p className="text-text-secondary my-2 text-sm flex-grow">{habit.description}</p>
          </div>
          <button
            onClick={() => handleAddHabit(habit)}
            disabled={addedItems.has(habit.id)}
            className="w-full mt-4 flex items-center justify-center bg-primary hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {addedItems.has(habit.id) ? 'Adicionado' : 'Adicionar'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderGoals = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {suggestedGoals.map(goal => (
        <div key={goal.id} className="bg-surface p-6 rounded-xl shadow-lg flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
          <div>
            <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{goal.category}</span>
            <h3 className="text-xl font-bold text-text-primary mt-3">{goal.title}</h3>
            <p className="text-text-secondary my-2 text-sm flex-grow">{goal.description}</p>
          </div>
          <button
            onClick={() => handleAddGoal(goal)}
            disabled={addedItems.has(goal.id)}
            className="w-full mt-4 flex items-center justify-center bg-primary hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {addedItems.has(goal.id) ? 'Adicionado' : 'Adicionar'}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold text-text-primary">Biblioteca de Sugestões</h1>
        <p className="text-text-secondary mt-1">Encontre inspiração para seus próximos objetivos.</p>
      </div>
      {renderTabs()}
      <div>
        {activeTab === 'habits' ? renderHabits() : renderGoals()}
      </div>
    </div>
  );
};

export default Library;
