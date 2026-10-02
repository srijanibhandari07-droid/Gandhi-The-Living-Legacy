import React, { useState } from 'react';
import { Calendar, MapPin, Quote, ChevronRight, Compass, Filter } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

export const InteractiveTimeline: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<'all' | 'early' | 'south-africa' | 'freedom' | 'independence'>('all');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(TIMELINE_MILESTONES[0].id);

  const eras = [
    { id: 'all', label: 'All Eras (1869–1948)' },
    { id: 'early', label: 'Early Years (1869–1892)' },
    { id: 'south-africa', label: 'South Africa (1893–1914)' },
    { id: 'freedom', label: 'Freedom Struggle (1915–1941)' },
    { id: 'independence', label: 'Independence & Martyrdom (1942–1948)' },
  ];

  const filteredMilestones =
    selectedEra === 'all'
      ? TIMELINE_MILESTONES
      : TIMELINE_MILESTONES.filter((m) => m.era === selectedEra);

  const activeMilestone =
    TIMELINE_MILESTONES.find((m) => m.id === selectedMilestoneId) || TIMELINE_MILESTONES[0];

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Chronological Exhibition · 1869 to 1948
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              THE INTERACTIVE TIMELINE
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Trace seven decades of spiritual transformation, grassroots organizing, and world history.
            </p>
          </div>

          {/* Era Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#1c1813] border border-[#2d241c] rounded-lg">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => {
                  setSelectedEra(era.id as any);
                  soundscape.playChime();
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedEra === era.id
                    ? 'bg-[#d49755] text-[#12100e] font-semibold'
                    : 'text-[#baa896] hover:text-[#faeedd]'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Milestone Spotlight Banner */}
        <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-xl">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#282017] border border-[#3e3428] rounded font-mono text-sm font-bold text-[#d49755]">
                {activeMilestone.year}
              </span>
              <span className="text-xs font-mono text-[#baa896]">
                {activeMilestone.dateStr} · {activeMilestone.location}
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#faeedd]">
              {activeMilestone.title}
            </h3>

            <p className="font-serif text-base text-[#d6c7b6] leading-relaxed">
              {activeMilestone.details}
            </p>

            {activeMilestone.quote && (
              <div className="p-4 bg-[#201a14] rounded-lg border-l-2 border-[#d49755] space-y-1">
                <p className="font-serif italic text-xs sm:text-sm text-[#faeedd]">
                  "{activeMilestone.quote.text}"
                </p>
                <span className="font-mono text-[11px] text-[#a99885] block">
                  — {activeMilestone.quote.source}
                </span>
              </div>
            )}

            <div className="p-3 bg-[#16120e] rounded text-xs text-[#baa896]">
              <strong className="text-[#faeedd]">Historical Significance:</strong> {activeMilestone.significance}
            </div>
          </div>

          {/* Archival Photography Preview if available */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {activeMilestone.image ? (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#3e3428] shadow-md">
                <img
                  src={activeMilestone.image}
                  alt={activeMilestone.title}
                  className="w-full h-full object-cover filter sepia-[0.35]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#12100e]/80 backdrop-blur-sm p-1.5 rounded text-[10px] font-mono text-[#d6c7b6]">
                  Archival Heritage Record · {activeMilestone.year}
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-lg border border-[#2d241c] bg-[#181410] p-6 flex flex-col items-center justify-center text-center text-xs text-[#8a7a67]">
                <Calendar className="w-8 h-8 text-[#d49755]/50 mb-2" />
                <span className="font-cinzel text-sm font-semibold text-[#baa896]">
                  Verified Historical Record
                </span>
                <span className="mt-1">
                  Documented in the National Archives of India
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chronological Rail List */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#a99885]">
            Chronological Sequence ({filteredMilestones.length} Events):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMilestones.map((m) => {
              const isSelected = activeMilestone.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMilestoneId(m.id);
                    soundscape.playChime();
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2b2118] border-[#d49755] text-[#faeedd] ring-1 ring-[#d49755]/30 shadow-md'
                      : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#d49755]">
                      <span>{m.year}</span>
                      <span className="text-[#8a7a67]">{m.location.split(',')[0]}</span>
                    </div>
                    <div className="font-cinzel text-sm font-bold text-[#faeedd] mt-1">
                      {m.title}
                    </div>
                    <p className="text-xs text-[#baa896] mt-1.5 line-clamp-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#261f18] text-[11px] font-mono text-[#d49755] flex items-center justify-between">
                    <span>Inspect Record</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
