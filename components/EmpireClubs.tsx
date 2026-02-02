
import React from 'react';
import { Users, Crown, Sparkles, Heart, ShieldCheck, Star, Shield, Play } from 'lucide-react';

const EmpireClubs: React.FC = () => {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-display text-pink-500 uppercase tracking-tighter mb-4">Empire Clubs</h2>
        <p className="text-pink-400 font-rounded text-lg max-w-2xl mx-auto">Join the inner circle. Your status in the Kingdom is everything. ✨</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Free Club */}
        <div className="glass-card rounded-[4rem] p-10 md:p-16 border-4 border-pink-100 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
            <Users size={200} />
          </div>
          <div className="bg-pink-100 p-6 rounded-full text-pink-500 mb-8 shadow-sm">
            <Users size={48} />
          </div>
          <h3 className="text-4xl font-display text-pink-600 uppercase mb-4">Free Media Club</h3>
          <p className="text-pink-400 font-medium mb-10 max-w-md">The standard membership for all sovereign citizens. Access to the basic media library and archives.</p>
          
          <ul className="space-y-4 mb-12 text-left w-full max-w-sm">
            <li className="flex items-center gap-3 text-pink-500 font-bold"><Sparkles size={18} /> Basic Cinema Access</li>
            <li className="flex items-center gap-3 text-pink-500 font-bold"><Sparkles size={18} /> Community Chat Room</li>
            <li className="flex items-center gap-3 text-pink-500 font-bold"><Sparkles size={18} /> Standard Production Tools</li>
            <li className="flex items-center gap-3 text-pink-200 font-bold line-through"><Star size={18} /> VIP Early Access</li>
          </ul>

          <button className="w-full py-5 bg-pink-500 text-white rounded-full font-display text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95">
            Member Dashboard
          </button>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-pink-300 font-bold">Standard Citizen Level</p>
        </div>

        {/* VIP Club */}
        <div className="bg-white rounded-[4rem] p-10 md:p-16 border-4 border-indigo-200 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 via-transparent to-pink-50/50"></div>
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:-rotate-12 transition-transform">
            <Crown size={200} />
          </div>
          <div className="bg-indigo-500 p-6 rounded-full text-white mb-8 shadow-xl relative z-10">
            <Crown size={48} />
          </div>
          <h3 className="text-4xl font-display text-indigo-600 uppercase mb-4 relative z-10">VIP Media Empire</h3>
          <p className="text-indigo-400 font-medium mb-10 max-w-md relative z-10">The ultimate elite tier. Only for the most dedicated babygirls. Exclusive productions and secret channels.</p>
          
          <ul className="space-y-4 mb-12 text-left w-full max-w-sm relative z-10">
            <li className="flex items-center gap-3 text-indigo-600 font-bold"><ShieldCheck size={18} /> Private 4K Screenings</li>
            <li className="flex items-center gap-3 text-indigo-600 font-bold"><ShieldCheck size={18} /> VIP-Only Chat & Forums</li>
            <li className="flex items-center gap-3 text-indigo-600 font-bold"><ShieldCheck size={18} /> Advanced AI Creative Suite</li>
            <li className="flex items-center gap-3 text-indigo-600 font-bold"><ShieldCheck size={18} /> No Ads, Pure Sparkle</li>
          </ul>

          <button className="relative z-10 w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-display text-xl shadow-2xl hover:shadow-indigo-200 hover:scale-105 transition-all active:scale-95 border-b-4 border-black/20">
            Join the Elite Slay
          </button>
          <p className="relative z-10 mt-4 text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Imperial High Council Level</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-pink-50 text-pink-400 rounded-full font-bold border border-pink-100 animate-float">
          <Play size={16} fill="currentColor" /> Currently 1,204 babygirls slaying in VIP
        </div>
      </div>
    </div>
  );
};

export default EmpireClubs;
