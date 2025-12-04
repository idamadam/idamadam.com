/**
 * Content data for all vignettes
 * Separates content from components for easy editing
 */

export const performanceAIContent = {
  title: "Made Performance Review season faster & fairer",
  description: "Performance reviews took hours and still ended up subpar. I partnered with organizational psychologists to ground AI feedback tools in people science - not generic models. The system scans for research-backed feedback qualities (specific, shows impact, objective, actionable) and provides structured highlights and opportunities, not just summaries. 80% of managers found it effective.",
  beforeText: "Please stop yelling",
  afterText: "I would appreciate more constructive feedback. When you raise your voice during meetings, it makes it difficult for the team to have productive conversations. I'd like to discuss ways we can communicate more effectively.",
  highlights: {
    summary: "Be objective: Here's an AI Recommendation",
    items: [
      "More specific examples of behavior",
      "Constructive tone that invites dialogue",
      "Actionable feedback format"
    ]
  }
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
