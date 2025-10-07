
import React, { useState } from 'react';
import { Goal, GoalStatus, GoalPriority, Milestone } from '../types';
import { PlusIcon } from './Icons';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (updatedGoal: Goal) => void;
  onAwardPoints: (points: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate, onAwardPoints }) => {
  const progress = Math.round((goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100) || 0;

  const handleMilestoneToggle = (milestoneId: string) => {
    const isCompleting = !goal.milestones.find(m => m.id === milestoneId)?.completed;
    if (isCompleting) {
        onAwardPoints(25);
    }
    
    const updatedMilestones = goal.milestones.map(m =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    onUpdate({ ...goal, milestones: updatedMilestones });
  };
  
  const statusColor = {
    [GoalStatus.Todo]: 'bg-gray-500',
    [GoalStatus.InProgress]: 'bg-blue-500',
    [GoalStatus.Done]: 'bg-green-500',
  };

  const priorityColor = {
      [GoalPriority.Low]: 'border-green-500',
      [GoalPriority.Medium]: 'border-yellow-500',
      [GoalPriority.High]: 'border-red-500',
  }

  return (
    <div className={`bg-surface p-6 rounded-xl shadow-lg border-l-4 ${priorityColor[goal.priority]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-text-primary">{goal.title}</h3>
          <p className="text-sm text-text-secondary mt-1">{goal.category} - Vence em {new Date(goal.dueDate).toLocaleDateString('pt-BR')}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor[goal.status]}`}>
            {goal.status}
        </span>
      </div>
      <p className="text-text-secondary my-4">{goal.description}</p>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-text-secondary">Progresso</span>
          <span className="text-sm font-medium text-text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-text-primary mb-2">Marcos:</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {goal.milestones.map(milestone => (
            <div key={milestone.id} className="flex items-center">
              <input
                type="checkbox"
                id={`milestone-${milestone.id}`}
                checked={milestone.completed}
                onChange={() => handleMilestoneToggle(milestone.id)}
                className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor={`milestone-${milestone.id}`} className={`ml-2 text-sm ${milestone.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                {milestone.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


interface GoalsProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  onAwardPoints: (points: number) => void;
}

const Goals: React.FC<GoalsProps> = ({ goals, setGoals, onAwardPoints }) => {
  
  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(prevGoals => prevGoals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-text-primary">Minhas Metas</h1>
            <p className="text-text-secondary mt-1">Acompanhe e gerencie seus objetivos.</p>
        </div>
        <button className="flex items-center bg-primary hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Meta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onUpdate={handleUpdateGoal} onAwardPoints={onAwardPoints} />
        ))}
      </div>
    </div>
  );
};

export default Goals;
