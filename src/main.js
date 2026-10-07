import { INITIAL_GAMES, TAB_CLOAK_PRESETS } from './data/defaultGames.js';
import { playClickSound, playLaunchSound, setSoundEnabled } from './utils/sound.js';
import { icons } from './utils/icons.js';

// Application State
let games = (() => {
  try {
    const saved = localStorage.getItem('unblocked_hub_games');
    if (saved) return JSON.parse(saved);
  } catch {}
  return INITIAL_GAMES;
})();

// Sync defaults if a known game (like retro-bowl) has updated mirrors/URL
INITIAL_GAMES.forEach(initial => {
  const existingIdx = games.findIndex(g => g.id === initial.id);
  if (existingIdx !== -1 && initial.mirrors && (!games[existingIdx].mirrors || games[existingIdx].iframeUrl.includes('retrobowl.me'))) {
    games[existingIdx] = { ...initial, isCustom: false };
    saveGames();
  }
});

let favorites = (() => {
  try {
    const saved = localStorage.getItem('unblocked_hub_favs');
    if (saved) return JSON.parse(saved);
  } catch {}
  return ['snake', 'slope', 'tetris'];
})();

let activeCloak = TAB_CLOAK_PRESETS[0];
let activeGame = null;
let searchQuery = '';
let selectedCategory = 'All';
let sortBy = 'popular';
let showFavoritesOnly = false;
let isTheater = false;
let soundMuted = false;
let isPanicOpen = false;
let isAddModalOpen = false;
let isJsonModalOpen = false;

const CATEGORIES = ['All', 'Arcade', 'Action', 'Puzzle', 'Sports', 'Strategy', 'Custom'];

// Helper to resolve URLs relative to the current page location
function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Remove leading './' or '/'
  let clean = url;
  if (clean.startsWith('./')) clean = clean.slice(2);
  else if (clean.startsWith('/')) clean = clean.slice(1);
  return './' + clean;
}

// Fetch games.json if available
fetch('./games.json')
  .then(res => res.ok ? res.json() : null)
  .then(jsonGames => {
    if (jsonGames && Array.isArray(jsonGames)) {
      const customGames = games.filter(g => g.isCustom);
      const existingIds = new Set(jsonGames.map(g => g.id));
      games = [...jsonGames, ...customGames.filter(g => !existingIds.has(g.id))];
      saveGames();
      renderApp();
    }
  })
  .catch(() => {});

function saveGames() {
  localStorage.setItem('unblocked_hub_games', JSON.stringify(games));
}

function saveFavorites() {
  localStorage.setItem('unblocked_hub_favs', JSON.stringify(favorites));
}

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    const input = document.getElementById('search-input');
    if (input) input.focus();
  }
  if (e.key === '`' || (e.key === 'Escape' && !document.fullscreenElement && !activeGame && !isAddModalOpen && !isJsonModalOpen)) {
    togglePanic();
  } else if (e.key === 'Escape' && activeGame) {
    closePlayer();
  }
});

// Update Document Title & Favicon for Tab Cloaker
function applyCloak(preset) {
  activeCloak = preset;
  document.title = preset.title;
  const favicon = document.getElementById('favicon');
  if (favicon) favicon.href = preset.favicon;
}

function togglePanic(forceState) {
  isPanicOpen = typeof forceState === 'boolean' ? forceState : !isPanicOpen;
  renderApp();
}

function openPlayer(game) {
  playLaunchSound();
  activeGame = game;
  isTheater = false;
  renderApp();
}

function closePlayer() {
  playClickSound();
  activeGame = null;
  renderApp();
}

function toggleFavorite(id) {
  playClickSound();
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  renderApp();
}

function deleteCustomGame(id) {
  playClickSound();
  if (confirm('Delete this custom game?')) {
    games = games.filter(g => g.id !== id);
    saveGames();
    renderApp();
  }
}

