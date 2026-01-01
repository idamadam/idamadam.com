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

export interface IntroContent {
  role: string;
  bio: string[];
  tagline: string;
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
  bio: [
    'The case studies below are interactive. Click around and have a play!',
  ],
  tagline: 'Designer, coder, prototyper',
};
