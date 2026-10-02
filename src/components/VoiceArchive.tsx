import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  FileText, 
  Sparkles, 
  Radio, 
  Clock, 
  Award,
  BookOpen
} from 'lucide-react';
import { ARCHIVAL_SPEECHES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

export const VoiceArchive: React.FC = () => {
  const [selectedSpeechId, setSelectedSpeechId] = useState<string>(ARCHIVAL_SPEECHES[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<'archival' | 'scholarly-narration'>('archival');
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSpeech = ARCHIVAL_SPEECHES.find((s) => s.id === selectedSpeechId) || ARCHIVAL_SPEECHES[0];

  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 300);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      soundscape.playChime();
      setIsPlaying(true);
      // If Web Speech is available, simulate narrated voice
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToRead =
          audioMode === 'archival'
            ? currentSpeech.transcript.slice(0, 300)
            : currentSpeech.audioNarrativeSummary;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = audioMode === 'archival' ? 0.82 : 0.95;
        utterance.pitch = audioMode === 'archival' ? 0.9 : 1.0;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleSelectSpeech = (id: string) => {
    setSelectedSpeechId(id);
    setIsPlaying(false);
    setProgress(0);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Sound Gallery · Archival Recordings
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              THE VOICE ARCHIVE
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Historical speech recordings, broadcasts, and context transcripts from 1930 to 1948.
            </p>
          </div>

          {/* Mode Switcher: Archival vs Scholarly Narrator */}
          <div className="flex items-center gap-1 p-1 bg-[#1c1813] border border-[#2d241c] rounded-lg">
            <button
              onClick={() => {
                setAudioMode('archival');
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                audioMode === 'archival'
                  ? 'bg-[#d49755] text-[#12100e] font-semibold'
                  : 'text-[#baa896] hover:text-[#faeedd]'
              }`}
            >
              Archival Mode
            </button>
            <button
              onClick={() => {
                setAudioMode('scholarly-narration');
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                audioMode === 'scholarly-narration'
                  ? 'bg-[#d49755] text-[#12100e] font-semibold'
                  : 'text-[#baa896] hover:text-[#faeedd]'
              }`}
            >
              Scholarly Narration
            </button>
          </div>
        </div>

        {/* Master Player & Visualizer */}
        <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#d49755]">
                {currentSpeech.date} · {currentSpeech.location}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#faeedd] mt-0.5">
                {currentSpeech.title}
              </h3>
              <p className="text-xs text-[#baa896] mt-1 max-w-2xl">
                {currentSpeech.description}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-[#a99885] block">Recorded Duration</span>
              <span className="font-mono text-lg font-bold text-[#faeedd]">{currentSpeech.duration}</span>
            </div>
          </div>

          {/* Dynamic Waveform Visualization */}
          <div className="bg-[#120f0c] p-6 rounded-xl border border-[#2d241c] space-y-4">
            <div className="h-28 flex items-center justify-between gap-1.5 px-2">
              {currentSpeech.sampleWaveform.map((val, idx) => {
                const isActive = (idx / currentSpeech.sampleWaveform.length) * 100 <= progress;
                const dynamicHeight = isPlaying
                  ? Math.max(15, Math.min(100, val + Math.sin(Date.now() / 200 + idx) * 20))
                  : val;

                return (
                  <div
                    key={idx}
                    className={`flex-1 rounded-full transition-all duration-150 ${
                      isActive ? 'bg-[#d49755]' : 'bg-[#382f25]'
                    }`}
                    style={{ height: `${dynamicHeight}%` }}
                  />
                );
              })}
            </div>

            {/* Progress Scrubber Bar */}
            <div className="w-full bg-[#201b15] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#d49755] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Playback Controls & Mode Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] flex items-center justify-center transition-all transform active:scale-95 shadow-lg cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play speech'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress(0)}
                className="p-2 rounded bg-[#221b15] hover:bg-[#2c231a] text-[#baa896] hover:text-[#faeedd] border border-[#3e3428] transition-colors"
                title="Restart audio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-[#a99885]">
                {audioMode === 'archival' ? (
                  <span className="text-[#d49755]">● Archival Master Recording</span>
                ) : (
                  <span>● Disclosed AI Academic Narration</span>
                )}
              </div>
            </div>

            <div className="text-xs font-mono text-[#8a7a67]">
              Source: {currentSpeech.sourceCredit}
            </div>
          </div>
        </div>

        {/* Archival Transcript & Context Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List of Speeches in the Archive */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-cinzel text-base font-bold text-[#faeedd] flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#d49755]" />
              Archival Record Catalog
            </h4>
            <div className="space-y-2">
              {ARCHIVAL_SPEECHES.map((sp) => {
                const isSelected = sp.id === selectedSpeechId;
                return (
                  <button
                    key={sp.id}
                    onClick={() => handleSelectSpeech(sp.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#241c15] border-[#d49755] text-[#faeedd] shadow'
                        : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-[#d49755]">
                      {sp.date}
                    </div>
                    <div className="font-cinzel text-sm font-semibold text-[#faeedd] mt-0.5">
                      {sp.title}
                    </div>
                    <div className="text-xs text-[#8a7a67] mt-1 line-clamp-2">
                      {sp.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Historical Transcript */}
          <div className="lg:col-span-8 bg-[#181410] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d241c] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#d49755]" />
                <h4 className="font-cinzel text-base font-bold text-[#faeedd]">
                  Complete Verbatim Transcript
                </h4>
              </div>
              <span className="font-mono text-xs text-[#8a7a67]">
                Archival Record #AU-{currentSpeech.id}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#201a14] border-l-2 border-[#d49755] text-xs text-[#baa896] leading-relaxed">
              <strong className="text-[#faeedd] block mb-0.5">Historical Context:</strong>
              {currentSpeech.historicalContext}
            </div>

            <div className="font-serif text-sm sm:text-base text-[#d6c7b6] leading-relaxed space-y-4 max-h-[380px] overflow-y-auto pr-3">
              {currentSpeech.transcript.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
