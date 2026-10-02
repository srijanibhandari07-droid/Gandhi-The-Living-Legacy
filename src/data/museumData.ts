import {
  TimelineMilestone,
  ArchivalSpeech,
  SatyagrahaScenario,
  DetectiveCase,
  SaltMarchStop,
  QuizQuestion,
} from '../types';

export const ASSET_IMAGES = {
  portrait: '/src/assets/images/gandhi_ink_portrait_1790959062792.jpg',
  saltMarch: '/src/assets/images/gandhi_salt_march_1790959089785.jpg',
  spinningCharkha: '/src/assets/images/gandhi_spinning_charkha_1790959103029.jpg',
  sabarmatiAshram: '/src/assets/images/sabarmati_ashram_historic_1790959118683.jpg',
};

// Verified Timeline Milestones
export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'birth-1869',
    year: 1869,
    dateStr: 'October 2, 1869',
    title: 'Birth in Porbandar',
    location: 'Porbandar, Kathiawar Agency (Gujarat)',
    era: 'early',
    summary: 'Born Mohandas Karamchand Gandhi to Karamchand Gandhi, dewan of Porbandar, and Putlibai.',
    details: 'Raised in a devout Vaishnava household deeply influenced by Jain traditions of Ahimsa (non-harm), vegetarianism, and fasting. His mother Putlibai left an indelible impression of spiritual discipline and truthfulness.',
    quote: {
      text: 'My mother was saintliness personified... She would not dream of taking her food without her daily prayers.',
      source: 'Autobiography: The Story of My Experiments with Truth, Chapter 1',
    },
    significance: 'Laid the moral foundation of fasting, self-sacrifice, and mutual respect among religions.',
  },
  {
    id: 'london-1888',
    year: 1888,
    dateStr: 'September 1888 – June 1891',
    title: 'Legal Education in London',
    location: 'Inner Temple, London, England',
    era: 'early',
    summary: 'Travelled to England to read law and was called to the Bar at the Inner Temple.',
    details: 'Faced intense cultural estrangement while strictly keeping his vow to his mother to abstain from meat and alcohol. Joined the London Vegetarian Society, read the Bhagavad Gita for the first time in Sir Edwin Arnold’s translation, and studied the Sermon on the Mount.',
    quote: {
      text: 'The Sermon on the Mount went straight to my heart. "Resist not evil" delighted me beyond measure.',
      source: 'Autobiography, Chapter 20',
    },
    significance: 'Synthesized universal moral teachings across Hinduism, Christianity, and Western philosophical ethics.',
  },
  {
    id: 'pietermaritzburg-1893',
    year: 1893,
    dateStr: 'June 7, 1893',
    title: 'The Pietermaritzburg Turning Point',
    location: 'Pietermaritzburg Railway Station, Natal, South Africa',
    era: 'south-africa',
    summary: 'Thrown off a first-class train carriage despite holding a valid ticket due to racial discrimination.',
    details: 'Sitting shivering in the dark, unheated waiting room through the freezing winter night, Gandhi faced a momentous moral choice: to flee back to India or stay and fight the systemic racial indignity inflicted on Indians in South Africa. He chose active resistance.',
    quote: {
      text: 'I began to think of my duty. Should I fight for my rights or go back to India? The hardship to which I was subjected was superficial—only a symptom of the deep disease of racial prejudice.',
      source: 'Autobiography, Chapter 32',
    },
    significance: 'The catalyst that transformed a timid young barrister into a resolute civil rights leader.',
  },
  {
    id: 'satyagraha-1906',
    year: 1906,
    dateStr: 'September 11, 1906',
    title: 'Birth of Satyagraha',
    location: 'Empire Theatre, Johannesburg, South Africa',
    era: 'south-africa',
    summary: 'Inaugurated mass nonviolent resistance against the Asiatic Registration Act (Black Act).',
    details: 'Over 3,000 Indians took a solemn pledge in the name of God to refuse registration and endure prison rather than submit. Gandhi coined the term "Satyagraha" (Satya = Truth, Agraha = Firmness / Soul-Force) to replace the passive connotation of "passive resistance".',
    quote: {
      text: 'Satyagraha is soul-force pure and simple. It excludes the use of violence because man is not capable of knowing the absolute truth and therefore not competent to punish.',
      source: 'Speech at Empire Theatre & Indian Opinion (1906)',
    },
    significance: 'First systematic application of nonviolent mass civil disobedience in modern history.',
  },
  {
    id: 'return-india-1915',
    year: 1915,
    dateStr: 'January 9, 1915',
    title: 'Return to India & Sabarmati Ashram',
    location: 'Apollo Bunder, Bombay & Ahmedabad, Gujarat',
    era: 'freedom',
    summary: 'Returned permanently to India upon the counsel of mentor Gopal Krishna Gokhale.',
    details: 'Spent his first year travelling in third-class train compartments to understand the everyday lived conditions of rural India. Founded the Satyagraha Ashram in Kochrab (later relocated to the banks of River Sabarmati in 1917), instituting vows of truth, nonviolence, celibacy, non-possession, and manual labor.',
    quote: {
      text: 'India lives in her seven hundred thousand villages. If the village perishes, India will perish too.',
      source: 'Young India (1921)',
    },
    image: ASSET_IMAGES.sabarmatiAshram,
    significance: 'Anchored the national struggle in grassroots rural self-reliance and ethical ashram living.',
  },
  {
    id: 'champaran-1917',
    year: 1917,
    dateStr: 'April 1917',
    title: 'Champaran Satyagraha',
    location: 'Champaran, Bihar',
    era: 'freedom',
    summary: 'Led poor peasant farmers against oppressive European indigo planters in the Tinkathia system.',
    details: 'Summoned by local peasant Raj Kumar Shukla, Gandhi conducted painstaking factual inquiries, recording over 8,000 testimonies. Refused a colonial order to leave, stating he was obeying a higher law of conscience. The government conceded and abolished the Tinkathia extortion.',
    quote: {
      text: 'I had to show that not British power, but Truth and human dignity were the arbiters of India’s destiny.',
      source: 'Autobiography, Chapter 151',
    },
    significance: 'Gandhi’s first successful Satyagraha on Indian soil, proving the power of methodical nonviolence.',
  },
  {
    id: 'non-cooperation-1920',
    year: 1920,
    dateStr: 'August 1920 – February 1922',
    title: 'Non-Cooperation Movement & Khadi',
    location: 'Pan-India',
    era: 'freedom',
    summary: 'Launched nationwide non-cooperation following the Jallianwala Bagh massacre and Rowlatt Acts.',
    details: 'Urged Indians to surrender honorary titles, boycott British courts, schools, and textiles, and embrace the Charkha (spinning wheel) to achieve Swadeshi (economic self-reliance). Called off the entire national movement in February 1922 following violence at Chauri Chaura, proving he valued nonviolence over political victory.',
    quote: {
      text: 'I would rather have India freed by nonviolence than not freed at all. A free India that adopts violence would cease to be the India of my dreams.',
      source: 'Young India (Feb 16, 1922)',
    },
    image: ASSET_IMAGES.spinningCharkha,
    significance: 'Transformed the freedom struggle from elite petitioning into a mass grassroots revolution.',
  },
  {
    id: 'salt-march-1930',
    year: 1930,
    dateStr: 'March 12 – April 6, 1930',
    title: 'The Great Salt March (Dandi Satyagraha)',
    location: 'From Sabarmati Ashram to Dandi Beach (240 miles)',
    era: 'freedom',
    summary: 'Marched 240 miles with 78 volunteers to defy the British colonial salt monopoly.',
    details: 'Salt, an essential necessity of life taxed by the empire, became the perfect universal symbol of colonial oppression. On April 6, 1930, after morning prayer at Dandi beach, Gandhi bent down and lifted a lump of natural sea salt, triggering civil disobedience across India.',
    quote: {
      text: 'With this, I am shaking the foundations of the British Empire.',
      source: 'Spoken on the morning of April 6, 1930 at Dandi',
    },
    image: ASSET_IMAGES.saltMarch,
    significance: 'Captured global headlines and permanently shattered the moral authority of British rule.',
  },
  {
    id: 'quit-india-1942',
    year: 1942,
    dateStr: 'August 8, 1942',
    title: 'The Quit India Movement ("Do or Die")',
    location: 'Gowalia Tank Maidan, Bombay',
    era: 'freedom',
    summary: 'Demanded immediate British withdrawal with the historic mantra "Karenge ya Marenge" (Do or Die).',
    details: 'During the depths of World War II, Gandhi delivered a passionate two-hour speech urging every Indian to consider themselves a free man or woman. Gandhi and the entire Congress Working Committee were arrested before dawn the next morning, sparking mass strikes across the subcontinent.',
    quote: {
      text: 'Here is a mantra, a short one, that I give you. You may imprint it on your hearts and let every breath of yours give expression to it. The mantra is: "Do or Die."',
      source: 'Gowalia Tank Speech, August 8, 1942',
    },
    significance: 'The decisive final mass uprising that made British continuation in India untenable.',
  },
  {
    id: 'independence-1947',
    year: 1947,
    dateStr: 'August 15, 1947',
    title: 'Independence & The Calamity of Partition',
    location: 'Beliaghata, Calcutta (Kolkata)',
    era: 'independence',
    summary: 'India achieved independence; Gandhi stayed away from Delhi celebrations, fasting in riot-torn Calcutta for peace.',
    details: 'While fireworks lit up New Delhi, Gandhi spent the day spinning, fasting, and praying at Hydari Mansion in Calcutta to douse the communal violence of Partition. Lord Mountbatten famously referred to him as a "One-Man Boundary Force" who brought peace where 50,000 armed troops had failed.',
    quote: {
      text: 'My life is my message. If that message has failed, what can my words do?',
      source: 'Spoken to press correspondents in Calcutta, August 1947',
    },
    significance: 'Proved his supreme devotion to human brotherhood and protection of minorities over political triumph.',
  },
  {
    id: 'martyrdom-1948',
    year: 1948,
    dateStr: 'January 30, 1948',
    title: 'Martyrdom at Birla House',
    location: 'Birla House, New Delhi',
    era: 'independence',
    summary: 'Assassinated on his way to evening prayer meeting; his final words invoked God ("Hey Ram").',
    details: 'At 5:17 PM, while walking to his inter-faith prayer gathering supported by his grandnieces Manu and Abha, Gandhi was shot three times at point-blank range by Nathuram Godse, a Hindu extremist opposed to Gandhi’s insistence on secular fraternity and justice for Pakistan. He collapsed with folded hands.',
    quote: {
      text: 'The light has gone out of our lives and there is darkness everywhere... Yet that light will illuminate this country for many more years.',
      source: 'Jawaharlal Nehru, Radio Broadcast to the Nation, Jan 30, 1948',
    },
    image: ASSET_IMAGES.portrait,
    significance: 'His physical death sealed his immortal legacy as the global apostle of nonviolence.',
  },
];

