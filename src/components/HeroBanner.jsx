import React from 'react';
import { Play, Flame, ShieldCheck, Database, Layers, Sparkles } from 'lucide-react';
import { playLaunchSound } from '../utils/sound.js';

export const HeroBanner = ({
  featuredGame,
  onPlayGame,
  totalGames
}) => {
  if (!featuredGame) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-6 md:p-8 mb-8 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>FEATURED ARCADE PICK</span>
          </div>

          <h2 className="font-arcade text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2 flex items-center gap-3">
            <span>{featuredGame.thumbnail}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              {featuredGame.title}
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
            {featuredGame.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                playLaunchSound();
                onPlayGame(featuredGame);
              }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>PLAY NOW</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                ⭐ <strong className="text-slate-200">{featuredGame.rating}</strong>
              </span>
              <span>•</span>
              <span className="text-slate-200">
                {featuredGame.plays} Plays
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-sans font-semibold">
                {featuredGame.category}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Card */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[280px]">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <Database className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-200">JSON Stored</div>
              <div className="text-[11px] text-slate-400">All iframes in games.json</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-200">100% Unblocked</div>
              <div className="text-[11px] text-slate-400">Sandboxed & Safe</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-200">{totalGames} Games Ready</div>
              <div className="text-[11px] text-slate-400">HTML5 Canvas / WebGL</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-200">Cloak & Panic</div>
              <div className="text-[11px] text-slate-400">Instant tab disguise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
