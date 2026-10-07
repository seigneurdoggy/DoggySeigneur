import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  ShieldAlert, 
  FileJson, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  Eye, 
  Heart 
} from 'lucide-react';
import { TAB_CLOAK_PRESETS } from '../data/defaultGames.js';
import { playClickSound } from '../utils/sound.js';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeCloak,
  onSelectCloak,
  onTriggerPanic,
  onOpenJsonModal,
  onOpenAddModal,
  soundMuted,
  onToggleSound,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount
}) => {
  const [showCloakMenu, setShowCloakMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-arcade text-lg md:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  UNBLOCKED HUB
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                JSON-Powered Iframe Arcade
              </p>
            </div>
          </div>

          {/* Mobile Panic Button */}
          <button
            onClick={() => { playClickSound(); onTriggerPanic(); }}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-300 text-xs font-bold transition shadow-sm"
            title="Panic Button (Escape)"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>PANIC</span>
          </button>
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search games, categories, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* Favorites Filter */}
          <button
            onClick={() => { playClickSound(); onToggleFavorites(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showFavoritesOnly 
                ? 'bg-rose-950/80 border-rose-600 text-rose-300 shadow-sm shadow-rose-900/40' 
                : 'bg-slate-900/70 border-slate-700/80 text-slate-300 hover:bg-slate-800'
            }`}
            title="View Bookmarked Games"
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            <span>Favs</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-slate-950 text-[10px] font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Add Game */}
          <button
            onClick={() => { playClickSound(); onOpenAddModal(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-700/70 text-cyan-300 text-xs font-semibold transition"
            title="Embed New Iframe Game"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* JSON Catalog */}
          <button
            onClick={() => { playClickSound(); onOpenJsonModal(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition"
            title="View / Download games.json"
          >
            <FileJson className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          {/* Tab Cloaker Dropdown */}
          <div className="relative">
            <button
              onClick={() => { playClickSound(); setShowCloakMenu(!showCloakMenu); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition"
              title="Disguise Tab Title & Icon"
            >
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Cloak</span>
            </button>

            {showCloakMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Tab Disguise Presets
                </div>
                <div className="space-y-1 mt-1">
                  {TAB_CLOAK_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        playClickSound();
                        onSelectCloak(preset);
                        setShowCloakMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left ${
                        activeCloak.id === preset.id
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img 
                          src={preset.favicon} 
                          alt="" 
                          className="w-4 h-4 rounded-sm flex-shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="truncate">{preset.name}</span>
                      </div>
                      {activeCloak.id === preset.id && (
                        <span className="text-[10px] text-cyan-400 font-bold">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => { playClickSound(); onToggleSound(); }}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-slate-200 transition"
            title={soundMuted ? "Enable Sound" : "Mute Sound"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Desktop Panic Button */}
          <button
            onClick={() => { playClickSound(); onTriggerPanic(); }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/70 text-red-200 text-xs font-bold transition shadow-sm hover:shadow-red-950/50"
            title="Emergency Disguise (Esc)"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>PANIC (ESC)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
