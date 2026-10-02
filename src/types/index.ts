export type NavigationTab = 
  | 'opening'
  | 'museum'
  | 'portrait'
  | 'conversation'
  | 'audio'
  | 'games'
  | 'studio'
  | 'timeline'
  | 'tribute'
  | 'ending';

export type MuseumRoomId = 'early-years' | 'freedom-movement' | 'philosophy' | 'legacy';

export interface TimelineMilestone {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  location: string;
  era: 'early' | 'south-africa' | 'freedom' | 'independence';
  summary: string;
  details: string;
  quote?: {
    text: string;
    source: string;
  };
  image?: string;
  significance: string;
}

export interface ArchivalSpeech {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  description: string;
  historicalContext: string;
  sourceCredit: string;
  transcript: string;
  sampleWaveform: number[];
  audioNarrativeSummary: string;
}

export interface SatyagrahaScenario {
  id: string;
  title: string;
  year: number;
  location: string;
  background: string;
  dilemma: string;
  choices: {
    id: string;
    label: string;
    strategy: 'violence' | 'submission' | 'satyagraha';
    immediateConsequence: string;
    longTermOutcome: string;
    gandhianPrinciple: string;
    historicalReality: string;
  }[];
}

export interface DetectiveCase {
  id: string;
  title: string;
  period: string;
  mysteryQuestion: string;
  clues: {
    id: string;
    type: 'letter' | 'telegram' | 'newspaper' | 'photograph';
    title: string;
    date: string;
    content: string;
    isPrimarySource: boolean;
    analysis: string;
  }[];
  deductionOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
    historicalExplanation: string;
  }[];
}

export interface SaltMarchStop {
  day: number;
  date: string;
  location: string;
  distanceFromStartKm: number;
  highlight: string;
  eventDescription: string;
  keyQuote: string;
  challengeQuestion: string;
  challengeAnswer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceCitation: string;
  difficulty: 'Apprentice' | 'Researcher' | 'Scholar';
}

export interface Reflection {
  id: string;
  author: string;
  location: string;
  theme: 'peace' | 'truth' | 'courage' | 'humanity' | 'simplicity';
  message: string;
  timestamp: string;
}
