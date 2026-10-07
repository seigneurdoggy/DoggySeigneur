import React, { useEffect } from 'react';
import { BookOpen, Search, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PanicOverlay = ({
  isOpen,
  onExitPanic
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onExitPanic();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onExitPanic]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white text-slate-900 overflow-y-auto select-none">
      {/* Google Classroom / Education header disguise */}
      <header className="border-b border-gray-200 px-6 py-3 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700 text-lg">Google Classroom</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-600">Period 4 - World History & Geography</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-9 pr-4 py-1.5 rounded-full border border-gray-300 text-xs w-56 focus:outline-none"
              readOnly
            />
          </div>
          <button
            onClick={onExitPanic}
            className="text-xs text-gray-500 hover:text-emerald-700 border border-gray-200 hover:border-emerald-600 rounded-lg px-2.5 py-1.5 flex items-center gap-1 transition"
            title="Return to Unblocked Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Resume (Esc)</span>
          </button>
        </div>
      </header>

      {/* Classroom Content Body */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Banner */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-1">Unit 5: The Industrial Revolution & Modern Era</h1>
          <p className="text-emerald-100 text-sm">Mr. Henderson • Due Thursday, 11:59 PM</p>
        </div>

        {/* Assignments list */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition flex items-start justify-between bg-gray-50/50">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Chapter 14 Reading Comprehension Questions</h3>
                <p className="text-xs text-gray-500 mt-0.5">Assigned Oct 4 • Graded 100/100</p>
                <p className="text-xs text-gray-600 mt-2 max-w-xl">
                  Analyze the key technological innovations between 1760 and 1840, focusing on steam power and mechanized textiles.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Turned in
            </span>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition flex items-start justify-between bg-white">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Primary Source Analysis: Factory Act Testimonies</h3>
                <p className="text-xs text-gray-500 mt-0.5">Due Oct 12 • 25 Points</p>
                <p className="text-xs text-gray-600 mt-2 max-w-xl">
                  Review the parliamentary hearings regarding labor standards. Complete the analytical questions in your shared doc.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              Assigned
            </span>
          </div>
        </div>

        {/* Subtle button to resume */}
        <div className="mt-12 text-center">
          <button
            onClick={onExitPanic}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Click here or press Escape to resume
          </button>
        </div>
      </main>
    </div>
  );
};
