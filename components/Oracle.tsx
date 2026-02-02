
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageCircle, Send, Loader2, Camera, Upload, X, RefreshCw, Palette, Smile, Save, Heart } from 'lucide-react';
import { getAestheticAdvice, getBabygirlMantra, getAestheticAdviceWithImage } from '../services/geminiService';

const FILTERS = [
  { name: 'Normal', id: 'none', css: 'none' },
  { name: 'Sepia', id: 'sepia', css: 'sepia(0.8) contrast(1.1)' },
  { name: 'Noir', id: 'grayscale', css: 'grayscale(1)' },
  { name: 'Vintage', id: 'vintage', css: 'sepia(0.5) contrast(1.2) brightness(1.1) hue-rotate(-10deg)' },
  { name: 'Dreamy', id: 'dreamy', css: 'brightness(1.1) saturate(1.3) hue-rotate(10deg) sepia(0.2)' },
  { name: 'Lofi', id: 'lofi', css: 'contrast(1.4) saturate(0.8) brightness(0.9)' },
];

const NOSTALGIC_EMOJIS = [
  '✨', '💖', '🎀', '🌸', '🦄', '🌈', '🍓', '🧸', '🦋', '💿', 
  '📸', '💄', '💅', '👑', '💎', '🐚', '🪐', '☁️', '🍭', '🍬'
];

const KAOMOJIS = [
  '(｡♥‿♥｡)', '(◕‿◕✿)', '(✿◠‿◠)', '(´｡• ᵕ •｡`)', '✨(◕‿◕)✨', 
  '(づ｡◕‿‿◕｡)づ', '(ノ◕ヮ◕)ノ*:·ﾟ✧', '(〃＾▽＾〃)', 'o(≧▽≦)o', '(◡‿◡✿)'
];

const playSound = (type: 'camera' | 'sparkle' | 'swoosh', volume: number = 0.2) => {
  const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  
  const audioCtx = new AudioContextClass();
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = volume;
  masterGain.connect(audioCtx.destination);

  if (type === 'camera') {
    const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
    const env = audioCtx.createGain();
    env.gain.setValueAtTime(1, audioCtx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    noise.connect(filter);
    filter.connect(env);
    env.connect(masterGain);
    noise.start();
  } else if (type === 'sparkle') {
    const playNote = (freq: number, startTime: number) => {
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      env.gain.setValueAtTime(0, startTime);
      env.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      env.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      osc.connect(env);
      env.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    };
    [880, 1320, 1760, 2640].forEach((f, i) => playNote(f, audioCtx.currentTime + i * 0.05));
  } else if (type === 'swoosh') {
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.6);
    filter.type = 'lowpass';
    filter.Q.value = 10;
    filter.frequency.setValueAtTime(200, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, audioCtx.currentTime + 0.6);
    env.gain.setValueAtTime(0, audioCtx.currentTime);
    env.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
    env.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
    osc.connect(filter);
    filter.connect(env);
    env.connect(masterGain);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  }
};

