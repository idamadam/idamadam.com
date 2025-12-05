/**
 * Content data for all vignettes
 * Separates content from components for easy editing
 */

export const performanceAIContent = {
  title: "Made Performance Review season faster & fairer",
  description: "Performance reviews took hours and still ended up subpar. I partnered with organizational psychologists to ground AI feedback tools in people science - not generic models. The system scans for research-backed feedback qualities (specific, shows impact, objective, actionable) and provides structured highlights and opportunities, not just summaries. 80% of managers found it effective.",
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
  title: "Experimented with creating my own vibe coding app",
  codeSnippet: `function createVibe() {
  const mood = detectMood();
  const music = selectPlaylist(mood);
  const theme = adjustColors(mood);

  return {
    music,
    theme,
    focus: true
  };
}

// Start the vibe
createVibe();`,
  language: "javascript"
};

export const homeConnectContent = {
  title: "Created a cohesive homepage system to bring all of Culture Amp into one place",
  description: "A centralized navigation hub that reduced platform fragmentation and improved feature discoverability across Culture Amp's product suite.",
  imageUrl: "/connect-hero.png" // Placeholder - update with actual image
};
