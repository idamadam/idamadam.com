/**
 * Content data for all vignettes
 * Separates content from components for easy editing
 */

export interface DesignIteration {
  id: string;
  label: string;
  annotation: string;
  imageUrl?: string;
}

export interface StageContent {
  title?: string;
  description?: string;
  cta?: string;
}

export interface VignetteStages {
  problem?: StageContent;
  solution?: StageContent;
  iterations?: StageContent;
}

export const aiHighlightsContent = {
  title: "Designed AI summaries managers could actually verify and trust",
  description: "Performance reviews took hours gathering information from scattered sources. I designed an AI system that surfaces key highlights and opportunities from feedback, goals, and 1-on-1 notes. Managers can expand to see direct quotes, verifying AI outputs while saving significant time during review season.",

  stages: {
    problem: {
      title: "The chaos of review season",
      description: "Managers spent hours gathering information from scattered sources. Slack threads, 1-on-1 notes, goal updates, peer feedback. All disconnected. All manual.",
      cta: "See how AI helped"
    },
    solution: {
      cta: "How I got here"
    },
    iterations: {
      title: "Design iterations",
      description: "From AI-generated summaries to verified insights"
    }
  } as VignetteStages,

  iterations: [
    {
      id: "v1",
      label: "First attempt",
      annotation: "AI summaries without sources. User testing revealed managers didn't trust unverifiable AI outputs. They wanted to see the evidence.",
      imageUrl: "/iterations/highlights-v1.png"
    },
    {
      id: "v2",
      label: "Added sources",
      annotation: "Added expandable source citations. Managers said 'now I can actually verify this' but the interaction felt clunky and broke their flow.",
      imageUrl: "/iterations/highlights-v2.png"
    },
    {
      id: "final",
      label: "Final design",
      annotation: "Streamlined inline expand with direct quotes. 100% of test users checked sources when easily accessible. Trust and efficiency, together.",
      imageUrl: "/iterations/highlights-final.png"
    }
  ] as DesignIteration[],

  // Problem state content - scattered information cards
  problemCards: [
    { id: 'slack1', type: 'slack' as const, content: 'Great job on the API redesign!', from: 'Sarah Chen', time: '2 weeks ago' },
    { id: 'slack2', type: 'slack' as const, content: 'Could use more documentation', from: 'Mike Torres', time: '3 weeks ago' },
    { id: 'goal1', type: 'goal' as const, content: 'Q3: Improve API response time by 40%', status: 'completed' },
    { id: 'note1', type: 'note' as const, content: 'Discussed career growth, interested in tech lead path', date: 'Oct 15' },
    { id: 'feedback1', type: 'feedback' as const, content: 'Excellent collaboration on cross-team projects', from: 'Peer review' },
    { id: 'calendar1', type: 'calendar' as const, content: '1-on-1 with Idam', date: 'Oct 22' },
  ]
};

export const aiSuggestionsContent = {
  title: "Improved feedback quality with people science-backed AI",
  description: "Performance reviews often ended up subpar despite hours of work. I partnered with organizational psychologists to ground AI coaching in people science. The system scans for research-backed feedback qualities (specific, shows impact, objective, actionable) and provides structured improvement suggestions. 80% of managers found it effective.",
  questionNumber: 2,
  questionText: "How has this person progressed over this review period?",
  instructionText: "Explain how this growth has helped this person achieve their goals and how it has positively impacted their performance. Refer to this person's feedback, self-reflection and goals in the profile to the right. This will give you a more holistic view of their performance over the last review period and make the evaluation easier for you to complete.",
  beforeText: "Alex Johnson has made some progress, but it's not really enough. They still have a long way to go. Their performance hasn't improved much, and they haven't met their goals in a meaningful way. They should try to be better next review period.",
  afterText: "I would appreciate more constructive feedback. When you raise your voice during meetings, it makes it difficult for the team to have productive conversations. I'd like to discuss ways we can communicate more effectively.",
  recommendations: [
    {
      title: "Be specific:",
      description: "The feedback is too general and lacks specific context. It mentions 'progress' and 'goals' but doesn't provide any examples or details about what those goals were, what actions were taken, or what the specific outcomes were. It also uses vague phrases like 'not really enough' and 'long way to go' without providing concrete examples to support these claims."
    },
    {
      title: "Identify impact:",
      description: "The feedback focuses on the lack of progress and unmet goals, but it doesn't explicitly describe the impact of Alex's actions. It doesn't clarify how their performance affected the team, objectives, or the organization. The feedback mentions 'not enough' and 'long way to go' but doesn't connect these to specific outcomes."
    },
    {
      title: "Suggest actions:",
      description: "The feedback is vague and does not provide specific, actionable steps for improvement. It states that Alex should \"try to be better\" but doesn't offer concrete suggestions on how to achieve that. The feedback lacks a growth mindset and future-focused guidance."
    },
    {
      title: "Be objective:",
      description: "The feedback uses subjective language like \"not really enough\", \"long way to go\", and \"meaningful way.\" It also makes assumptions about Alex's intent with \"They should try to be better.\" It lacks specific examples of actions and their impact."
    }
  ],
  sharingNote: "May be shared with Lena"
};

