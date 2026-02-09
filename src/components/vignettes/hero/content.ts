export interface Company {
  name: string;
  logo: string;
  type: 'svg' | 'png';
  url: string;
  hoverColor?: string;
}

export interface HeroContent {
  name: string;
  companies: Company[];
}

export interface IntroLink {
  text: string;
  url: string;
  external: boolean;
}

export interface IntroContent {
  role: string;
  lines: string[];
  links: Record<string, IntroLink>;
}

export const heroContent: HeroContent = {
  name: 'Idam Adam',
  companies: [
    { name: 'Culture Amp', logo: '/logos/cultureamp.svg', type: 'svg', url: 'https://cultureamp.com' },
    { name: 'MYOB', logo: '/logos/myob.svg', type: 'svg', url: 'https://myob.com', hoverColor: 'oklch(0.5147 0.2738 294.67)' },
    { name: 'Canstar', logo: '/logos/canstar-gold-and-blue-logo.png', type: 'png', url: 'https://canstar.com.au' },
  ],
};

export const introContent: IntroContent = {
  role: 'Lead Product Designer at',
  lines: [
    "I design intelligent and thoughtful software that makes complex, high-stakes problems feel simple.",
    "I bring deep technical fluency to my design work. I prototype in code, understand engineering constraints, and build internal tools when the team needs them.",
    "I use research to challenge assumptions and expand scope. At Culture Amp, I've shaped product direction for AI features, platform strategy, and multilingual expansion.",
  ],
  links: {},
};
