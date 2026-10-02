import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  Scroll, 
  Heart, 
  Scale, 
  Feather, 
  Sun, 
  Globe2, 
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MuseumRoomId } from '../types';
import { TIMELINE_MILESTONES, ASSET_IMAGES } from '../data/museumData';
import { soundscape } from '../utils/audioSynthesizer';

interface MuseumRoomsProps {
  onSelectTab: (tab: any) => void;
}

export const MuseumRooms: React.FC<MuseumRoomsProps> = ({ onSelectTab }) => {
  const [activeRoom, setActiveRoom] = useState<MuseumRoomId>('early-years');
  const [selectedMapPoint, setSelectedMapPoint] = useState<string>('ahmedabad');
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<string>('ahimsa');
  const [selectedScenarioChoice, setSelectedScenarioChoice] = useState<string | null>(null);

  const rooms: { id: MuseumRoomId; number: string; title: string; subtitle: string }[] = [
    {
      id: 'early-years',
      number: 'Room 01',
      title: 'The Early Years',
      subtitle: 'Porbandar, London, and the South African Crucible (1869–1914)',
    },
    {
      id: 'freedom-movement',
      number: 'Room 02',
      title: 'The Freedom Movement',
      subtitle: 'Champaran, Non-Cooperation, Salt March, Quit India (1915–1947)',
    },
    {
      id: 'philosophy',
      number: 'Room 03',
      title: 'The Philosophy of Gandhi',
      subtitle: 'Ahimsa, Satyagraha, Simplicity, and Social Reform',
    },
    {
      id: 'legacy',
      number: 'Room 04',
      title: 'The Final Chapter & Global Legacy',
      subtitle: 'Independence, Partition, Martyrdom, and Enduring Debates',
    },
  ];

  // Interactive historical journey points for Room 2 Map
  const mapLocations = [
    {
      id: 'porbandar',
      name: 'Porbandar, Gujarat',
      coords: { x: 26, y: 52 },
      year: '1869',
      event: 'Birthplace & Early Childhood',
      description: 'The ancient coastal port where Mohandas was born in a three-storey limestone house. Influenced by his mother Putlibai’s Vaishnava piety and local Jain asceticism.',
      quote: 'Truth has been my sole companion from childhood.',
    },
    {
      id: 'london',
      name: 'London, England',
      coords: { x: 18, y: 22 },
      year: '1888–1891',
      event: 'Inner Temple & Moral Awakenings',
      description: 'Studied British jurisprudence at the Inner Temple. Read the Bhagavad Gita and the Sermon on the Mount, anchoring his lifelong synthesis of world faiths.',
      quote: 'The Sermon on the Mount went straight to my heart.',
    },
    {
      id: 'south-africa',
      name: 'Natal & Transvaal, South Africa',
      coords: { x: 38, y: 78 },
      year: '1893–1914',
      event: 'The Pietermaritzburg Turning Point & Satyagraha',
      description: 'Spent 21 years fighting anti-Asiatic discriminatory laws. Founded Phoenix Settlement and Tolstoy Farm; launched the first mass Satyagraha in 1906.',
      quote: 'My active life began in South Africa. The crucible of nonviolence.',
    },
    {
      id: 'champaran',
      name: 'Champaran, Bihar',
      coords: { x: 74, y: 44 },
      year: '1917',
      event: 'Indigo Sharecroppers’ Satyagraha',
      description: 'First successful nonviolent confrontation with colonial planters on Indian soil, abolishing the oppressive Tinkathia tenancy system.',
      quote: 'Not British power, but Truth and human dignity were the arbiters.',
    },
    {
      id: 'ahmedabad',
      name: 'Sabarmati Ashram, Ahmedabad',
      coords: { x: 32, y: 48 },
      year: '1917–1930',
      event: 'The Headquarters of Nonviolent Revolution',
      description: 'Gandhi’s laboratory of constructive work: spinning khadi, communal harmony, removal of untouchability, and the departure point for the Salt March.',
      quote: 'If the village perishes, India will perish too.',
    },
    {
      id: 'dandi',
      name: 'Dandi Beach, Navsari',
      coords: { x: 33, y: 56 },
      year: '1930',
      event: 'The Great Salt Satyagraha',
      description: 'Destination of the 240-mile trek where Gandhi lifted natural salt from the mudflats, symbolically breaking the monopoly of the British Empire.',
      quote: 'With this, I am shaking the foundations of the British Empire.',
    },
    {
      id: 'delhi',
      name: 'New Delhi & Calcutta',
      coords: { x: 48, y: 38 },
      year: '1947–1948',
      event: 'Independence, Fasting for Peace & Martyrdom',
      description: 'Spent Independence Day 1947 in Calcutta stopping communal rioting. Martyred at Birla House, New Delhi on January 30, 1948, murmuring "Hey Ram".',
      quote: 'My life is my message.',
    },
  ];

  // Philosophy concepts for Room 3
  const philosophyItems = [
    {
      id: 'ahimsa',
      name: 'Ahimsa (Nonviolence)',
      sanskrit: 'अहिंसा',
      principle: 'Universal Compassion & Soul-Force',
      description: 'Not merely the passive absence of physical harm, but active love and goodwill towards all sentient beings, even one’s adversary. It refuses to inflict suffering, choosing instead to bear suffering willingly to awaken the wrongdoer’s moral conscience.',
      historicalExample: 'In 1922, when violence erupted at Chauri Chaura, Gandhi shocked his political colleagues by abruptly calling off the nationwide Non-Cooperation Movement, declaring that victory achieved through bloodshed would only birth a violent tyranny.',
      modernScenario: {
        title: 'Workplace Bullying & Whistleblowing',
        situation: 'A senior executive routinely humiliates subordinate workers and falsifies audit records. You possess proof of the malfeasance.',
        approaches: [
          {
            id: 'retaliation',
            label: 'Retaliatory sabotage: Anonymously leak malicious personal rumors about the executive to ruin their reputation.',
            verdict: 'Violates Ahimsa. Malice and vengeance cloud the moral issue and lower you to the level of the wrongdoer.',
          },
          {
            id: 'passive',
            label: 'Silent submission: Remain quiet out of fear of losing your promotion.',
            verdict: 'Cowardice is not nonviolence. Gandhi wrote: "Where there is only a choice between cowardice and violence, I would advise violence... but nonviolence is infinitely superior to violence."',
          },
          {
            id: 'gandhian',
            label: 'Satyagrahic Transparency: Present the factual audit records directly to the oversight board and authorities with calm firmness, accepting any personal consequences with composure and without hatred.',
            verdict: 'True Ahimsa. Combines fearless moral truth with absence of personal animosity, forcing structural accountability.',
          },
        ],
      },
    },
    {
      id: 'satyagraha',
      name: 'Satyagraha (Truth-Force)',
      sanskrit: 'सत्याग्रह',
      principle: 'Holding Fast to Truth without Malice',
      description: 'Coined in 1906 in Johannesburg. Satya means Truth; Agraha means firmness. A satyagrahi views truth not as a rigid dogma to bludgeon others with, but as an ever-deepening ethical commitment discovered through humility and service.',
      historicalExample: 'The 1930 Salt March: Gandhi informed the Viceroy Lord Irwin in an open, courteous letter 10 days before commencing the march, rejecting secrecy as the weapon of cowards and giving the opponent full notice to act justly.',
      modernScenario: {
        title: 'Environmental Defense in a Coastal Village',
        situation: 'An industrial conglomerate begins dumping toxic effluent into a community fishing estuary, citing a permit obtained through political corruption.',
        approaches: [
          {
            id: 'violence',
            label: 'Night-time sabotage: Destroy company machinery and pipeline infrastructure under cover of darkness.',
            verdict: 'Destruction of property invites immediate police crackdowns, discredits the fishing families, and deflects attention from the ecological crime.',
          },
          {
            id: 'gandhian',
            label: 'Civil Non-Cooperation: Form an open, peaceful human cordon on the beach, invite independent water scientists, document the contamination publicly, and refuse to clear the shoreline until the toxic outflow ceases.',
            verdict: 'Exemplifies Satyagraha. The open, dignified sacrifice of the community exposes the ecological violence to global scrutiny and compels legal remediation.',
          },
        ],
      },
    },
    {
      id: 'swadeshi',
      name: 'Swadeshi & Sarvodaya',
      sanskrit: 'स्वदेशी एवं सर्वोदय',
      principle: 'Economic Self-Reliance & Welfare of All',
      description: 'Swadeshi is the spirit that requires us to serve and use the things produced by our immediate neighbors before reaching for far-off luxuries. The Charkha (spinning wheel) was Gandhi’s physical instrument to unite rich and poor in productive manual labor.',
      historicalExample: 'Boycotting imported Lancashire cotton fabrics in the 1920s and reviving home-spun Khadi, empowering millions of rural women and weavers who had been reduced to destitution by colonial industrial monopolies.',
      modernScenario: {
        title: 'Mindful Consumption & Local Economies',
        situation: 'Global fast-fashion companies rely on exploitative sweatshop labor and generate mountains of synthetic landfill waste.',
        approaches: [
          {
            id: 'gandhian',
            label: 'Modern Swadeshi: Buy durable clothing from local artisan cooperatives, mend and recycle garments, and adopt voluntary simplicity ("Live simply so that others may simply live").',
            verdict: 'Aligns directly with Gandhian Sarvodaya, reducing ecological strain while uplifting human artisan dignity.',
          },
        ],
      },
    },
    {
      id: 'social-reform',
      name: 'Social Reform & Equality',
      sanskrit: 'समानता एवं सुधार',
      principle: 'Eradication of Untouchability & Communal Harmony',
      description: 'Gandhi called untouchability the greatest blot on Hinduism and renamed the marginalized communities "Harijans" (Children of God). He insisted that political Swaraj (self-rule) was meaningless without moral self-purification and equal respect for all religious traditions.',
      historicalExample: 'In 1932, while imprisoned in Yerwada Jail, Gandhi undertook an epic fast-unto-death against the British Communal Award that sought to permanently separate Dalits from the Hindu electorate, culminating in the Poona Pact with Dr. B.R. Ambedkar.',
      modernScenario: {
        title: 'Community Integration and Religious Tolerance',
        situation: 'Tensions flare in a multi-ethnic neighborhood over the construction of a place of worship.',
        approaches: [
          {
            id: 'gandhian',
            label: 'Interfaith Fellowship: Organize shared community meals, open neighborhood dialogues, and mutual volunteer efforts to build personal relationships before misunderstandings harden.',
            verdict: 'Reflects Gandhi’s interfaith prayer meetings where verses from the Gita, Quran, Bible, and Zend-Avesta were recited together daily.',
          },
        ],
      },
    },
  ];

  const currentPhilosophy = philosophyItems.find((p) => p.id === activePhilosophyTab) || philosophyItems[0];
  const currentMapData = mapLocations.find((m) => m.id === selectedMapPoint) || mapLocations[4];

  return (
    <div className="min-h-screen bg-[#14110e] text-[#e8dfd1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Curatorial Header */}
        <div className="border-b border-[#2d241c] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
              Virtual Exhibition · Historical Galleries
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[#faeedd] mt-1">
              THE HISTORICAL ARCHIVES
            </h2>
            <p className="font-serif italic text-base text-[#baa896] mt-1">
              Curated documents, maps, and philosophical explorations of a transformative life.
            </p>
          </div>

          {/* Quick link to other spaces */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('conversation')}
              className="px-3 py-1.5 rounded bg-[#201b15] hover:bg-[#2c241c] border border-[#3e3428] text-xs text-[#d49755] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Talk to Gandhi AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectTab('games')}
              className="px-3 py-1.5 rounded bg-[#201b15] hover:bg-[#2c241c] border border-[#3e3428] text-xs text-[#d49755] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore Challenges</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Room Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {rooms.map((room) => {
            const isActive = activeRoom === room.id;
            return (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoom(room.id);
                  soundscape.playChime();
                }}
                className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#221b14] border-[#d49755] shadow-md ring-1 ring-[#d49755]/30'
                    : 'bg-[#181410] border-[#2d241c] hover:border-[#423528] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="text-[11px] font-mono tracking-widest uppercase text-[#d49755]">
                  {room.number}
                </div>
                <div className="font-cinzel text-base font-bold text-[#faeedd] mt-0.5">
                  {room.title}
                </div>
                <div className="text-xs text-[#baa896] mt-1 line-clamp-1">
                  {room.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* ROOM 1: THE EARLY YEARS */}
        {activeRoom === 'early-years' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lead Story Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
                  1869 – 1914 · Foundational Years
                </span>
                <h3 className="font-cinzel text-2xl lg:text-3xl font-bold text-[#faeedd]">
                  From Porbandar to Pretoria: The Making of the Mahatma
                </h3>
                <p className="font-serif text-base text-[#d6c7b6] leading-relaxed">
                  Before he was reverently called the <em>Mahatma</em> ("Great Soul"), Mohandas Gandhi was a shy, nervous boy from coastal Gujarat who froze with stage fright during his first courtroom appearance in Bombay.
                </p>
                <p className="text-sm text-[#baa896] leading-relaxed">
                  His transformation began not in India, but in South Africa. In May 1893, hired by an Indian merchant firm for a commercial lawsuit, the 23-year-old barrister arrived in Durban. Within a week, on a journey to Pretoria, he was forcibly ejected from a first-class carriage at Pietermaritzburg simply because a European passenger objected to sharing space with an Indian.
                </p>
                <div className="p-4 rounded-lg bg-[#241d16] border-l-4 border-[#d49755] text-sm italic font-serif text-[#faeedd]">
                  "The cold was bitter. My overcoat was in my luggage, but I did not dare to ask for it lest I should be insulted again. I began to think of my duty... Should I fight for my rights or go back to India?"
                  <span className="block not-italic font-mono text-xs text-[#a99885] mt-1">
                    — The Story of My Experiments with Truth
                  </span>
                </div>
              </div>

              {/* Archival Visual Column */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#3e3428]">
                  <img
                    src={ASSET_IMAGES.sabarmatiAshram}
                    alt="Sabarmati Historic Sanctuary"
                    className="w-full h-full object-cover filter sepia-[0.4] brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#12100e]/80 backdrop-blur-sm p-2 rounded text-[11px] font-mono text-[#d6c7b6]">
                    Fig 1.1 · The Ashram Ideal: Simplicity, Community & Moral Courage
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#201a14] rounded border border-[#2d241c]">
                    <span className="font-bold text-[#faeedd] block">Inner Temple, London</span>
                    <span className="text-[#a99885] mt-0.5 block">Called to the Bar in 1891; studied Roman law, vegetarianism & comparative religion.</span>
                  </div>
                  <div className="p-3 bg-[#201a14] rounded border border-[#2d241c]">
                    <span className="font-bold text-[#faeedd] block">Tolstoy Farm (1910)</span>
                    <span className="text-[#a99885] mt-0.5 block">1,100-acre commune near Johannesburg where satyagrahis lived on self-grown bread and manual labor.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Early Years Chronology Rail */}
            <div className="bg-[#181410] border border-[#2d241c] rounded-xl p-6">
              <h4 className="font-cinzel text-lg font-bold text-[#faeedd] mb-4 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-[#d49755]" />
                Early Milestones Timeline (1869–1914)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TIMELINE_MILESTONES.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-[#201b15] border border-[#2d241c] rounded-lg hover:border-[#423528] transition-colors"
                  >
                    <div className="text-xs font-mono text-[#d49755] font-semibold">
                      {m.year} · {m.location}
                    </div>
                    <div className="font-cinzel text-base font-bold text-[#faeedd] mt-1">
                      {m.title}
                    </div>
                    <div className="text-xs text-[#baa896] mt-2 line-clamp-3 leading-relaxed">
                      {m.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROOM 2: THE FREEDOM MOVEMENT */}
        {activeRoom === 'freedom-movement' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Cinematic Interactive Map of Historical Journeys */}
            <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
                    Interactive Cartography
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-[#faeedd]">
                    Geographies of Nonviolence: Gandhi's Epic Journeys
                  </h3>
                  <p className="text-xs text-[#baa896] mt-0.5">
                    Click any historical location to examine the events, archival records, and quotes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#a99885]">Selected Epoch:</span>
                  <span className="px-2.5 py-1 bg-[#282017] border border-[#3e3428] rounded text-xs font-mono text-[#d49755]">
                    {currentMapData.year}
                  </span>
                </div>
              </div>

              {/* Map Canvas and Data Panel Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Cartographic Map Canvas */}
                <div className="lg:col-span-7 relative aspect-[16/10] bg-[#120f0c] border border-[#3e3428] rounded-xl p-4 overflow-hidden shadow-inner flex flex-col justify-between">
                  {/* Subtle parchment coordinates grid background */}
                  <div className="absolute inset-0 bg-parchment-dark opacity-30 pointer-events-none" />

                  {/* Stylized Historical Map Nodes */}
                  <div className="relative z-10 w-full h-full">
                    {/* Decorative Map Title */}
                    <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-widest text-[#7a6b5a]">
                      Cartographic Projection · Indian Freedom Struggle (1915–1948)
                    </div>

                    {/* Connecting Historical Route Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path
                        d="M 26% 52% Q 29% 50% 32% 48% T 33% 56% M 32% 48% Q 53% 46% 74% 44% M 74% 44% Q 61% 41% 48% 38%"
                        fill="none"
                        stroke="#5c4a36"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    {/* Interactive Marker Pins */}
                    {mapLocations.map((loc) => {
                      const isSelected = selectedMapPoint === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => {
                            setSelectedMapPoint(loc.id);
                            soundscape.playChime();
                          }}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer transition-all z-20 ${
                            isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                          }`}
                          style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-lg transition-colors ${
                              isSelected
                                ? 'bg-[#d49755] border-white text-[#12100e] ring-4 ring-[#d49755]/30'
                                : 'bg-[#291f16] border-[#8a7258] text-[#e8dfd1] hover:bg-[#3d2f23]'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={`absolute top-7 left-1/2 -translate-x-1/2 text-[11px] whitespace-nowrap font-cinzel font-semibold px-2 py-0.5 rounded shadow ${
                              isSelected
                                ? 'bg-[#d49755] text-[#12100e]'
                                : 'bg-[#181410]/90 text-[#baa896] group-hover:text-[#faeedd]'
                            }`}
                          >
                            {loc.name.split(',')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative z-10 text-[10px] font-mono text-[#8a7a67] flex items-center justify-between border-t border-[#261f18] pt-2">
                    <span>ARCHIVAL GEO-INDEX: GUJARAT · BIHAR · MAHARASHTRA · TRANSVAAL</span>
                    <span>SCALE: CONTINENTAL IMPACT</span>
                  </div>
                </div>

                {/* Selected Location Card */}
                <div className="lg:col-span-5 bg-[#201b15] border border-[#2d241c] rounded-xl p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#d49755]">
                        {currentMapData.year}
                      </span>
                      <span className="text-[11px] font-mono text-[#8a7a67] uppercase">
                        {currentMapData.name}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-xl font-bold text-[#faeedd]">
                      {currentMapData.event}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#baa896] leading-relaxed">
                      {currentMapData.description}
                    </p>

                    <div className="p-3 bg-[#181410] rounded border-l-2 border-[#d49755] text-xs italic font-serif text-[#d6c7b6]">
                      "{currentMapData.quote}"
                    </div>
                  </div>

                  {/* Contextual Action Button */}
                  <div className="mt-4 pt-3 border-t border-[#2d241c]">
                    <button
                      onClick={() => onSelectTab('games')}
                      className="w-full py-2 bg-[#2d2319] hover:bg-[#3a2e21] text-[#e8dfd1] rounded text-xs font-cinzel font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#d49755]" />
                      <span>Play the Salt March Challenge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Feature: Salt March and Charkha Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#181410] border border-[#2d241c] rounded-xl overflow-hidden flex flex-col">
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={ASSET_IMAGES.saltMarch}
                    alt="The Salt March to Dandi"
                    className="w-full h-full object-cover filter sepia-[0.35]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181410] via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-mono text-[#d49755]">April 6, 1930</span>
                    <h4 className="font-cinzel text-lg font-bold text-[#faeedd] mt-0.5">
                      The Dandi Salt Satyagraha
                    </h4>
                    <p className="text-xs text-[#baa896] leading-relaxed mt-1">
                      Gandhi marched 240 miles on foot with 78 chosen ashram volunteers. Lifting a handful of untaxed sea salt at Dandi, he ignited a nationwide defiance of colonial laws that filled every prison in British India.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTab('games')}
                    className="text-xs text-[#d49755] hover:underline font-semibold flex items-center gap-1 self-start"
                  >
                    <span>Inspect Step-by-Step Route</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="bg-[#181410] border border-[#2d241c] rounded-xl overflow-hidden flex flex-col">
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={ASSET_IMAGES.spinningCharkha}
                    alt="Gandhi spinning on the Charkha"
                    className="w-full h-full object-cover filter sepia-[0.35]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181410] via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-mono text-[#d49755]">Constructive Programme</span>
                    <h4 className="font-cinzel text-lg font-bold text-[#faeedd] mt-0.5">
                      The Spinning Wheel (Charkha) as Moral Weapon
                    </h4>
                    <p className="text-xs text-[#baa896] leading-relaxed mt-1">
                      Gandhi saw political protests without constructive social uplift as empty. Spinning daily thread was his spiritual meditation and economic remedy for mass rural poverty.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTab('portrait')}
                    className="text-xs text-[#d49755] hover:underline font-semibold flex items-center gap-1 self-start"
                  >
                    <span>Examine 3D Living Artifacts</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM 3: THE PHILOSOPHY OF GANDHI */}
        {activeRoom === 'philosophy' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Concept Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#2d241c] pb-4">
              {philosophyItems.map((item) => {
                const isActive = activePhilosophyTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePhilosophyTab(item.id);
                      setSelectedScenarioChoice(null);
                      soundscape.playChime();
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-cinzel font-semibold tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#d49755] text-[#12100e] shadow'
                        : 'bg-[#1b1713] text-[#baa896] hover:text-[#faeedd] border border-[#2d241c]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Active Philosophy Deep-Dive Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8">
              {/* Concept Overview */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#d49755]">
                    {currentPhilosophy.sanskrit}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#a99885]">
                    {currentPhilosophy.principle}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#faeedd]">
                  {currentPhilosophy.name}
                </h3>

                <p className="font-serif text-base text-[#d6c7b6] leading-relaxed">
                  {currentPhilosophy.description}
                </p>

                <div className="p-4 rounded-lg bg-[#201b15] border border-[#3e3428] space-y-2">
                  <span className="text-xs font-mono text-[#d49755] uppercase block font-semibold">
                    Documented Historical Application:
                  </span>
                  <p className="text-xs sm:text-sm text-[#baa896] leading-relaxed">
                    {currentPhilosophy.historicalExample}
                  </p>
                </div>
              </div>

              {/* Interactive Scenario Exploration Box */}
              <div className="lg:col-span-5 bg-[#201b15] border border-[#2d241c] rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#d49755] uppercase">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Real-World Ethical Laboratory</span>
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-[#faeedd] mt-1">
                    {currentPhilosophy.modernScenario.title}
                  </h4>
                  <p className="text-xs text-[#baa896] mt-2 leading-relaxed bg-[#181410] p-3 rounded border border-[#2d241c]">
                    {currentPhilosophy.modernScenario.situation}
                  </p>
                </div>

                {/* Scenario Choices */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-[#a99885]">
                    Evaluate possible responses:
                  </span>
                  {currentPhilosophy.modernScenario.approaches.map((appr) => {
                    const isSelected = selectedScenarioChoice === appr.id;
                    return (
                      <div key={appr.id} className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedScenarioChoice(appr.id);
                            soundscape.playChime();
                          }}
                          className={`w-full text-left p-2.5 rounded text-xs transition-colors border cursor-pointer ${
                            isSelected
                              ? 'bg-[#2b2118] border-[#d49755] text-[#faeedd]'
                              : 'bg-[#181410] border-[#2d241c] text-[#baa896] hover:bg-[#201b15]'
                          }`}
                        >
                          {appr.label}
                        </button>
                        {isSelected && (
                          <div className="p-3 bg-[#14110e] rounded text-xs text-[#d6c7b6] border-l-2 border-[#d49755] animate-fadeIn">
                            <span className="font-semibold text-[#d49755] block">Philosophical Verdict:</span>
                            {appr.verdict}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM 4: THE FINAL CHAPTER & LEGACY */}
        {activeRoom === 'legacy' && (
          <div className="space-y-8 animate-fadeIn">
            {/* The Calamity of Partition & Independence */}
            <div className="bg-[#1a1612] border border-[#2d241c] rounded-xl p-6 lg:p-8 space-y-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d49755]">
                  August 1947 – January 1948 · The Final Ordeal
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#faeedd]">
                  The "One-Man Boundary Force" & Martyrdom
                </h3>
                <p className="font-serif text-base text-[#d6c7b6] leading-relaxed">
                  On August 15, 1947, as independent India was born, Gandhi was absent from the jubilant parades in New Delhi. Instead, he lived in a modest Muslim-owned mansion in riot-torn Calcutta (Hydari Mansion in Beliaghata), fasting to death to quell the communal frenzy that consumed Bengal.
                </p>
                <p className="text-sm text-[#baa896] leading-relaxed">
                  His moral presence achieved a miracle that armed garrisons could not: rioters surrendered their weapons at his feet. British Viceroy Lord Mountbatten famously observed: <em>"In the Punjab we have 55,000 soldiers, and large-scale rioting on our hands. In Bengal our force consists of one man, and there is no rioting. As a serving officer, may I tender my tribute to my One-Man Boundary Force."</em>
                </p>
              </div>

              {/* Sensitively Presented Martyrdom Box */}
              <div className="p-5 rounded-lg bg-[#221b15] border-l-4 border-[#c27b38] space-y-2">
                <h4 className="font-cinzel text-base font-bold text-[#faeedd]">
                  January 30, 1948: Birla House, New Delhi
                </h4>
                <p className="text-xs sm:text-sm text-[#d6c7b6] leading-relaxed">
                  Walking to his daily multi-faith prayer gathering at 5:17 PM, supported on the shoulders of his grandnieces Manu and Abha, Gandhi was confronted by a fanatic who bowed respectfully before firing three bullets into his chest. Gandhi collapsed with his hands raised in prayer, murmuring his final invocation of God: <em>"Hey Ram."</em>
                </p>
                <span className="font-mono text-xs text-[#a99885] block pt-1">
                  Source: Eyewitness testimonies of Manu Gandhi & Pyarelal Nayyar, Mahatma Gandhi: The Last Phase (1958)
                </span>
              </div>
            </div>

            {/* Global Tributes & Enduring Debates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Global Impact */}
              <div className="bg-[#181410] border border-[#2d241c] rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d49755] uppercase">
                  <Globe2 className="w-4 h-4" />
                  <span>Global Lineage of Nonviolent Struggle</span>
                </div>
                <h4 className="font-cinzel text-lg font-bold text-[#faeedd]">
                  From Montgomery to Cape Town
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-[#baa896]">
                  <p>
                    <strong className="text-[#faeedd]">Dr. Martin Luther King Jr.:</strong> "Christ gave us the goals and Mahatma Gandhi gave us the tactics. Gandhi was probably the first person in history to lift the love ethic of Jesus above a mere interaction between individuals to a powerful and effective social force on a large scale."
                  </p>
                  <p>
                    <strong className="text-[#faeedd]">Albert Einstein:</strong> "Generations to come will scarce believe that such a one as this ever in flesh and blood walked upon this earth."
                  </p>
                  <p>
                    <strong className="text-[#faeedd]">Nelson Mandela:</strong> "Gandhi’s magnificent example of personal sacrifice and dedication in the face of oppression inspired us in our darkest hours."
                  </p>
                </div>
              </div>

              {/* Scholarly Debates & Critical Rigor */}
              <div className="bg-[#181410] border border-[#2d241c] rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d49755] uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>Documented Facts vs Interpretations</span>
                </div>
                <h4 className="font-cinzel text-lg font-bold text-[#faeedd]">
                  Historical Nuance & Continuing Debates
                </h4>
                <div className="space-y-3 text-xs text-[#baa896] leading-relaxed">
                  <div>
                    <span className="text-[#faeedd] font-semibold block">1. Early Writings in South Africa:</span>
                    Modern scholarship honestly highlights that in his 20s, Gandhi shared certain racial preconceptions of the late Victorian era regarding native Africans, views he explicitly repudiated in his later decades as his universal humanism matured.
                  </div>
                  <div>
                    <span className="text-[#faeedd] font-semibold block">2. Debate with Dr. B.R. Ambedkar:</span>
                    Ambedkar passionately championed legal separation and constitutional rights for Dalits, whereas Gandhi advocated moral reform within Hindu society and fasted against separate electorates in 1932, leading to the historic Poona Pact.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
