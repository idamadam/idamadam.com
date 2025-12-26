export interface DesignPrinciple {
  id: string;
  label: string;
  detail: string;
}

export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  principles: DesignPrinciple[];
}

export const heroContent: HeroContent = {
  name: 'Idam Adam',
  role: 'Lead Product Designer',
  tagline: 'I design and build products that show rather than tell.',
  principles: [
    {
      id: 'show-dont-tell',
      label: 'Show, don\'t tell',
      detail: 'Prototypes speak louder than decks. Every vignette below is interactive.'
    },
    {
      id: 'technical-empathy',
      label: 'Technical empathy',
      detail: 'I code production software. This portfolio is one of them.'
    },
    {
      id: 'start-with-problems',
      label: 'Start with problems',
      detail: 'Good design solves real problems. Scroll down to see how.'
    }
  ]
};
