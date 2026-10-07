import React from 'react';
import { Play, Heart, Star, Trash2 } from 'lucide-react';
import { playClickSound, playLaunchSound } from '../utils/sound.js';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onDeleteCustom
}) => {
  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
              {game.thumbnail}
            </div>
            <div>
              <h3 className="font-arcade text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {game.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-cyan-400">
                  {game.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {game.plays}
                </span>
              </div>
            </div>
          </div>

          {/* Favorite & Delete Buttons */}
          <div className="flex items-center gap-1">
            {game.isCustom && onDeleteCustom && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onDeleteCustom(game.id);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/50 transition"
                title="Delete Custom Game"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                onToggleFavorite(game.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart 
                className={`w-4 h-4 transition-transform ${
                  isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-500 hover:scale-110'
                }`} 
              />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {game.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {game.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
          {game.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-800/50">
              {game.badge}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 font-mono">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{Number(game.rating).toFixed(1)}</span>
        </div>

        <button
          onClick={() => {
            playLaunchSound();
            onPlay(game);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-cyan-950 transition active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>PLAY</span>
        </button>
      </div>
    </div>
  );
};
