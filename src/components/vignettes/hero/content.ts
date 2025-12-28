export interface Company {
  name: string;
  logo: string;
  type: 'svg' | 'png';
}

export interface HeroContent {
  name: string;
  companies: Company[];
}

export const heroContent: HeroContent = {
  name: 'Idam Adam',
  companies: [
    { name: 'Culture Amp', logo: '/logos/cultureamp.svg', type: 'svg' },
    { name: 'MYOB', logo: '/logos/myob.svg', type: 'svg' },
    { name: 'Canstar', logo: '/logos/canstar-gold-and-blue-logo.png', type: 'png' },
  ],
};
