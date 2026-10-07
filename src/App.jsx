/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_GAMES, TAB_CLOAK_PRESETS } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { HeroBanner } from './components/HeroBanner.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';
import { 
  ArrowUpDown, 
  FileJson, 
  Plus, 
  ShieldCheck 
} from 'lucide-react';
import { playClickSound, setSoundEnabled } from './utils/sound.js';

const CATEGORIES = ['All', 'Arcade', 'Action', 'Puzzle', 'Sports', 'Strategy', 'Custom'];

export default function App() {
  // Games state
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_hub_games');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_GAMES;
  });

  // Selected active playing game
  const [activeGame, setActiveGame] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_hub_favs');
      return saved ? JSON.parse(saved) : ['snake', 'slope', 'tetris'];
    } catch {
      return ['snake', 'slope', 'tetris'];
    }
  });

  // Tab Cloaking
  const [activeCloak, setActiveCloak] = useState(TAB_CLOAK_PRESETS[0]);

  // Panic overlay
  const [isPanicOpen, setIsPanicOpen] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Try fetching fresh /games.json on initial load if available
  useEffect(() => {
    fetch('/games.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then((jsonGames) => {
        // Merge with existing custom games
        const customGames = games.filter((g) => g.isCustom);
        const existingIds = new Set(jsonGames.map((g) => g.id));
        const merged = [...jsonGames, ...customGames.filter((g) => !existingIds.has(g.id))];
        setGames(merged);
      })
      .catch(() => {
        // Fallback to initial state
      });
  }, []);

  // Sync games to localStorage
  useEffect(() => {
    localStorage.setItem('unblocked_hub_games', JSON.stringify(games));
  }, [games]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('unblocked_hub_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Handle Tab Cloak Title & Favicon
  useEffect(() => {
    document.title = activeCloak.title;
    const faviconEl = document.getElementById('favicon');
    if (faviconEl) {
      faviconEl.href = activeCloak.favicon;
    }
  }, [activeCloak]);

  // Global Keyboard Shortcuts (Panic: Escape if not in modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search with '/'
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }

      // Quick panic key: '`' (tilde)
      if (e.key === '`' && !isPanicOpen) {
        setIsPanicOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanicOpen]);

  // Sound toggle
  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    setSoundEnabled(!next);
  };

  // Favorite toggle
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
    setSelectedCategory('All');
  };

  // Delete custom game
  const handleDeleteCustomGame = (id) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  // Import JSON
  const handleImportJson = (imported) => {
    setGames(imported);
    setIsJsonModalOpen(false);
  };

  // Reset to default
  const handleResetDefaults = () => {
    setGames(INITIAL_GAMES);
    localStorage.removeItem('unblocked_hub_games');
    setIsJsonModalOpen(false);
  };

  // Filtered & Sorted Games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Favorites filter
        if (showFavoritesOnly && !favorites.includes(game.id)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Custom') {
            if (!game.isCustom) return false;
          } else if (game.category !== selectedCategory) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchCat = game.category.toLowerCase().includes(q);
          const matchTags = game.tags.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchCat || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        // Default popular: sort by numeric play estimate
        const playsA = parseInt(a.plays) || 0;
        const playsB = parseInt(b.plays) || 0;
        return playsB - playsA;
      });
  }, [games, searchQuery, selectedCategory, sortBy, showFavoritesOnly, favorites]);

  // Featured game for the hero banner
  const featuredGame = useMemo(() => {
    return games.find((g) => g.id === 'slope') || games[0] || null;
  }, [games]);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCloak={activeCloak}
        onSelectCloak={setActiveCloak}
        onTriggerPanic={() => setIsPanicOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        soundMuted={soundMuted}
        onToggleSound={toggleSound}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favorites.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Hero Featured Banner (shown when not searching) */}
        {!searchQuery && !showFavoritesOnly && (
          <HeroBanner
            featuredGame={featuredGame}
            onPlayGame={setActiveGame}
            totalGames={games.length}
          />
        )}

        {/* Category & Filter Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                  setShowFavoritesOnly(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat && !showFavoritesOnly
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                playClickSound();
                setSortBy(e.target.value);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="name">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Catalog Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-arcade text-lg md:text-xl font-bold text-white tracking-wide">
              {showFavoritesOnly ? 'FAVORITE GAMES' : `${selectedCategory.toUpperCase()} GAMES`}
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
              {filteredGames.length}
            </span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-3">
            <span className="hidden md:inline font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">/</kbd> to search
            </span>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
                onPlay={setActiveGame}
                onDeleteCustom={handleDeleteCustomGame}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-800/80 flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="font-arcade text-lg font-bold text-white mb-1">
              No Games Found
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
              {searchQuery
                ? `No results match "${searchQuery}". Try a different keyword or category.`
                : "You don't have any games in this filter yet."}
            </p>
            <div className="flex items-center justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your Own Game</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#060911] px-4 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-arcade font-bold text-slate-300">UNBLOCKED HUB</span>
            <span>•</span>
            <span className="font-mono">JSON Iframe Catalog v2.0</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side Safe
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspect games.json</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPanicOpen(true)}
              className="text-slate-400 hover:text-red-400 flex items-center gap-1 transition"
            >
              <span>Emergency Cloak</span>
            </button>
            <span>•</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">`</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> for Panic</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <GamePlayerModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
        isFavorite={activeGame ? favorites.includes(activeGame.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onImportJson={handleImportJson}
        onResetToDefaults={handleResetDefaults}
      />

      <PanicOverlay
        isOpen={isPanicOpen}
        onExitPanic={() => setIsPanicOpen(false)}
      />
    </div>
  );
}
