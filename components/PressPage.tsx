
import React from 'react';
import { Sparkles, Globe, Heart, Crown, Star, Mail, Zap, Target, Award, Quote, Layout, Edit3 } from 'lucide-react';
import { PressContent } from '../types';

interface PressPageProps {
  content: PressContent;
  onEdit: () => void;
}

const PressPage: React.FC<PressPageProps> = ({ content, onEdit }) => {
  return (
    <div className="min-h-screen bg-[#fff5f8] dark:bg-[#1a0b16] py-12 px-6 relative">
      {/* Admin Edit Trigger */}
      <button 
        onClick={onEdit}
        className="fixed bottom-24 right-8 z-[60] bg-white dark:bg-pink-900 border-4 border-pink-200 dark:border-pink-500 text-pink-500 dark:text-pink-100 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        title="Edit Imperial Press"
      >
        <Edit3 size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto mb-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-100 dark:bg-pink-900/40 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500 dark:text-pink-300 mb-6">
            <Globe size={14} /> {content.heroTagline}
          </div>
          <h1 className="text-6xl md:text-8xl font-display text-pink-500 dark:text-pink-400 uppercase tracking-tighter leading-[0.85] mb-8">
            {content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-pink-400 dark:text-pink-300/80 font-rounded italic leading-relaxed max-w-xl mx-auto lg:mx-0">
            "{content.heroIntro}"
          </p>
        </div>
        <div className="flex-1 relative">
          <div className="relative z-10 aspect-[4/5] w-full max-w-md mx-auto rounded-[4rem] overflow-hidden border-8 border-white dark:border-pink-900 shadow-2xl rotate-2">
            <img 
              src={content.heroImageUrl} 
              alt="Empire Branding" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent"></div>
          </div>
          <div className="absolute top-10 -left-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-900/40 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-pink-300 dark:bg-pink-800/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-5 left-0 z-20 bg-white dark:bg-pink-600 p-6 rounded-[2rem] shadow-xl -rotate-6 border-2 border-pink-100">
             <Quote className="text-pink-500 dark:text-pink-200 mb-2" size={32} />
             <p className="text-sm font-display uppercase tracking-widest text-pink-600 dark:text-white leading-tight">
               {content.quoteText} <br/> <span className="text-[10px] opacity-60">xoxo {content.quoteAuthor}</span>
             </p>
          </div>
        </div>
      </section>

      {/* Brand Network */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display text-pink-500 dark:text-pink-400 uppercase tracking-tight">Our Media Ecosystem</h2>
          <div className="h-1 w-24 bg-pink-200 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.networkCards.map((card, i) => (
            <NetworkCard 
              key={i}
              icon={i === 0 ? <Award size={32} /> : i === 1 ? <Zap size={32} /> : i === 2 ? <Heart size={32} /> : <Layout size={32} />}
              title={card.title}
              tagline={card.tagline}
              desc={card.desc}
            />
          ))}
        </div>
      </section>

      {/* Collab Pitch */}
      <section className="max-w-6xl mx-auto mb-32 glass-card rounded-[5rem] overflow-hidden border-4 border-white dark:border-pink-900 relative shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 bg-gradient-to-br from-pink-500 to-pink-400 p-12 md:p-20 text-white flex flex-col justify-center">
            <Crown size={64} className="mb-8 opacity-40" />
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-6 leading-none">{content.collabPitchTitle}</h2>
            <p className="text-xl font-rounded mb-10 opacity-90 leading-relaxed">
              {content.collabPitchDesc}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Target size={20} /></div>
                <span className="font-bold uppercase tracking-widest text-sm">Hyper-Targeted Aesthetic Demo</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Star size={20} /></div>
                <span className="font-bold uppercase tracking-widest text-sm">Viral 'Nostalgia-Core' Placement</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Heart size={20} /></div>
                <span className="font-bold uppercase tracking-widest text-sm">Bespoke Multi-Platform Campaigns</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-12 md:p-20 bg-white/80 dark:bg-kingdom-plum/80 backdrop-blur-md">
            <h3 className="text-2xl font-display text-pink-500 mb-8 uppercase">Our Deliverables</h3>
            <div className="space-y-10">
              <DeliverableItem 
                title="Product Coronation"
                desc="Exclusive unboxings, editorial spotlights, and social integration into our daily broadcasts."
              />
              <DeliverableItem 
                title="Imperial Campaigns"
                desc="Full-scale media takeovers including custom blog features, cinema ads, and TV Lab loops."
              />
              <DeliverableItem 
                title="Creative Directives"
                desc="Consultancy for brands looking to pivot into the hyper-feminine and Gen-Alpha/Z markets."
              />
              <button className="w-full py-5 bg-pink-500 text-white rounded-full font-display text-xl shadow-xl hover:scale-[1.02] transition-all">
                Request Media Kit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="max-w-7xl mx-auto mb-32 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricBox value="1M+" label="Imperial Citizens" />
        <MetricBox value="100%" label="Organic Sparkle" />
        <MetricBox value="2011" label="Era Origin" />
        <MetricBox value="∞" label="Slay Potential" />
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto text-center pb-24">
        <Sparkles size={48} className="text-pink-300 mx-auto mb-8 animate-float" />
        <h2 className="text-5xl font-display text-pink-500 dark:text-pink-400 uppercase mb-4 tracking-tighter">Reach The Palace</h2>
        <p className="text-xl text-pink-400 dark:text-pink-300 font-rounded mb-12 italic max-w-xl mx-auto">
          For global PR inquiries, giftings, or executive collaboration requests, our carrier pigeons are standing by.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href={`mailto:${content.contactEmail}`} 
            className="px-12 py-5 bg-white dark:bg-pink-900/30 text-pink-500 border-4 border-pink-100 dark:border-pink-900 rounded-full font-display text-xl flex items-center gap-3 hover:bg-pink-50 transition-all shadow-lg"
          >
            <Mail size={24} /> {content.contactEmail}
          </a>
          <button className="px-12 py-5 bg-pink-500 text-white rounded-full font-display text-xl shadow-xl hover:-translate-y-1 transition-all">
            Apply for Audience
          </button>
        </div>
      </section>
    </div>
  );
};

