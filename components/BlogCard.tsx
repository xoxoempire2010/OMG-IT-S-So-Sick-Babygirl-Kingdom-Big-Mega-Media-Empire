
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Tag, Calendar, ChevronRight, Share2, X, Copy, Twitter, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard! ✨');
  };

  return (
    <>
      <div 
        onClick={() => onClick(post.id)}
        className="group cursor-pointer bg-white dark:bg-kingdom-plum rounded-[2rem] overflow-hidden border-2 border-pink-100 dark:border-pink-900/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-pink-400 dark:bg-pink-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              {post.category}
            </span>
          </div>
          
          <button 
            onClick={handleShare}
            className="absolute top-4 right-4 bg-white/90 dark:bg-kingdom-plum/90 backdrop-blur-sm text-pink-500 dark:text-pink-300 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 border border-pink-50 dark:border-pink-900/30 z-10"
            title="Share the Slay"
          >
            <Share2 size={16} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-pink-300 dark:text-pink-400/60 text-xs mb-3">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          
          <h3 className="text-xl font-display text-pink-600 dark:text-pink-400 mb-3 group-hover:text-pink-500 dark:group-hover:text-pink-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-500 dark:text-pink-100/60 text-sm mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] bg-blue-50 dark:bg-blue-900/40 text-blue-400 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="text-pink-400 dark:text-pink-500 group-hover:translate-x-1 transition-transform">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pink-900/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={(e) => { e.stopPropagation(); setIsShareModalOpen(false); }}
        >
          <div 
            className="bg-white dark:bg-kingdom-plum rounded-[3rem] p-10 max-w-sm w-full border-4 border-pink-200 dark:border-pink-900 shadow-2xl relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-pink-50 dark:bg-pink-900/50 text-pink-400 dark:text-pink-300 rounded-full hover:bg-pink-500 dark:hover:bg-pink-400 hover:text-white transition-all shadow-sm"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <div className="bg-pink-100 dark:bg-pink-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Share2 size={32} className="text-pink-500 dark:text-pink-300" />
              </div>
              <h3 className="text-2xl font-display text-pink-500 dark:text-pink-400 uppercase tracking-tight">Broadcast Bulletin</h3>
              <p className="text-pink-400 dark:text-pink-300/60 text-sm font-rounded italic">Spread the imperial wisdom ✨</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ShareOption 
                icon={<Copy size={20} />} 
                label="Copy Link" 
                color="bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300 border-blue-100 dark:border-blue-800" 
                onClick={copyToClipboard} 
              />
              <ShareOption 
                icon={<Twitter size={20} />} 
                label="Twitter" 
                color="bg-sky-50 dark:bg-sky-900/30 text-sky-500 dark:text-sky-300 border-sky-100 dark:border-sky-800" 
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=Reading about ${post.title} in the ISSB Kingdom! ✨`)} 
              />
              <ShareOption 
                icon={<MessageSquare size={20} />} 
                label="Tumblr" 
                color="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800" 
                onClick={() => window.open(`https://tumblr.com/share`)} 
              />
              <ShareOption 
                icon={<ExternalLink size={20} />} 
                label="Open Page" 
                color="bg-pink-50 dark:bg-pink-900/30 text-pink-500 dark:text-pink-300 border-pink-100 dark:border-pink-800" 
                onClick={() => { setIsShareModalOpen(false); onClick(post.id); }} 
              />
            </div>
            
            <div className="mt-8 pt-8 border-t border-pink-50 dark:border-pink-900/30 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 dark:bg-pink-900/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-pink-400 dark:text-pink-300">
                <Sparkles size={12} /> xoxo Babygirl Kingdom
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ShareOption: React.FC<{ icon: React.ReactNode, label: string, color: string, onClick: (e: React.MouseEvent) => void }> = ({ icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] border-2 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${color}`}
  >
    <div className="p-2 bg-white dark:bg-kingdom-plum rounded-full shadow-sm">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default BlogCard;
