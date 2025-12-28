import { DesignNote, VignetteStages } from '../types';

interface TranslationWorkflow {
  id: number;
  icon: string;
  title: string;
  description: string;
  highlighted: boolean;
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

interface LanguagePair {
  from: string;
  to: string;
  code: string;
}

interface ProblemCard {
  code: string;
  name: string;
  flag: string;
  cycleNumber: number;
}


export interface MultilingualContent {
  title: string;
  description: string;
  section1: {
    title: string;
    description: string;
  };
  section2: {
    title: string;
    description: string;
  };
  workflows: TranslationWorkflow[];
  translationFields: TranslationField[];
  languages: LanguageOption[];
  englishText: string;
  spanishText: string;
  languagePairs: LanguagePair[];
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
  problemCards: ProblemCard[];
}

export const multilingualContent: MultilingualContent = {
  title: 'Expanded Performance Reviews to 120+ languages',
  description:
    "Global customers ran separate performance cycles for each language, creating massive admin burden. When a $1M+ ARR customer needed multilingual support or they'd churn, I researched workflows and advocated for XLSX uploads and machine translation - expanding scope beyond the original ask. The system enables a single cycle with multiple languages, eliminating operational overhead. $1M+ ARR retained, 4,000+ employees supported.",
  section1: {
    title: 'Expanded Performance Reviews to 120+ languages',
    description:
      'This was a milestone for me. I incorporated my native language, Dhivehi, into my work for the first time. I designed a flexible translation workflow that supports three input methods: manual editing for quick tweaks, CSV uploads for translation agencies, and machine translation for speed.'
  },
  section2: {
    title: 'Auto-translate in action',
    description: 'Machine translation enables managers to launch multilingual performance cycles in minutes.'
  },
  workflows: [
    {
      id: 1,
      icon: 'edit',
      title: 'Manual Editing',
      description: 'Quick edits for small changes',
      highlighted: false
    },
    {
      id: 2,
      icon: 'upload_file',
      title: 'CSV Import',
      description: 'Bulk updates from agencies',
      highlighted: false
    },
    {
      id: 3,
      icon: 'bolt',
      title: 'Auto Translate',
      description: 'Launch cycles in minutes',
      highlighted: true
    }
  ],
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
  englishText: 'How did this person perform?',
  spanishText: '¿Cómo se desempeñó esta persona?',
  languagePairs: [
    { from: 'English', to: 'Spanish', code: 'es' },
    { from: 'English', to: 'French', code: 'fr' },
    { from: 'English', to: 'German', code: 'de' },
    { from: 'English', to: 'Japanese', code: 'ja' }
  ],
  stages: {
    problem: {
      title: 'Supporting multiple languages required a separate workflow for each language',
      description: '',
      cta: 'Show the solution'
    },
    solution: {
      title: 'Designed a simple way to bring multiple languages into a single cycle',
      description: 'This was a milestone for me. I incorporated my native language, Dhivehi, into my work for the first time. I designed a flexible translation workflow that supports three input methods: manual editing for quick tweaks, CSV uploads for translation agencies, and machine translation for speed.'
    }
  },
  designNotes: {
    notes: [
      {
        id: 'unified-cycle',
        label: 'Single unified cycle',
        detail: 'All languages share one performance cycle. Eliminates duplicate setup and parallel admin work.',
        x: '-4%',
        y: '10%',
        popoverSide: 'left' as const
      },
      {
        id: 'ai-translate',
        label: 'AI translation placement',
        detail: 'Auto-translate button placed prominently with the language selector. Contextual placement reduces cognitive load.',
        x: '104%',
        y: '10%',
        popoverSide: 'right' as const
      },
      {
        id: 'source-reference',
        label: 'Source text reference',
        detail: 'English source text displayed below each field so translators have full context without switching screens.',
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
