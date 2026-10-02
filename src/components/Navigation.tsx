import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Compass } from 'lucide-react';
import { NavigationTab } from '../types';
import { soundscape } from '../utils/audioSynthesizer';

interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  audioEnabled,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: NavigationTab }[] = [
    { label: 'Exhibition', tab: 'museum' },
    { label: 'Living Portrait', tab: 'portrait' },
    { label: 'Talk to History', tab: 'conversation' },
    { label: 'Voice Archive', tab: 'audio' },
    { label: 'Challenges', tab: 'games' },
    { label: 'Artist Studio', tab: 'studio' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#14110e]/90 backdrop-blur-md border-b border-[#2d241c] text-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <button
          onClick={() => {
            onSelectTab('opening');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-cinzel text-base md:text-lg font-bold tracking-wider text-[#faeedd] group-hover:text-[#d49755] transition-colors whitespace-nowrap">
            GANDHI: THE LIVING LEGACY
          </span>
        </button>

        {/* Zone 2: Navigation Links (Text with clean hover indicator) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`relative py-1 text-sm tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#e5a863] font-semibold'
                    : 'text-[#baa896] hover:text-[#faeedd]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c27b38] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Soundscape Toggle & Tribute / Ending Action) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onToggleAudio();
              soundscape.playChime();
            }}
            className={`p-2 rounded-md border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              audioEnabled
                ? 'bg-[#291f16] border-[#d49755]/50 text-[#e5a863]'
                : 'bg-[#1b1713] border-[#382f25] text-[#8e8173] hover:text-[#d6c7b6]'
            }`}
            title={audioEnabled ? 'Mute ambient soundscape' : 'Enable meditative Indian acoustic soundscape'}
            aria-label="Toggle ambient audio"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
              {audioEnabled ? 'Sound On' : 'Sound Off'}
            </span>
          </button>

          <button
            onClick={() => {
              onSelectTab('tribute');
              setMobileMenuOpen(false);
            }}
            className="px-3.5 py-1.5 text-xs font-cinzel font-semibold tracking-wider text-[#14110e] bg-[#d49755] hover:bg-[#e5a863] transition-colors rounded-md whitespace-nowrap cursor-pointer shadow-sm"
          >
            Tribute Wall
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#baa896] hover:text-[#faeedd] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181410] border-b border-[#2d241c] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                onSelectTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 text-sm rounded ${
                activeTab === item.tab
                  ? 'bg-[#261f18] text-[#e5a863] font-semibold'
                  : 'text-[#baa896] hover:bg-[#201b15] hover:text-[#faeedd]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#2d241c] flex items-center justify-between text-xs text-[#8e8173] px-3">
            <button
              onClick={() => {
                onSelectTab('timeline');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-[#d49755]"
            >
              <Compass className="w-3.5 h-3.5" /> Full Chronology
            </button>
            <button
              onClick={() => {
                onSelectTab('ending');
                setMobileMenuOpen(false);
              }}
              className="text-[#d6c7b6] hover:underline"
            >
              Closing Tribute
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