const NetworkCard: React.FC<{ icon: React.ReactNode, title: string, tagline: string, desc: string }> = ({ icon, title, tagline, desc }) => (
  <div className="p-10 bg-white dark:bg-kingdom-plum rounded-[3.5rem] border-2 border-pink-100 dark:border-pink-900/40 shadow-xl hover:-translate-y-2 transition-all group">
    <div className="bg-pink-50 dark:bg-pink-900/20 text-pink-500 p-4 rounded-full w-fit mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-display text-pink-600 dark:text-pink-400 uppercase mb-2">{title}</h3>
    <p className="text-pink-400 dark:text-pink-300/60 font-bold text-[10px] uppercase tracking-widest mb-4">{tagline}</p>
    <p className="text-sm text-gray-500 dark:text-pink-100/60 font-rounded leading-relaxed">{desc}</p>
  </div>
);

const DeliverableItem: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <div className="flex gap-6">
    <div className="w-1.5 h-16 bg-pink-200 dark:bg-pink-900 rounded-full shrink-0"></div>
    <div>
      <h4 className="font-display text-pink-600 dark:text-pink-300 uppercase mb-1 tracking-widest">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-pink-100/60 font-rounded italic">{desc}</p>
    </div>
  </div>
);

const MetricBox: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div className="text-center p-12 border-2 border-pink-50 dark:border-pink-900/20 rounded-[3rem] bg-white/40 dark:bg-kingdom-plum/20">
    <div className="text-5xl font-display text-pink-500 mb-2">{value}</div>
    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-300 dark:text-pink-600">{label}</div>
  </div>
);

export default PressPage;