const Oracle: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [mood, setMood] = useState('sparkly');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const triggerSound = (type: 'camera' | 'sparkle' | 'swoosh') => {
    if (!isMuted) playSound(type);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const insertAtCursor = (text: string) => {
    triggerSound('sparkle');
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || 0;
      const end = inputRef.current.selectionEnd || 0;
      const newText = question.substring(0, start) + text + question.substring(end);
      setQuestion(newText);
      
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const newPos = start + text.length;
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      }, 0);
    } else {
      setQuestion(question + text);
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() && !selectedImage) return;
    triggerSound('swoosh');
    setLoading(true);
    setResponse('');
    setShowEmojiPicker(false);
    try {
      let res: string;
      if (selectedImage) {
        setIsProcessingImage(true);
        const finalImage = activeFilter.id === 'none' 
          ? selectedImage 
          : await applyFilterToImage(selectedImage, activeFilter.css);
        res = await getAestheticAdviceWithImage(finalImage, question);
        setIsProcessingImage(false);
      } else {
        res = await getAestheticAdvice(question);
      }
      setResponse(res);
    } catch (err) {
      console.error(err);
      setResponse('The crystal ball is cloudy... check your connection, babygirl! 💖');
      setIsProcessingImage(false);
    } finally {
      setLoading(false);
    }
  };

  const handleMantra = async (m: string) => {
    triggerSound('sparkle');
    setMood(m);
    setLoading(true);
    setResponse('');
    try {
      const res = await getBabygirlMantra(m);
      setResponse(res);
    } catch (err) {
      setResponse('The vibes are off, try again! ✨');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
    } catch (err) {
      console.error('Camera access denied', err);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      triggerSound('camera');
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 150);

      const context = canvasRef.current.getContext('2d');
      if (context) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setSelectedImage(dataUrl);
        setActiveFilter(FILTERS[0]);
        if (videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
      }
    }
  };

  const applyFilterToImage = (imageSrc: string, filterCss: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(imageSrc); return; }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = filterCss;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = imageSrc;
    });
  };

  return (
    <section className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="glass-card rounded-[3rem] p-8 md:p-12 border-4 border-dashed border-pink-300 relative overflow-hidden">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-5 left-5 p-2 bg-white/50 hover:bg-white rounded-full text-pink-400 transition-all z-20 shadow-sm"
          title={isMuted ? 'Unmute Magic' : 'Mute Magic'}
        >
          {isMuted ? <span className="opacity-50">🔇</span> : <span>🔊</span>}
        </button>

        <div className="absolute top-5 right-5 text-pink-100 animate-bounce"><Sparkles size={64} /></div>
        <div className="absolute bottom-5 left-5 text-pink-100 animate-pulse"><MessageCircle size={64} /></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-display text-pink-500 mb-4 uppercase">Aesthetic Oracle</h2>
          <p className="text-lg text-pink-400 mb-8 font-rounded">Ask for wisdom or show us your vibe ✨</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['sparkly', 'moody', 'hyper-fem', 'soft-grunge', 'lo-fi'].map(m => (
              <button
                key={m}
                onClick={() => handleMantra(m)}
                disabled={loading}
                className={`px-6 py-2 rounded-full border-2 transition-all font-bold ${
                  mood === m ? 'bg-pink-400 text-white border-pink-400 shadow-lg' : 'bg-white text-pink-400 border-pink-200 hover:border-pink-300'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-8 max-w-lg mx-auto">
            {isCameraActive ? (
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-200 bg-black aspect-video flex items-center justify-center group shadow-2xl">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                {isFlashing && <div className="absolute inset-0 bg-white z-20 animate-pulse"></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-4">
                  <button onClick={capturePhoto} className="bg-white text-pink-500 p-5 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-pink-100"><Camera size={32} /></button>
                  <button onClick={() => setIsCameraActive(false)} className="bg-white/20 backdrop-blur-md text-white p-5 rounded-full shadow-xl hover:bg-white/40 transition-all"><X size={32} /></button>
                </div>
              </div>
            ) : selectedImage ? (
              <div className="flex flex-col gap-6">
                <div className="relative group max-w-sm mx-auto w-full">
                  <div className="overflow-hidden rounded-3xl border-4 border-pink-200 shadow-xl aspect-square sm:aspect-video bg-pink-50 relative">
                    <img 
                      src={selectedImage} 
                      alt="Captured Look" 
                      className="w-full h-full object-cover transition-all duration-300" 
                      style={{ filter: activeFilter.css }}
                    />
                    {isProcessingImage && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center animate-pulse z-10">
                        <Heart size={48} className="text-pink-400 animate-spin mb-2" fill="currentColor" />
                        <span className="text-pink-500 font-display text-sm tracking-widest uppercase">Processing Slay...</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-3 -right-3 flex flex-col gap-2 z-10">
                    <button onClick={() => setSelectedImage(null)} className="bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors"><X size={20} /></button>
                    <button onClick={() => { triggerSound('sparkle'); alert('Saved! ✨'); }} className="bg-blue-400 text-white p-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors"><Save size={20} /></button>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-md p-4 rounded-[2rem] border-2 border-pink-100 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-4 min-w-max px-2">
                    <div className="text-pink-400 flex items-center gap-1 font-bold text-xs uppercase tracking-widest mr-2"><Palette size={14} /> Filter</div>
                    {FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => { triggerSound('sparkle'); setActiveFilter(f); }}
                        className={`flex flex-col items-center gap-1 group transition-all ${activeFilter.id === f.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                      >
                        <div className={`w-12 h-12 rounded-full border-2 overflow-hidden ${activeFilter.id === f.id ? 'border-pink-400' : 'border-white'}`}>
                          <img src={selectedImage} className="w-full h-full object-cover" style={{ filter: f.css }} alt={f.name} />
                        </div>
                        <span className={`text-[10px] font-bold ${activeFilter.id === f.id ? 'text-pink-500' : 'text-gray-400'}`}>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={startCamera} className="flex flex-col items-center justify-center gap-4 p-10 bg-pink-50 border-4 border-dashed border-pink-200 rounded-[2.5rem] text-pink-400 hover:bg-pink-100 hover:border-pink-300 transition-all group">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform"><Camera size={36} /></div>
                  <span className="font-display text-lg uppercase tracking-tight">Open Camera</span>
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center gap-4 p-10 bg-blue-50 border-4 border-dashed border-blue-200 rounded-[2.5rem] text-blue-400 hover:bg-blue-100 hover:border-blue-300 transition-all group">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform"><Upload size={36} /></div>
                  <span className="font-display text-lg uppercase tracking-tight">Upload Mood</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={(e) => { triggerSound('sparkle'); const f = e.target.files?.[0]; if(f) { const r = new FileReader(); r.onload = (ev) => setSelectedImage((ev.target as any)?.result); r.readAsDataURL(f); } }} className="hidden" accept="image/*" />
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="relative max-w-lg mx-auto mb-8">
            <button type="button" onClick={() => { triggerSound('sparkle'); setShowEmojiPicker(!showEmojiPicker); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors z-10"><Smile size={24} /></button>
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={selectedImage ? 'What do you think of this look?' : 'Should I get bangs?'}
              className="w-full pl-16 pr-16 py-6 rounded-full border-4 border-pink-100 focus:border-pink-300 outline-none text-pink-600 font-medium bg-white/60 placeholder:text-pink-200 text-lg shadow-inner"
            />
            <button type="submit" disabled={loading || (!question.trim() && !selectedImage)} className="absolute right-3 top-3 bg-pink-400 hover:bg-pink-500 text-white p-4 rounded-full shadow-lg transition-all active:scale-90 disabled:opacity-30 disabled:grayscale">
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>

            {showEmojiPicker && (
              <div ref={pickerRef} className="absolute bottom-full left-0 mb-4 w-full bg-white/90 backdrop-blur-lg p-6 rounded-[2.5rem] border-4 border-pink-100 shadow-2xl z-50 animate-float">
                <div className="mb-4">
                  <h4 className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-3 text-left px-2">Sparkly Emoji ✨</h4>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {NOSTALGIC_EMOJIS.map(emoji => (
                      <button key={emoji} type="button" onClick={() => insertAtCursor(emoji)} className="text-2xl p-2 hover:bg-pink-50 rounded-xl transition-colors transform active:scale-90">{emoji}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-3 text-left px-2 border-t border-pink-50 pt-3">Classic Kaomoji (｡♥‿♥｡)</h4>
                  <div className="flex flex-wrap gap-2">
                    {KAOMOJIS.map(kao => (
                      <button key={kao} type="button" onClick={() => insertAtCursor(kao)} className="px-3 py-1.5 bg-pink-50 text-pink-500 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors transform active:scale-95">{kao}</button>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b-4 border-r-4 border-pink-100 rotate-45"></div>
              </div>
            )}
          </form>

          {response && (
            <div className="animate-float mt-12 p-10 bg-white rounded-[3rem] border-4 border-pink-100 shadow-2xl max-w-2xl mx-auto relative overflow-hidden group">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-50 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform"></div>
              <div className="absolute -top-4 -left-4 bg-pink-500 text-white p-3 rounded-full shadow-lg transform -rotate-12"><Sparkles size={24} /></div>
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-rounded text-pink-600 leading-relaxed italic font-medium">"{response}"</p>
                <div className="h-1 w-24 bg-pink-100 mx-auto mt-8 rounded-full"></div>
                <button onClick={() => { setResponse(''); setSelectedImage(null); triggerSound('swoosh'); }} className="mt-6 text-pink-300 hover:text-pink-500 text-sm font-bold flex items-center gap-1 mx-auto transition-colors px-4 py-2 hover:bg-pink-50 rounded-full">New reading <RefreshCw size={14} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};

export default Oracle;
