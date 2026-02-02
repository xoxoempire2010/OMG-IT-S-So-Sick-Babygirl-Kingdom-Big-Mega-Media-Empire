
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Star, Heart, Play, Film, Monitor, PlayCircle, Save, Plus, Palette, Video, Loader2, CheckSquare, Square, Sparkles, Zap, Tv } from 'lucide-react';
import { MediaItem, MediaType } from '../types';

interface MediaEditorProps {
  initialType?: MediaType;
  onSave: (item: MediaItem) => void;
  onCancel: () => void;
}

const STOCK_ASSETS = [
  { 
    name: 'Waterloo Road Lindsay James 2 ', 
    type: 'video' as MediaType, 
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Waterloo-road-Lindsay-James2.mp4',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Waterloo-Road-Lindsay-James-2010-IMG-009.jpg',
 },
  {
    name: 'Waterloo Road Lindsay James (1)', 
    type: 'video' as MediaType, 
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Waterloo-Road-Lindsay-James-1.mp4',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Flat-Bedroom-Tour-3-2014-mp4-image.jpg',
  },
  { 
    name: 'Lindsay Hometown Glory', 
    type: 'video' as MediaType, 
    videoUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2025/11/Lindsay-Hometown-Glory.mp4',
    imageUrl: 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Bernard-Matthews-Mini-Kievs-2010-mp4-image.jpg',
 }
];

