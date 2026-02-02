
import React, { useState } from 'react';
import { ShoppingBag, Star, Download, Crown, Sparkles, Heart, Ticket, CreditCard, Gift, CheckCircle2 } from 'lucide-react';
import { ShopItem } from '../types';

const FREEBIES: ShopItem[] = [
  { id: 'f1', name: 'Birthday party food 2000s pic', price: 'FREE', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Birthday-party-food-2000s-pic.jpg', isVip: false, category: 'Posters' },
  { id: 'f2', name: 'Nuggets & Nostalgia Nights', price: 'FREE', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Nuggets-Nostalgia-Nights.pdf', isVip: false, category: 'Posters' },
  { id: 'fg1', name: 'BABYGIRL KINGDOM CREDIT Romford x Barking Edition 💖', price: 'FREE', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/02/1.jpg', isVip: false, category: 'Gift Cards' },
  { id: 'fg2', name: 'Drama Queen Diaries', price: 'FREE', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Drama-Queen-Diaries-1.pdf', isVip: false, category: 'Collages' },
];

const VIP_ITEMS: ShopItem[] = [
  { id: 'vt1', name: 'Princessrachael Seymour 2010', price: '2500 Credits', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Princessrachael-Seymour-2010.pdf', isVip: true, category: 'Collages' },
  { id: 'vt2', name: 'Playboy Princess 2010', price: '1500 Credits', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Playboy-Princess-2010.pdf', isVip: true, category: 'Posters' },
  { id: 'v1', name: 'Lindsay James 2010', price: '250 Credits', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Lindsay-James-2010.pdf', isVip: true, category: 'Posters' },
  { id: 'v2', name: 'Princessrachael Sarah Seymour 2010', price: '500 Credits', imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Princessrachael-Sarah-Seymour-2010-IMG-010.jpg', isVip: true, category: 'Posters' },
];

const EmpireMall: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'free' | 'vip'>('free');
  const [claimedItems, setClaimedItems] = useState<string[]>([]);

  const handleClaim = (itemId: string, name: string) => {
    if (claimedItems.includes(itemId)) return;
    setClaimedItems([...claimedItems, itemId]);
    alert(`✨ Omg yay! You claimed the ${name}! It's so sick, babygirl. Check your Imperial Inventory. ✨`);
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-display text-pink-500 uppercase tracking-tighter mb-4">Imperial Mall</h2>
        <p className="text-pink-400 font-rounded text-lg max-w-2xl mx-auto">Luxury digital assets and exclusive passes for the sovereign citizens of the Kingdom. ✨</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-white/50 backdrop-blur-md p-2 rounded-full border-2 border-pink-100 flex shadow-lg">
          <button 
            onClick={() => setActiveTab('free')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-display uppercase tracking-widest transition-all ${activeTab === 'free' ? 'bg-pink-500 text-white shadow-md' : 'text-pink-400 hover:bg-pink-50'}`}
          >
            <Download size={20} /> Freebie Vault
          </button>
          <button 
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-display uppercase tracking-widest transition-all ${activeTab === 'vip' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-indigo-400 hover:bg-indigo-50'}`}
          >
            <Crown size={20} /> VIP Exclusives
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(activeTab === 'free' ? FREEBIES : VIP_ITEMS).map(item => (
          <div key={item.id} className="group glass-card rounded-[3rem] overflow-hidden border-2 border-pink-100 hover:border-pink-300 transition-all hover:-translate-y-2 shadow-xl flex flex-col">
            <div className="aspect-video relative overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5 ${item.isVip ? 'bg-indigo-500 text-white' : 'bg-pink-400 text-white'}`}>
                {item.category === 'Tickets' && <Ticket size={12} />}
                {item.category === 'Gift Cards' && <Gift size={12} />}
                {item.category}
              </div>

              {/* VIP Overlay */}
              {item.isVip && (
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-indigo-900/0 transition-colors pointer-events-none"></div>
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="mb-2 flex items-center gap-2">
                {item.category === 'Tickets' && <Ticket className="text-indigo-400" size={20} />}
                {item.category === 'Gift Cards' && <CreditCard className="text-pink-400" size={20} />}
                <h3 className="text-2xl font-display text-pink-600 truncate">{item.name}</h3>
              </div>
              
              <p className="text-pink-300 text-sm font-rounded mb-6 italic">
                {item.category === 'Tickets' && 'VIP Access to Imperial Cinema & TV Labs.'}
                {item.category === 'Gift Cards' && 'Treat yourself to a shopping spree in the mall.'}
                {item.category === 'Wallpapers' && 'Beautify your digital monarchy background.'}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className={`text-lg font-bold ${item.isVip ? 'text-indigo-500' : 'text-pink-500'}`}>{item.price}</span>
                <button 
                  onClick={() => handleClaim(item.id, item.name)}
                  disabled={claimedItems.includes(item.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold transition-all active:scale-95 disabled:grayscale disabled:opacity-50 ${
                    item.isVip 
                      ? 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-100 shadow-lg' 
                      : 'bg-pink-500 hover:bg-pink-600 shadow-pink-100 shadow-lg'
                  }`}
                >
                  {claimedItems.includes(item.id) ? (
                    <><CheckCircle2 size={16} /> Claimed</>
                  ) : (
                    <>
                      {item.isVip ? <Crown size={16} /> : <Download size={16} />}
                      {item.isVip ? 'Unlock Pass' : 'Claim Now'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-12 bg-white/40 backdrop-blur-md rounded-[4rem] border-4 border-dashed border-pink-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 p-8 opacity-5 pointer-events-none -rotate-12">
          <Ticket size={200} />
        </div>
        <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none rotate-12">
          <CreditCard size={200} />
        </div>
        
        <Sparkles size={48} className="text-pink-300 mx-auto mb-6" />
        <h3 className="text-3xl font-display text-pink-500 uppercase mb-4 tracking-tighter">Imperial Currency</h3>
        <p className="text-pink-400 max-w-xl mx-auto font-rounded mb-8 leading-relaxed">
          Imperial Credits are earned by slaying in the community, uploading content, and being a loyal babygirl. 
          Use them to buy <span className="font-bold text-indigo-500">Media Tickets</span> for the most exclusive 2011 screenings! ✨
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">Check My Balance</button>
          <button className="px-10 py-4 bg-white text-pink-400 rounded-full font-bold border-2 border-pink-200 hover:bg-pink-50 transition-all">Earn More Credits</button>
        </div>
      </div>
    </div>
  );
};

export default EmpireMall;
