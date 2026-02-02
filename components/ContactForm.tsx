
import React, { useState } from 'react';
import { Send, Heart, Sparkles, Mail, MessageCircle, Star, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Imperial Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate Imperial carrier pigeon delivery
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Imperial Inquiry', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block relative mb-4">
          <Heart className="absolute -top-8 -left-8 text-pink-200 animate-pulse" size={48} fill="currentColor" />
          <h2 className="text-5xl md:text-7xl font-display text-pink-500 uppercase tracking-tighter">Send a Scroll</h2>
          <Sparkles className="absolute -bottom-6 -right-6 text-blue-200 animate-bounce" size={40} />
        </div>
        <p className="text-pink-400 font-rounded text-lg mt-4">Direct channel to the Imperial Palace. Royal decrees, gossip, or simple slays are welcome! ✨</p>
      </div>

      <div className="glass-card rounded-[4rem] p-8 md:p-16 border-4 border-dashed border-pink-200 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Mail size={300} />
        </div>

        {status === 'success' ? (
          <div className="text-center py-20 animate-float">
            <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Sparkles size={48} className="text-pink-500" />
            </div>
            <h3 className="text-4xl font-display text-pink-600 uppercase mb-4">Decree Received!</h3>
            <p className="text-xl text-pink-400 font-rounded mb-8 italic">Your message is being delivered by our most sparkly carrier pigeons. (｡♥‿♥｡)</p>
            <button 
              onClick={() => setStatus('idle')}
              className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              Send Another Slay
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-pink-400 font-bold uppercase text-[10px] tracking-widest ml-4">
                  <Star size={12} fill="currentColor" /> Imperial Name
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Princess Slay-a-lot"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-8 py-5 rounded-full border-2 border-pink-50 focus:border-pink-300 outline-none bg-white/60 text-pink-600 font-medium placeholder:text-pink-200 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-pink-400 font-bold uppercase text-[10px] tracking-widest ml-4">
                  <Mail size={12} /> Pigeon Address
                </label>
                <input 
                  required
                  type="email"
                  placeholder="babygirl@palace.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-8 py-5 rounded-full border-2 border-pink-50 focus:border-pink-300 outline-none bg-white/60 text-pink-600 font-medium placeholder:text-pink-200 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-pink-400 font-bold uppercase text-[10px] tracking-widest ml-4">
                <MessageCircle size={12} /> Royal Subject
              </label>
              <select 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-8 py-5 rounded-full border-2 border-pink-50 focus:border-pink-300 outline-none bg-white/60 text-pink-600 font-medium appearance-none cursor-pointer"
              >
                <option>Imperial Inquiry</option>
                <option>Gossip & Hot Tea ☕</option>
                <option>Partnership Slay</option>
                <option>Feedback for the Monarchy</option>
                <option>Just Saying Hi! ✨</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-pink-400 font-bold uppercase text-[10px] tracking-widest ml-4">
                <Heart size={12} /> The Decree
              </label>
              <textarea 
                required
                rows={6}
                placeholder="Once upon a time in the kingdom..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-8 py-6 rounded-[3rem] border-2 border-pink-50 focus:border-pink-300 outline-none bg-white/60 text-pink-600 font-medium placeholder:text-pink-200 shadow-inner resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-6 bg-gradient-to-r from-pink-500 to-pink-400 text-white font-display text-2xl rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center gap-3 border-4 border-white/30 disabled:opacity-50"
            >
              {status === 'sending' ? (
                <><Loader2 className="animate-spin" size={28} /> Sending Scroll...</>
              ) : (
                <><Send size={28} /> Dispatch Decree</>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-16 flex justify-center gap-12 text-pink-300 italic font-medium opacity-60">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-pink-50 p-4 rounded-full"><Sparkles size={24} /></div>
          <span>Direct Magic</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-pink-50 p-4 rounded-full"><Heart size={24} /></div>
          <span>Unfiltered Slay</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-pink-50 p-4 rounded-full"><Star size={24} /></div>
          <span>Elite Support</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