const MediaEditor: React.FC<MediaEditorProps> = ({ initialType = 'movie', onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType>(initialType);
  const [year, setYear] = useState('2011');
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const handleStockSelect = (asset: typeof STOCK_ASSETS[0]) => {
    setTitle(`My Imperial ${asset.name}`);
    setType(asset.type);
    setSelectedVideo(asset.videoUrl);
    setSelectedImage(asset.imageUrl);
    setDescription(`Exclusively selected from the Imperial Archives for the Big Media Mega Empire. ✨`);
    setTags(`imperial, ${asset.type}, aesthetic`);
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied! 📸");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.translate(canvasRef.current.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        setSelectedImage(canvasRef.current.toDataURL('image/jpeg'));
        setSelectedVideo(null);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (isVideo) {
          setSelectedVideo(dataUrl);
          setSelectedImage(null);
          if (type === 'photo') setType('video');
        } else {
          setSelectedImage(dataUrl);
          setSelectedVideo(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert("Missing details, babygirl! Please add a title and description to your slay. ✨");
      return;
    }

    if (!agreedToTerms) {
      alert("You must agree to the Imperial laws before broadcasting, darling! ✨");
      return;
    }

    setIsPublishing(true);
    
    setTimeout(() => {
      const placeholderImg = 'https://live-cheekymonkeybabygirl2010.pantheonsite.io/wp-content/uploads/2026/01/Omg-its-So-Sick-Babygirl-Kingdom.png';
      const placeholderVideo = 'https://assets.mixkit.co/videos/preview/mixkit-pink-neon-city-lights-reflecting-on-a-river-loop-32742-large.mp4';

      const newItem: MediaItem = {
        id: Date.now().toString(),
        type,
        title,
        year,
        rating,
        imageUrl: selectedImage || placeholderImg,
        videoUrl: selectedVideo || (type !== 'photo' ? placeholderVideo : undefined),
        description,
        tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      };

      onSave(newItem);
    }, 1200);
  };

  const clearMedia = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      <div className="glass-card rounded-[3.5rem] p-8 md:p-14 border-4 border-dashed border-pink-200 shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
           <Tv size={300} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-pink-500 p-4 rounded-full text-white shadow-xl rotate-3">
              <Film size={36} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-display text-pink-500 uppercase tracking-tighter">Imperial Production</h2>
              <p className="text-pink-400 font-rounded font-medium italic">"Quality check: 100% Slay." ✨</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-300 mb-2">Imperial Library Assets</span>
             <div className="flex gap-2">
                {STOCK_ASSETS.map(asset => (
                  <button 
                    key={asset.name}
                    type="button"
                    onClick={() => handleStockSelect(asset)}
                    className="px-4 py-2 bg-white dark:bg-kingdom-plum border-2 border-pink-100 hover:border-pink-500 rounded-full text-[9px] font-bold uppercase tracking-widest text-pink-400 dark:text-pink-300 transition-all shadow-sm hover:scale-105"
                  >
                    {asset.name}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-pink-400 font-bold mb-3 ml-4 uppercase text-[10px] tracking-widest">Broadcast Title</label>
                <input 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the Title of your Iconic Broadcast... (e.g., My 2011 Bedroom Tour ✨)"
                  className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl transition-all text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-pink-400 font-bold mb-3 ml-4 uppercase text-[10px] tracking-widest">Media Format</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as MediaType)}
                    className="w-full px-6 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium appearance-none cursor-pointer shadow-xl"
                  >
                    <option value="photo">Imperial Pic</option>
                    <option value="video">Empire Clip</option>
                    <option value="movie">Major Movie</option>
                    <option value="tv">TV Broadcast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-pink-400 font-bold mb-3 ml-4 uppercase text-[10px] tracking-widest">Release Year</label>
                  <input 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2011"
                    className="w-full px-6 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-pink-400 font-bold mb-4 ml-4 uppercase text-[10px] tracking-widest">Empire Star Rating</label>
                <div className="flex gap-3 ml-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-all hover:scale-125 active:scale-90 ${rating >= star ? 'text-pink-500 drop-shadow-md' : 'text-pink-100 dark:text-pink-900/30'}`}
                    >
                      <Star size={40} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="block text-pink-400 font-bold mb-1 ml-4 uppercase text-[10px] tracking-widest">Imperial Master Feed</label>
              <div className="relative group rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-pink-900/30 aspect-[4/5] shadow-2xl bg-pink-50 dark:bg-kingdom-dark">
                {isCameraActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                ) : selectedVideo ? (
                  <div className="relative w-full h-full">
                    <video src={selectedVideo} className="w-full h-full object-cover" controls autoPlay loop muted />
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                  </div>
                ) : selectedImage ? (
                  <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                    <Zap size={64} className="text-pink-100 dark:text-pink-900 animate-pulse mb-6" />
                    <p className="text-pink-200 dark:text-pink-900 font-display text-sm uppercase tracking-widest">Signal Missing</p>
                  </div>
                )}
                
                {/* Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   {!isCameraActive && !selectedImage && !selectedVideo ? (
                      <>
                        <button type="button" onClick={startCamera} className="bg-white text-pink-500 p-5 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-pink-100"><Camera size={28} /></button>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white p-5 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-blue-100"><Upload size={28} /></button>
                      </>
                   ) : (
                      <button type="button" onClick={clearMedia} className="bg-red-500 text-white p-5 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-red-100"><X size={28} /></button>
                   )}
                   {isCameraActive && (
                      <button type="button" onClick={capturePhoto} className="bg-pink-500 text-white p-5 rounded-full shadow-xl animate-pulse border-4 border-white"><Camera size={28} /></button>
                   )}
                </div>
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-pink-400 font-bold mb-4 ml-4 uppercase text-[10px] tracking-widest">Imperial Logline</label>
              <textarea 
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your Imperial Logline here... Tell us why this production is absolute slay! 🎀"
                className="w-full px-8 py-6 rounded-[2rem] border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium resize-none transition-all shadow-xl h-40"
              />
            </div>

            <div>
              <label className="block text-pink-400 font-bold mb-4 ml-4 uppercase text-[10px] tracking-widest">Archive Tags</label>
              <input 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. coquette, 2011 nostalgia, imperial cinema, glitter-core"
                className="w-full px-8 py-5 rounded-full border-4 border-white dark:border-pink-900/30 focus:border-pink-300 outline-none bg-white/60 dark:bg-kingdom-plum text-pink-600 dark:text-pink-300 font-medium shadow-xl mb-8"
              />
              
              <div className="flex items-center gap-4 px-4 bg-white/40 dark:bg-kingdom-plum/40 p-6 rounded-3xl border-2 border-dashed border-pink-100 dark:border-pink-900/30 shadow-inner">
                <button 
                  type="button"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`transition-all hover:scale-110 ${agreedToTerms ? 'text-pink-500' : 'text-pink-200 dark:text-pink-900'}`}
                >
                  {agreedToTerms ? <CheckSquare size={32} /> : <Square size={32} />}
                </button>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400 dark:text-pink-300">
                  I certify this slay is authentic and follows <br/> the <span className="underline cursor-pointer hover:text-pink-600">Imperial Media Laws</span>. ✨
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-10">
            <button 
              type="submit"
              disabled={isPublishing || !agreedToTerms}
              className={`flex-1 py-8 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 text-white font-display text-3xl rounded-full shadow-2xl transition-all transform flex items-center justify-center gap-4 border-8 border-white/20 disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed ${isPublishing ? 'cursor-wait' : 'hover:shadow-pink-300 hover:-translate-y-2 active:scale-95'}`}
            >
              {isPublishing ? (
                <>
                  <Loader2 size={36} className="animate-spin" /> BROADCASTING...
                </>
              ) : (
                <>
                  <Sparkles size={36} /> PREMIERE TO EMPIRE ✨
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-16 py-8 bg-white dark:bg-kingdom-plum text-pink-400 dark:text-pink-300 border-4 border-white dark:border-pink-900/30 rounded-full font-display text-xl hover:bg-pink-50 dark:hover:bg-pink-900/50 transition-all active:scale-95 shadow-xl"
            >
              SCRAP DECREE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaEditor;
