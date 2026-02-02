
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BlogCard from './components/BlogCard';
import Oracle from './components/Oracle';
import BlogEditor from './components/BlogEditor';
import MediaCenter from './components/MediaCenter';
import MediaEditor from './components/MediaEditor';
import EmpireMall from './components/EmpireMall';
import EmpireClubs from './components/EmpireClubs';
import PreferenceProfiler from './components/PreferenceProfiler';
import ContactForm from './components/ContactForm';
import TermsAndConditions from './components/TermsAndConditions';
import UploadModal from './components/UploadModal';
import PressPage from './components/PressPage';
import PressEditor from './components/PressEditor';
import { BLOG_POSTS, EMPIRE_LOGO, MEDIA_ITEMS, DEFAULT_PRESS_CONTENT } from './constants';
import { Category, BlogPost, MediaItem, MediaType, AppPages, PressContent, ImperialLocation, ConnectivityMode } from './types';
// Added Home to imports to resolve "Cannot find name 'Home'" error
import { Sparkles, Heart, Star, Cloud, Ghost, X, Crown, ShieldCheck, Plus, LayoutGrid, Shield, Mail, Play, Volume2, Maximize, Pause, Clock, Info, Monitor, Minimize2, MoveHorizontal, Tv, Settings, SkipBack, SkipForward, VolumeX, Ratio, List, Zap, Activity, Wifi, WifiOff, MapPin, Car, Coffee, Gamepad2, Home } from 'lucide-react';

