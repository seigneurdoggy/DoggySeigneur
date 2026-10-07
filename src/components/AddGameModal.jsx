import React, { useState } from 'react';
import { X, Plus, Eye, AlertCircle } from 'lucide-react';
import { playClickSound } from '../utils/sound.js';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [embedInput, setEmbedInput] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('Mouse & Keyboard');
  const [thumbnail, setThumbnail] = useState('🕹️');
  const [testPreview, setTestPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Extract src from <iframe src="..."> if pasted as html
  const extractUrl = (raw) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
      const match = trimmed.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        return match[1];
      }
    }
    return trimmed;
  };

  const handleTestPreview = () => {
    playClickSound();
    const url = extractUrl(embedInput);
    if (!url) {
      setErrorMsg('Please enter a valid URL or iframe embed code.');
      return;
    }
    setErrorMsg('');
    setPreviewUrl(url);
    setTestPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();

    const cleanUrl = extractUrl(embedInput);
    if (!title.trim()) {
      setErrorMsg('Game title is required.');
      return;
    }
    if (!cleanUrl) {
      setErrorMsg('Iframe URL or embed code is required.');
      return;
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category: category,
      description: description.trim() || 'Custom embedded iframe game.',
      iframeUrl: cleanUrl,
      iframeAllow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope",
      sandbox: "allow-scripts allow-same-origin allow-forms allow-pointer-lock",
      thumbnail: thumbnail.trim() || '🕹️',
      badge: 'Custom',
      rating: 5.0,
      plays: '1',
      controls: controls.trim() || 'Mouse & Keyboard',
      author: 'User Added',
      tags: ['Custom', category],
      isCustom: true
    };

    onAddGame(newGame);
    onClose();
  };

  const EMOJI_OPTIONS = ['🕹️', '🎮', '👾', '🚀', '⚡', '🏆', '🎯', '🏎️', '⚔️', '🧩', '🎲', '🔫'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0b101c] border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-arcade text-lg font-bold text-white flex items-center gap-2">
              <span>ADD IFRAME GAME</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add any playable game URL or raw iframe snippet to your JSON catalog
            </p>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/70 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Game Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Super Car Racing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Iframe URL or Embed Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Iframe URL or Embed Code *
            </label>
            <textarea
              rows={2}
              placeholder="Paste URL (https://...) or full <iframe src='...'></iframe>"
              value={embedInput}
              onChange={(e) => setEmbedInput(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-[11px] text-slate-500">Supports direct URLs or raw iframe tags</span>
              <button
                type="button"
                onClick={handleTestPreview}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Test Live Preview</span>
              </button>
            </div>
          </div>

          {/* Test Preview Box */}
          {testPreview && previewUrl && (
            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-800/60">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-mono text-cyan-400 truncate max-w-sm">
                  Testing: {previewUrl}
                </span>
                <button
                  type="button"
                  onClick={() => setTestPreview(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Hide
                </button>
              </div>
              <div className="h-44 w-full bg-black rounded-lg overflow-hidden border border-slate-800">
                <iframe
                  src={previewUrl}
                  title="Test Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          )}

          {/* Category & Thumbnail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Emoji Icon
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  maxLength={4}
                  className="w-14 text-center text-xl py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
                <div className="flex flex-wrap gap-1 flex-1">
                  {EMOJI_OPTIONS.slice(0, 6).map((emo) => (
                    <button
                      key={emo}
                      type="button"
                      onClick={() => setThumbnail(emo)}
                      className="p-1 rounded hover:bg-slate-800 text-base"
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Controls */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <input
              type="text"
              placeholder="Short summary of gameplay..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Controls Hint
            </label>
            <input
              type="text"
              placeholder="e.g. Arrow keys to steer, Space to jump"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { playClickSound(); onClose(); }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Save to Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