// Render the application into #root
export function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  if (isPanicOpen) {
    root.innerHTML = renderPanicScreen();
    bindPanicEvents();
    return;
  }

  // Filter games
  const filtered = games.filter(g => {
    if (showFavoritesOnly && !favorites.includes(g.id)) return false;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Custom') {
        if (!g.isCustom) return false;
      } else if (g.category !== selectedCategory) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchCat = g.category.toLowerCase().includes(q);
      const matchTags = (g.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCat || matchTags;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return (parseInt(b.plays) || 0) - (parseInt(a.plays) || 0);
  });

  const featuredGame = games.find(g => g.id === 'retro-bowl') || games.find(g => g.id === 'slope') || games[0];

  root.innerHTML = `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <!-- Navbar -->
      <header class="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div class="flex items-center justify-between w-full md:w-auto">
            <div class="flex items-center gap-3 cursor-pointer" id="nav-brand">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
                ${icons.gamepad}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-arcade text-lg md:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                    UNBLOCKED HUB
                  </span>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                    v2.0
                  </span>
                </div>
                <p class="text-xs text-slate-400 font-mono hidden sm:block">JSON-Powered Iframe Arcade</p>
              </div>
            </div>

            <button id="mobile-panic-btn" class="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-300 text-xs font-bold transition">
              ${icons.shieldAlert}
              <span>PANIC</span>
            </button>
          </div>

          <!-- Search input -->
          <div class="relative w-full md:w-80 lg:w-96">
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              ${icons.search}
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search games, categories, tags..."
              value="${escapeHtml(searchQuery)}"
              class="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
            />
            ${searchQuery ? `<button id="clear-search-btn" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white">✕</button>` : ''}
          </div>

          <!-- Top Toolbar Action Buttons -->
          <div class="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <button id="toggle-favs-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${showFavoritesOnly ? 'bg-rose-950/80 border-rose-600 text-rose-300' : 'bg-slate-900/70 border-slate-700/80 text-slate-300 hover:bg-slate-800'}">
              ${showFavoritesOnly ? icons.heartFilled : icons.heart}
              <span>Favs</span>
              ${favorites.length > 0 ? `<span class="px-1.5 py-0.2 rounded-full bg-rose-500 text-slate-950 text-[10px] font-bold">${favorites.length}</span>` : ''}
            </button>

            <button id="open-add-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/70 text-cyan-300 text-xs font-semibold transition">
              ${icons.plusCircle}
              <span class="hidden sm:inline">Add Game</span>
            </button>

            <button id="open-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition">
              ${icons.fileJson}
              <span class="hidden sm:inline">JSON</span>
            </button>

            <!-- Cloak Dropdown -->
            <div class="relative inline-block" id="cloak-dropdown-container">
              <button id="cloak-toggle-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition">
                ${icons.eye}
                <span class="hidden sm:inline">Cloak</span>
              </button>
              <div id="cloak-menu" class="hidden absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50">
                <div class="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Tab Presets</div>
                <div class="space-y-1 mt-1">
                  ${TAB_CLOAK_PRESETS.map(p => `
                    <button class="cloak-preset-btn w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition ${activeCloak.id === p.id ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold' : 'text-slate-300 hover:bg-slate-800'}" data-id="${p.id}">
                      <span class="truncate">${p.name}</span>
                      ${activeCloak.id === p.id ? '<span class="text-[10px] text-cyan-400 font-bold">Active</span>' : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Sound Mute -->
            <button id="toggle-sound-btn" class="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 transition" title="Toggle Sound">
              ${soundMuted ? icons.volumeX : icons.volume2}
            </button>

            <!-- Desktop Panic Button -->
            <button id="desktop-panic-btn" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/70 text-red-200 text-xs font-bold transition shadow-sm">
              ${icons.shieldAlert}
              <span>PANIC (ESC)</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content Container -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <!-- Hero Banner (when no search / favs) -->
        ${!searchQuery && !showFavoritesOnly && featuredGame ? `
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-6 md:p-8 mb-8 shadow-2xl">
            <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-3">
                  <span>🔥 FEATURED ARCADE PICK</span>
                </div>
                <h2 class="font-arcade text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2 flex items-center gap-3">
                  <span>${featuredGame.thumbnail}</span>
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">${featuredGame.title}</span>
                </h2>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-4">${featuredGame.description}</p>
                <div class="flex flex-wrap items-center gap-4">
                  <button id="hero-play-btn" class="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition cursor-pointer">
                    ${icons.play}
                    <span>PLAY NOW</span>
                  </button>
                  <div class="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>⭐ <strong class="text-slate-200">${featuredGame.rating}</strong></span>
                    <span>•</span>
                    <span>${featuredGame.plays} Plays</span>
                    <span>•</span>
                    <span class="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-sans font-semibold">${featuredGame.category}</span>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[280px]">
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div class="text-xs font-bold text-slate-200">JSON Stored</div>
                  <div class="text-[11px] text-slate-400">All iframes in games.json</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div class="text-xs font-bold text-slate-200">100% Unblocked</div>
                  <div class="text-[11px] text-slate-400">Sandboxed & Safe</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div class="text-xs font-bold text-slate-200">${games.length} Games</div>
                  <div class="text-[11px] text-slate-400">HTML5 Canvas / JS</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div class="text-xs font-bold text-slate-200">Tab Cloaker</div>
                  <div class="text-[11px] text-slate-400">Panic key disguise</div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Categories & Filter Navigation -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            ${CATEGORIES.map(cat => `
              <button class="category-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${selectedCategory === cat && !showFavoritesOnly ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-950' : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-category="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <span class="text-xs text-slate-400">Sort:</span>
            <select id="sort-select" class="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-cyan-500">
              <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
              <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
              <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Title (A-Z)</option>
            </select>
          </div>
        </div>

        <!-- Section Title & Counter -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <h2 class="font-arcade text-lg md:text-xl font-bold text-white tracking-wide">
              ${showFavoritesOnly ? 'FAVORITE GAMES' : `${selectedCategory.toUpperCase()} GAMES`}
            </h2>
            <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
              ${filtered.length}
            </span>
          </div>
          <span class="text-xs text-slate-500 font-mono hidden md:inline">
            Press <kbd class="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">/</kbd> to search
          </span>
        </div>

        <!-- Games Grid -->
        ${filtered.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            ${filtered.map(game => renderGameCard(game)).join('')}
          </div>
        ` : `
          <div class="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div class="text-3xl mb-3">🔍</div>
            <h3 class="font-arcade text-lg font-bold text-white mb-1">No Games Found</h3>
            <p class="text-sm text-slate-400 max-w-md mx-auto mb-5">
              ${searchQuery ? `No results match "${escapeHtml(searchQuery)}".` : 'No games match this filter.'}
            </p>
            <button id="empty-clear-btn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
              Reset Filters
            </button>
          </div>
        `}
      </main>

      <!-- Footer -->
      <footer class="mt-16 border-t border-slate-800/80 bg-[#060911] px-4 py-6 text-slate-500 text-xs">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="font-arcade font-bold text-slate-300">UNBLOCKED HUB</span>
            <span>•</span>
            <span class="font-mono">JSON Iframe Catalog v2.0</span>
            <span>•</span>
            <span class="text-emerald-400">100% Client-Side Safe</span>
          </div>
          <div class="flex items-center gap-4 flex-wrap">
            <button id="footer-json-btn" class="text-slate-400 hover:text-amber-300 transition">Inspect games.json</button>
            <span>•</span>
            <button id="footer-panic-btn" class="text-slate-400 hover:text-red-400 transition">Emergency Cloak</button>
            <span>•</span>
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">~</kbd> or <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> for Panic</span>
          </div>
        </div>
      </footer>

      <!-- Modals -->
      ${activeGame ? renderPlayerModal(activeGame) : ''}
      ${isAddModalOpen ? renderAddModal() : ''}
      ${isJsonModalOpen ? renderJsonModal() : ''}
    </div>
  `;

  bindEvents();
}

function renderGameCard(game) {
  const isFav = favorites.includes(game.id);
  return `
    <div class="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
              ${game.thumbnail}
            </div>
            <div>
              <h3 class="font-arcade text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                ${escapeHtml(game.title)}
              </h3>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] font-semibold text-cyan-400">${game.category}</span>
                <span class="text-slate-600">•</span>
                <span class="text-[11px] text-slate-400 font-mono">${game.plays}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1">
            ${game.isCustom ? `
              <button class="delete-game-btn p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition" data-id="${game.id}" title="Delete">
                ${icons.trash}
              </button>
            ` : ''}
            <button class="fav-game-btn p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition" data-id="${game.id}">
              ${isFav ? icons.heartFilled : icons.heart}
            </button>
          </div>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">${escapeHtml(game.description)}</p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          ${(game.tags || []).slice(0, 3).map(t => `
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">#${escapeHtml(t)}</span>
          `).join('')}
          ${game.badge ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-800/50">${escapeHtml(game.badge)}</span>` : ''}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div class="flex items-center gap-1 text-xs font-semibold text-amber-400 font-mono">
          ${icons.star}
          <span>${Number(game.rating).toFixed(1)}</span>
        </div>
        <button class="play-card-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md transition cursor-pointer" data-id="${game.id}">
          ${icons.play}
          <span>PLAY</span>
        </button>
      </div>
    </div>
  `;
}

function renderPlayerModal(game) {
  const isFav = favorites.includes(game.id);
  const resolvedSrc = resolveUrl(game.iframeUrl);

  return `
    <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div id="player-container" class="w-full bg-[#080d18] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isTheater ? 'max-w-[98vw] h-[95vh]' : 'max-w-5xl h-[88vh]'}">
        <!-- Top Toolbar -->
        <div class="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div class="flex items-center gap-3 truncate">
            <span class="text-2xl">${game.thumbnail}</span>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-arcade text-lg font-bold text-white truncate">${escapeHtml(game.title)}</h2>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 hidden sm:inline">${game.category}</span>
              </div>
              <p class="text-xs text-slate-400 font-mono hidden md:block">Controls: ${escapeHtml(game.controls)}</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            ${game.mirrors && game.mirrors.length > 0 ? `
              <div class="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1 mr-1">
                <span class="text-[10px] text-slate-400 font-bold uppercase hidden sm:inline">Mirror:</span>
                <select id="player-mirror-select" class="bg-transparent text-cyan-300 text-xs font-semibold focus:outline-none cursor-pointer">
                  ${game.mirrors.map(m => `
                    <option value="${escapeHtml(m.url)}" ${resolveUrl(game.iframeUrl) === resolveUrl(m.url) ? 'selected' : ''} class="bg-slate-900 text-slate-200">
                      ${escapeHtml(m.name)}
                    </option>
                  `).join('')}
                </select>
              </div>
            ` : ''}
            <button id="player-fav-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition" title="Favorite">
              ${isFav ? icons.heartFilled : icons.heart}
            </button>
            <button id="player-reload-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition" title="Reload Frame">
              ${icons.reload}
            </button>
            <button id="player-theater-btn" class="p-2 rounded-lg transition ${isTheater ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-800/80 text-slate-300'}" title="Theater Mode">
              ${icons.tv}
            </button>
            <button id="player-fullscreen-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition" title="Fullscreen">
              ${icons.maximize}
            </button>
            <button id="player-popout-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-purple-400 transition hidden sm:flex" title="Open stealth about:blank tab">
              ${icons.externalLink}
            </button>
            <div class="w-[1px] h-6 bg-slate-700 mx-1"></div>
            <button id="player-close-btn" class="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 transition" title="Close">
              ${icons.x}
            </button>
          </div>
        </div>

        <!-- Iframe container -->
        <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          <iframe
            id="active-game-iframe"
            src="${escapeHtml(resolvedSrc)}"
            title="${escapeHtml(game.title)}"
            allow="${escapeHtml(game.iframeAllow || 'fullscreen; autoplay; pointer-lock; gamepad')}"
            sandbox="${escapeHtml(game.sandbox || 'allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock')}"
            loading="eager"
            class="w-full h-full border-none block"
          ></iframe>
        </div>
      </div>
    </div>
  `;
}

function renderAddModal() {
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-[#0b101c] border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 relative">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="font-arcade text-lg font-bold text-white">ADD IFRAME GAME</h3>
            <p class="text-xs text-slate-400 mt-0.5">Embed any playable URL or raw iframe snippet into games.json</p>
          </div>
          <button id="close-add-modal-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white">
            ${icons.x}
          </button>
        </div>

        <form id="add-game-form" class="space-y-4 mt-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Game Title *</label>
            <input type="text" id="add-title" required placeholder="e.g. Retro Racer" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"/>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Iframe URL or Embed Code *</label>
            <textarea id="add-embed" rows="2" required placeholder="https://... or <iframe src='...'></iframe>" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
              <select id="add-category" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Emoji Icon</label>
              <input type="text" id="add-thumbnail" value="🕹️" maxlength="4" class="w-full text-center text-xl py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white"/>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Description</label>
            <input type="text" id="add-desc" placeholder="Brief gameplay summary..." class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"/>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Controls Hint</label>
            <input type="text" id="add-controls" value="Mouse & Keyboard" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"/>
          </div>

          <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button type="button" id="cancel-add-modal-btn" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg cursor-pointer">Save to Catalog</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderJsonModal() {
  const jsonStr = JSON.stringify(games, null, 2);
  return `
    <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-[#0b101c] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
              ${icons.fileJson}
            </div>
            <div>
              <h3 class="font-arcade text-lg font-bold text-white">games.json Storage</h3>
              <p class="text-xs text-slate-400 font-mono">${games.length} total iframe records stored</p>
            </div>
          </div>
          <button id="close-json-modal-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white">
            ${icons.x}
          </button>
        </div>

        <div class="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <button id="copy-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer">
              ${icons.copy}
              <span id="copy-json-text">Copy JSON</span>
            </button>
            <button id="download-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer">
              ${icons.download}
              <span>Download games.json</span>
            </button>
          </div>
          <button id="reset-json-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-red-400 text-xs cursor-pointer">
            ${icons.reload}
            <span>Reset Defaults</span>
          </button>
        </div>

        <div class="p-4 flex-1 overflow-auto bg-[#060810] font-mono text-xs text-emerald-400 leading-relaxed select-text">
          <pre class="whitespace-pre-wrap break-all">${escapeHtml(jsonStr)}</pre>
        </div>

        <div class="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Schema: id, title, category, iframeUrl, controls, tags</span>
          <button id="bottom-close-json-btn" class="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-semibold">Close</button>
        </div>
      </div>
    </div>
  `;
}

function renderPanicScreen() {
  return `
    <div class="fixed inset-0 z-[100] bg-white text-slate-900 overflow-y-auto select-none font-sans">
      <header class="border-b border-gray-200 px-6 py-3 flex items-center justify-between bg-white">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">📚</div>
            <span class="font-semibold text-gray-700 text-lg">Google Classroom</span>
          </div>
          <span class="text-gray-300">|</span>
          <span class="text-sm font-medium text-gray-600">Period 4 - World History & Geography</span>
        </div>
        <div class="flex items-center gap-3">
          <input type="text" placeholder="Search assignments..." class="pl-4 pr-4 py-1.5 rounded-full border border-gray-300 text-xs w-56" readonly/>
          <button id="exit-panic-btn" class="text-xs text-gray-600 hover:text-emerald-700 border border-gray-300 rounded-lg px-2.5 py-1.5 transition font-medium">
            ← Resume (Esc)
          </button>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-6 py-8">
        <div class="rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 mb-8 shadow-sm">
          <h1 class="text-2xl font-bold mb-1">Unit 5: The Industrial Revolution & Modern Era</h1>
          <p class="text-emerald-100 text-sm">Mr. Henderson • Due Thursday, 11:59 PM</p>
        </div>

        <div class="space-y-4">
          <div class="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start justify-between">
            <div>
              <h3 class="font-medium text-gray-900 text-sm">Chapter 14 Reading Comprehension Questions</h3>
              <p class="text-xs text-gray-500 mt-0.5">Assigned Oct 4 • Graded 100/100</p>
              <p class="text-xs text-gray-600 mt-2 max-w-xl">Analyze key technological innovations between 1760 and 1840, focusing on steam power and mechanized textiles.</p>
            </div>
            <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Turned in</span>
          </div>
          <div class="p-4 rounded-xl border border-gray-200 bg-white flex items-start justify-between">
            <div>
              <h3 class="font-medium text-gray-900 text-sm">Primary Source Analysis: Factory Act Testimonies</h3>
              <p class="text-xs text-gray-500 mt-0.5">Due Oct 12 • 25 Points</p>
              <p class="text-xs text-gray-600 mt-2 max-w-xl">Review parliamentary hearings regarding labor standards and complete the shared analysis document.</p>
            </div>
            <span class="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">Assigned</span>
          </div>
        </div>

        <div class="mt-12 text-center">
          <button id="resume-bottom-panic-btn" class="text-xs text-gray-400 hover:text-gray-600 underline">
            Click here or press Escape to resume
          </button>
        </div>
      </main>
    </div>
  `;
}

function bindPanicEvents() {
  const exitBtn = document.getElementById('exit-panic-btn');
  if (exitBtn) exitBtn.onclick = () => togglePanic(false);
  const btmBtn = document.getElementById('resume-bottom-panic-btn');
  if (btmBtn) btmBtn.onclick = () => togglePanic(false);
}

function bindEvents() {
  // Brand click
  const brand = document.getElementById('nav-brand');
  if (brand) brand.onclick = () => {
    selectedCategory = 'All';
    searchQuery = '';
    showFavoritesOnly = false;
    renderApp();
  };

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      renderApp();
      // Refocus input
      const newInput = document.getElementById('search-input');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    };
  }
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.onclick = () => { searchQuery = ''; renderApp(); };

  // Favs toggle
  const favToggle = document.getElementById('toggle-favs-btn');
  if (favToggle) favToggle.onclick = () => {
    playClickSound();
    showFavoritesOnly = !showFavoritesOnly;
    renderApp();
  };

  // Panic buttons
  const mobPanic = document.getElementById('mobile-panic-btn');
  if (mobPanic) mobPanic.onclick = () => togglePanic(true);
  const deskPanic = document.getElementById('desktop-panic-btn');
  if (deskPanic) deskPanic.onclick = () => togglePanic(true);
  const footPanic = document.getElementById('footer-panic-btn');
  if (footPanic) footPanic.onclick = () => togglePanic(true);

  // Sound toggle
  const soundBtn = document.getElementById('toggle-sound-btn');
  if (soundBtn) soundBtn.onclick = () => {
    soundMuted = !soundMuted;
    setSoundEnabled(!soundMuted);
    playClickSound();
    renderApp();
  };

  // Cloak Dropdown
  const cloakToggle = document.getElementById('cloak-toggle-btn');
  const cloakMenu = document.getElementById('cloak-menu');
  if (cloakToggle && cloakMenu) {
    cloakToggle.onclick = (e) => {
      e.stopPropagation();
      playClickSound();
      cloakMenu.classList.toggle('hidden');
    };
    document.querySelectorAll('.cloak-preset-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const preset = TAB_CLOAK_PRESETS.find(p => p.id === id);
        if (preset) applyCloak(preset);
        cloakMenu.classList.add('hidden');
        renderApp();
      };
    });
  }

  // Modals trigger
  const openAddBtn = document.getElementById('open-add-btn');
  if (openAddBtn) openAddBtn.onclick = () => { playClickSound(); isAddModalOpen = true; renderApp(); };

  const openJsonBtn = document.getElementById('open-json-btn');
  if (openJsonBtn) openJsonBtn.onclick = () => { playClickSound(); isJsonModalOpen = true; renderApp(); };

  const footerJsonBtn = document.getElementById('footer-json-btn');
  if (footerJsonBtn) footerJsonBtn.onclick = () => { playClickSound(); isJsonModalOpen = true; renderApp(); };

  // Hero Play Button
  const heroPlayBtn = document.getElementById('hero-play-btn');
  if (heroPlayBtn) {
    heroPlayBtn.onclick = () => {
      const g = games.find(x => x.id === 'slope') || games[0];
      if (g) openPlayer(g);
    };
  }

  // Categories
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = () => {
      playClickSound();
      selectedCategory = btn.getAttribute('data-category');
      showFavoritesOnly = false;
      renderApp();
    };
  });

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      playClickSound();
      sortBy = e.target.value;
      renderApp();
    };
  }

  // Game Cards Play / Fav / Delete
  document.querySelectorAll('.play-card-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const game = games.find(g => g.id === id);
      if (game) openPlayer(game);
    };
  });

  document.querySelectorAll('.fav-game-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleFavorite(id);
    };
  });

  document.querySelectorAll('.delete-game-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      deleteCustomGame(id);
    };
  });

  // Empty state button
  const emptyClearBtn = document.getElementById('empty-clear-btn');
  if (emptyClearBtn) emptyClearBtn.onclick = () => {
    searchQuery = '';
    selectedCategory = 'All';
    showFavoritesOnly = false;
    renderApp();
  };

  // Player Modal Controls
  if (activeGame) {
    const pClose = document.getElementById('player-close-btn');
    if (pClose) pClose.onclick = closePlayer;

    const pReload = document.getElementById('player-reload-btn');
    if (pReload) pReload.onclick = () => {
      playClickSound();
      const iframe = document.getElementById('active-game-iframe');
      if (iframe) iframe.src = iframe.src;
    };

    const pTheater = document.getElementById('player-theater-btn');
    if (pTheater) pTheater.onclick = () => {
      playClickSound();
      isTheater = !isTheater;
      const container = document.getElementById('player-container');
      if (container) {
        container.className = `w-full bg-[#080d18] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isTheater ? 'max-w-[98vw] h-[95vh]' : 'max-w-5xl h-[88vh]'}`;
      }
    };

    const pFullscreen = document.getElementById('player-fullscreen-btn');
    if (pFullscreen) pFullscreen.onclick = () => {
      playClickSound();
      const container = document.getElementById('player-container');
      if (container) {
        if (!document.fullscreenElement) {
          container.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    const pPopout = document.getElementById('player-popout-btn');
    if (pPopout) pPopout.onclick = () => {
      playClickSound();
      try {
        const win = window.open('about:blank', '_blank');
        if (win) {
          win.document.title = activeGame.title;
          win.document.body.style.margin = '0';
          win.document.body.style.height = '100vh';
          win.document.body.style.overflow = 'hidden';
          win.document.body.style.background = '#0a0d14';
          const ifr = win.document.createElement('iframe');
          ifr.src = resolveUrl(activeGame.iframeUrl);
          ifr.style.width = '100%';
          ifr.style.height = '100%';
          ifr.style.border = 'none';
          ifr.allow = activeGame.iframeAllow || 'autoplay; fullscreen';
          win.document.body.appendChild(ifr);
        }
      } catch {}
    };

    const pFav = document.getElementById('player-fav-btn');
    if (pFav) pFav.onclick = () => toggleFavorite(activeGame.id);

    const pMirror = document.getElementById('player-mirror-select');
    if (pMirror) {
      pMirror.onchange = (e) => {
        playClickSound();
        const selectedUrl = e.target.value;
        activeGame.iframeUrl = selectedUrl;
        const iframe = document.getElementById('active-game-iframe');
        if (iframe) {
          iframe.src = resolveUrl(selectedUrl);
        }
      };
    }
  }

  // Add Game Modal Form
  if (isAddModalOpen) {
    const closeAdd = document.getElementById('close-add-modal-btn');
    if (closeAdd) closeAdd.onclick = () => { isAddModalOpen = false; renderApp(); };
    const cancelAdd = document.getElementById('cancel-add-modal-btn');
    if (cancelAdd) cancelAdd.onclick = () => { isAddModalOpen = false; renderApp(); };

    const addForm = document.getElementById('add-game-form');
    if (addForm) {
      addForm.onsubmit = (e) => {
        e.preventDefault();
        playClickSound();
        const title = document.getElementById('add-title').value.trim();
        let embed = document.getElementById('add-embed').value.trim();
        const cat = document.getElementById('add-category').value;
        const thumb = document.getElementById('add-thumbnail').value.trim() || '🕹️';
        const desc = document.getElementById('add-desc').value.trim() || 'Custom embedded game.';
        const ctrl = document.getElementById('add-controls').value.trim() || 'Mouse & Keyboard';

        // Extract src from <iframe src="..."> if pasted as html
        if (embed.includes('<iframe') || embed.startsWith('<iframe')) {
          const match = embed.match(/src=["']([^"']+)["']/i);
          if (match && match[1]) embed = match[1];
        }

        const newGame = {
          id: 'custom-' + Date.now(),
          title,
          category: cat,
          description: desc,
          iframeUrl: embed,
          thumbnail: thumb,
          badge: 'Custom',
          rating: 5.0,
          plays: '1',
          controls: ctrl,
          author: 'User Added',
          tags: ['Custom', cat],
          isCustom: true
        };

        games.unshift(newGame);
        saveGames();
        isAddModalOpen = false;
        renderApp();
      };
    }
  }

  // JSON Modal Form
  if (isJsonModalOpen) {
    const closeJson = document.getElementById('close-json-modal-btn');
    if (closeJson) closeJson.onclick = () => { isJsonModalOpen = false; renderApp(); };
    const bottomClose = document.getElementById('bottom-close-json-btn');
    if (bottomClose) bottomClose.onclick = () => { isJsonModalOpen = false; renderApp(); };

    const copyBtn = document.getElementById('copy-json-btn');
    if (copyBtn) copyBtn.onclick = () => {
      playClickSound();
      navigator.clipboard.writeText(JSON.stringify(games, null, 2)).then(() => {
        const txt = document.getElementById('copy-json-text');
        if (txt) txt.textContent = 'Copied!';
        setTimeout(() => { if (txt) txt.textContent = 'Copy JSON'; }, 2000);
      });
    };

    const dlBtn = document.getElementById('download-json-btn');
    if (dlBtn) dlBtn.onclick = () => {
      playClickSound();
      const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'games.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    const resetBtn = document.getElementById('reset-json-btn');
    if (resetBtn) resetBtn.onclick = () => {
      playClickSound();
      if (confirm('Reset games back to default catalog?')) {
        games = INITIAL_GAMES;
        saveGames();
        isJsonModalOpen = false;
        renderApp();
      }
    };
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initial render
renderApp();
