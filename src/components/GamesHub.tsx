import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Compass, 
  HelpCircle, 
  Feather, 
  CheckCircle, 
  RotateCcw, 
  ChevronRight, 
  Award,
  AlertTriangle,
  Lightbulb,
  FileText
} from 'lucide-react';
import { 
  SATYAGRAHA_SCENARIOS, 
  DETECTIVE_CASES, 
  SALT_MARCH_STOPS, 
  TRUTH_OR_MYTH_QUESTIONS,
  ASSET_IMAGES
} from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

type GameMode = 'satyagraha' | 'detective' | 'salt-march' | 'quiz' | 'peace-design';

export const GamesHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameMode>('satyagraha');

  // Game A State (Satyagraha)
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  // Game B State (Detective)
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedDeductionId, setSelectedDeductionId] = useState<string | null>(null);
  const [examinedClueId, setExaminedClueId] = useState<string | null>(null);

  // Game C State (Salt March)
  const [stopIdx, setStopIdx] = useState(0);
  const [revealedAnswer, setRevealedAnswer] = useState(false);

  // Game D State (Quiz)
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Game E State (Design Peaceful Solution)
  const [peaceStep, setPeaceStep] = useState(1);
  const [chosenPath, setChosenPath] = useState<{ [key: number]: string }>({});

  const currentScenario = SATYAGRAHA_SCENARIOS[scenarioIdx];
  const currentCase = DETECTIVE_CASES[caseIdx];
  const currentStop = SALT_MARCH_STOPS[stopIdx];
  const currentQuiz = TRUTH_OR_MYTH_QUESTIONS[quizIdx];

  const gameNav = [
    { id: 'satyagraha', name: 'The Satyagraha Challenge', icon: ShieldCheck },
    { id: 'detective', name: 'The Historical Detective', icon: Search },
    { id: 'salt-march', name: 'The Salt March Journey', icon: Compass },
    { id: 'quiz', name: 'Truth or Myth Quiz', icon: HelpCircle },
    { id: 'peace-design', name: 'Design a Peaceful Solution', icon: Feather },
  ];

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
            Interactive Historical Learning Lab
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
            GAMES & HISTORICAL CHALLENGES
          </h2>
          <p className="font-serif italic text-base text-[#baa896] mt-1">
            Critical thinking simulations grounded in historical archives and Gandhian methodology.
          </p>
        </div>

        {/* Game Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {gameNav.map((g) => {
            const Icon = g.icon;
            const isActive = activeGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGame(g.id as GameMode);
                  soundscape.playChime();
                }}
                className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#221b14] border-[#d49755] ring-1 ring-[#d49755]/30 shadow'
                    : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14] hover:text-[#faeedd]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isActive ? 'text-[#d49755]' : 'text-[#8a7a67]'}`} />
                <span className="font-cinzel text-xs font-bold leading-tight text-[#faeedd]">
                  {g.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- GAME A: THE SATYAGRAHA CHALLENGE ---------------- */}
        {activeGame === 'satyagraha' && (
          <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2d241c] pb-4">
              <div>
                <span className="text-xs font-mono text-[#d49755]">
                  Case #{scenarioIdx + 1} of {SATYAGRAHA_SCENARIOS.length} · {currentScenario.year}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#faeedd]">
                  {currentScenario.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#baa896]">
                Location: {currentScenario.location}
              </span>
            </div>

            <div className="p-4 bg-[#201a14] rounded-lg border border-[#3e3428] space-y-2">
              <span className="text-xs font-mono text-[#d49755] uppercase block font-semibold">
                Historical Dilemma:
              </span>
              <p className="text-xs sm:text-sm text-[#baa896] leading-relaxed">
                {currentScenario.background}
              </p>
              <p className="text-xs sm:text-sm text-[#faeedd] font-semibold pt-1">
                {currentScenario.dilemma}
              </p>
            </div>

            {/* Decisions List */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#a99885]">
                Choose your strategic response:
              </span>
              {currentScenario.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <div key={choice.id} className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedChoiceId(choice.id);
                        soundscape.playChime();
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2b2118] border-[#d49755] text-[#faeedd] shadow'
                          : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]'
                      }`}
                    >
                      <div className="font-semibold text-xs sm:text-sm">
                        {choice.label}
                      </div>
                    </button>

                    {isSelected && (
                      <div className="p-5 bg-[#120f0c] border border-[#3e3428] rounded-xl space-y-3 animate-fadeIn">
                        <div>
                          <span className="text-xs font-mono text-[#d49755] block font-semibold">
                            Immediate Consequence:
                          </span>
                          <p className="text-xs text-[#baa896] mt-0.5">
                            {choice.immediateConsequence}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-mono text-[#d49755] block font-semibold">
                            Long-Term Outcome & Moral Principle:
                          </span>
                          <p className="text-xs text-[#baa896] mt-0.5">
                            {choice.gandhianPrinciple}
                          </p>
                        </div>
                        <div className="p-3 bg-[#1e1711] rounded border-l-2 border-[#d49755] text-xs text-[#d6c7b6]">
                          <strong className="text-[#faeedd]">Historical Reality:</strong> {choice.historicalReality}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-[#2d241c]">
              <button
                onClick={() => {
                  setSelectedChoiceId(null);
                  setScenarioIdx((prev) => (prev > 0 ? prev - 1 : SATYAGRAHA_SCENARIOS.length - 1));
                }}
                className="px-4 py-2 rounded bg-[#201b15] hover:bg-[#2c241c] border border-[#3e3428] text-xs font-cinzel cursor-pointer"
              >
                Previous Dilemma
              </button>
              <button
                onClick={() => {
                  setSelectedChoiceId(null);
                  setScenarioIdx((prev) => (prev < SATYAGRAHA_SCENARIOS.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 rounded bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] text-xs font-cinzel font-bold cursor-pointer"
              >
                Next Dilemma
              </button>
            </div>
          </div>
        )}

        {/* ---------------- GAME B: THE HISTORICAL DETECTIVE ---------------- */}
        {activeGame === 'detective' && (
          <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
            <div className="border-b border-[#2d241c] pb-4">
              <span className="text-xs font-mono text-[#d49755]">
                Archival Investigation #{caseIdx + 1} · {currentCase.period}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#faeedd] mt-0.5">
                {currentCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#baa896] mt-1">
                <strong>Historical Mystery:</strong> {currentCase.mysteryQuestion}
              </p>
            </div>

            {/* Clues Deck */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#a99885]">
                Examine Historical Evidence (Primary Sources vs Later Myths):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentCase.clues.map((clue) => {
                  const isExamined = examinedClueId === clue.id;
                  return (
                    <button
                      key={clue.id}
                      onClick={() => setExaminedClueId(clue.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        isExamined
                          ? 'bg-[#282017] border-[#d49755] text-[#faeedd]'
                          : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#d49755]">
                        <span className="uppercase">{clue.type}</span>
                        <span>{clue.date}</span>
                      </div>
                      <div className="font-cinzel text-xs font-bold text-[#faeedd] mt-1">
                        {clue.title}
                      </div>
                      <p className="text-xs font-serif italic text-[#d6c7b6] mt-2 line-clamp-3">
                        {clue.content}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Clue Details */}
              {examinedClueId && (
                <div className="p-4 bg-[#201a14] rounded-lg border border-[#3e3428] text-xs text-[#d6c7b6] animate-fadeIn">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-[#d49755]" />
                    <span className="font-bold text-[#faeedd]">Historian's Source Analysis:</span>
                  </div>
                  <p>{currentCase.clues.find((c) => c.id === examinedClueId)?.analysis}</p>
                </div>
              )}
            </div>

            {/* Deduction Section */}
            <div className="space-y-3 pt-3 border-t border-[#2d241c]">
              <span className="text-xs font-mono uppercase text-[#a99885]">
                Draw your archival deduction:
              </span>
              {currentCase.deductionOptions.map((opt) => {
                const isSelected = selectedDeductionId === opt.id;
                return (
                  <div key={opt.id} className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedDeductionId(opt.id);
                        soundscape.playChime();
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-red-950/60 border-red-500 text-red-200'
                          : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]'
                      }`}
                    >
                      {opt.text}
                    </button>
                    {isSelected && (
                      <div className="p-3 bg-[#120f0c] rounded text-xs text-[#d6c7b6] border border-[#3e3428] animate-fadeIn">
                        {opt.historicalExplanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- GAME C: THE SALT MARCH ROUTE ---------------- */}
        {activeGame === 'salt-march' && (
          <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d241c] pb-4">
              <div>
                <span className="text-xs font-mono text-[#d49755]">
                  Day {currentStop.day} of 24 · {currentStop.date}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#faeedd]">
                  {currentStop.location}
                </h3>
              </div>
              <div className="text-xs font-mono text-[#baa896]">
                Distance Marched: {currentStop.distanceFromStartKm} km / 385 km
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {SALT_MARCH_STOPS.map((st, idx) => (
                <button
                  key={st.day}
                  onClick={() => {
                    setStopIdx(idx);
                    setRevealedAnswer(false);
                    soundscape.playChime();
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap cursor-pointer transition-colors ${
                    idx === stopIdx
                      ? 'bg-[#d49755] text-[#12100e] font-bold'
                      : 'bg-[#201a14] text-[#8a7a67] hover:text-[#d6c7b6]'
                  }`}
                >
                  Day {st.day} · {st.location.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 bg-[#201a14] rounded-lg border border-[#3e3428] space-y-2">
                  <span className="text-xs font-mono text-[#d49755] uppercase block font-semibold">
                    Milestone Dispatch:
                  </span>
                  <p className="text-xs sm:text-sm text-[#baa896] leading-relaxed">
                    {currentStop.eventDescription}
                  </p>
                </div>

                <div className="p-4 bg-[#181410] rounded-lg border-l-2 border-[#d49755] text-xs font-serif italic text-[#faeedd]">
                  "{currentStop.keyQuote}"
                </div>
              </div>

              {/* Route Challenge */}
              <div className="md:col-span-5 bg-[#201a14] border border-[#2d241c] rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#d49755] uppercase block">
                    Daily Civil Disobedience Query:
                  </span>
                  <p className="text-xs sm:text-sm text-[#faeedd] mt-1 font-semibold">
                    {currentStop.challengeQuestion}
                  </p>
                </div>

                {revealedAnswer ? (
                  <div className="p-3 bg-[#14110e] rounded text-xs text-[#d6c7b6] border border-[#3e3428] animate-fadeIn">
                    <span className="text-[#d49755] font-semibold block mb-0.5">Historical Answer:</span>
                    {currentStop.challengeAnswer}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setRevealedAnswer(true);
                      soundscape.playChime();
                    }}
                    className="w-full py-2.5 rounded bg-[#d49755] hover:bg-[#e5a863] text-[#12100e] text-xs font-cinzel font-bold transition-colors cursor-pointer"
                  >
                    Reveal Strategic Reason
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- GAME D: TRUTH OR MYTH QUIZ ---------------- */}
        {activeGame === 'quiz' && (
          <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d241c] pb-4">
              <div>
                <span className="text-xs font-mono text-[#d49755]">
                  Question {quizIdx + 1} of {TRUTH_OR_MYTH_QUESTIONS.length} · Level: {currentQuiz.difficulty}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#faeedd] mt-1">
                  {currentQuiz.question}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#a99885] block">Score</span>
                <span className="font-mono text-lg font-bold text-[#d49755]">{quizScore} pts</span>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuiz.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentQuiz.correctIndex;
                const hasAnswered = selectedOption !== null;

                let btnStyle = 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201a14]';
                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-950/60 border-red-500 text-red-200';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={hasAnswered}
                    onClick={() => {
                      setSelectedOption(oIdx);
                      if (oIdx === currentQuiz.correctIndex) {
                        setQuizScore((prev) => prev + 10);
                        soundscape.playChime();
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-colors cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="p-4 bg-[#201a14] rounded-lg border border-[#3e3428] space-y-2 animate-fadeIn text-xs text-[#d6c7b6]">
                <div>
                  <strong className="text-[#faeedd] block mb-0.5">Historical Explanation:</strong>
                  {currentQuiz.explanation}
                </div>
                <div className="font-mono text-[#d49755] text-[11px] pt-1">
                  Citation: {currentQuiz.sourceCitation}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-[#2d241c]">
              <button
                disabled={selectedOption === null}
                onClick={() => {
                  setSelectedOption(null);
                  setQuizIdx((prev) => (prev < TRUTH_OR_MYTH_QUESTIONS.length - 1 ? prev + 1 : 0));
                }}
                className="px-5 py-2 rounded bg-[#d49755] hover:bg-[#e5a863] disabled:opacity-40 text-[#12100e] text-xs font-cinzel font-bold cursor-pointer"
              >
                {quizIdx < TRUTH_OR_MYTH_QUESTIONS.length - 1 ? 'Next Question' : 'Restart Quiz'}
              </button>
            </div>
          </div>
        )}

        {/* ---------------- GAME E: DESIGN YOUR OWN PEACEFUL SOLUTION ---------------- */}
        {activeGame === 'peace-design' && (
          <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
            <div className="border-b border-[#2d241c] pb-4">
              <span className="text-xs font-mono uppercase text-[#d49755]">
                Conflict Resolution Simulation
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#faeedd] mt-0.5">
                Modern Community Dilemma: The Street Vendors' Eviction
              </h3>
              <p className="text-xs sm:text-sm text-[#baa896] mt-1 leading-relaxed">
                A commercial development agency has obtained a municipal injunction to demolish a 40-year-old fruit and vegetable open market to construct a high-rise mall, threatening the livelihoods of 200 impoverished immigrant families.
              </p>
            </div>

            {/* Multi-Stage Step Builder */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d49755]">
                <span>Phase {peaceStep} of 3</span>
                <span>·</span>
                <span>
                  {peaceStep === 1 ? 'Step 1: Fact-Finding & Human Empathy' : peaceStep === 2 ? 'Step 2: Constructive Appeal & Non-Cooperation' : 'Step 3: Negotiated Settlement & Sarvodaya'}
                </span>
              </div>

              {peaceStep === 1 && (
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-[#faeedd]">
                    How should the vendor union initiate their response?
                  </p>
                  <button
                    onClick={() => {
                      setChosenPath({ ...chosenPath, 1: 'fact-finding' });
                      setPeaceStep(2);
                      soundscape.playChime();
                    }}
                    className="w-full text-left p-4 rounded-xl bg-[#181410] hover:bg-[#201a14] border border-[#2d241c] text-xs sm:text-sm text-[#baa896] hover:text-[#faeedd] transition-colors cursor-pointer"
                  >
                    <strong>A. Gandhian Inquiry:</strong> Form an independent fact-finding committee with urban sociologists, document every family's economic contribution, and present a dignified memorandum to city council and mall developers.
                  </button>
                  <button
                    onClick={() => {
                      setChosenPath({ ...chosenPath, 1: 'clash' });
                      setPeaceStep(2);
                      soundscape.playChime();
                    }}
                    className="w-full text-left p-4 rounded-xl bg-[#181410] hover:bg-[#201a14] border border-[#2d241c] text-xs sm:text-sm text-[#baa896] hover:text-[#faeedd] transition-colors cursor-pointer"
                  >
                    <strong>B. Confrontation:</strong> Block city transit arteries with burning tires to force media sensationalism.
                  </button>
                </div>
              )}

              {peaceStep === 2 && (
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-[#faeedd]">
                    The developers refuse to speak with the committee. What is your nonviolent action?
                  </p>
                  <button
                    onClick={() => {
                      setChosenPath({ ...chosenPath, 2: 'satyagraha-vigil' });
                      setPeaceStep(3);
                      soundscape.playChime();
                    }}
                    className="w-full text-left p-4 rounded-xl bg-[#181410] hover:bg-[#201a14] border border-[#2d241c] text-xs sm:text-sm text-[#baa896] hover:text-[#faeedd] transition-colors cursor-pointer"
                  >
                    <strong>A. Silent Vigil & Cleanliness Drive:</strong> Stage a round-the-clock peaceful silent vigil outside city hall while volunteers sweep and beautify the streets, demonstrating public civic virtue and winning the hearts of local residents.
                  </button>
                  <button
                    onClick={() => {
                      setChosenPath({ ...chosenPath, 2: 'boycott' });
                      setPeaceStep(3);
                      soundscape.playChime();
                    }}
                    className="w-full text-left p-4 rounded-xl bg-[#181410] hover:bg-[#201a14] border border-[#2d241c] text-xs sm:text-sm text-[#baa896] hover:text-[#faeedd] transition-colors cursor-pointer"
                  >
                    <strong>B. Lawsuit Delay:</strong> Hire expensive litigators to delay hearings in courts while vendors run out of food money.
                  </button>
                </div>
              )}

              {peaceStep === 3 && (
                <div className="p-5 bg-[#120f0c] border border-[#3e3428] rounded-xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#d49755]">
                    <CheckCircle className="w-4 h-4" />
                    <span>Projected Outcome of Your Nonviolent Campaign:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d6c7b6] leading-relaxed">
                    By combining empirical honesty with respectful public suffering, your movement won over municipal planners. The city council enacted the <em>Historic Artisan & Vendor Heritage Zone</em>, integrating modern stall stalls into the mall's ground plaza at subsidized rent, preserving 200 family livelihoods without violence.
                  </p>
                  <div className="p-3 bg-[#1e1711] rounded border-l-2 border-[#d49755] text-xs text-[#faeedd]">
                    "Whenever you are in doubt... recall the face of the poorest person you have ever seen." — Mahatma Gandhi
                  </div>
                  <button
                    onClick={() => {
                      setPeaceStep(1);
                      setChosenPath({});
                    }}
                    className="px-4 py-2 rounded bg-[#201b15] hover:bg-[#2c241c] text-xs font-cinzel text-[#d49755] cursor-pointer"
                  >
                    Try Another Strategy
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