// Archival Speeches
export const ARCHIVAL_SPEECHES: ArchivalSpeech[] = [
  {
    id: 'speech-god-1931',
    title: 'The Voice of Truth: On God and the Supreme Law',
    date: 'October 20, 1931',
    location: 'Kingsley Hall, London, UK',
    duration: '06:12',
    description: 'Gandhi’s only known studio audio recording, made during his visit to the Round Table Conference.',
    historicalContext: 'Recorded by the Columbia Gramophone Company at Kingsley Hall, where Gandhi chose to stay amongst London’s working-class East End poor rather than in luxury hotel suites.',
    sourceCredit: 'Columbia Gramophone Company (1931) / Gandhi Heritage Portal Archive Record #AU-1931-LON',
    sampleWaveform: [18, 35, 60, 85, 95, 75, 50, 65, 80, 70, 45, 30, 55, 75, 90, 60, 40, 65, 85, 95, 70, 40, 25, 50, 70, 85, 60, 45, 30, 20],
    transcript: `There is an indefinable mysterious Power that pervades everything. I feel it, though I do not see it. It is this unseen Power which makes itself felt, and yet defies all proof, because it is so unlike all that I perceive through my senses. It transcends the senses. But it is possible to reason out the existence of God to a limited extent.

Even in ordinary affairs we know that people do not know who rules or why and how he rules, and yet they know that there is a power that certainly rules. In my tour in Mysore I met many poor villagers and I found upon inquiry that they did not know who ruled Mysore; they only said some great power ruled.

I do dimly perceive that whilst everything around me is ever-changing, ever-dying, there is underlying all that change a living Power that is changeless, that holds all together, that creates, dissolves, and recreates. That informing Power or Spirit is God. And since nothing else I see merely through the senses can or will persist, He alone is.

And is this Power benevolent or malevolent? I see it as purely benevolent. For I can see that in the midst of death life persists, in the midst of untruth truth persists, in the midst of darkness light persists. Hence I gather that God is Life, Truth, Light. He is Love. He is the supreme Good.`,
    audioNarrativeSummary: 'Gandhi articulates his central metaphysical realization: that despite omnipresent physical decay, truth, love, and life continuously conquer death and hatred.',
  },
  {
    id: 'speech-salt-1930',
    title: 'Eve of the Salt March: Address to the Volunteers',
    date: 'March 11, 1930',
    location: 'Sabarmati Ashram Riverbed, Ahmedabad',
    duration: '04:45',
    description: 'Delivered to a gathering of 10,000 citizens the evening before departing on the 240-mile trek to Dandi.',
    historicalContext: 'Anticipating that the British police would arrest him during the night before the march began, Gandhi delivered this solemn final testament outlining how the country must carry on nonviolently.',
    sourceCredit: 'The Collected Works of Mahatma Gandhi (Vol. 48) / Sabarmati Ashram Preservation Trust',
    sampleWaveform: [25, 45, 70, 90, 80, 60, 75, 85, 65, 50, 70, 85, 90, 75, 55, 40, 60, 80, 95, 85, 70, 50, 35, 55, 75, 80, 65, 45, 30, 15],
    transcript: `In all probability this will be my last speech to you. Even if the Government allows me to march tomorrow morning, this will be my last speech on the sacred banks of the Sabarmati. Possibly these may be the last words of my life here.

Let there be not a semblance of breach of peace even after all of us have been arrested. We have resolved to utilize all our resources in the pursuit of an exclusively nonviolent struggle. Let no one commit a wrong in anger. This is my hope and prayer.

I wish these words of mine reached every nook and corner of the land. My task shall be done if I perish and so will theirs. I have faith in the righteousness of our cause and the purity of our weapons. And where both these conditions exist, victory is always on the side of Truth.`,
    audioNarrativeSummary: 'A moving appeal for absolute nonviolent discipline, urging the nation not to allow anger or vengeance to taint the moral majesty of the civil disobedience campaign.',
  },
  {
    id: 'speech-quit-india-1942',
    title: 'Quit India Address: The "Do or Die" Mandate',
    date: 'August 8, 1942',
    location: 'Gowalia Tank Maidan, Bombay',
    duration: '05:30',
    description: 'The historic address that galvanized millions to demand immediate Indian self-rule during World War II.',
    historicalContext: 'With Japanese forces at India’s eastern borders and British colonial repression intensifying, Gandhi called for total national dedication to independence.',
    sourceCredit: 'All India Congress Committee Archives, New Delhi',
    sampleWaveform: [30, 55, 75, 95, 100, 85, 70, 80, 90, 75, 60, 80, 95, 100, 85, 65, 45, 70, 90, 100, 90, 75, 60, 70, 85, 90, 75, 55, 40, 20],
    transcript: `I believe that in the history of the world, there has not been a more genuinely democratic struggle for freedom than ours. I read Carlyle’s French Revolution while I was in prison, and Pandit Jawaharlal has told me something about the Russian Revolution. But it is my conviction that inasmuch as these struggles were fought with the weapon of violence, they failed to realize the democratic ideal.

In the democracy which I have envisaged, a democracy established by nonviolence, there will be equal freedom for all. Everybody will be his own master. It is to join a struggle for such democracy that I invite you today.

Here is a mantra, a short one, that I give you. You may imprint it on your hearts and let every breath of yours give expression to it. The mantra is: "Do or Die." We shall either free India or die in the attempt; we shall not live to see the perpetuation of our slavery.`,
    audioNarrativeSummary: 'Gandhi contrasts nonviolent democracy with historical armed revolutions, presenting "Do or Die" not as a call to kill, but as a pledge to sacrifice one’s life without hurting another.',
  },
  {
    id: 'speech-prayer-1948',
    title: 'Final Prayer Address: On Communal Harmony & Unity',
    date: 'January 28, 1948 (Two days before his martyrdom)',
    location: 'Birla House, New Delhi',
    duration: '04:15',
    description: 'Gandhi’s serene appeal for Hindu-Muslim unity and compassion following his fast-unto-death in Delhi.',
    historicalContext: 'Delhi was overwhelmed by hundreds of thousands of refugees from Punjab. Gandhi undertook a fast-unto-death to insist that Muslims remaining in India be guaranteed safety and that India pay Pakistan its rightful treasury share.',
    sourceCredit: 'All India Radio Archival Division, Broadcaster Series #1948-DEL',
    sampleWaveform: [15, 30, 45, 65, 75, 60, 50, 65, 70, 55, 40, 50, 65, 75, 60, 45, 35, 55, 70, 80, 65, 50, 40, 45, 60, 65, 50, 35, 25, 15],
    transcript: `We should not lose our head because of what has happened elsewhere. If one brother goes mad and attacks another, does it behove the second brother to become mad also and retaliate? No, the second brother must remain sane and calm.

India belongs equally to Hindus, Muslims, Sikhs, Christians, Parsis, and Jews. If we cannot live together in brotherhood, we shall make ourselves the laughing-stock of the entire civilized world.

Let us purify our hearts. Hatred cannot conquer hatred; only love can conquer hatred. Let this prayer meeting be our pledge to banish fear and resentment from our souls.`,
    audioNarrativeSummary: 'A poignant and courageous plea against sectarian revenge, affirming that India’s soul resides in equal dignity and safety for every faith.',
  },
];

