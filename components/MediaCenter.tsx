
import React, { useState, useRef, useEffect } from 'react';
import { MediaItem, MediaType, ImperialLocation, ConnectivityMode } from '../types';
// Added WifiOff to imports to resolve "Cannot find name 'WifiOff'" error
import { Heart, Star, Play, Search, Filter, Monitor, Film, PlayCircle, Plus, Sparkles, Video, Camera, Image as ImageIcon, Tv, Ghost, Share2, X, Copy, Twitter, MessageSquare, ExternalLink, Lock, Zap, Clock, Pause, Volume2, VolumeX, Maximize2, Download, PackageOpen, WifiOff } from 'lucide-react';

interface MediaCenterProps {
  initialType?: MediaType;
  items: MediaItem[];
  location?: ImperialLocation;
  connectivity?: ConnectivityMode;
  onUploadType?: (type: MediaType) => void;
  onWatchMedia?: (id: string) => void;
}

const MediaCenter: React.FC<MediaCenterProps> = ({ 
  initialType = 'movie', 
  items, 
  location = 'home', 
  connectivity = 'online',
  onUploadType, 
  onWatchMedia 
}) => {
  const [filter, setFilter] = useState<MediaType | 'all'>(initialType);
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => {
    // If offline, only show items that are "cached" (simulated by having an even ID or some logic)
    const matchesConnectivity = connectivity === 'online' || item.id.includes('m') || item.id.includes('v'); 
    const matchesType = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesConnectivity && matchesType && matchesSearch;
  });

  const getTitle = () => {
    if (location === 'arcade') return 'Pixel Palace Games';
    if (location === 'mcdonalds') return 'Imperial McPlay House';
    if (location === 'travel') return 'Roaming Archives';
    switch(filter) {
      case 'movie': return 'Imperial Cinema';
      case 'tv': return 'Kingdom Television';
      case 'video': return 'Big Media Lab';
      case 'photo': return 'Imperial Gallery';
      default: return 'Imperial Archives';
    }
  };

  const getMarqueeText = () => {
    if (location === 'arcade') return "👾 INSERT COINS FOR 1000 CREDITS • LEVEL UP YOUR SLAY • 8-BIT ESTHETICS • WIN TICKETS FOR HSM3 PREMIERE •";
    if (location === 'mcdonalds') return "🍟 MCSLAY HAPPY MEAL: TOY OF THE WEEK IS 2000s RAGDOLL • ENJOY YOUR IMPERIAL NUGGETS •";
    if (filter === 'movie') return "NOW SHOWING: 2000s CLASSICS • HIGH SCHOOL MUSICAL MARATHON • THE PRINCESS DIARIES • IMPERIAL PREMIERE TONIGHT AT 8PM •";
    return "BROADCASTING 24/7 ACROSS THE EMPIRE • SLAY THE THRONE • OMG IT'S SO SICK MEDIA • STAY SPARKLY DARLING •";
  };

  const getThemeColors = () => {
    if (location === 'mcdonalds') return 'bg-red-500 text-yellow-400 border-yellow-400';
    if (location === 'arcade') return 'bg-indigo-900 text-green-400 border-indigo-500';
    return 'bg-pink-500 text-white border-white/20';
  };

  return (
    <div className={`py-12 px-6 overflow-hidden transition-all duration-700 ${location === 'arcade' ? 'bg-black/90 text-green-400' : ''}`}>
      {/* Imperial Marquee */}
      <div className={`w-full py-2 mb-12 overflow-hidden border-y-4 relative z-20 rotate-1 shadow-lg transition-colors duration-500 ${getThemeColors()}`}>
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-help">
          <span className="text-sm font-display uppercase tracking-[0.3em] px-4">
            {getMarqueeText()} {getMarqueeText()} {getMarqueeText()}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>

      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-10 pointer-events-none">
           <Zap size={200} className={location === 'arcade' ? 'text-green-500' : 'text-pink-300 dark:text-pink-900'} />
        </div>
        
        <div className="inline-block relative mb-4">
          <Sparkles className={`absolute -top-6 -right-6 animate-pulse ${location === 'arcade' ? 'text-green-400' : 'text-pink-300'}`} size={32} />
          <h2 className={`text-5xl md:text-7xl font-display uppercase tracking-tighter drop-shadow-sm ${
            location === 'mcdonalds' ? 'text-red-500' : 
            location === 'arcade' ? 'text-green-400' : 
            'text-pink-500 dark:text-pink-400'
          }`}>
            {getTitle()}
          </h2>
        </div>

        {connectivity === 'offline' && (
          <div className="bg-orange-500 text-white px-6 py-2 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg animate-bounce">
            <WifiOff size={14} /> Local Archive Mode: Limited Signal
          </div>
        )}

        <p className={`font-rounded text-lg max-w-2xl mx-auto mb-8 italic leading-relaxed ${location === 'arcade' ? 'text-green-300' : 'text-pink-400 dark:text-pink-300'}`}>
          {location === 'travel' ? "Your downloaded slayage, preserved for the long journey through boring beige cities." : "The Monarchy's official source for high-definition slayage."}
          <br/>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2 inline-block ${
            location === 'arcade' ? 'bg-green-900/40 text-green-400' : 'bg-pink-50 dark:bg-pink-900/40 text-pink-500'
          }`}>
            Satellite Link: {connectivity === 'online' ? 'STABLE ✨' : 'OFFLINE ARCHIVE'}
          </span>
        </p>
        
        {location === 'mcdonalds' && (
          <div className="max-w-md mx-auto mb-10 bg-red-600 text-white p-6 rounded-[2rem] border-4 border-yellow-400 shadow-2xl animate-float">
             <PackageOpen size={48} className="mx-auto mb-4 text-yellow-400" />
             <h4 className="font-display text-xl uppercase mb-2">Imperial McPlay Set</h4>
             <p className="text-sm italic mb-4">"Collect all 5 digital charms with your Imperial Nuggets!"</p>
             <button className="bg-yellow-400 text-red-600 px-6 py-2 rounded-full font-bold uppercase text-xs">Claim Toy</button>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row gap-6 items-center justify-between relative z-10">
        <div className={`flex backdrop-blur-sm p-2 rounded-full border-2 overflow-x-auto no-scrollbar shrink-0 shadow-lg ${
          location === 'arcade' ? 'bg-indigo-900/80 border-indigo-500' : 'bg-white/80 dark:bg-kingdom-plum/80 border-pink-100 dark:border-pink-900/30'
        }`}>
          <FilterButton location={location} label="All" active={filter === 'all'} onClick={() => setFilter('all')} icon={<Star size={14} />} />
          <FilterButton location={location} label="Gallery" active={filter === 'photo'} onClick={() => setFilter('photo')} icon={<Camera size={14} />} />
          <FilterButton location={location} label="Movies" active={filter === 'movie'} onClick={() => setFilter('movie')} icon={<Film size={14} />} />
          <FilterButton location={location} label="TV" active={filter === 'tv'} onClick={() => setFilter('tv')} icon={<Monitor size={14} />} />
          <FilterButton location={location} label="Videos" active={filter === 'video'} onClick={() => setFilter('video')} icon={<PlayCircle size={14} />} />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search archives..."
              className={`w-full pl-12 pr-6 py-4 rounded-full border-4 outline-none font-medium shadow-xl transition-all ${
                location === 'arcade' ? 'bg-black border-indigo-500 text-green-400 placeholder:text-green-900' : 'bg-white/80 dark:bg-kingdom-plum border-white dark:border-pink-900/30 text-pink-600 dark:text-pink-300'
              }`}
            />
            <Search className={`absolute left-5 top-1/2 -translate-y-1/2 ${location === 'arcade' ? 'text-indigo-500' : 'text-pink-300'}`} size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {filteredItems.map(item => (
          <MediaCard key={item.id} item={item} location={location} connectivity={connectivity} onWatch={() => onWatchMedia?.(item.id)} />
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-24 text-center relative overflow-hidden rounded-[4rem] bg-white/40 dark:bg-kingdom-plum/20 border-4 border-dashed border-pink-100 dark:border-pink-900/30">
            <Tv size={80} className="text-pink-300 dark:text-pink-400 animate-pulse mx-auto mb-6" />
            <h3 className="text-4xl font-display text-pink-500 dark:text-pink-400 uppercase mb-4 tracking-tighter">Signal Interrupted</h3>
            <p className="text-pink-300 dark:text-pink-200 text-2xl italic font-rounded mb-10 max-w-md mx-auto leading-snug">
              {connectivity === 'offline' ? "This media hasn't been cached for Roaming Mode yet!" : "Our satellite is scanning for slayage, but the signal is empty!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ label: string, active: boolean, onClick: () => void, icon: React.ReactNode, location: ImperialLocation }> = ({ label, active, onClick, icon, location }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${
    active ? (location === 'arcade' ? 'bg-green-400 text-black' : 'bg-pink-500 text-white shadow-xl') : 
    (location === 'arcade' ? 'text-green-900 hover:text-green-400' : 'text-pink-400 dark:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/40')
  }`}>
    {icon} {label}
  </button>
);

