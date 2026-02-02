
import React, { useState } from 'react';
import { Save, X, Globe, Crown, Award, Zap, Mail, Layout, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { PressContent } from '../types';

interface PressEditorProps {
  initialContent: PressContent;
  onSave: (content: PressContent) => void;
  onCancel: () => void;
}

const PressEditor: React.FC<PressEditorProps> = ({ initialContent, onSave, onCancel }) => {
  const [content, setContent] = useState<PressContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleNetworkCardChange = (index: number, field: string, value: string) => {
    const updatedCards = [...content.networkCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setContent({ ...content, networkCards: updatedCards });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(content);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pb-24">
      <div className="glass-card rounded-[4rem] p-8 md:p-14 border-4 border-dashed border-pink-200 shadow-2xl relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-pink-500 p-4 rounded-full text-white shadow-xl rotate-6">
            <Globe size={36} />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-display text-pink-500 uppercase tracking-tighter">Imperial Press Office</h2>
            <p className="text-pink-400 font-rounded font-medium italic">"Managing the Narrative of the Empire." ✨</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Hero Section Editing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="font-display text-pink-500 uppercase flex items-center gap-2"><Crown size={20} /> Hero Section</h3>
              
              <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Empire Title</label>
                <input 
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                />
              </div>

              <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Hero Tagline</label>
                <input 
                  value={content.heroTagline}
                  onChange={(e) => setContent({ ...content, heroTagline: e.target.value })}
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                />
              </div>

              <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Intro Paragraph</label>
                <textarea 
                  rows={4}
                  value={content.heroIntro}
                  onChange={(e) => setContent({ ...content, heroIntro: e.target.value })}
                  className="w-full px-8 py-6 rounded-[2rem] border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="font-display text-pink-500 uppercase flex items-center gap-2"><ImageIcon size={20} /> Imperial Imagery</h3>
               
               <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Hero Image URL</label>
                <input 
                  value={content.heroImageUrl}
                  onChange={(e) => setContent({ ...content, heroImageUrl: e.target.value })}
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                />
              </div>

              <div className="aspect-[4/5] max-w-xs mx-auto rounded-[3rem] overflow-hidden border-4 border-pink-100 shadow-xl">
                <img src={content.heroImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Network Cards Editing */}
          <div className="space-y-8">
            <h3 className="font-display text-pink-500 uppercase flex items-center gap-2"><Award size={20} /> Media Ecosystem</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {content.networkCards.map((card, i) => (
                <div key={i} className="p-8 bg-pink-50/50 dark:bg-kingdom-plum/40 rounded-[3rem] border-2 border-pink-100 space-y-4 shadow-inner">
                  <div className="text-pink-400 font-bold uppercase text-[10px] tracking-widest">Subsidiary {i + 1}</div>
                  <input 
                    placeholder="Brand Title"
                    value={card.title}
                    onChange={(e) => handleNetworkCardChange(i, 'title', e.target.value)}
                    className="w-full px-6 py-4 rounded-full bg-white dark:bg-kingdom-plum border-2 border-pink-50 outline-none text-pink-600 font-bold"
                  />
                  <input 
                    placeholder="Brand Tagline"
                    value={card.tagline}
                    onChange={(e) => handleNetworkCardChange(i, 'tagline', e.target.value)}
                    className="w-full px-6 py-4 rounded-full bg-white dark:bg-kingdom-plum border-2 border-pink-50 outline-none text-pink-400 italic text-sm"
                  />
                  <textarea 
                    placeholder="Brand Description"
                    rows={2}
                    value={card.desc}
                    onChange={(e) => handleNetworkCardChange(i, 'desc', e.target.value)}
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-white dark:bg-kingdom-plum border-2 border-pink-50 outline-none text-gray-500 text-sm resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Pitch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="font-display text-pink-500 uppercase flex items-center gap-2"><Zap size={20} /> Partnership Pitch</h3>
              
              <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Collab Title</label>
                <input 
                  value={content.collabPitchTitle}
                  onChange={(e) => setContent({ ...content, collabPitchTitle: e.target.value })}
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                />
              </div>

              <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Collab Description</label>
                <textarea 
                  rows={4}
                  value={content.collabPitchDesc}
                  onChange={(e) => setContent({ ...content, collabPitchDesc: e.target.value })}
                  className="w-full px-8 py-6 rounded-[2rem] border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="font-display text-pink-500 uppercase flex items-center gap-2"><Mail size={20} /> Imperial Contact</h3>
               
               <div>
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-[10px] tracking-widest">Contact Email</label>
                <input 
                  type="email"
                  value={content.contactEmail}
                  onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-10">
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 py-8 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 text-white font-display text-3xl rounded-full shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4 border-8 border-white/20 disabled:opacity-50"
            >
              {isSaving ? <><Loader2 className="animate-spin" size={36} /> Archiving...</> : <><Sparkles size={36} /> Codify Decrees ✨</>}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-16 py-8 bg-white dark:bg-kingdom-plum text-pink-400 dark:text-pink-300 border-4 border-white dark:border-pink-900/30 rounded-full font-display text-xl hover:bg-pink-50 transition-all active:scale-95 shadow-xl"
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PressEditor;