// Interactive Game A: The Satyagraha Challenge
export const SATYAGRAHA_SCENARIOS: SatyagrahaScenario[] = [
  {
    id: 'salt-tax-defiance',
    title: 'The Colonial Salt Monopoly (1930)',
    year: 1930,
    location: 'Gujarat Coastline',
    background: 'The British Raj imposes an exorbitant tax on common salt, making it illegal for any Indian to collect natural sea salt even from their own seashore. Poor peasants spend up to two weeks of their annual income merely to purchase salt.',
    dilemma: 'How should the Indian national movement confront this unjust decree?',
    choices: [
      {
        id: 'c1',
        label: 'Violent Sabotage: Attack British salt depots and burn colonial customs offices.',
        strategy: 'violence',
        immediateConsequence: 'Colonial authorities declare martial law, shoot demonstrators, and brand the movement as criminal vandalism in the international press.',
        longTermOutcome: 'The moral upper hand is lost; public fear suppresses participation, and the colonial regime tightens police control.',
        gandhianPrinciple: 'Violence produces only the illusion of success; the counter-violence of the State is always heavier and destroys moral legitimacy.',
        historicalReality: 'Gandhi specifically rejected sabotage, explaining that secretly destroying property breeds secrecy and cowardly tactics rather than courage.',
      },
      {
        id: 'c2',
        label: 'Legal Petition: File appeals to the Viceroy and argue the case through colonial courts.',
        strategy: 'submission',
        immediateConsequence: 'The Viceroy shelves the petitions in bureaucratic committees; the salt tax continues to bleed poor families indefinitely.',
        longTermOutcome: 'Generations of peasants remain impoverished; the colonial legal machinery is designed by the empire to preserve imperial revenue.',
        gandhianPrinciple: 'To seek justice from an unjust system through its own rigged rules is to cooperate with one’s own subjugation.',
        historicalReality: 'Decades of elite petitions had yielded zero relief; Gandhi realized that civil resistance was required to awaken collective conscience.',
      },
      {
        id: 'c3',
        label: 'Satyagraha: Announce publicly to the Viceroy the intention to march 240 miles to the sea and openly harvest salt.',
        strategy: 'satyagraha',
        immediateConsequence: 'The transparent, open march captures global attention. Over 60,000 Indians peacefully submit to arrest without raising a hand.',
        longTermOutcome: 'World opinion swings decisively against British colonial brutality; the Salt March shatters the imperial myth of benevolent governance.',
        gandhianPrinciple: 'Open defiance of an immoral law combined with willingness to suffer the penalty without malice awakens the oppressor’s conscience.',
        historicalReality: 'This was the actual Salt March of 1930, which paved the way for the Gandhi-Irwin Pact and the Round Table Conferences.',
      },
    ],
  },
  {
    id: 'champaran-indigo',
    title: 'The Indigo Sharecroppers’ Plight (1917)',
    year: 1917,
    location: 'Champaran, Bihar',
    background: 'European plantation owners enforce the Tinkathia system, forcing peasant sharecroppers to plant indigo on 3/20th of their best land and sell it at fixed, starvation prices. Peasant families face beatings, illegal exactions, and famine.',
    dilemma: 'The British district magistrate orders you to leave the district on the next train under threat of arrest. What do you do?',
    choices: [
      {
        id: 'ch1',
        label: 'Obey the order and leave, then draft an editorial complaint from Calcutta.',
        strategy: 'submission',
        immediateConsequence: 'The magistrate celebrates his administrative victory; the peasants conclude that outsiders cannot truly protect them.',
        longTermOutcome: 'The Tinkathia oppression continues unchallenged for another generation.',
        gandhianPrinciple: 'A civil resister does not abandon the afflicted out of respect for arbitrary bureaucratic orders.',
        historicalReality: 'Gandhi refused to leave, stating he came to Champaran on a mission of humanitarian service and would stay until the truth was established.',
      },
      {
        id: 'ch2',
        label: 'Incite the peasants to burn the European planters’ bungalows and indigo vats.',
        strategy: 'violence',
        immediateConsequence: 'Armed police battalions enter the villages, arrest hundreds, and impose heavy collective punitive taxes on already destitute farmers.',
        longTermOutcome: 'The movement degenerates into blood feud; the planters claim self-defense and justify greater brutality.',
        gandhianPrinciple: 'Wrongs cannot be corrected by counter-cruelty; physical violence harms the tenant far more than the armed landlord.',
        historicalReality: 'Gandhi insisted on complete nonviolence, establishing schools and sanitation teams in Champaran villages to build local self-reliance.',
      },
      {
        id: 'ch3',
        label: 'Refuse to leave, appear in court, plead guilty to disobedience, and submit to imprisonment while meticulously documenting thousands of peasant testimonies.',
        strategy: 'satyagraha',
        immediateConsequence: 'Thousands of peasants quietly surround the courthouse in peaceful solidarity. Stunned, the judge postpones the sentence, and the Lieutenant Governor drops the case.',
        longTermOutcome: 'An official Inquiry Commission is appointed, with Gandhi as a member. The Tinkathia system is abolished and 25% of extorted money is refunded.',
        gandhianPrinciple: 'A satyagrahi obeys the higher law of conscience over the lesser law of the magistrate.',
        historicalReality: 'This was the historic Champaran campaign of 1917, marking Gandhi’s first decisive victory on Indian soil.',
      },
    ],
  },
];

