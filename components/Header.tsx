
import React from 'react';
import { Heart, Sparkles, Camera, Map, Home, Film, Tv, Plus, ShoppingBag, Users, Mail, Moon, Sun, Newspaper } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onUpload?: () => void;
  activePage: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onUpload, activePage, isDarkMode, onToggleTheme }) => {
  const isUploadPage = activePage === 'upload';

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b-4 border-pink-200 dark:border-pink-900/50 py-4 px-6 md:px-12 flex flex-col xl:flex-row items-center justify-between gap-6 shadow-md">
      <div 
        onClick={() => onNavigate('home')} 
        className="cursor-pointer flex items-center gap-2 group shrink-0"
      >
        <div className="bg-gradient-to-tr from-pink-400 to-pink-300 dark:from-pink-600 dark:to-pink-500 p-2.5 rounded-full text-white transform group-hover:rotate-12 transition-transform shadow-sm">
          <Sparkles size={24} />
        </div>
        <h1 className="text-xl md:text-2xl font-display text-pink-500 dark:text-pink-400 tracking-tighter hover:text-pink-600 dark:hover:text-pink-300 transition-colors uppercase text-center lg:text-left">
          OMG IT'S So Sick Babygirl Kingdom <span className="hidden sm:inline">BIG MEDIA MEGA EMPIRE</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
        <nav className="flex items-center gap-1 md:gap-2 bg-pink-50 dark:bg-kingdom-plum p-1.5 rounded-full border border-pink-100 dark:border-pink-900/30 overflow-x-auto no-scrollbar max-w-[90vw] sm:max-w-full">
          <NavItem 
            icon={<Home size={18} />} 
            label="Home" 
            active={activePage === 'home'} 
            onClick={() => onNavigate('home')} 
          />
          <NavItem 
            icon={<Heart size={18} />} 
            label="Blog" 
            active={activePage === 'blog'} 
            onClick={() => onNavigate('blog')} 
          />
          <NavItem 
            icon={<Film size={18} />} 
            label="Cinema" 
            active={activePage === 'cinema'} 
            onClick={() => onNavigate('cinema')} 
          />
          <NavItem 
            icon={<Newspaper size={18} />} 
            label="Press" 
            active={activePage === 'press'} 
            onClick={() => onNavigate('press')} 
          />
          <NavItem 
            icon={<ShoppingBag size={18} />} 
            label="Mall" 
            active={activePage === 'mall'} 
            onClick={() => onNavigate('mall')} 
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Clubs" 
            active={activePage === 'clubs'} 
            onClick={() => onNavigate('clubs')} 
          />
          <NavItem 
            icon={<Mail size={18} />} 
            label="Contact" 
            active={activePage === 'contact'} 
            onClick={() => onNavigate('contact')} 
          />
          <NavItem 
            icon={<Camera size={18} />} 
            label="Oracle" 
            active={activePage === 'oracle'} 
            onClick={() => onNavigate('oracle')} 
          />
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleTheme}
            className="p-3 bg-pink-50 dark:bg-kingdom-plum rounded-full border border-pink-100 dark:border-pink-900/30 text-pink-400 dark:text-pink-300 hover:scale-110 active:scale-95 transition-all shadow-sm"
            title={isDarkMode ? "Switch to Sun" : "Switch to Moon"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={isUploadPage ? undefined : (onUpload || (() => onNavigate('upload')))}
            className={`relative group flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs tracking-widest uppercase transition-all shrink-0 overflow-hidden ${
              isUploadPage
                ? 'bg-pink-700 text-white cursor-default opacity-90'
                : 'bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 dark:from-pink-600 dark:via-pink-500 dark:to-pink-600 bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 text-white shadow-xl hover:-translate-y-1 active:scale-95'
            }`}
          >
            <div className={`absolute inset-0 bg-white/20 opacity-0 transition-opacity ${!isUploadPage && 'group-hover:opacity-100 animate-pulse'}`}></div>
            <Plus size={16} strokeWidth={3} className={`relative z-10 transition-transform ${!isUploadPage && 'group-hover:rotate-90'}`} />
            <span className="relative z-10">Slay the Throne</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
      active 
        ? 'bg-white dark:bg-pink-600 text-pink-500 dark:text-white shadow-md border border-pink-200 dark:border-pink-500 scale-105' 
        : 'hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-400 dark:text-pink-300'
    }`}
  >
    <span className={`${active ? 'scale-110' : ''} transition-transform`}>{icon}</span>
    <span className="hidden md:inline uppercase text-[9px] tracking-widest font-extrabold">{label}</span>
  </button>
);

export default Header;
