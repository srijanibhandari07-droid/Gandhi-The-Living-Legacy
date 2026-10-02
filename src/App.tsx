import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import { Navigation } from './components/Navigation';
import { CinematicOpening } from './components/CinematicOpening';
import { MuseumRooms } from './components/MuseumRooms';
import { LivingPortrait } from './components/LivingPortrait';
import { TalkToGandhi } from './components/TalkToGandhi';
import { VoiceArchive } from './components/VoiceArchive';
import { GamesHub } from './components/GamesHub';
import { ArtistsStudio } from './components/ArtistsStudio';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { TributeWall } from './components/TributeWall';
import { CinematicEnding } from './components/CinematicEnding';
import { soundscape } from './utils/audioSynthesizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('opening');
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleToggleAudio = () => {
    const newState = soundscape.toggleAmbientMusic();
    setAudioEnabled(newState);
  };

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#12100e] text-[#e8dfd1] flex flex-col font-sans selection:bg-[#d49755]/30 selection:text-[#faeedd]">
      
      {/* Top Bar Navigation (Preserves 3-Zone Contract) */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Exhibition Content Viewport */}
      <main className="flex-1 w-full">
        {activeTab === 'opening' && (
          <CinematicOpening
            onEnterExperience={() => handleSelectTab('museum')}
            audioEnabled={audioEnabled}
            onToggleAudio={handleToggleAudio}
          />
        )}

        {activeTab === 'museum' && (
          <MuseumRooms onSelectTab={handleSelectTab} />
        )}

        {activeTab === 'portrait' && (
          <LivingPortrait />
        )}

        {activeTab === 'conversation' && (
          <TalkToGandhi />
        )}

        {activeTab === 'audio' && (
          <VoiceArchive />
        )}

        {activeTab === 'games' && (
          <GamesHub />
        )}

        {activeTab === 'studio' && (
          <ArtistsStudio />
        )}

        {activeTab === 'timeline' && (
          <InteractiveTimeline />
        )}

        {activeTab === 'tribute' && (
          <TributeWall />
        )}

        {activeTab === 'ending' && (
          <CinematicEnding
            onRevisitMuseum={() => handleSelectTab('museum')}
            onRestartExperience={() => handleSelectTab('opening')}
          />
        )}
      </main>

      {/* Museum Institutional Footer */}
      <footer className="border-t border-[#2d241c] bg-[#14110e] text-[#8e8173] py-8 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-cinzel font-bold text-[#baa896] block text-sm">
              GANDHI: THE LIVING LEGACY
            </span>
            <p className="font-serif italic text-xs text-[#7a6b5c]">
              An interactive digital museum dedicated to universal nonviolence, truth, and peace.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-[#baa896]">
            <button onClick={() => handleSelectTab('timeline')} className="hover:text-[#faeedd] transition-colors cursor-pointer">
              Timeline Index
            </button>
            <button onClick={() => handleSelectTab('audio')} className="hover:text-[#faeedd] transition-colors cursor-pointer">
              Archival Audio
            </button>
            <button onClick={() => handleSelectTab('tribute')} className="hover:text-[#faeedd] transition-colors cursor-pointer">
              Tribute Wall
            </button>
            <button onClick={() => handleSelectTab('ending')} className="hover:text-[#d49755] transition-colors cursor-pointer">
              Closing Ceremony
            </button>
          </div>

          <div className="font-mono text-[11px] text-center md:text-right text-[#695d50]">
            Archival Sources: The Collected Works of Mahatma Gandhi (Vols. 1–98)
          </div>
        </div>
      </footer>

    </div>
  );
}
