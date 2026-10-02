import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, Filter, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Reflection } from '../types';
import { soundscape } from '../utils/audioSynthesizer';

export const TributeWall: React.FC = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [activeTheme, setActiveTheme] = useState<string>('all');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState<'peace' | 'truth' | 'courage' | 'humanity' | 'simplicity'>('peace');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const themes = [
    { id: 'all', label: 'All Reflections' },
    { id: 'peace', label: 'Peace (शांति)' },
    { id: 'truth', label: 'Truth (सत्य)' },
    { id: 'courage', label: 'Courage (अभय)' },
    { id: 'humanity', label: 'Humanity (सर्वोदय)' },
    { id: 'simplicity', label: 'Simplicity (अपरिग्रह)' },
  ];

  const fetchReflections = async () => {
    try {
      const res = await fetch('/api/peace-reflections');
      const data = await res.json();
      if (Array.isArray(data.reflections)) {
        setReflections(data.reflections);
      }
    } catch {
      // Fallback local reflections
    }
  };

  useEffect(() => {
    fetchReflections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!author.trim() || !message.trim()) {
      setErrorMsg('Please provide your name and a heartfelt reflection.');
      return;
    }

    setIsSubmitting(true);
    soundscape.playChime();

    try {
      const res = await fetch('/api/peace-reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, location, theme, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setAuthor('');
        setLocation('');
        setMessage('');
        fetchReflections();
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        setErrorMsg(data.error || 'Unable to submit reflection.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReflections =
    activeTheme === 'all'
      ? reflections
      : reflections.filter((r) => r.theme === activeTheme);

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Living Memorial & Community Voices
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              "WHAT DOES PEACE MEAN TO YOU?"
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Reflections on nonviolence, truth, and courage contributed by seekers across the world.
            </p>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#1c1813] border border-[#2d241c] rounded-lg">
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  setActiveTheme(th.id);
                  soundscape.playChime();
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeTheme === th.id
                    ? 'bg-[#d49755] text-[#12100e] font-semibold'
                    : 'text-[#baa896] hover:text-[#faeedd]'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submission Form and Community Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submission Form Column */}
          <div className="lg:col-span-5 bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-7 space-y-5 shadow-xl">
            <div className="border-b border-[#2d241c] pb-3">
              <span className="text-xs font-mono uppercase text-[#d49755] block">
                Contribute to the Archive
              </span>
              <h3 className="font-cinzel text-xl font-bold text-[#faeedd] mt-0.5">
                Leave Your Reflection
              </h3>
              <p className="text-xs text-[#baa896] mt-1">
                Your thoughts will join the worldwide digital memorial for nonviolence.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Your reflection has been safely recorded on the tribute wall. Thank you.</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#a99885] font-mono block mb-1">Your Name / Pen Name:</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2.5 text-[#faeedd] placeholder-[#7a6b5c] focus:outline-none focus:border-[#d49755]"
                />
              </div>

              <div>
                <label className="text-[#a99885] font-mono block mb-1">City / Region:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. London, UK or Delhi, India"
                  className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2.5 text-[#faeedd] placeholder-[#7a6b5c] focus:outline-none focus:border-[#d49755]"
                />
              </div>

              <div>
                <label className="text-[#a99885] font-mono block mb-1">Core Theme:</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2.5 text-[#faeedd] focus:outline-none focus:border-[#d49755]"
                >
                  <option value="peace">Peace (Ahimsa)</option>
                  <option value="truth">Truth (Satya)</option>
                  <option value="courage">Courage (Abhaya)</option>
                  <option value="humanity">Humanity (Sarvodaya)</option>
                  <option value="simplicity">Simplicity (Aparigraha)</option>
                </select>
              </div>

              <div>
                <label className="text-[#a99885] font-mono block mb-1">Your Peaceful Reflection:</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What does truth, courage, or nonviolence mean in your own daily life?"
                  className="w-full bg-[#201a14] border border-[#2d241c] rounded p-2.5 text-[#faeedd] placeholder-[#7a6b5c] focus:outline-none focus:border-[#d49755] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-[#d49755] hover:bg-[#e5a863] disabled:opacity-40 text-[#12100e] font-cinzel font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Recording...' : 'Submit to Living Memorial'}</span>
              </button>

              <div className="text-[10px] font-mono text-[#7a6a57] pt-1">
                Moderated community archive. Respectful dialogue only. No personal contact details displayed.
              </div>
            </form>
          </div>

          {/* Reflections Grid Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase text-[#a99885] flex items-center justify-between">
              <span>Recorded Memorial Voices ({filteredReflections.length})</span>
              <span className="flex items-center gap-1 text-[#d49755]">
                <Globe2 className="w-3.5 h-3.5" /> Global Conscience
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-2">
              {filteredReflections.map((ref) => (
                <div
                  key={ref.id}
                  className="p-5 rounded-xl bg-[#1a1612] border border-[#2d241c] flex flex-col justify-between space-y-3 hover:border-[#3e3428] transition-colors"
                >
                  <p className="font-serif italic text-sm text-[#faeedd] leading-relaxed">
                    "{ref.message}"
                  </p>

                  <div className="border-t border-[#261f18] pt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-cinzel font-semibold text-[#d49755] block">
                        {ref.author}
                      </span>
                      <span className="font-mono text-[10px] text-[#8a7a67]">
                        {ref.location}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#201a14] border border-[#2d241c] text-[#baa896]">
                      {ref.theme}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
