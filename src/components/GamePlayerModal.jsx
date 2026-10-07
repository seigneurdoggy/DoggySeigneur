import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  Tv, 
  Info, 
  Heart,
  Copy,
  Check
} from 'lucide-react';
import { playClickSound } from '../utils/sound.js';

export const GamePlayerModal = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const toggleFullscreen = () => {
    playClickSound();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReload = () => {
    playClickSound();
    setReloadKey((prev) => prev + 1);
  };

  const handleAboutBlankPopout = () => {
    playClickSound();
    try {
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.title = game.title;
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100vh';
        win.document.body.style.overflow = 'hidden';
        win.document.body.style.background = '#0a0d14';
        
        const iframe = win.document.createElement('iframe');
        iframe.src = game.iframeUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.allow = game.iframeAllow || 'autoplay; fullscreen';
        win.document.body.appendChild(iframe);
      }
    } catch (e) {
      console.error('Popout failed', e);
    }
  };

  const handleCopyUrl = () => {
    playClickSound();
    navigator.clipboard.writeText(game.iframeUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        ref={containerRef}
        className={`w-full bg-[#080d18] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isTheater 
            ? 'max-w-[98vw] h-[95vh]' 
            : 'max-w-5xl h-[88vh]'
        }`}
      >
        {/* Top Control Bar */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 truncate">
            <span className="text-2xl">{game.thumbnail}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-arcade text-lg font-bold text-white truncate">
                  {game.title}
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 hidden sm:inline">
                  {game.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden md:block">
                Controls: {game.controls}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Favorite */}
            <button
              onClick={() => { playClickSound(); onToggleFavorite(game.id); }}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Reload Frame */}
            <button
              onClick={handleReload}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
              title="Reload Game Frame"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Theater Mode */}
            <button
              onClick={() => { playClickSound(); setIsTheater(!isTheater); }}
              className={`p-2 rounded-lg transition ${
                isTheater 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="Toggle Theater Mode"
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Fullscreen Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Popout / About:Blank Cloak */}
            <button
              onClick={handleAboutBlankPopout}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-purple-400 transition hidden sm:flex"
              title="Open in stealth about:blank tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Info Drawer Toggle */}
            <button
              onClick={() => { playClickSound(); setShowInfo(!showInfo); }}
              className={`p-2 rounded-lg transition ${
                showInfo 
                  ? 'bg-blue-950 text-blue-300 border border-blue-700/60' 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="Game Details & Iframe Code"
            >
              <Info className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-6 bg-slate-700 mx-1" />

            {/* Close */}
            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 transition"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Drawer when toggled */}
        {showInfo && (
          <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-top-2">
            <div>
              <p className="font-semibold text-white mb-1">{game.description}</p>
              <p className="text-slate-400 font-mono">Controls: {game.controls}</p>
              <p className="text-slate-500 font-mono mt-0.5">Author: {game.author} • Rating: {game.rating}★</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800 max-w-xs truncate">
                {game.iframeUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Iframe Game Player View */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          <iframe
            key={reloadKey}
            src={game.iframeUrl}
            title={game.title}
            allow={game.iframeAllow || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
            sandbox={game.sandbox || "allow-scripts allow-same-origin allow-forms allow-pointer-lock"}
            className="w-full h-full border-none block"
          />
        </div>
      </div>
    </div>
  );
};
