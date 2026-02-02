
import React from 'react';
import { X, FileText, Camera, Film, Monitor, Video, Sparkles, Plus, Crown, Heart } from 'lucide-react';
import { MediaType } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'blog' | 'media', mediaType?: MediaType) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-pink-900/40 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-kingdom-plum rounded-[3rem] md:rounded-[4rem] border-4 md:border-8 border-pink-200 dark:border-pink-900 shadow-[0_32px_64px_-12px_rgba(244,114,182,0.4)] animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
          <Sparkles size={300} />
        </div>
        <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none -rotate-12">
          <Crown size={300} />
        </div>

        {/* Header */}
        <div className="relative p-8 md:p-12 pb-0 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-pink-50 dark:bg-pink-900/50 text-pink-400 dark:text-pink-300 rounded-full hover:bg-pink-500 dark:hover:bg-pink-600 hover:text-white transition-all shadow-sm z-20"
          >
            <X size={28} />
          </button>
          
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-pink-100 dark:bg-pink-900/40 rounded-full text-xs font-bold uppercase tracking-widest text-pink-500 dark:text-pink-300 mb-6 animate-float">
            <Heart size={14} fill="currentColor" /> The Imperial Studio
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display text-pink-500 dark:text-pink-400 uppercase tracking-tighter mb-4">
            Broadcast to the Empire
          </h2>
          <p className="text-pink-400 dark:text-pink-300/80 font-rounded text-lg md:text-xl max-w-2xl mx-auto italic">
            "What are we airing today, darling? Every slay counts." ✨
          </p>
        </div>

        {/* Choices Grid */}
        <div className="relative p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ChoiceCard 
            icon={<FileText size={48} />} 
            title="Imperial Bulletin" 
            desc="Write a blog post with text & imagery" 
            color="pink" 
            onClick={() => onSelect('blog')} 
          />
          <ChoiceCard 
            icon={<Camera size={48} />} 
            title="Imperial Gallery" 
            desc="Capture a high-definition photo" 
            color="blue" 
            onClick={() => onSelect('media', 'photo')} 
          />
          <ChoiceCard 
            icon={<Film size={48} />} 
            title="Imperial Movie" 
            desc="Premiere a cinematic masterpiece" 
            color="purple" 
            onClick={() => onSelect('media', 'movie')} 
          />
          <ChoiceCard 
            icon={<Monitor size={48} />} 
            title="Kingdom TV" 
            desc="Air a new series or episode" 
            color="indigo" 
            onClick={() => onSelect('media', 'tv')} 
          />
          <ChoiceCard 
            icon={<Video size={48} />} 
            title="Short Clip" 
            desc="Upload a quick video or loop" 
            color="red" 
            onClick={() => onSelect('media', 'video')} 
          />
          <div className="hidden lg:flex group items-center justify-center bg-pink-50/30 dark:bg-pink-900/10 rounded-[3rem] border-4 border-dashed border-pink-100 dark:border-pink-900/30 relative overflow-hidden transition-all hover:border-pink-300">
             <div className="text-center opacity-40 group-hover:opacity-100 transition-opacity">
                <Plus size={48} className="mx-auto text-pink-300 mb-2 group-hover:rotate-90 transition-transform" />
                <p className="text-xs font-bold uppercase tracking-widest text-pink-400">Coming Soon</p>
             </div>
          </div>
        </div>
        
        <div className="p-8 text-center bg-pink-50/50 dark:bg-kingdom-plum/50 border-t border-pink-100 dark:border-pink-900/30">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300 dark:text-pink-600">
            Sovereign Creator Guidelines Apply xoxo
          </p>
        </div>
      </div>
    </div>
  );
};

const ChoiceCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string, onClick: () => void }> = ({ icon, title, desc, color, onClick }) => {
  const colorMap = {
    pink: 'from-pink-400 to-pink-300 text-pink-500 dark:text-pink-300 border-pink-100 dark:border-pink-900/30 bg-pink-50 dark:bg-kingdom-plum/60 hover:border-pink-400',
    blue: 'from-blue-400 to-blue-300 text-blue-500 dark:text-blue-300 border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-400',
    purple: 'from-purple-400 to-purple-300 text-purple-500 dark:text-purple-300 border-purple-100 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-900/20 hover:border-purple-400',
    indigo: 'from-indigo-400 to-indigo-300 text-indigo-500 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/30 bg-indigo-50 dark:bg-indigo-900/20 hover:border-indigo-400',
    red: 'from-red-400 to-red-300 text-red-500 dark:text-red-300 border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 hover:border-red-400',
    yellow: 'from-yellow-400 to-yellow-300 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-400',
  };

  const selectedColor = colorMap[color as keyof typeof colorMap];

  return (
    <button 
      onClick={onClick}
      className={`group flex flex-col items-center text-center p-8 rounded-[3rem] border-4 border-dashed transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-2xl ${selectedColor}`}
    >
      <div className="mb-4 p-6 rounded-full bg-white dark:bg-kingdom-plum shadow-lg group-hover:rotate-12 transition-transform border border-pink-100 dark:border-pink-900/30">
        {icon}
      </div>
      <h3 className="text-2xl font-display uppercase mb-2 tracking-tight">{title}</h3>
      <p className="text-sm font-rounded opacity-80 leading-snug">{desc}</p>
    </button>
  );
};

export default UploadModal;