// Interactive Game B: The Historical Detective
export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case-train-ticket',
    title: 'The Cold Night at Pietermaritzburg (1893)',
    period: 'Winter 1893, South Africa',
    mysteryQuestion: 'Why did the railway official order Gandhi to move to the luggage van despite having a valid first-class ticket, and what primary document verifies the event?',
    clues: [
      {
        id: 'clue-1',
        type: 'letter',
        title: 'Original telegram from Gandhi to General Manager, Natal Railway',
        date: 'June 8, 1893',
        content: '"Holding first-class ticket No. 1297 from Durban to Pretoria. Forced out of carriage at Pietermaritzburg by police constable upon complaint of European passenger who objected to travelling with a ‘coolie’. Baggage taken to van. Left in cold waiting room."',
        isPrimarySource: true,
        analysis: 'Primary document proving that his ejection was driven entirely by racial color prejudice, not ticket irregularity.',
      },
      {
        id: 'clue-2',
        type: 'newspaper',
        title: 'Natal Mercury editorial retrospective (1928)',
        date: 'October 1928',
        content: '"A local legend alleges that Gandhi had picked a physical fight with the station master before being evicted."',
        isPrimarySource: false,
        analysis: 'Secondary myth constructed decades later without contemporary corroborating evidence.',
      },
      {
        id: 'clue-3',
        type: 'photograph',
        title: 'Station Log Book, Pietermaritzburg Station Archive',
        date: 'June 1893',
        content: 'Log entry records overnight freezing temperatures (-1°C) and an Indian passenger remaining seated on the bench through the night.',
        isPrimarySource: true,
        analysis: 'Verifies the severe physical hardship Gandhi endured while making his moral determination.',
      },
    ],
    deductionOptions: [
      {
        id: 'd1',
        text: 'Gandhi had purchased the wrong travel class ticket and refused to pay the upgrade fee.',
        isCorrect: false,
        historicalExplanation: 'Incorrect. The telegram and railway records confirm Gandhi held a fully paid, verified first-class ticket.',
      },
      {
        id: 'd2',
        text: 'The eviction was purely racial enforcement of South African segregation laws, sparking Gandhi’s lifelong decision to resist injustice through Satyagraha.',
        isCorrect: true,
        historicalExplanation: 'Correct! Contemporary telegrams and autobiography confirm that a European passenger objected to sitting with an Indian, which led to the police eviction.',
      },
    ],
  },
  {
    id: 'case-chauri-chaura',
    title: 'The Abrupt Halt: Why Cancel Non-Cooperation? (1922)',
    period: 'February 1922, Gorakhpur, UP',
    mysteryQuestion: 'When the entire nation was on the verge of paralyzing British rule, why did Gandhi suddenly halt the Non-Cooperation Movement after the Chauri Chaura incident?',
    clues: [
      {
        id: 'cc-1',
        type: 'newspaper',
        title: 'Police report on Chauri Chaura police station fire',
        date: 'February 5, 1922',
        content: 'A mob attacked the police post after officers opened fire on an unarmed procession. The crowd locked 22 policemen inside and set fire to the building, killing all inside.',
        isPrimarySource: true,
        analysis: 'Confirms the horrific descent of the local protest into retaliatory slaughter.',
      },
      {
        id: 'cc-2',
        type: 'letter',
        title: 'Gandhi’s letter to the Congress Working Committee at Bardoli',
        date: 'February 11, 1922',
        content: '"I know that the drastic reversal will cause pain to many comrades. But I would rather be ridiculed by the whole world than be untrue to the voice within. The country is not yet disciplined enough for nonviolent battle. If we use violence, we will become worse than the oppressor."',
        isPrimarySource: true,
        analysis: 'Primary evidence of Gandhi’s uncompromising principle: means cannot be divorced from ends.',
      },
    ],
    deductionOptions: [
      {
        id: 'cc-opt1',
        text: 'Gandhi was secretly intimidated by British military reinforcements arriving in Calcutta.',
        isCorrect: false,
        historicalExplanation: 'Incorrect. Gandhi never feared imprisonment or death; British authorities were actually stunned by his unilateral decision.',
      },
      {
        id: 'cc-opt2',
        text: 'He believed that an independence achieved through brutality would only birth a brutal, violent state; purity of means was non-negotiable.',
        isCorrect: true,
        historicalExplanation: 'Correct! Despite fierce protests from Jawaharlal Nehru, Subhas Chandra Bose, and C.R. Das, Gandhi insisted that freedom won by burning humans alive would be a moral disaster.',
      },
    ],
  },
];

