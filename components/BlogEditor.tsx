
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Sparkles, Smile, Save, Type, Image as ImageIcon, Plus, Eye, Edit3, Calendar, CheckSquare, Square } from 'lucide-react';
import { Category, BlogPost } from '../types';

interface BlogEditorProps {
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const NOSTALGIC_EMOJIS = ['✨', '💖', '🎀', '🌸', '🦄', '🌈', '🍓', '🧸', '🦋', '💿', '📸', '💄', '💅', '👑', '💎', '🍭'];
const KAOMOJIS = ['(｡♥‿♥｡)', '(◕‿◕✿)', '(✿◠‿◠)', '✨(◕‿◕)✨', '(ノ◕ヮ◕)ノ*:·ﾟ✧'];

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>(Category.SOUL_CANDY);
  const [tags, setTags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

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
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const insertEmoji = (emoji: string) => {
    if (contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const newContent = content.substring(0, start) + emoji + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        contentRef.current?.focus();
        contentRef.current?.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setContent(content + emoji);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !agreedToTerms) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      category,
      excerpt: excerpt || content.substring(0, 100) + "...",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: selectedImage || `https://picsum.photos/seed/${Date.now()}/800/600`,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
    };

    onSave(newPost);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-float">
      <div className="glass-card rounded-[3rem] p-8 md:p-12 border-4 border-dashed border-pink-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-pink-400 p-3 rounded-full text-white">
              <Plus size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-display text-pink-500">Post a Bulletin</h2>
              <p className="text-pink-400 font-rounded">Share your sparkly wisdom with the kingdom ✨</p>
            </div>
          </div>

          <div className="flex bg-pink-50 p-1 rounded-full border border-pink-100 self-start md:self-center">
            <button 
              type="button"
              onClick={() => setIsPreviewMode(false)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all font-bold ${!isPreviewMode ? 'bg-white text-pink-500 shadow-sm border border-pink-200' : 'text-pink-400 hover:bg-pink-100'}`}
            >
              <Edit3 size={18} /> Edit
            </button>
            <button 
              type="button"
              onClick={() => setIsPreviewMode(true)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all font-bold ${isPreviewMode ? 'bg-white text-pink-500 shadow-sm border border-pink-200' : 'text-pink-400 hover:bg-pink-100'}`}
            >
              <Eye size={18} /> Preview
            </button>
          </div>
        </div>

        {!isPreviewMode ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-xs tracking-widest">Post Title</label>
                  <input 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Pink Princess Room Tour!"
                    className="w-full px-6 py-4 rounded-full border-2 border-pink-100 focus:border-pink-300 outline-none bg-white/50 text-pink-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-xs tracking-widest">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-6 py-4 rounded-full border-2 border-pink-100 focus:border-pink-300 outline-none bg-white/50 text-pink-600 font-medium appearance-none"
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-xs tracking-widest">Tags (comma separated)</label>
                  <input 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="aesthetic, pink, goals"
                    className="w-full px-6 py-4 rounded-full border-2 border-pink-100 focus:border-pink-300 outline-none bg-white/50 text-pink-600 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-xs tracking-widest">Thumbnail Image</label>
                {isCameraActive ? (
                  <div className="relative rounded-3xl overflow-hidden border-4 border-pink-200 aspect-video bg-black">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                    <div className="absolute inset-0 flex items-end justify-center pb-4 gap-2">
                      <button type="button" onClick={capturePhoto} className="bg-white text-pink-500 p-3 rounded-full shadow-lg"><Camera size={24} /></button>
                      <button type="button" onClick={stopCamera} className="bg-white/20 text-white p-3 rounded-full"><X size={24} /></button>
                    </div>
                  </div>
                ) : selectedImage ? (
                  <div className="relative group rounded-3xl overflow-hidden border-4 border-pink-200 aspect-video">
                    <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
                    <button type="button" onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-pink-500 text-white p-2 rounded-full shadow-md"><X size={16} /></button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={startCamera} className="flex flex-col items-center justify-center p-6 bg-pink-50 border-2 border-dashed border-pink-200 rounded-3xl text-pink-400 hover:bg-pink-100 transition-colors">
                      <Camera size={32} className="mb-2" />
                      <span className="text-xs font-bold uppercase">Snap</span>
                    </button>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-6 bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl text-blue-400 hover:bg-blue-100 transition-colors">
                      <Upload size={32} className="mb-2" />
                      <span className="text-xs font-bold uppercase">Upload</span>
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-pink-400 font-bold mb-2 ml-4 uppercase text-xs tracking-widest">Blog Content</label>
              <div className="bg-white/50 rounded-[2rem] border-2 border-pink-100 focus-within:border-pink-300 transition-colors p-4">
                <textarea 
                  ref={contentRef}
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Once upon a time in the Kingdom..."
                  className="w-full bg-transparent outline-none text-pink-600 font-medium resize-none p-4"
                />
                <div className="border-t border-pink-50 pt-4 flex flex-wrap gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 bg-pink-100 text-pink-500 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    <Smile size={20} />
                  </button>
                  {showEmojiPicker && (
                    <div className="flex flex-wrap gap-2 items-center bg-white/80 backdrop-blur p-2 rounded-2xl border border-pink-100 animate-float">
                      {NOSTALGIC_EMOJIS.map(e => (
                        <button key={e} type="button" onClick={() => insertEmoji(e)} className="text-xl hover:scale-125 transition-transform">{e}</button>
                      ))}
                      <div className="w-px h-6 bg-pink-100 mx-1"></div>
                      {KAOMOJIS.map(k => (
                        <button key={k} type="button" onClick={() => insertEmoji(k)} className="text-sm font-medium text-pink-400 hover:text-pink-600 px-2 py-1 bg-pink-50 rounded-lg">{k}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4">
              <button 
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`transition-colors ${agreedToTerms ? 'text-pink-500' : 'text-pink-200'}`}
              >
                {agreedToTerms ? <CheckSquare size={24} /> : <Square size={24} />}
              </button>
              <span className="text-sm font-rounded text-pink-400">
                I agree to the <span className="underline cursor-pointer">Imperial Slay Policy & Terms</span> of the Kingdom. ✨
              </span>
            </div>

            <div className="flex gap-4">
              <button 
                type="submit"
                disabled={!agreedToTerms}
                className="flex-1 py-6 bg-pink-500 hover:bg-pink-600 text-white font-display text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={24} /> Publish to Kingdom
              </button>
              <button 
                type="button"
                onClick={onCancel}
                className="px-10 py-6 bg-white text-pink-400 border-2 border-pink-100 rounded-full font-bold hover:bg-pink-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border-2 border-pink-50 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-pink-100 text-pink-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {category}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar size={12} /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display text-pink-600 mb-6 leading-tight">
                {title || "Untilted Masterpiece"}
              </h1>
              
              {selectedImage ? (
                <img src={selectedImage} className="w-full h-64 object-cover rounded-[1.5rem] mb-8 shadow-md" alt="Preview" />
              ) : (
                <div className="w-full h-64 bg-pink-50 border-2 border-dashed border-pink-100 rounded-[1.5rem] mb-8 flex items-center justify-center text-pink-300 italic">
                  Image will appear here ✨
                </div>
              )}
              
              <div className="prose prose-pink max-w-none text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {(excerpt || content) && (
                  <p className="mb-6 font-bold text-pink-500 italic border-l-4 border-pink-200 pl-4">
                    "{excerpt || (content.length > 100 ? content.substring(0, 100) + '...' : content)}"
                  </p>
                )}
                <div className="min-h-[100px]">
                  {content || "Your sparkly content will live here..."}
                </div>
                
                <div className="bg-pink-50 p-6 rounded-2xl border-2 border-dashed border-pink-200 my-8">
                  <h4 className="font-display text-pink-500 text-lg mb-2">Pro Tip for Babygirls ✨</h4>
                  <p className="italic text-pink-600 text-sm">
                    "Always remember to carry a spare lip gloss and keep your heart open to the magic of the universe."
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-pink-100 flex flex-wrap gap-2">
                {tags.split(',').filter(t => t.trim()).map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 max-w-3xl mx-auto">
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={!agreedToTerms}
                className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white font-display text-xl rounded-full shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 disabled:grayscale disabled:opacity-50"
              >
                Looks Good! Publish ✨
              </button>
              <button 
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className="px-8 py-4 bg-white text-pink-400 border-2 border-pink-100 rounded-full font-bold hover:bg-pink-50 transition-all"
              >
                Go Back to Editing
              </button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default BlogEditor;
