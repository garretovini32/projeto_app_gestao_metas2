
import React from 'react';
import { User, ViewType } from '../types';
import { DashboardIcon, RepeatIcon, TargetIcon, AwardIcon, LibraryIcon } from './Icons';

interface SidebarProps {
  user: User;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setView }) => {
  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: DashboardIcon },
    { id: 'GOALS', label: 'Metas', icon: TargetIcon },
    { id: 'HABITS', label: 'Hábitos', icon: RepeatIcon },
    { id: 'REWARDS', label: 'Conquistas', icon: AwardIcon },
    { id: 'LIBRARY', label: 'Biblioteca', icon: LibraryIcon },
  ];

  return (
    <aside className="w-64 bg-surface flex flex-col p-4 border-r border-gray-700">
      <div className="flex items-center mb-10">
        <div className="bg-primary p-2 rounded-lg mr-3">
          <TargetIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Zenith</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setView(item.id as ViewType)}
                className={`w-full flex items-center p-3 my-1 rounded-lg text-left text-base font-medium transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-gray-700 hover:text-text-primary'
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="flex items-center p-2">
          <img
            src={`https://i.pravatar.cc/150?u=${user.email}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-text-primary">{user.username}</p>
            <p className="text-sm text-text-secondary">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
