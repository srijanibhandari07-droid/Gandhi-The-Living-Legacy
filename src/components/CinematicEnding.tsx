import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Heart, Compass } from 'lucide-react';
import { ASSET_IMAGES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

interface CinematicEndingProps {
  onRevisitMuseum: () => void;
  onRestartExperience: () => void;
}

type Principle = 'Truth' | 'Peace' | 'Courage' | 'Humanity';

export const CinematicEnding: React.FC<CinematicEndingProps> = ({
  onRevisitMuseum,
  onRestartExperience,
}) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);
  const [hasCommitted, setHasCommitted] = useState(false);

  const principleReflections: Record<Principle, { quote: string; context: string }> = {
    Truth: {
      quote: 'Truth is God. There is no other higher sanctuary.',
      context: 'To practice Satya means never hiding behind deceit, refusing to speak malice, and having the integrity to align one’s thoughts, speech, and deeds into harmonious unity.',
    },
    Peace: {
      quote: 'There is no way to peace; peace is the way.',
      context: 'Peace is not passive acquiescence to evil; it is active soul-force. It begins by disarming the anger inside our own minds and meeting hostility with steadfast gentleness.',
    },
    Courage: {
      quote: 'Fearlessness is the first requisite of spirituality. Cowards can never be moral.',
      context: 'Nonviolence demands greater bravery than the sword. It is the courage to endure injustice without surrender and without retaliation, awakening the conscience of the world.',
    },
    Humanity: {
      quote: 'All humanity is one undivided and indivisible family.',
      context: 'In an era of division and polarization, Sarvodaya (the uplift of all) insists that our welfare is inextricably bound to the dignity of the poorest among us.',
    },
  };

  const handleSelectPrinciple = (p: Principle) => {
    setSelectedPrinciple(p);
    setHasCommitted(true);
    soundscape.playChime();
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8 bg-[#0d0b09] overflow-hidden select-none">
      
      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181410] via-transparent to-[#0a0806] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Pullback Portrait surrounded by the 4 handwritten principles */}
        <div className="relative w-full max-w-[560px] aspect-[4/5] rounded-2xl border border-[#3e3428] shadow-2xl p-8 flex flex-col items-center justify-center bg-parchment overflow-hidden">
          
          {/* Faded Portrait Inset */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#3e3428] shadow-xl relative z-10 transition-transform duration-1000 ease-out hover:scale-105">
            <img
              src={ASSET_IMAGES.portrait}
              alt="Mahatma Gandhi Tribute Portrait"
              className="w-full h-full object-cover filter sepia-[0.35] contrast-[1.08]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Surrounding Handwritten Principles Floating at Four Cardinal Corners */}
          <div className="absolute top-6 left-6 font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#1c1611]/80 select-none">
            Truth.
          </div>
          <div className="absolute top-6 right-6 font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#1c1611]/80 select-none">
            Peace.
          </div>
          <div className="absolute bottom-6 left-6 font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#1c1611]/80 select-none">
            Courage.
          </div>
          <div className="absolute bottom-6 right-6 font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#1c1611]/80 select-none">
            Humanity.
          </div>
        </div>

        {/* Closing Philosophical Contemplation */}
        <div className="max-w-2xl px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#d49755] block">
            The Living Covenant
          </span>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#faeedd]">
            Which principle will you carry forward?
          </h2>

          <p className="font-serif italic text-base text-[#baa896]">
            History is not only what we remember. It is also what we choose to learn from.
          </p>

          {/* The 4 Principle Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {(['Truth', 'Peace', 'Courage', 'Humanity'] as Principle[]).map((principle) => {
              const isSelected = selectedPrinciple === principle;
              return (
                <button
                  key={principle}
                  onClick={() => handleSelectPrinciple(principle)}
                  className={`py-3 px-4 rounded-xl font-cinzel text-sm font-bold tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#d49755] text-[#12100e] border-[#faeedd] shadow-lg scale-105 ring-2 ring-[#d49755]'
                      : 'bg-[#1c1813] text-[#baa896] border-[#3e3428] hover:bg-[#282119] hover:text-[#faeedd]'
                  }`}
                >
                  {principle}
                </button>
              );
            })}
          </div>

          {/* Selected Principle Revelation Box */}
          {selectedPrinciple && (
            <div className="mt-6 p-6 bg-[#1a1612] border border-[#3e3428] rounded-xl text-left space-y-2 animate-fadeIn shadow-xl">
              <span className="text-xs font-mono uppercase text-[#d49755] block">
                Your Chosen Principle: {selectedPrinciple}
              </span>
              <p className="font-serif italic text-lg text-[#faeedd]">
                "{principleReflections[selectedPrinciple].quote}"
              </p>
              <p className="text-xs sm:text-sm text-[#baa896] leading-relaxed pt-1">
                {principleReflections[selectedPrinciple].context}
              </p>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={() => {
                soundscape.playChime();
                onRevisitMuseum();
              }}
              className="px-6 py-3 bg-[#241c15] hover:bg-[#32271e] text-[#faeedd] border border-[#4a3928] text-xs font-cinzel font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Revisit Historical Galleries
            </button>

            <button
              onClick={() => {
                soundscape.playChime();
                onRestartExperience();
              }}
              className="px-6 py-3 bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] text-xs font-cinzel font-bold tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Opening Sketch</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