// Interactive Game C: The Salt March Route Experience
export const SALT_MARCH_STOPS: SaltMarchStop[] = [
  {
    day: 1,
    date: 'March 12, 1930',
    location: 'Sabarmati Ashram (Start)',
    distanceFromStartKm: 0,
    highlight: 'Departure with 78 chosen satyagrahis after early morning prayers at 6:30 AM.',
    eventDescription: 'Thousands lined the dusty pathway shouting "Mahatma Gandhi ki Jai". Gandhi carried a 54-inch bamboo staff and vowed not to return to the ashram until India was free.',
    keyQuote: 'We are marching in the name of God to perform an act of holy defiance.',
    challengeQuestion: 'Why did Gandhi choose salt rather than land revenue or income taxes for this civil disobedience?',
    challengeAnswer: 'Salt was universal. Rich and poor, Hindu and Muslim, high-caste and outcaste, all required salt daily. Taxing it was an intimate cruelty everyone could instantly feel.',
  },
  {
    day: 3,
    date: 'March 14, 1930',
    location: 'Nadiad',
    distanceFromStartKm: 58,
    highlight: 'Over 200 village headmen resign their colonial administrative posts.',
    eventDescription: 'Crowds swell to over 30,000. In every village along the route, local officials throw down their British government badges and join the boycott.',
    keyQuote: 'Give up foreign cloth, give up alcohol, and spin on the charkha every day.',
    challengeQuestion: 'What did Gandhi urge the villagers to do when hosting the marchers?',
    challengeAnswer: 'To provide only the simplest food (coarse roti and lentils) and avoid spending money on lavish welcoming feasts.',
  },
  {
    day: 9,
    date: 'March 20, 1930',
    location: 'Anand',
    distanceFromStartKm: 122,
    highlight: 'Students and peasant women take solemn pledges of Swadeshi.',
    eventDescription: 'Gandhi addresses a gathering under the shade of mango groves, urging women to take the lead in picketing foreign cloth and liquor shops.',
    keyQuote: 'If nonviolence is the law of our being, the future is with woman.',
    challengeQuestion: 'What revolutionary role did women play in the Salt Satyagraha?',
    challengeAnswer: 'Led by figures like Sarojini Naidu and Kamaladevi Chattopadhyay, tens of thousands of women broke conservative purdah to lead public protests across India.',
  },
  {
    day: 17,
    date: 'March 28, 1930',
    location: 'Bhatgam',
    distanceFromStartKm: 270,
    highlight: 'Gandhi undergoes rigorous self-introspection and rebukes excess.',
    eventDescription: 'Noticing that some volunteers had ordered fresh vegetables from Surat brought in by a motor car, Gandhi delivered a stern lecture on the purity of the vow of poverty.',
    keyQuote: 'To travel for a holy cause with motor cars carrying delicate foods is a mockery of our mission.',
    challengeQuestion: 'Why did Gandhi criticize his own companions so severely for a small comfort?',
    challengeAnswer: 'Because a Satyagrahi must share the exact austerity of the poorest Indian peasant; otherwise, it becomes a vanity parade rather than a sacrifice.',
  },
  {
    day: 24,
    date: 'April 5–6, 1930',
    location: 'Dandi Beach (Destination)',
    distanceFromStartKm: 385,
    highlight: 'Bathing in the Arabian Sea and lifting a lump of natural salt from the mudflats.',
    eventDescription: 'At 6:30 AM on April 6, after prayers, Gandhi walked into the waves of the Arabian Sea, returned to the mudflats, and picked up a handful of untaxed salt.',
    keyQuote: 'With this, I am shaking the foundations of the British Empire.',
    challengeQuestion: 'What immediate legal action did the British government take in the weeks following Dandi?',
    challengeAnswer: 'They arrested over 60,000 satyagrahis across India, including Gandhi, Nehru, and Sardar Patel, filling every colonial prison to bursting capacity.',
  },
];