const MediaCard: React.FC<{ item: MediaItem, onWatch?: () => void, location: ImperialLocation, connectivity: ConnectivityMode }> = ({ item, onWatch, location, connectivity }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => setProgress((video.currentTime / video.duration) * 100 || 0);
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const handleMouseEnter = () => {
    if (connectivity === 'offline' && item.type !== 'photo' && !item.isCached) return;
    setIsHovering(true);
    if (videoRef.current) {
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current.then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          videoRef.current?.pause();
          setIsPlaying(false);
          if (videoRef.current) videoRef.current.currentTime = 0;
        }).catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div 
      className={`group rounded-[2.5rem] overflow-hidden border-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative cursor-pointer ${
        location === 'arcade' ? 'bg-indigo-950 border-indigo-500 text-green-400' : 
        location === 'mcdonalds' ? 'bg-white border-yellow-400' :
        'bg-white dark:bg-kingdom-plum border-white dark:border-pink-900/30'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onWatch}
    >
      <div className={`relative aspect-[3/4] overflow-hidden bg-pink-50 dark:bg-kingdom-dark ${location === 'arcade' ? 'scanlines' : ''}`}>
        {item.videoUrl ? (
          <div className="w-full h-full relative">
            <img src={item.imageUrl} alt={item.title} className={`w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
            <video ref={videoRef} src={item.videoUrl} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} muted={isMuted} loop playsInline />
            
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${isPlaying && isHovering ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
              <div className={`${location === 'arcade' ? 'bg-green-400 text-black' : 'bg-white/90 dark:bg-pink-600/90 text-pink-500 dark:text-white'} w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50`}>
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </div>
            </div>

            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase z-10 ${location === 'arcade' ? 'bg-green-400 text-black' : 'bg-pink-500 text-white'}`}>
              {isPlaying ? 'Broadcasting' : connectivity === 'offline' ? 'Offline' : 'Ready'}
            </div>
            
            {connectivity === 'online' && (
              <button className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/40 transition-all">
                <Download size={14} />
              </button>
            )}

            <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${isHovering ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div className={`h-full ${location === 'arcade' ? 'bg-green-400' : 'bg-pink-500'}`} style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
      </div>
      <div className="p-6">
        <h3 className={`text-lg font-display mb-2 truncate uppercase ${location === 'arcade' ? 'text-green-400' : 'text-pink-600 dark:text-pink-400'}`}>{item.title}</h3>
        <p className={`text-sm line-clamp-2 h-10 font-rounded ${location === 'arcade' ? 'text-green-900' : 'text-gray-500 dark:text-pink-100/60'}`}>{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full ${
              location === 'arcade' ? 'bg-green-900/20 text-green-700' : 'bg-pink-50 dark:bg-pink-900/30 text-pink-400 dark:text-pink-300'
            }`}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCenter;
