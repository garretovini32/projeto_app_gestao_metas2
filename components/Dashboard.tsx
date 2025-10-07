
import React, { useMemo, useState } from 'react';
import { Goal, Habit, GoalStatus } from '../types';
import { calculateStreak } from '../utils/habits';
import { FireIcon, TargetIcon, CheckCircleIcon, ChartBarIcon, LightbulbIcon } from './Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAIInsights } from '../utils/gemini';

interface DashboardProps {
  goals: Goal[];
  habits: Habit[];
  userName: string;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
  <div className="bg-surface p-6 rounded-xl flex items-center shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-text-secondary text-sm font-medium">{title}</p>
      <p className="text-text-primary text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const toYYYYMMDD = (d: Date) => d.toISOString().split('T')[0];

const Dashboard: React.FC<DashboardProps> = ({ goals, habits, userName }) => {
  const stats = useMemo(() => {
    const todayStr = toYYYYMMDD(new Date());
    const activeGoals = goals.filter(g => g.status !== GoalStatus.Done).length;
    const completedGoals = goals.length - activeGoals;
    const habitsCompletedToday = habits.filter(h => h.logs.some(l => l.date === todayStr)).length;
    const totalActiveHabits = habits.length;
    const longestStreak = Math.max(...habits.map(h => calculateStreak(h.logs).currentStreak), 0);
    return { activeGoals, completedGoals, habitsCompletedToday, totalActiveHabits, longestStreak };
  }, [goals, habits]);

  const habitChartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = toYYYYMMDD(date);
      const completedCount = habits.filter(h => h.logs.some(l => l.date === dateStr)).length;
      data.push({
        name: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        completos: completedCount,
      });
    }
    return data;
  }, [habits]);

  const [insights, setInsights] = useState<string>('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState<string>('');

  const handleGenerateInsights = async () => {
    setIsLoadingInsights(true);
    setInsightsError('');
    setInsights('');
    try {
      const result = await getAIInsights(goals, habits);
      setInsights(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
      setInsightsError(`Erro ao gerar análise: ${errorMessage}`);
      console.error(error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Bem-vindo(a) de volta, {userName}!</h1>
        <p className="text-text-secondary mt-1">Aqui está um resumo do seu progresso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<TargetIcon className="w-6 h-6 text-white" />} title="Metas Ativas" value={stats.activeGoals} color="bg-blue-500" />
        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-white" />} title="Metas Concluídas" value={stats.completedGoals} color="bg-green-500" />
        <StatCard icon={<CheckCircleIcon className="w-6 h-6 text-white" />} title="Hábitos Completos Hoje" value={`${stats.habitsCompletedToday} / ${stats.totalActiveHabits}`} color="bg-pink-500" />
        <StatCard icon={<FireIcon className="w-6 h-6 text-white" />} title="Maior Streak" value={`${stats.longestStreak} dias`} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-surface p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center"><ChartBarIcon className="w-6 h-6 mr-2" /> Atividade de Hábitos (Últimos 7 Dias)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F9FAFB' }}
                cursor={{fill: '#374151'}}
              />
              <Bar dataKey="completos" name="Hábitos Completos" fill="#4F46E5">
                 {habitChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completos > 0 ? '#4F46E5' : '#374151'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-surface p-6 rounded-xl shadow-lg">
           <h2 className="text-xl font-bold text-text-primary mb-4">Metas em Progresso</h2>
           <div className="space-y-4">
              {goals.filter(g => g.status === GoalStatus.InProgress).slice(0, 4).map(goal => (
                  <div key={goal.id}>
                      <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-text-primary">{goal.title}</span>
                          <span className="text-sm text-text-secondary">{Math.round((goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100}%` }}></div>
                      </div>
                  </div>
              ))}
              {goals.filter(g => g.status === GoalStatus.InProgress).length === 0 && (
                  <p className="text-text-secondary text-center py-8">Nenhuma meta em progresso.</p>
              )}
           </div>
        </div>
      </div>
      
      <div className="bg-surface p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center"><LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" /> Insights com IA</h2>
        {!insights && !isLoadingInsights && !insightsError && (
          <div className="text-center py-4">
            <p className="text-text-secondary mb-4">Receba dicas personalizadas com base em suas metas e hábitos para otimizar seu progresso.</p>
            <button
              onClick={handleGenerateInsights}
              className="bg-accent hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Gerar Análise
            </button>
          </div>
        )}
        {isLoadingInsights && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="ml-4 text-text-secondary">Analisando seus dados...</p>
          </div>
        )}
        {insightsError && <p className="text-red-500 text-center py-4">{insightsError}</p>}
        {insights && (
          <div className="text-text-secondary space-y-3 prose prose-invert prose-p:my-1 mt-4">
            {insights.split('\n').filter(line => line.trim() !== '').map((line, index) => (
              <p key={index} className="flex items-start">
                <span className="text-accent mr-3 mt-1">◆</span>
                <span>{line.replace(/^\s*[\*-]\s*/, '')}</span>
              </p>
            ))}
             <button onClick={handleGenerateInsights} disabled={isLoadingInsights} className="text-sm text-accent mt-4 hover:underline">
                {isLoadingInsights ? 'Analisando...' : 'Gerar Novamente'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
