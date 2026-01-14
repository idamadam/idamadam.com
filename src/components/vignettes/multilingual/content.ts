import { DesignNote, VignetteStages } from '../types';

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

interface ProblemCard {
  code: string;
  name: string;
  flag: string;
  cycleNumber: number;
}

export interface MultilingualContent {
  translationFields: TranslationField[];
  languages: LanguageOption[];
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
  problemCards: ProblemCard[];
}

export const multilingualContent: MultilingualContent = {
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
  stages: {
    solution: {
      title: 'Designed a simple way to bring multiple languages into a single cycle'
    }
  },
  designNotes: {
    notes: [
      {
        id: 'unified-cycle',
        detail: 'Instead of managing separate cycles per language, everything lives in one dropdown.',
        x: '-4%',
        y: '10%',
        popoverSide: 'left' as const
      },
      {
        id: 'ai-translate',
        detail: 'A primary button for translating in one click. Research showed this was already a core process, I just made it easier.',
        x: '104%',
        y: '10%',
        popoverSide: 'right' as const
      },
      {
        id: 'xlsx-import',
        detail: 'User research revealed admins were already managing translations in XLSX files. This feature lets them use their existing process.',
        x: '104%',
        y: '10%',
        popoverSide: 'right' as const
      },
      {
        id: 'source-reference',
        detail: 'Original language is placed within easy reach to reduce the need to switch between languages.',
        x: '-4%',
        y: '75%',
        popoverSide: 'left' as const
      }
    ]
  },
  problemCards: [
    { code: 'fr', name: 'French', flag: '🇫🇷', cycleNumber: 1 },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', cycleNumber: 2 },
    { code: 'dv', name: 'Dhivehi', flag: '🇲🇻', cycleNumber: 3 }
  ]
};
