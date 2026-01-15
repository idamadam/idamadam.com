export interface DesignDetail {
  number: number;
  text: string;
}

export interface ProcessNote {
  text: string;
}

interface TranslationField {
  id: number;
  label: string;
  sourceText: string;
  translatedText: string;
}

interface LanguageOption {
  code: string;
  name: string;
  text: string;
}

export interface MultilingualContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  designDetailsLabel: string;
  designDetails: DesignDetail[];
  processNotesLabel: string;
  processNotes: ProcessNote[];

  // Right panel content
  translationFields: TranslationField[];
  languages: LanguageOption[];
}

export const multilingualContent: MultilingualContent = {
  // Left panel content
  projectName: 'Translation Management',
  headline: 'Multiple languages in a single cycle',
  body: 'Enterprise customers were managing separate performance cycles per language. One customer ran twelve parallel cycles for what should have been one review period.',
  designDetailsLabel: 'Design details',
  designDetails: [
    {
      number: 1,
      text: 'Unified dropdown replaces separate cycles per language',
    },
    {
      number: 2,
      text: 'One-click translation built on tools admins already trusted',
    },
    {
      number: 3,
      text: 'Excel export matches the actual workflow we observed',
    },
  ],
  processNotesLabel: 'Process notes',
  processNotes: [
    {
      text: 'Original scope was a basic translation upload flow. I pushed to include machine translation and Excel export based on what we saw in research. These were the actual workflow.',
    },
    {
      text: 'Before research, everyone assumed it was just translation management. Customer interviews revealed HR teams were already using machine translation as a first pass, then cleaning it up in Excel.',
    },
    {
      text: 'The constraint was integration, not invention. The translation layer had to slot into existing mental models without requiring admins to learn a new system.',
    },
    {
      text: 'Zero support tickets since launch. The pattern we built became the reference for how Culture Amp handles multilingual content.',
    },
  ],

  // Right panel content
  translationFields: [
    {
      id: 1,
      label: 'Performance review question',
      sourceText: 'How did this person perform during this review period?',
      translatedText: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?"
    }
  ],
  languages: [
    { code: 'fr', name: 'Français (French)', text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?" },
    { code: 'es', name: 'Español (Spanish)', text: '¿Cómo se desempeñó esta persona durante este período de evaluación?' },
    { code: 'dv', name: 'ދިވެހި (Dhivehi)', text: 'މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟' }
  ],
};
