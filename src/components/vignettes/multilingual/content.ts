export interface DesignDetail {
  number: number;
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
  words: string[];
}

export interface MultilingualContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  keyResult?: string;
  processNotes: string[];

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: DesignDetail[];

  // Right panel content
  translationFields: TranslationField[];
  languages: LanguageOption[];
}

export const multilingualContent: MultilingualContent = {
  // Left panel content
  projectName: 'Multilingual Performance Cycles',
  headline: 'A simple workflow to run a multilingual performance cycle',
  body: 'Lack of support for multilingual workflows was a top reason for lost deals. I designed a simple but powerful workflow to add and manage translations based on research I conducted with admins.',
  keyResult: 'Zero support tickets and actively used since launch.',

  processNotes: [
    'I advocated for the inclusion of machine translation and spreadsheet import/export based on research. The original scope was just a basic form to add translations.',
    'I designed the the translation layer to seamlessly fit into the existing performance cycle setup processes.',
    'The workflow I designed here became a template for multilingual content across Culture Amp.',
  ],

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: [
    {
      number: 1,
      text: 'Unified dropdown replaces separate cycles per language',
    },
    {
      number: 2,
      text: 'One-click translation built in',
    },
    {
      number: 3,
      text: 'Importing & exporting a spreadsheet fit the existing workflows admins used to manage translations',
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
    {
      code: 'fr',
      name: 'Français (French)',
      text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?",
      words: ['Comment', 'cette', 'personne', 'a-t-elle', 'performé', 'au', 'cours', 'de', 'cette', 'période', "d'évaluation?"],
    },
    {
      code: 'es',
      name: 'Español (Spanish)',
      text: '¿Cómo se desempeñó esta persona durante este período de evaluación?',
      words: ['¿Cómo', 'se', 'desempeñó', 'esta', 'persona', 'durante', 'este', 'período', 'de', 'evaluación?'],
    },
    {
      code: 'dv',
      name: 'ދިވެހި (Dhivehi)',
      text: 'މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟',
      words: ['މި', 'މީހާ', 'މި', 'ރިވިއު', 'ތެރޭގައި', 'ކިހިނެއް', 'ކުރިއަރައިފި؟'],
    },
  ],
};
