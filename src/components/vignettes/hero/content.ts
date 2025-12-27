export interface HeroContent {
  name: string;
  role: string;
  stages: {
    problem: {
      tagline: string;
      cta: string;
    };
    solution: {
      tagline: string;
      scrollHint: string;
    };
  };
}

export const heroContent: HeroContent = {
  name: 'Idam Adam',
  role: 'Lead Product Designer',
  stages: {
    problem: {
      tagline: 'A portfolio that shows, not tells.',
      cta: 'See it in action',
    },
    solution: {
      tagline: 'Each project below is interactive.',
      scrollHint: 'Scroll to explore',
    },
  },
};