export const multilingualContent = {
  title: "Expanded Performance Reviews to 120+ languages",
  description: "Global customers ran separate performance cycles for each language, creating massive admin burden. When a $1M+ ARR customer needed multilingual support or they'd churn, I researched workflows and advocated for XLSX uploads and machine translation - expanding scope beyond the original ask. The system enables a single cycle with multiple languages, eliminating operational overhead. $1M+ ARR retained, 4,000+ employees supported.",
  section1: {
    title: "Expanded Performance Reviews to 120+ languages",
    description: "This was a milestone for me. I incorporated my native language, Dhivehi, into my work for the first time. I designed a flexible translation workflow that supports three input methods: manual editing for quick tweaks, CSV uploads for translation agencies, and machine translation for speed."
  },
  section2: {
    title: "Auto-translate in action",
    description: "Machine translation enables managers to launch multilingual performance cycles in minutes."
  },
  workflows: [
    {
      id: 1,
      icon: "edit",
      title: "Manual Editing",
      description: "Quick edits for small changes",
      highlighted: false
    },
    {
      id: 2,
      icon: "upload_file",
      title: "CSV Import",
      description: "Bulk updates from agencies",
      highlighted: false
    },
    {
      id: 3,
      icon: "bolt",
      title: "Auto Translate",
      description: "Launch cycles in minutes",
      highlighted: true
    }
  ],
  translationFields: [
    {
      id: 1,
      label: "Performance review question",
      sourceText: "How did this person perform during this review period?",
      translatedText: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?"
    }
  ],
  languages: [
    { code: "fr", name: "Français (French)", text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?" },
    { code: "dv", name: "ދިވެހި (Dhivehi)", text: "މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟" }
  ],
  englishText: "How did this person perform?",
  spanishText: "¿Cómo se desempeñó esta persona?",
  languagePairs: [
    { from: "English", to: "Spanish", code: "es" },
    { from: "English", to: "French", code: "fr" },
    { from: "English", to: "German", code: "de" },
    { from: "English", to: "Japanese", code: "ja" }
  ]
};

export const prototypingContent = {
  title: "Pioneered AI Prototyping infrastructure at Culture Amp",
  sandboxTitle: "Culture Amp Design Sandbox",
  prototypes: [
    { id: 1, name: "Performance AI", thumbnail: "#d9d9d9" },
    { id: 2, name: "Skills Coach", thumbnail: "#d9d9d9" },
    { id: 3, name: "Goals Assistant", thumbnail: "#d9d9d9" },
    { id: 4, name: "Feedback Helper", thumbnail: "#d9d9d9" },
    { id: 5, name: "Review Writer", thumbnail: "#d9d9d9" },
    { id: 6, name: "1-on-1 Prep", thumbnail: "#d9d9d9" }
  ]
};

export const vibeCodingContent = {
  title: "Building an AI-powered prototyping tool",
  description: "A side project exploring how AI agents can help designers and product managers create interactive prototypes through natural language. Type what you want to build, and the system generates working React components in real-time."
};

export const homeConnectContent = {
  title: "Created a cohesive homepage system to bring all of Culture Amp into one place",
  description: "A centralized navigation hub that reduced platform fragmentation and improved feature discoverability across Culture Amp's product suite.",
  imageUrl: "/connect-hero.png" // Placeholder - update with actual image
};
