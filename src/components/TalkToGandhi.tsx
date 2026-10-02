import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { soundscape } from '../utils/audioSynthesizer';

interface Message {
  id: string;
  sender: 'user' | 'gandhi';
  text: string;
  source?: string;
  isHypothetical?: boolean;
  timestamp: string;
}

export const TalkToGandhi: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'gandhi',
      text: 'Greetings, seeker of truth. I am an archival simulation grounded in the documented speeches, letters, and writings of Mohandas Karamchand Gandhi. Ask of me concerning Ahimsa (nonviolence), Satyagraha (holding fast to truth), courage, or the dilemmas of human life.',
      source: 'The Collected Works of Mahatma Gandhi (Vols. 1–98)',
      isHypothetical: false,
      timestamp: '09:00',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    'What does nonviolence mean in a world full of conflict?',
    'How should I respond when someone treats me unfairly?',
    'What is the relationship between truth and courage?',
    'What would you say about modern technology and AI?',
    'How can young people meaningfully contribute to society?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Web Speech API Voice Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text to Speech playback for answers
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speechSynthesisActive) {
      window.speechSynthesis.cancel();
      setSpeechSynthesisActive(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.95;

    // Pick a natural calm voice if available
    const voices = window.speechSynthesis.getVoices();
    const calmVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Guy') || v.name.includes('George')));
    if (calmVoice) {
      utterance.voice = calmVoice;
    }

    utterance.onend = () => setSpeechSynthesisActive(false);
    utterance.onerror = () => setSpeechSynthesisActive(false);

    setSpeechSynthesisActive(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (questionText?: string) => {
    const query = (questionText || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    soundscape.playChime();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4),
        }),
      });

      const data = await response.json();

      const gandhiMessage: Message = {
        id: `gnd-${Date.now()}`,
        sender: 'gandhi',
        text: data.reply || 'Truth resides in every human heart, and one has to search for it there.',
        source: data.source || 'The Collected Works of Mahatma Gandhi',
        isHypothetical: !!data.isHypothetical,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, gandhiMessage]);
    } catch {
      // Fallback message
      const fallbackMessage: Message = {
        id: `gnd-${Date.now()}`,
        sender: 'gandhi',
        text: 'Nonviolence is the greatest force at the disposal of mankind. It is mightier than the mightiest weapon of destruction devised by the ingenuity of man. Hate the sin, love the sinner.',
        source: 'Harijan (1938) & Young India',
        isHypothetical: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Conversational Archive Experience
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#282017] text-[#baa896] border border-[#3e3428]">
              AI Simulation · Verified Writings
            </span>
          </div>
          <h2 className="font-cinzel text-3xl font-bold tracking-wide text-[#faeedd] mt-1">
            TALK TO HISTORY: A CONVERSATION WITH GANDHI
          </h2>
          <p className="font-serif italic text-sm text-[#baa896] mt-1">
            Grounded strictly in verified letters, journals (Young India, Harijan), and recorded speeches.
          </p>

          {/* Archival Integrity Disclosure Box */}
          <div className="mt-3 p-3 bg-[#1d1712] border border-[#382b20] rounded-lg text-xs text-[#baa896] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#d49755] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#faeedd]">Historical Integrity Policy:</strong> This educational tool simulates responses using verified primary sources. It never invents authentic quotations. When asked about modern technology or contemporary issues, it explicitly delineates historical extrapolation from documented facts.
            </p>
          </div>
        </div>

        {/* Suggested Historical Prompts */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a99885]">
            Suggested Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-xs text-left px-3 py-1.5 rounded-full bg-[#1c1813] hover:bg-[#282119] border border-[#2d241c] text-[#d6c7b6] hover:text-[#faeedd] transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Feed Container */}
        <div className="bg-[#181410] border border-[#2d241c] rounded-xl p-4 sm:p-6 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 shadow-inner">
          {messages.map((msg) => {
            const isGandhi = msg.sender === 'gandhi';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isGandhi ? 'items-start' : 'items-end'}`}
              >
                <div className="text-[11px] font-mono text-[#8a7a67] mb-1 px-1">
                  {isGandhi ? 'Mahatma Gandhi (Archival Simulation)' : 'Inquirer'} · {msg.timestamp}
                </div>

                <div
                  className={`max-w-[85%] rounded-xl p-4 sm:p-5 text-sm leading-relaxed ${
                    isGandhi
                      ? 'bg-[#221b15] border border-[#3e3428] text-[#faeedd] font-serif'
                      : 'bg-[#2d2218] border border-[#4d3a28] text-[#e8dfd1]'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm sm:text-base">
                    {msg.text}
                  </p>

                  {/* Source Citation for Gandhi responses */}
                  {isGandhi && msg.source && (
                    <div className="mt-3 pt-3 border-t border-[#382d21] text-xs font-mono text-[#d49755] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Source Reference: {msg.source}</span>
                      </div>
                      
                      <button
                        onClick={() => speakText(msg.text)}
                        className="text-[#a99885] hover:text-[#faeedd] transition-colors p-1"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {msg.isHypothetical && (
                    <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-[#d49755]/80">
                      [Philosophical Extrapolation for Modern Context]
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-[#221b15] border border-[#3e3428] rounded-xl w-32">
              <span className="w-2 h-2 rounded-full bg-[#d49755] animate-ping" />
              <span className="font-mono text-xs text-[#a99885]">Consulting archives...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-[#1c1712] border border-[#2d241c] rounded-xl p-2.5 flex items-center gap-2 shadow-lg">
          <button
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
              isListening
                ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse'
                : 'bg-[#261f18] border-[#3e3428] text-[#baa896] hover:text-[#faeedd]'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Speak inquiry using microphone'}
            aria-label="Toggle voice input"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Inquire of nonviolence, courage, simple living, or moral dilemmas..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-[#faeedd] placeholder-[#8a7a67] focus:outline-none"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-[#d49755] hover:bg-[#e5a863] disabled:opacity-40 text-[#12100e] font-cinzel font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