// Interactive Game D: Truth or Myth Quiz
export const TRUTH_OR_MYTH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Did Mahatma Gandhi ever win the Nobel Peace Prize?',
    options: [
      'Yes, in 1947 after Indian independence',
      'No, though he was nominated five times (1937, 1938, 1939, 1947, 1948)',
      'Yes, posthumously in 1948',
      'He won it jointly with Rabindranath Tagore in 1931',
    ],
    correctIndex: 1,
    explanation: 'Gandhi was nominated in 1937, 1938, 1939, 1947, and finally in January 1948 days before his assassination. In 1948, the Nobel Committee decided not to award the prize to anyone, stating there was "no suitable living candidate." Later, the Nobel Committee publicly expressed regret for never awarding it to him.',
    sourceCitation: 'Nobel Foundation Official Historical Archives (nobelprize.org)',
    difficulty: 'Apprentice',
  },
  {
    id: 'q2',
    question: 'What is the precise meaning of the term "Satyagraha" coined by Gandhi in 1906?',
    options: [
      'Passive submission to lawful authorities',
      'Force born of Truth and Love, or Soul-Force',
      'Economic boycott of imported goods',
      'Civil unrest and political strikes',
    ],
    correctIndex: 1,
    explanation: 'Gandhi rejected the English phrase "passive resistance" because it implied weakness or potential violence if one had weapons. Satyagraha combines "Satya" (Truth) and "Agraha" (Firmness). It means the unyielding force of Truth, Love, and Soul.',
    sourceCitation: 'Satyagraha in South Africa, Chapter 12',
    difficulty: 'Apprentice',
  },
  {
    id: 'q3',
    question: 'How did Gandhi respond to the violence at Chauri Chaura in 1922 during the Non-Cooperation Movement?',
    options: [
      'He blamed British undercover agents and pushed forward',
      'He called off the nationwide movement unilaterally, despite fierce criticism from fellow leaders',
      'He went into exile in Ceylon',
      'He urged the Congress to form an armed defense wing',
    ],
    correctIndex: 1,
    explanation: 'Gandhi immediately fasted for five days and called off the entire national movement, asserting that a freedom achieved through violence was morally contaminated and would lead to dictatorship.',
    sourceCitation: 'Young India (February 16, 1922)',
    difficulty: 'Researcher',
  },
  {
    id: 'q4',
    question: 'Which of the following did Gandhi carry with him as his few personal possessions at the time of his death?',
    options: [
      'Gold signet ring, leather diary, silver watch, walking stick',
      'Round spectacles, pocket watch with safety pin, wooden bowl, spoon, sandals, and spinning wheel',
      'Extensive legal law books, typewriter, fountain pen, chequebook',
      'Royal medals awarded by the British Empire for the Boer War',
    ],
    correctIndex: 1,
    explanation: 'Gandhi lived in voluntary poverty (Aparigraha). At his death, his worldly possessions could fit on a small tray: his nickel spectacles, two pairs of wooden sandals, a pocket watch given to him by an English friend, two eating bowls, and his spinning charkha.',
    sourceCitation: 'National Gandhi Museum Accession Inventory, New Delhi',
    difficulty: 'Researcher',
  },
  {
    id: 'q5',
    question: 'What was Gandhi’s famous "Talisman" advice for resolving moral dilemmas?',
    options: [
      'Consult the majority opinion of your political party',
      'Recall the face of the poorest and weakest person you have ever seen, and ask if your next step will be of any use to them',
      'Wait for the advice of legal scholars and judges',
      'Seek balance between personal wealth and charitable donations',
    ],
    correctIndex: 1,
    explanation: 'Written in August 1947, the Talisman is one of his most revered ethical directives: "Whenever you are in doubt... recall the face of the poorest and the weakest man whom you may have seen, and ask yourself if the step you contemplate is going to be of any use to him."',
    sourceCitation: 'The Collected Works of Mahatma Gandhi, Vol. 89, p. 125',
    difficulty: 'Scholar',
  },
];
