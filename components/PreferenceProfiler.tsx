
import React, { useState } from 'react';
import { Sparkles, Heart, Star, Send, Loader2, RefreshCw, Crown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PreferenceProfiler: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I told you: "${input}". 
        Tell me "What do I like?" based on this, in a 2011 babygirl aesthetic style. 
        Analyze my vibe, suggest 3 specific aesthetic categories from the ISSB Kingdom (like "Softcore Sparkle", "Soft Grunge", "2011 Cinema", etc.), 
        and give me a "Imperial Citizen Rank". 
        Be ultra-dramatic, supportive, and use emojis. Keep it under 100 words.`,
      });
      setAnalysis(response.text);
    } catch (err) {
      setAnalysis("The crystal ball is lagging, but I can tell you have immaculate taste! ✨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto glass-card rounded-[4rem] p-10 md:p-16 border-4 border-dashed border-pink-300 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10 rotate-12 scale-150">
          <Heart size={200} fill="#ffb7ce" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-display text-pink-500 uppercase mb-6 tracking-tight">What do I like?</h2>
        <p className="text-xl text-pink-400 font-rounded mb-10 max-w-xl mx-auto">Tell the Oracle about your favorite things, movies, colors, or moods, and we'll build your Imperial Profile. ✨</p>
        
        <form onSubmit={handleAnalyze} className="relative max-w-2xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I love glitter, High School Musical, pink ribbons, and 2000s youth clubs..."
            className="w-full px-10 py-8 rounded-[3rem] border-4 border-pink-100 focus:border-pink-300 outline-none bg-white/60 text-pink-600 font-medium placeholder:text-pink-200 text-lg shadow-inner min-h-[150px] resize-none transition-all"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="absolute bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-5 rounded-full shadow-2xl transition-all active:scale-90 disabled:opacity-30 flex items-center gap-2 font-display uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <><Sparkles size={24} /> Reveal My Slay</>}
          </button>
        </form>

        {analysis && (
          <div className="mt-12 p-10 bg-white rounded-[3rem] border-4 border-pink-100 shadow-2xl animate-float relative overflow-hidden group">
            <div className="absolute top-4 left-4 bg-pink-500 text-white p-2 rounded-full shadow-lg -rotate-12"><Crown size={20} /></div>
            <p className="text-xl md:text-2xl font-rounded text-pink-600 leading-relaxed italic">
              {analysis}
            </p>
            <button 
              onClick={() => { setAnalysis(null); setInput(''); }}
              className="mt-8 text-pink-300 hover:text-pink-500 text-sm font-bold flex items-center gap-1 mx-auto transition-colors"
            >
              Reset My Vibe <RefreshCw size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreferenceProfiler;
