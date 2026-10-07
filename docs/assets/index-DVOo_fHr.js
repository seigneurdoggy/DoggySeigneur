(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`retro-bowl`,title:`Retro Bowl`,category:`Sports`,description:`Manage your NFL franchise and command the gridiron in this pixel-art football masterpiece! Call plays, complete clutch passes, and lead your team to victory.`,iframeUrl:`./games/football.html`,mirrors:[{name:`Self-Hosted (Securly-Proof)`,url:`./games/football.html`},{name:`RetroBowl.me (Original)`,url:`https://retrobowl.me/g/retro-bowl/index.html`},{name:`GitHub Pages Mirror`,url:`https://retrobowl-unblocked.github.io/`}],iframeAllow:`fullscreen; autoplay; pointer-lock; gamepad`,sandbox:`allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock`,thumbnail:`🏈`,badge:`Securly-Proof`,rating:5,plays:`520K`,controls:`Mouse drag to aim and throw. Click/tap to dive. A/D or Arrow keys to dodge tackles.`,author:`New Star Games / Gridiron Tribute`,aspectRatio:`16/9`,tags:[`Sports`,`Football`,`Retro`,`NFL`,`Arcade`]},{id:`snake`,title:`Retro Snake Neon`,category:`Arcade`,description:`Guide the glowing serpent through cyberspace, devouring energy crystals without biting your own tail or hitting the barriers.`,iframeUrl:`./games/snake.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🐍`,badge:`Popular`,rating:4.9,plays:`184K`,controls:`Arrow keys or W/A/S/D to turn. Space to pause.`,author:`Neon Retro Labs`,aspectRatio:`1/1`,tags:[`Arcade`,`Retro`,`Classic`,`Skill`]},{id:`tetris`,title:`Tetris Classic`,category:`Puzzle`,description:`Rotate and drop falling geometric blocks into seamless horizontal rows to clear lines and rack up massive scores.`,iframeUrl:`./games/tetris.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🧱`,badge:`Top Rated`,rating:5,plays:`310K`,controls:`Arrow keys to move/soft drop, Up to rotate, Space for hard drop, C to hold piece.`,author:`Blockworks Studio`,aspectRatio:`4/3`,tags:[`Puzzle`,`Strategy`,`Classic`,`Brain`]},{id:`slope`,title:`Slope 3D Runner`,category:`Action`,description:`High-speed 3D tunnel runner! Steer a futuristic neon sphere at breakneck speeds while dodging deadly obstacles.`,iframeUrl:`./games/slope-runner.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`⚡`,badge:`Hot`,rating:4.8,plays:`420K`,controls:`A/D or Left/Right Arrow Keys or mouse movement to steer sphere.`,author:`HyperSpeed Games`,aspectRatio:`5/4`,tags:[`Action`,`Endless`,`3D`,`Fast-Paced`]},{id:`2048`,title:`2048 Classic`,category:`Puzzle`,description:`Combine identical tiles together with swipe moves to build exponential values until you achieve the legendary 2048 tile.`,iframeUrl:`./games/2048.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🔢`,badge:`Brain`,rating:4.9,plays:`250K`,controls:`Arrow keys or Touch swipe to slide all tiles across the grid.`,author:`Mathematician Collective`,aspectRatio:`1/1`,tags:[`Puzzle`,`Math`,`Casual`,`Strategy`]},{id:`flappy`,title:`Flappy Bird Arcade`,category:`Arcade`,description:`Flap your tiny wings through treacherous green pipes in this precision timing classic. How far can you fly?`,iframeUrl:`./games/flappy-bird.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🐤`,badge:`Trending`,rating:4.7,plays:`295K`,controls:`Spacebar or mouse click / tap to flap upwards.`,author:`Pixel Aviators`,aspectRatio:`3/4`,tags:[`Arcade`,`Endless`,`Skill`,`Hard`]},{id:`pong`,title:`Cyber Pong DX`,category:`Sports`,description:`The grandfather of video gaming reimagined in neon cyberpunk aesthetic. Play against reactive AI or battle a friend locally.`,iframeUrl:`./games/pong.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🏓`,badge:`2 Player`,rating:4.8,plays:`112K`,controls:`Player 1: W/S or Mouse. Player 2: Up/Down arrow keys.`,author:`Digital Court`,aspectRatio:`16/10`,tags:[`Sports`,`2-Player`,`Arcade`,`Retro`]},{id:`breakout`,title:`Breakout Neon DX`,category:`Arcade`,description:`Shatter high-density neon brick walls with bouncy physics balls, dynamic bounce angles, and explosive particle bursts.`,iframeUrl:`./games/breakout.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🧱`,badge:`Classic`,rating:4.7,plays:`140K`,controls:`Mouse or Arrow Keys to position paddle. Click to launch ball.`,author:`Smash Works`,aspectRatio:`4/3`,tags:[`Arcade`,`Retro`,`Action`,`Classic`]},{id:`asteroids`,title:`Asteroids Vector 1979`,category:`Action`,description:`Pilot your lone starship through dense meteor fields, blasting giant space boulders into dust with your laser blaster.`,iframeUrl:`./games/asteroids.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🚀`,badge:`Retro`,rating:4.9,plays:`190K`,controls:`Left/Right to rotate, Up to thrust, Space to fire lasers, Shift for hyperspace.`,author:`Vector Space Systems`,aspectRatio:`4/3`,tags:[`Action`,`Sci-Fi`,`Space`,`Retro`]},{id:`dino`,title:`T-Rex Dino Runner`,category:`Arcade`,description:`The classic offline desert marathon! Leap over prickly cacti and duck beneath low-flying prehistoric pterodactyls.`,iframeUrl:`./games/dino.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🦖`,badge:`Offline Classic`,rating:4.8,plays:`380K`,controls:`Space or Up Arrow to jump, Down Arrow to crouch/duck.`,author:`Chromium Paleontology`,aspectRatio:`16/7`,tags:[`Arcade`,`Endless`,`Casual`,`Runner`]},{id:`minesweeper`,title:`Minesweeper Pro`,category:`Strategy`,description:`Carefully deduce hidden explosive naval mines using numerical neighbor clues without detonating a single trap.`,iframeUrl:`./games/minesweeper.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`💣`,badge:`Strategy`,rating:4.8,plays:`165K`,controls:`Left Click to uncover cell, Right Click to flag suspected mine.`,author:`Logic Grid Labs`,aspectRatio:`1/1`,tags:[`Strategy`,`Puzzle`,`Classic`,`Brain`]},{id:`connect4`,title:`Connect 4 Arcade`,category:`Strategy`,description:`Drop vibrant checker tokens into a vertical matrix grid to line up 4 tokens in a row before your adversary.`,iframeUrl:`./games/connect4.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`🔴`,badge:`2 Player`,rating:4.7,plays:`130K`,controls:`Click columns to drop your checker disc.`,author:`Hasbro Classics Tribute`,aspectRatio:`1/1`,tags:[`Strategy`,`Board Game`,`2-Player`,`Casual`]},{id:`hextris`,title:`Hextris Arcade`,category:`Puzzle`,description:`Rotate the central hexagon to match cascading colored bricks in groups of 3 or more before they overflow the perimeter.`,iframeUrl:`./games/hextris.html`,iframeAllow:`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope`,sandbox:`allow-scripts allow-same-origin allow-forms allow-pointer-lock`,thumbnail:`⬡`,badge:`Fast`,rating:4.9,plays:`215K`,controls:`Left / Right arrow keys or click canvas halves to rotate hexagon.`,author:`Hexagon Games`,aspectRatio:`1/1`,tags:[`Puzzle`,`Fast-Paced`,`Arcade`,`Colors`]}],t=[{id:`default`,name:`Normal (Unblocked Games)`,title:`Unblocked Games Hub`,favicon:`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>`,iconName:`Gamepad2`},{id:`classroom`,name:`Google Classroom`,title:`Classes - Google Classroom`,favicon:`https://ssl.gstatic.com/classroom/favicon.png`,iconName:`GraduationCap`},{id:`drive`,name:`Google Drive`,title:`My Drive - Google Drive`,favicon:`https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png`,iconName:`HardDrive`},{id:`docs`,name:`Google Docs`,title:`Untitled document - Google Docs`,favicon:`https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico`,iconName:`FileText`},{id:`canvas`,name:`Canvas LMS`,title:`Dashboard - Canvas`,favicon:`https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico`,iconName:`BookOpen`},{id:`wikipedia`,name:`Wikipedia`,title:`Wikipedia, the free encyclopedia`,favicon:`https://en.wikipedia.org/static/favicon/wikipedia.ico`,iconName:`Globe`}],n=null,r=!0;function i(){if(!r)return null;if(!n){let e=window.AudioContext||window.webkitAudioContext;e&&(n=new e)}return n&&n.state===`suspended`&&n.resume(),n}function a(e){r=e}function o(){let e=i();if(e)try{let t=e.createOscillator(),n=e.createGain();t.type=`triangle`,t.frequency.setValueAtTime(520,e.currentTime),t.frequency.exponentialRampToValueAtTime(320,e.currentTime+.05),n.gain.setValueAtTime(.04,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.05),t.connect(n),n.connect(e.destination),t.start(),t.stop(e.currentTime+.05)}catch{}}function s(){let e=i();if(e)try{let t=e.createOscillator(),n=e.createGain();t.type=`sine`,t.frequency.setValueAtTime(300,e.currentTime),t.frequency.exponentialRampToValueAtTime(750,e.currentTime+.12),n.gain.setValueAtTime(.06,e.currentTime),n.gain.exponentialRampToValueAtTime(.001,e.currentTime+.12),t.connect(n),n.connect(e.destination),t.start(),t.stop(e.currentTime+.12)}catch{}}var c={gamepad:`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,search:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,shieldAlert:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,fileJson:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></svg>`,plusCircle:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`,volume2:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,volumeX:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,eye:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,heart:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,heartFilled:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,play:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,star:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,trash:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,x:`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,maximize:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,reload:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,externalLink:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,tv:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,copy:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,check:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,download:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,upload:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`},l=(()=>{try{let e=localStorage.getItem(`unblocked_hub_games`);if(e)return JSON.parse(e)}catch{}return e})();e.forEach(e=>{let t=l.findIndex(t=>t.id===e.id);t!==-1&&e.mirrors&&(!l[t].mirrors||l[t].iframeUrl.includes(`retrobowl.me`))&&(l[t]={...e,isCustom:!1},w())});var u=(()=>{try{let e=localStorage.getItem(`unblocked_hub_favs`);if(e)return JSON.parse(e)}catch{}return[`snake`,`slope`,`tetris`]})(),d=t[0],f=null,p=``,m=`All`,h=`popular`,g=!1,_=!1,v=!1,y=!1,b=!1,x=!1,S=[`All`,`Arcade`,`Action`,`Puzzle`,`Sports`,`Strategy`,`Custom`];function C(e){if(!e)return``;if(e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`data:`))return e;let t=e;return t.startsWith(`./`)?t=t.slice(2):t.startsWith(`/`)&&(t=t.slice(1)),`./`+t}fetch(`./games.json`).then(e=>e.ok?e.json():null).then(e=>{if(e&&Array.isArray(e)){let t=l.filter(e=>e.isCustom),n=new Set(e.map(e=>e.id));l=[...e,...t.filter(e=>!n.has(e.id))],w(),M()}}).catch(()=>{});function w(){localStorage.setItem(`unblocked_hub_games`,JSON.stringify(l))}function T(){localStorage.setItem(`unblocked_hub_favs`,JSON.stringify(u))}window.addEventListener(`keydown`,e=>{if(e.key===`/`&&document.activeElement.tagName!==`INPUT`&&document.activeElement.tagName!==`TEXTAREA`){e.preventDefault();let t=document.getElementById(`search-input`);t&&t.focus()}e.key==="`"||e.key===`Escape`&&!document.fullscreenElement&&!f&&!b&&!x?D():e.key===`Escape`&&f&&k()});function E(e){d=e,document.title=e.title;let t=document.getElementById(`favicon`);t&&(t.href=e.favicon)}function D(e){y=typeof e==`boolean`?e:!y,M()}function O(e){s(),f=e,_=!1,M()}function k(){o(),f=null,M()}function A(e){o(),u.includes(e)?u=u.filter(t=>t!==e):u.push(e),T(),M()}function j(e){o(),confirm(`Delete this custom game?`)&&(l=l.filter(t=>t.id!==e),w(),M())}function M(){let e=document.getElementById(`root`);if(!e)return;if(y){e.innerHTML=L(),R();return}let n=l.filter(e=>{if(g&&!u.includes(e.id))return!1;if(m!==`All`){if(m===`Custom`){if(!e.isCustom)return!1}else if(e.category!==m)return!1}if(p.trim()){let t=p.toLowerCase(),n=e.title.toLowerCase().includes(t),r=e.description.toLowerCase().includes(t),i=e.category.toLowerCase().includes(t),a=(e.tags||[]).some(e=>e.toLowerCase().includes(t));return n||r||i||a}return!0}).sort((e,t)=>h===`rating`?t.rating-e.rating:h===`name`?e.title.localeCompare(t.title):(parseInt(t.plays)||0)-(parseInt(e.plays)||0)),r=l.find(e=>e.id===`retro-bowl`)||l.find(e=>e.id===`slope`)||l[0];e.innerHTML=`
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <!-- Navbar -->
      <header class="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div class="flex items-center justify-between w-full md:w-auto">
            <div class="flex items-center gap-3 cursor-pointer" id="nav-brand">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
                ${c.gamepad}
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
              ${c.shieldAlert}
              <span>PANIC</span>
            </button>
          </div>

          <!-- Search input -->
          <div class="relative w-full md:w-80 lg:w-96">
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              ${c.search}
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search games, categories, tags..."
              value="${B(p)}"
              class="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
            />
            ${p?`<button id="clear-search-btn" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white">✕</button>`:``}
          </div>

          <!-- Top Toolbar Action Buttons -->
          <div class="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <button id="toggle-favs-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${g?`bg-rose-950/80 border-rose-600 text-rose-300`:`bg-slate-900/70 border-slate-700/80 text-slate-300 hover:bg-slate-800`}">
              ${g?c.heartFilled:c.heart}
              <span>Favs</span>
              ${u.length>0?`<span class="px-1.5 py-0.2 rounded-full bg-rose-500 text-slate-950 text-[10px] font-bold">${u.length}</span>`:``}
            </button>

            <button id="open-add-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/70 text-cyan-300 text-xs font-semibold transition">
              ${c.plusCircle}
              <span class="hidden sm:inline">Add Game</span>
            </button>

            <button id="open-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition">
              ${c.fileJson}
              <span class="hidden sm:inline">JSON</span>
            </button>

            <!-- Cloak Dropdown -->
            <div class="relative inline-block" id="cloak-dropdown-container">
              <button id="cloak-toggle-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-semibold transition">
                ${c.eye}
                <span class="hidden sm:inline">Cloak</span>
              </button>
              <div id="cloak-menu" class="hidden absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50">
                <div class="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Tab Presets</div>
                <div class="space-y-1 mt-1">
                  ${t.map(e=>`
                    <button class="cloak-preset-btn w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition ${d.id===e.id?`bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold`:`text-slate-300 hover:bg-slate-800`}" data-id="${e.id}">
                      <span class="truncate">${e.name}</span>
                      ${d.id===e.id?`<span class="text-[10px] text-cyan-400 font-bold">Active</span>`:``}
                    </button>
                  `).join(``)}
                </div>
              </div>
            </div>

            <!-- Sound Mute -->
            <button id="toggle-sound-btn" class="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 transition" title="Toggle Sound">
              ${v?c.volumeX:c.volume2}
            </button>

            <!-- Desktop Panic Button -->
            <button id="desktop-panic-btn" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/70 text-red-200 text-xs font-bold transition shadow-sm">
              ${c.shieldAlert}
              <span>PANIC (ESC)</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content Container -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <!-- Hero Banner (when no search / favs) -->
        ${!p&&!g&&r?`
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 p-6 md:p-8 mb-8 shadow-2xl">
            <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div class="max-w-2xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-3">
                  <span>🔥 FEATURED ARCADE PICK</span>
                </div>
                <h2 class="font-arcade text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2 flex items-center gap-3">
                  <span>${r.thumbnail}</span>
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">${r.title}</span>
                </h2>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-4">${r.description}</p>
                <div class="flex flex-wrap items-center gap-4">
                  <button id="hero-play-btn" class="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition cursor-pointer">
                    ${c.play}
                    <span>PLAY NOW</span>
                  </button>
                  <div class="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>⭐ <strong class="text-slate-200">${r.rating}</strong></span>
                    <span>•</span>
                    <span>${r.plays} Plays</span>
                    <span>•</span>
                    <span class="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-sans font-semibold">${r.category}</span>
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
                  <div class="text-xs font-bold text-slate-200">${l.length} Games</div>
                  <div class="text-[11px] text-slate-400">HTML5 Canvas / JS</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div class="text-xs font-bold text-slate-200">Tab Cloaker</div>
                  <div class="text-[11px] text-slate-400">Panic key disguise</div>
                </div>
              </div>
            </div>
          </div>
        `:``}

        <!-- Categories & Filter Navigation -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            ${S.map(e=>`
              <button class="category-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${m===e&&!g?`bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-950`:`bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800`}" data-category="${e}">
                ${e}
              </button>
            `).join(``)}
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <span class="text-xs text-slate-400">Sort:</span>
            <select id="sort-select" class="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-cyan-500">
              <option value="popular" ${h===`popular`?`selected`:``}>Most Popular</option>
              <option value="rating" ${h===`rating`?`selected`:``}>Top Rated</option>
              <option value="name" ${h===`name`?`selected`:``}>Title (A-Z)</option>
            </select>
          </div>
        </div>

        <!-- Section Title & Counter -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <h2 class="font-arcade text-lg md:text-xl font-bold text-white tracking-wide">
              ${g?`FAVORITE GAMES`:`${m.toUpperCase()} GAMES`}
            </h2>
            <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
              ${n.length}
            </span>
          </div>
          <span class="text-xs text-slate-500 font-mono hidden md:inline">
            Press <kbd class="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">/</kbd> to search
          </span>
        </div>

        <!-- Games Grid -->
        ${n.length>0?`
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            ${n.map(e=>N(e)).join(``)}
          </div>
        `:`
          <div class="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div class="text-3xl mb-3">🔍</div>
            <h3 class="font-arcade text-lg font-bold text-white mb-1">No Games Found</h3>
            <p class="text-sm text-slate-400 max-w-md mx-auto mb-5">
              ${p?`No results match "${B(p)}".`:`No games match this filter.`}
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
      ${f?P(f):``}
      ${b?F():``}
      ${x?I():``}
    </div>
  `,z()}function N(e){let t=u.includes(e.id);return`
    <div class="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
              ${e.thumbnail}
            </div>
            <div>
              <h3 class="font-arcade text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                ${B(e.title)}
              </h3>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] font-semibold text-cyan-400">${e.category}</span>
                <span class="text-slate-600">•</span>
                <span class="text-[11px] text-slate-400 font-mono">${e.plays}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1">
            ${e.isCustom?`
              <button class="delete-game-btn p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition" data-id="${e.id}" title="Delete">
                ${c.trash}
              </button>
            `:``}
            <button class="fav-game-btn p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition" data-id="${e.id}">
              ${t?c.heartFilled:c.heart}
            </button>
          </div>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">${B(e.description)}</p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          ${(e.tags||[]).slice(0,3).map(e=>`
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">#${B(e)}</span>
          `).join(``)}
          ${e.badge?`<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-800/50">${B(e.badge)}</span>`:``}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div class="flex items-center gap-1 text-xs font-semibold text-amber-400 font-mono">
          ${c.star}
          <span>${Number(e.rating).toFixed(1)}</span>
        </div>
        <button class="play-card-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md transition cursor-pointer" data-id="${e.id}">
          ${c.play}
          <span>PLAY</span>
        </button>
      </div>
    </div>
  `}function P(e){let t=u.includes(e.id),n=C(e.iframeUrl);return`
    <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div id="player-container" class="w-full bg-[#080d18] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${_?`max-w-[98vw] h-[95vh]`:`max-w-5xl h-[88vh]`}">
        <!-- Top Toolbar -->
        <div class="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
          <div class="flex items-center gap-3 truncate">
            <span class="text-2xl">${e.thumbnail}</span>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-arcade text-lg font-bold text-white truncate">${B(e.title)}</h2>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 hidden sm:inline">${e.category}</span>
              </div>
              <p class="text-xs text-slate-400 font-mono hidden md:block">Controls: ${B(e.controls)}</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            ${e.mirrors&&e.mirrors.length>0?`
              <div class="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1 mr-1">
                <span class="text-[10px] text-slate-400 font-bold uppercase hidden sm:inline">Mirror:</span>
                <select id="player-mirror-select" class="bg-transparent text-cyan-300 text-xs font-semibold focus:outline-none cursor-pointer">
                  ${e.mirrors.map(t=>`
                    <option value="${B(t.url)}" ${C(e.iframeUrl)===C(t.url)?`selected`:``} class="bg-slate-900 text-slate-200">
                      ${B(t.name)}
                    </option>
                  `).join(``)}
                </select>
              </div>
            `:``}
            <button id="player-fav-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition" title="Favorite">
              ${t?c.heartFilled:c.heart}
            </button>
            <button id="player-reload-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition" title="Reload Frame">
              ${c.reload}
            </button>
            <button id="player-theater-btn" class="p-2 rounded-lg transition ${_?`bg-cyan-950 text-cyan-300 border border-cyan-700`:`bg-slate-800/80 text-slate-300`}" title="Theater Mode">
              ${c.tv}
            </button>
            <button id="player-fullscreen-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition" title="Fullscreen">
              ${c.maximize}
            </button>
            <button id="player-popout-btn" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-purple-400 transition hidden sm:flex" title="Open stealth about:blank tab">
              ${c.externalLink}
            </button>
            <div class="w-[1px] h-6 bg-slate-700 mx-1"></div>
            <button id="player-close-btn" class="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/60 transition" title="Close">
              ${c.x}
            </button>
          </div>
        </div>

        <!-- Iframe container -->
        <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          <iframe
            id="active-game-iframe"
            src="${B(n)}"
            title="${B(e.title)}"
            allow="${B(e.iframeAllow||`fullscreen; autoplay; pointer-lock; gamepad`)}"
            sandbox="${B(e.sandbox||`allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock`)}"
            loading="eager"
            class="w-full h-full border-none block"
          ></iframe>
        </div>
      </div>
    </div>
  `}function F(){return`
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-[#0b101c] border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 relative">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 class="font-arcade text-lg font-bold text-white">ADD IFRAME GAME</h3>
            <p class="text-xs text-slate-400 mt-0.5">Embed any playable URL or raw iframe snippet into games.json</p>
          </div>
          <button id="close-add-modal-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white">
            ${c.x}
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
  `}function I(){let e=JSON.stringify(l,null,2);return`
    <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-[#0b101c] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div class="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
              ${c.fileJson}
            </div>
            <div>
              <h3 class="font-arcade text-lg font-bold text-white">games.json Storage</h3>
              <p class="text-xs text-slate-400 font-mono">${l.length} total iframe records stored</p>
            </div>
          </div>
          <button id="close-json-modal-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white">
            ${c.x}
          </button>
        </div>

        <div class="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <button id="copy-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer">
              ${c.copy}
              <span id="copy-json-text">Copy JSON</span>
            </button>
            <button id="download-json-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer">
              ${c.download}
              <span>Download games.json</span>
            </button>
          </div>
          <button id="reset-json-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-red-400 text-xs cursor-pointer">
            ${c.reload}
            <span>Reset Defaults</span>
          </button>
        </div>

        <div class="p-4 flex-1 overflow-auto bg-[#060810] font-mono text-xs text-emerald-400 leading-relaxed select-text">
          <pre class="whitespace-pre-wrap break-all">${B(e)}</pre>
        </div>

        <div class="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Schema: id, title, category, iframeUrl, controls, tags</span>
          <button id="bottom-close-json-btn" class="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-semibold">Close</button>
        </div>
      </div>
    </div>
  `}function L(){return`
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
  `}function R(){let e=document.getElementById(`exit-panic-btn`);e&&(e.onclick=()=>D(!1));let t=document.getElementById(`resume-bottom-panic-btn`);t&&(t.onclick=()=>D(!1))}function z(){let n=document.getElementById(`nav-brand`);n&&(n.onclick=()=>{m=`All`,p=``,g=!1,M()});let r=document.getElementById(`search-input`);r&&(r.oninput=e=>{p=e.target.value,M();let t=document.getElementById(`search-input`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))});let i=document.getElementById(`clear-search-btn`);i&&(i.onclick=()=>{p=``,M()});let s=document.getElementById(`toggle-favs-btn`);s&&(s.onclick=()=>{o(),g=!g,M()});let c=document.getElementById(`mobile-panic-btn`);c&&(c.onclick=()=>D(!0));let u=document.getElementById(`desktop-panic-btn`);u&&(u.onclick=()=>D(!0));let d=document.getElementById(`footer-panic-btn`);d&&(d.onclick=()=>D(!0));let y=document.getElementById(`toggle-sound-btn`);y&&(y.onclick=()=>{v=!v,a(!v),o(),M()});let S=document.getElementById(`cloak-toggle-btn`),T=document.getElementById(`cloak-menu`);S&&T&&(S.onclick=e=>{e.stopPropagation(),o(),T.classList.toggle(`hidden`)},document.querySelectorAll(`.cloak-preset-btn`).forEach(e=>{e.onclick=()=>{let n=e.getAttribute(`data-id`),r=t.find(e=>e.id===n);r&&E(r),T.classList.add(`hidden`),M()}}));let N=document.getElementById(`open-add-btn`);N&&(N.onclick=()=>{o(),b=!0,M()});let P=document.getElementById(`open-json-btn`);P&&(P.onclick=()=>{o(),x=!0,M()});let F=document.getElementById(`footer-json-btn`);F&&(F.onclick=()=>{o(),x=!0,M()});let I=document.getElementById(`hero-play-btn`);I&&(I.onclick=()=>{let e=l.find(e=>e.id===`slope`)||l[0];e&&O(e)}),document.querySelectorAll(`.category-btn`).forEach(e=>{e.onclick=()=>{o(),m=e.getAttribute(`data-category`),g=!1,M()}});let L=document.getElementById(`sort-select`);L&&(L.onchange=e=>{o(),h=e.target.value,M()}),document.querySelectorAll(`.play-card-btn`).forEach(e=>{e.onclick=()=>{let t=e.getAttribute(`data-id`),n=l.find(e=>e.id===t);n&&O(n)}}),document.querySelectorAll(`.fav-game-btn`).forEach(e=>{e.onclick=t=>{t.stopPropagation(),A(e.getAttribute(`data-id`))}}),document.querySelectorAll(`.delete-game-btn`).forEach(e=>{e.onclick=t=>{t.stopPropagation(),j(e.getAttribute(`data-id`))}});let R=document.getElementById(`empty-clear-btn`);if(R&&(R.onclick=()=>{p=``,m=`All`,g=!1,M()}),f){let e=document.getElementById(`player-close-btn`);e&&(e.onclick=k);let t=document.getElementById(`player-reload-btn`);t&&(t.onclick=()=>{o();let e=document.getElementById(`active-game-iframe`);e&&(e.src=e.src)});let n=document.getElementById(`player-theater-btn`);n&&(n.onclick=()=>{o(),_=!_;let e=document.getElementById(`player-container`);e&&(e.className=`w-full bg-[#080d18] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${_?`max-w-[98vw] h-[95vh]`:`max-w-5xl h-[88vh]`}`)});let r=document.getElementById(`player-fullscreen-btn`);r&&(r.onclick=()=>{o();let e=document.getElementById(`player-container`);e&&(document.fullscreenElement?document.exitFullscreen().catch(()=>{}):e.requestFullscreen().catch(()=>{}))});let i=document.getElementById(`player-popout-btn`);i&&(i.onclick=()=>{o();try{let e=window.open(`about:blank`,`_blank`);if(e){e.document.title=f.title,e.document.body.style.margin=`0`,e.document.body.style.height=`100vh`,e.document.body.style.overflow=`hidden`,e.document.body.style.background=`#0a0d14`;let t=e.document.createElement(`iframe`);t.src=C(f.iframeUrl),t.style.width=`100%`,t.style.height=`100%`,t.style.border=`none`,t.allow=f.iframeAllow||`autoplay; fullscreen`,e.document.body.appendChild(t)}}catch{}});let a=document.getElementById(`player-fav-btn`);a&&(a.onclick=()=>A(f.id));let s=document.getElementById(`player-mirror-select`);s&&(s.onchange=e=>{o();let t=e.target.value;f.iframeUrl=t;let n=document.getElementById(`active-game-iframe`);n&&(n.src=C(t))})}if(b){let e=document.getElementById(`close-add-modal-btn`);e&&(e.onclick=()=>{b=!1,M()});let t=document.getElementById(`cancel-add-modal-btn`);t&&(t.onclick=()=>{b=!1,M()});let n=document.getElementById(`add-game-form`);n&&(n.onsubmit=e=>{e.preventDefault(),o();let t=document.getElementById(`add-title`).value.trim(),n=document.getElementById(`add-embed`).value.trim(),r=document.getElementById(`add-category`).value,i=document.getElementById(`add-thumbnail`).value.trim()||`🕹️`,a=document.getElementById(`add-desc`).value.trim()||`Custom embedded game.`,s=document.getElementById(`add-controls`).value.trim()||`Mouse & Keyboard`;if(n.includes(`<iframe`)||n.startsWith(`<iframe`)){let e=n.match(/src=["']([^"']+)["']/i);e&&e[1]&&(n=e[1])}let c={id:`custom-`+Date.now(),title:t,category:r,description:a,iframeUrl:n,thumbnail:i,badge:`Custom`,rating:5,plays:`1`,controls:s,author:`User Added`,tags:[`Custom`,r],isCustom:!0};l.unshift(c),w(),b=!1,M()})}if(x){let t=document.getElementById(`close-json-modal-btn`);t&&(t.onclick=()=>{x=!1,M()});let n=document.getElementById(`bottom-close-json-btn`);n&&(n.onclick=()=>{x=!1,M()});let r=document.getElementById(`copy-json-btn`);r&&(r.onclick=()=>{o(),navigator.clipboard.writeText(JSON.stringify(l,null,2)).then(()=>{let e=document.getElementById(`copy-json-text`);e&&(e.textContent=`Copied!`),setTimeout(()=>{e&&(e.textContent=`Copy JSON`)},2e3)})});let i=document.getElementById(`download-json-btn`);i&&(i.onclick=()=>{o();let e=new Blob([JSON.stringify(l,null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`games.json`,n.click(),URL.revokeObjectURL(t)});let a=document.getElementById(`reset-json-btn`);a&&(a.onclick=()=>{o(),confirm(`Reset games back to default catalog?`)&&(l=e,w(),x=!1,M())})}}function B(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}M();