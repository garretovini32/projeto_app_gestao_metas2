
import React from 'react';
import { User, Badge } from '../types';

interface RewardsProps {
  user: User;
  availableBadges: Badge[];
}

const Rewards: React.FC<RewardsProps> = ({ user, availableBadges }) => {
  const userBadgeIds = new Set(user.badges.map(b => b.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Conquistas e Recompensas</h1>
        <p className="text-text-secondary mt-1">Veja seu progresso e as medalhas que você ganhou!</p>
      </div>

      <div className="bg-surface p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <p className="text-text-secondary font-medium">Seus Pontos</p>
        <p className="text-6xl font-bold text-primary my-2">{user.points}</p>
        <p className="text-text-secondary">Continue assim para desbloquear mais recompensas!</p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Medalhas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {availableBadges.map(badge => {
            const earned = userBadgeIds.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`bg-gray-800 p-4 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1 ${
                  earned ? 'border-2 border-yellow-400 shadow-yellow-400/20 shadow-lg' : 'opacity-50 grayscale'
                }`}
              >
                <div className="text-5xl mb-2 flex items-center justify-center h-14">{badge.icon}</div>
                <h3 className="font-bold text-text-primary">{badge.name}</h3>
                <p className="text-xs text-text-secondary mt-1 h-10">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