const USER_POSTS_KEY = 'issb_user_posts';
const USER_MEDIA_KEY = 'issb_user_media';
const PRESS_CONTENT_KEY = 'issb_press_content';
const THEME_KEY = 'issb_dark_mode';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<AppPages>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<BlogPost[]>([]);
  const [userMedia, setUserMedia] = useState<MediaItem[]>([]);
  const [pressContent, setPressContent] = useState<PressContent>(DEFAULT_PRESS_CONTENT);
  const [showManifesto, setShowManifesto] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'blog' | 'media'>('blog');
  const [initialMediaType, setInitialMediaType] = useState<MediaType>('photo');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Imperial Context Engine State
  const [location, setLocation] = useState<ImperialLocation>('home');
  const [connectivity, setConnectivity] = useState<ConnectivityMode>('online');

  useEffect(() => {
    const savedPosts = localStorage.getItem(USER_POSTS_KEY);
    if (savedPosts) setUserPosts(JSON.parse(savedPosts));
    const savedMedia = localStorage.getItem(USER_MEDIA_KEY);
    if (savedMedia) setUserMedia(JSON.parse(savedMedia));
    const savedPress = localStorage.getItem(PRESS_CONTENT_KEY);
    if (savedPress) setPressContent(JSON.parse(savedPress));
    const savedTheme = localStorage.getItem(THEME_KEY);
    const initialDark = savedTheme ? savedTheme === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(initialDark);
    if (initialDark) document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem(THEME_KEY, String(nextDark));
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigate = (page: string) => {
    setActivePage(page as AppPages);
    setSelectedPostId(null);
    setSelectedMediaId(null);
    window.scrollTo(0, 0);
  };

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  
  const handleSelectUpload = (type: 'blog' | 'media', mediaType: MediaType = 'photo') => {
    setUploadType(type);
    setInitialMediaType(mediaType);
    setIsUploadModalOpen(false);
    setActivePage('upload');
  };

  const handleWatchMedia = (id: string) => {
    setSelectedMediaId(id);
    setActivePage('watch');
    window.scrollTo(0, 0);
  };

  const handleSavePost = (newPost: BlogPost) => {
    const updated = [newPost, ...userPosts];
    setUserPosts(updated);
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(updated));
    setActivePage('blog');
  };

  const handleSaveMedia = (newItem: MediaItem) => {
    const updated = [newItem, ...userMedia];
    setUserMedia(updated);
    localStorage.setItem(USER_MEDIA_KEY, JSON.stringify(updated));
    setActivePage(newItem.type === 'movie' ? 'cinema' : 'tvlab');
  };

  const handleSavePress = (newContent: PressContent) => {
    setPressContent(newContent);
    localStorage.setItem(PRESS_CONTENT_KEY, JSON.stringify(newContent));
    setActivePage('press');
  };

  const allPosts = [...userPosts, ...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const allMedia = [...userMedia, ...MEDIA_ITEMS];
  const currentPost = selectedPostId ? allPosts.find(p => p.id === selectedPostId) : null;
  const currentMedia = selectedMediaId ? allMedia.find(m => m.id === selectedMediaId) : null;

  return (
    <div className={`min-h-screen selection:bg-pink-200 dark:selection:bg-pink-800 selection:text-pink-800 dark:selection:text-pink-100 transition-colors duration-500 ${isDarkMode ? 'dark' : ''} ${location === 'arcade' ? 'font-mono' : ''}`}>
      <Header 
        onNavigate={handleNavigate} 
        onUpload={handleOpenUploadModal} 
        activePage={activePage}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="container mx-auto pb-24 relative">
        {/* Context Control Panel - Floating */}
        <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
           <ContextPanel location={location} onSetLocation={setLocation} connectivity={connectivity} onSetConnectivity={setConnectivity} />
        </div>

        {activePage === 'home' && (
          <div className="px-6">
            <EmpireLiveTicker location={location} />
            <Hero onExplore={() => handleNavigate('blog')} onShowManifesto={() => setShowManifesto(true)} onUpload={handleOpenUploadModal} />
            <PreferenceProfiler />
            <FeaturedGrid posts={allPosts.slice(0, 3)} onPostClick={(id) => { setSelectedPostId(id); setActivePage('post'); }} />
          </div>
        )}

        {activePage === 'blog' && (
          <div className="px-6 py-12">
            <h2 className="text-5xl font-display text-pink-500 dark:text-pink-400 mb-12 text-center uppercase">Empire Archives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map(post => <BlogCard key={post.id} post={post} onClick={(id) => { setSelectedPostId(id); setActivePage('post'); }} />)}
            </div>
          </div>
        )}

        {activePage === 'cinema' && <MediaCenter location={location} connectivity={connectivity} initialType="movie" items={allMedia} onUploadType={(type) => handleSelectUpload('media', type)} onWatchMedia={handleWatchMedia} />}
        {activePage === 'tvlab' && <MediaCenter location={location} connectivity={connectivity} initialType="video" items={allMedia} onUploadType={(type) => handleSelectUpload('media', type)} onWatchMedia={handleWatchMedia} />}
        {activePage === 'mall' && <EmpireMall />}
        {activePage === 'clubs' && <EmpireClubs />}
        {activePage === 'contact' && <ContactForm />}
        {activePage === 'terms' && <TermsAndConditions />}
        {activePage === 'oracle' && <Oracle />}
        {activePage === 'press' && <PressPage content={pressContent} onEdit={() => setActivePage('press_edit')} />}
        {activePage === 'press_edit' && <PressEditor initialContent={pressContent} onSave={handleSavePress} onCancel={() => setActivePage('press')} />}
        {activePage === 'upload' && (
          uploadType === 'blog' ? <BlogEditor onSave={handleSavePost} onCancel={() => setActivePage('home')} /> : <MediaEditor initialType={initialMediaType} onSave={handleSaveMedia} onCancel={() => setActivePage('home')} />
        )}

        {activePage === 'post' && currentPost && <PostDetail post={currentPost} onBack={() => setActivePage('blog')} />}
        {activePage === 'watch' && currentMedia && (
          <MediaWatchView 
            media={currentMedia} 
            allMedia={allMedia}
            onSwitchMedia={(id) => setSelectedMediaId(id)}
            onBack={() => setActivePage(currentMedia.type === 'movie' ? 'cinema' : 'tvlab')} 
          />
        )}
      </main>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onSelect={handleSelectUpload} />
      {showManifesto && <ManifestoModal onClose={() => setShowManifesto(false)} />}
      
      <button onClick={handleOpenUploadModal} className="fixed bottom-8 right-8 z-[60] bg-pink-500 text-white p-6 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden border-2 border-white/50">
        <Plus size={36} className="group-hover:rotate-180 transition-transform duration-500" strokeWidth={3} />
      </button>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

const ContextPanel: React.FC<{ 
  location: ImperialLocation, 
  onSetLocation: (l: ImperialLocation) => void, 
  connectivity: ConnectivityMode, 
  onSetConnectivity: (c: ConnectivityMode) => void 
}> = ({ location, onSetLocation, connectivity, onSetConnectivity }) => {
  return (
    <div className="bg-white/80 dark:bg-kingdom-plum/80 backdrop-blur-md p-3 rounded-[2.5rem] border-2 border-pink-200 dark:border-pink-900/40 shadow-2xl flex flex-col gap-4">
      <div className="flex flex-col gap-1">
         <span className="text-[8px] font-bold uppercase tracking-widest text-pink-400 text-center mb-1">Signal Mode</span>
         <div className="flex bg-pink-50 dark:bg-black/20 p-1 rounded-full border border-pink-100 dark:border-pink-900/30">
            <button 
              onClick={() => onSetConnectivity('online')}
              className={`p-2 rounded-full transition-all ${connectivity === 'online' ? 'bg-pink-500 text-white' : 'text-pink-300'}`}
              title="Imperial Wi-Fi"
            >
              <Wifi size={14} />
            </button>
            <button 
              onClick={() => onSetConnectivity('offline')}
              className={`p-2 rounded-full transition-all ${connectivity === 'offline' ? 'bg-pink-500 text-white' : 'text-pink-300'}`}
              title="Local Archive Mode"
            >
              <WifiOff size={14} />
            </button>
         </div>
      </div>
      
      <div className="h-px bg-pink-100 dark:bg-pink-900/30 mx-2" />

      <div className="flex flex-col gap-2">
         <span className="text-[8px] font-bold uppercase tracking-widest text-pink-400 text-center mb-1">Location</span>
         <LocationBtn active={location === 'home'} icon={<Home size={14} />} onClick={() => onSetLocation('home')} label="Palace" />
         <LocationBtn active={location === 'travel'} icon={<Car size={14} />} onClick={() => onSetLocation('travel')} label="Roaming" />
         <LocationBtn active={location === 'mcdonalds'} icon={<Coffee size={14} />} onClick={() => onSetLocation('mcdonalds')} label="McSlay" />
         <LocationBtn active={location === 'arcade'} icon={<Gamepad2 size={14} />} onClick={() => onSetLocation('arcade')} label="Arcade" />
      </div>
    </div>
  );
};

const LocationBtn: React.FC<{ active: boolean, icon: React.ReactNode, onClick: () => void, label: string }> = ({ active, icon, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all border ${active ? 'bg-pink-500 border-pink-400 text-white shadow-lg' : 'bg-white dark:bg-kingdom-plum border-pink-50 dark:border-pink-900/30 text-pink-300'}`}
  >
    {icon}
    <span className="text-[7px] font-bold uppercase mt-1">{label}</span>
  </button>
);

const EmpireLiveTicker: React.FC<{ location: ImperialLocation }> = ({ location }) => {
  const messages = {
    home: "✨ THE IMPERIAL CINEMA IS NOW BROADCASTING HSM 2 IN 4K • BARKING EDITION CREDIT CARDS DROPPING IN MALL •",
    travel: "🚗 ROAMING SIGNAL: CACHED SLAY DOWNLOADED FOR THE JOURNEY • OFFLINE ARCHIVE MODE ENGAGED •",
    mcdonalds: "🍟 MCSLAY UPDATE: HAPPY MEAL DIGITAL STICKERS NOW IN THE MALL • IMPERIAL GOLD NUGGETS ARE BACK •",
    arcade: "👾 HIGH SCORE ALERT: BABY_GIRL_99 RECHED 1.2M IN GLITTER BLITZ • INSERT COIN TO UNLOCK CINEMA •"
  };

  return (
    <div className={`w-full py-2 border-b flex items-center overflow-hidden transition-colors duration-500 ${
      location === 'mcdonalds' ? 'bg-red-50 dark:bg-red-900/20 border-red-200' : 
      location === 'arcade' ? 'bg-indigo-900 text-white border-indigo-500' :
      'bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800'
    }`}>
      <div className={`text-[10px] font-bold px-3 py-1 rounded-full ml-4 shrink-0 animate-pulse ${
        location === 'mcdonalds' ? 'bg-yellow-400 text-red-700' :
        location === 'arcade' ? 'bg-green-400 text-black' :
        'bg-pink-500 text-white'
      }`}>
        {location.toUpperCase()} FEED
      </div>
      <div className={`whitespace-nowrap flex animate-[marquee_30s_linear_infinite] px-4 text-xs font-medium ${
        location === 'arcade' ? 'text-green-400' : 'text-pink-400 dark:text-pink-300'
      }`}>
        <span className="mx-8 uppercase tracking-widest">{messages[location]} {messages[location]}</span>
      </div>
    </div>
  );
};

const Hero: React.FC<{ onExplore: () => void, onShowManifesto: () => void, onUpload: () => void }> = ({ onExplore, onShowManifesto, onUpload }) => (
  <section className="py-20 flex flex-col items-center text-center">
    <div className="relative mb-8">
      <img src={EMPIRE_LOGO} alt="Logo" className="w-64 h-64 md:w-80 md:h-80 rounded-[2rem] border-8 border-white dark:border-kingdom-plum shadow-2xl object-cover transform -rotate-2 hover:rotate-0 transition-all" />
      <div className="absolute -top-4 -right-4 bg-pink-500 text-white p-4 rounded-full animate-bounce"><Heart size={32} fill="white" /></div>
    </div>
    <h2 className="text-4xl md:text-7xl font-display text-pink-500 dark:text-pink-400 mb-6 uppercase tracking-tighter">OMG ISSB BIG MEDIA EMPIRE ✨</h2>
    <p className="text-xl md:text-2xl text-pink-400 dark:text-pink-300 max-w-2xl mb-10 font-rounded">Dominating the aesthetic landscape since the Imperial Era began.</p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button onClick={onExplore} className="px-12 py-4 bg-pink-500 text-white font-display text-xl rounded-full shadow-xl">Enter Empire</button>
      <button onClick={onUpload} className="px-12 py-4 bg-white dark:bg-pink-900/30 text-pink-500 font-display text-xl rounded-full border-2 border-pink-100">Broadcast Now</button>
    </div>
  </section>
);

const MediaWatchView: React.FC<{ 
  media: MediaItem, 
  allMedia: MediaItem[],
  onSwitchMedia: (id: string) => void,
  onBack: () => void 
}> = ({ media, allMedia, onSwitchMedia, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('original');
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [showStatic, setShowStatic] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const aspectRatios = [
    { label: 'Original', value: 'original', class: 'aspect-auto' },
    { label: '1:1 Square', value: '1/1', class: 'aspect-[1/1]' },
    { label: '4:3 Vintage', value: '4/3', class: 'aspect-[4/3]' },
    { label: '3:2 Classic', value: '3/2', class: 'aspect-[3/2]' },
    { label: '16:9 HD', value: '16/9', class: 'aspect-video' },
    { label: '18:9 Mobile', value: '18/9', class: 'aspect-[18/9]' },
    { label: '21:9 Cinema', value: '21/9', class: 'aspect-[21/9]' },
    { label: '32:9 SuperWide', value: '32/9', class: 'aspect-[32/9]' },
    { label: '4:1 Imperial', value: '4/1', class: 'aspect-[4/1]' },
    { label: '9:16 Vertical', value: '9/16', class: 'aspect-[9/16]' },
  ];

  const currentRatio = aspectRatios.find(r => r.value === aspectRatio) || aspectRatios[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      playPromiseRef.current = videoRef.current.play();
      setIsPlaying(true);
    } else {
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          videoRef.current?.pause();
          setIsPlaying(false);
        }).catch(() => {
          // Playback was interrupted
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const switchChannel = (direction: 'next' | 'prev') => {
    const currentIdx = allMedia.findIndex(m => m.id === media.id);
    let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
    if (nextIdx < 0) nextIdx = allMedia.length - 1;
    if (nextIdx >= allMedia.length) nextIdx = 0;
    onSwitchMedia(allMedia[nextIdx].id);
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Video Update Listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [media.id]);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <button onClick={onBack} className="text-pink-400 font-display uppercase tracking-widest hover:text-pink-600 flex items-center gap-3 bg-white/40 px-6 py-3 rounded-full border border-pink-100 transition-all hover:scale-105 active:scale-95 shadow-sm">
          <X size={20} /> Exit Theatre
        </button>
        
        <div className="flex items-center gap-2 bg-pink-500/10 px-6 py-3 rounded-full border border-pink-200 shadow-inner">
           <Activity size={16} className="text-pink-500 animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">Live Imperial Feed: Channel {allMedia.findIndex(m => m.id === media.id) + 1}</span>
        </div>
      </div>

      <div 
        ref={playerContainerRef}
        className={`relative group bg-kingdom-dark rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-pink-900/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out ${aspectRatio.includes('Wide') || aspectRatio.includes('9') || aspectRatio === '4/1' || aspectRatio === '21/9' ? 'max-w-none w-full' : 'max-w-6xl mx-auto'}`}
      >
        {/* TV Guide Overlay */}
        {showGuide && (
          <div className="absolute inset-y-0 left-0 w-80 bg-black/90 backdrop-blur-xl z-[60] border-r border-white/10 p-8 transform transition-transform duration-500 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-pink-500 font-display text-2xl uppercase tracking-tighter">Imperial Guide</h3>
               <button onClick={() => setShowGuide(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
               {allMedia.map((m, i) => (
                 <button 
                  key={m.id} 
                  onClick={() => { onSwitchMedia(m.id); setShowGuide(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${m.id === media.id ? 'bg-pink-500/20 border-pink-500 text-pink-400' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                 >
                   <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center font-display text-xl">{i+1}</div>
                   <div className="flex-1 truncate">
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">{m.type}</div>
                      <div className="font-display uppercase tracking-tight truncate">{m.title}</div>
                   </div>
                 </button>
               ))}
            </div>
          </div>
        )}

        {/* Video Wrapper with dynamic aspect ratio */}
        <div className={`relative w-full transition-all duration-1000 ease-in-out ${currentRatio.class} max-h-[85vh]`}>
          {media.videoUrl ? (
            <video 
              ref={videoRef} 
              src={media.videoUrl} 
              className={`w-full h-full object-cover transition-all duration-700`} 
              autoPlay 
              loop 
            />
          ) : (
            <img src={media.imageUrl} alt={media.title} className="w-full h-full object-cover" />
          )}
          
          {/* CRT / Old School Overlays */}
          {showStatic && (
            <>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] pointer-events-none mix-blend-overlay"></div>
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
            </>
          )}
          
          {/* Retro Corner Brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/20"></div>

          {/* Fullscreen Exit Overlay (Only in FS) */}
          {isFullscreen && (
            <button 
              onClick={toggleFullscreen}
              className="fixed top-8 right-8 z-[100] bg-black/60 hover:bg-black text-white p-5 rounded-full backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <Minimize2 size={32} />
            </button>
          )}

          {/* Bottom Control Deck */}
          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 z-40">
            <div className="flex flex-col gap-6">
              
              {/* Aspect Ratio & Signal Control Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                  <div className="shrink-0 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mr-2">
                    <Ratio size={14} className="text-pink-400" />
                    <span className="text-[10px] font-display uppercase tracking-widest text-white/60">Imperial Lenses</span>
                  </div>
                  {aspectRatios.map(ratio => (
                    <button 
                      key={ratio.value}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`shrink-0 px-5 py-2 rounded-full border text-[10px] font-display uppercase tracking-widest transition-all ${aspectRatio === ratio.value ? 'bg-pink-500 border-pink-400 text-white shadow-[0_0_15px_#ec4899]' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'}`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowStatic(!showStatic)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[10px] font-display uppercase tracking-widest transition-all ${showStatic ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                >
                  <Zap size={14} /> {showStatic ? 'Signal Static: ON' : 'Signal Static: OFF'}
                </button>
              </div>

              {/* Functional Seek Bar */}
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-mono text-pink-400 w-12 text-center">{formatTime(currentTime)}</span>
                <div className="flex-1 relative group/seek h-8 flex items-center">
                  <input 
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-pink-500 relative z-10"
                  />
                  <div 
                    className="absolute inset-y-0 left-0 bg-pink-500 shadow-[0_0_15px_#ec4899] h-1 my-auto rounded-full pointer-events-none" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-mono text-pink-400 w-12 text-center">{formatTime(duration)}</span>
              </div>

              {/* Main Playback Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-4">
                    <button onClick={() => switchChannel('prev')} className="text-white/40 hover:text-pink-400 transition-all transform active:scale-90" title="Prev Channel">
                      <SkipBack size={28} fill="currentColor" />
                    </button>
                    <button onClick={togglePlay} className="bg-white text-pink-500 p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-90 transition-all">
                      {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                    </button>
                    <button onClick={() => switchChannel('next')} className="text-white/40 hover:text-pink-400 transition-all transform active:scale-90" title="Next Channel">
                      <SkipForward size={28} fill="currentColor" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setShowGuide(true)}
                    className="flex flex-col items-center gap-1 text-white/40 hover:text-pink-400 transition-colors"
                  >
                    <List size={24} />
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Guide</span>
                  </button>

                  <div className="hidden md:flex flex-col border-l border-white/10 pl-10">
                    <span className="text-pink-400 font-display text-[10px] tracking-[0.2em] uppercase">Imperial CH {allMedia.findIndex(m => m.id === media.id) + 1} • {media.type}</span>
                    <span className="text-white text-xl font-display uppercase tracking-tighter truncate max-w-[200px]">{media.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl border border-white/10 group/volume">
                      <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                        {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                      </button>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-pink-500"
                      />
                   </div>
                   <button onClick={toggleFullscreen} className="text-white/80 hover:text-pink-400 hover:scale-110 transition-all">
                      <Maximize size={32} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pb-20">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-pink-500 text-white px-5 py-1.5 rounded-full text-xs font-display uppercase tracking-widest shadow-lg shadow-pink-200">Imperial Master Archive</span>
               <span className="text-pink-300 font-bold uppercase text-[10px] tracking-[0.2em]">Broadcast Log ID: {media.id}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-pink-500 uppercase tracking-tighter leading-none mb-8">{media.title}</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-pink-200/80 font-rounded leading-relaxed italic max-w-3xl">
              "{media.description}"
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {media.tags.map(tag => (
              <span key={tag} className="px-6 py-2 bg-white dark:bg-kingdom-plum text-pink-400 border-2 border-pink-50 dark:border-pink-900/30 rounded-full font-bold text-sm shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-kingdom-plum p-10 rounded-[4rem] border-4 border-dashed border-pink-200 dark:border-pink-900/40 text-center shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform">
              <Crown size={200} />
           </div>
           
           <Heart size={48} className="text-pink-300 mx-auto mb-6 animate-pulse" fill="currentColor" />
           <h4 className="font-display text-pink-500 text-2xl mb-2 uppercase tracking-tight text-center">Imperial Rating</h4>
           <div className="flex justify-center gap-2 mb-8">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={32} fill={i < media.rating ? '#ec4899' : 'none'} className="text-pink-500 transition-transform hover:scale-125 cursor-help" />
             ))}
           </div>
           
           <button className="w-full py-5 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full font-display text-xl shadow-xl hover:shadow-pink-200 transition-all hover:-translate-y-1 active:scale-95 border-b-4 border-black/20 mb-4">
             Award Imperial Crown
           </button>
           <button className="w-full py-5 bg-pink-50 dark:bg-pink-900/20 text-pink-400 font-display text-lg rounded-full border-2 border-pink-100 dark:border-pink-900 transition-all hover:bg-pink-100">
             Add to My Favorites
           </button>
        </div>
      </div>

      <div className="pt-12 border-t-4 border-dashed border-pink-100 dark:border-pink-900/20 text-center">
         <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-pink-200 dark:text-pink-800">OMG ISSB MEDIA EMPIRE • END OF BROADCAST • STAY SPARKLY ✨</p>
      </div>
    </div>
  );
};

const FeaturedGrid: React.FC<{ posts: BlogPost[], onPostClick: (id: string) => void }> = ({ posts, onPostClick }) => (
  <section className="py-12">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-3xl font-display text-pink-500 uppercase">Empire Highlights</h3>
      <Sparkles className="text-pink-300" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map(post => <BlogCard key={post.id} post={post} onClick={onPostClick} />)}
    </div>
  </section>
);

const PostDetail: React.FC<{ post: BlogPost, onBack: () => void }> = ({ post, onBack }) => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <button onClick={onBack} className="mb-8 text-pink-400 font-bold hover:text-pink-600 flex items-center gap-2">← Back to Empire</button>
    <div className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-pink-50 dark:border-pink-900">
      <h1 className="text-4xl md:text-5xl font-display text-pink-600 dark:text-pink-400 mb-8">{post.title}</h1>
      <img src={post.imageUrl} className="w-full h-[400px] object-cover rounded-[2rem] mb-12 shadow-lg" alt={post.title} />
      <div className="text-gray-600 dark:text-pink-100 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </div>
  </div>
);

const ManifestoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pink-100/40 dark:bg-black/60 backdrop-blur-md">
    <div className="glass-card rounded-[3rem] p-10 max-w-2xl w-full border-4 border-pink-300 shadow-2xl relative">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-pink-500 text-white rounded-full"><X size={24} /></button>
      <h2 className="text-4xl font-display text-pink-600 uppercase mb-8">The Imperial Manifesto</h2>
      <div className="space-y-6 text-lg text-gray-700 dark:text-pink-100">
        <p>1. Glitter is a fundamental human right.</p>
        <p>2. Minimalists will be exiled to the Beige Dimension.</p>
        <p>3. Every babygirl is a sovereign citizen.</p>
      </div>
    </div>
  </div>
);

const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-white dark:bg-kingdom-plum border-t-4 border-pink-100 dark:border-pink-900/30 py-12 px-6">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <h4 className="text-xl font-display text-pink-500 uppercase">OMG ISSB EMPIRE</h4>
        <p className="text-pink-300 text-sm">© 2011-2024 • Established in Romford x Barking</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2">
        <button onClick={() => onNavigate('contact')} className="text-pink-500 font-display text-sm uppercase flex items-center gap-2"><Mail size={16} /> Contact Me</button>
        <div className="text-pink-300 font-bold opacity-50 uppercase text-[10px]">Slay the Throne xoxo</div>
      </div>
    </div>
  </footer>
);

export default App;
