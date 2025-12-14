export interface PrototypeItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface PrototypingContent {
  title: string;
  description: string;
  sandboxTitle: string;
  prototypes: PrototypeItem[];
}

export const prototypingContent: PrototypingContent = {
  title: 'Pioneered AI Prototyping infrastructure at Culture Amp',
  description: 'I created a common repository for designers & product managers at Culture Amp to create, share and remix React prototypes.',
  sandboxTitle: 'Culture Amp Design Sandbox',
  prototypes: [
    { id: 1, name: 'Performance AI', thumbnail: '#d9d9d9' },
    { id: 2, name: 'Skills Coach', thumbnail: '#d9d9d9' },
    { id: 3, name: 'Goals Assistant', thumbnail: '#d9d9d9' },
    { id: 4, name: 'Feedback Helper', thumbnail: '#d9d9d9' },
    { id: 5, name: 'Review Writer', thumbnail: '#d9d9d9' },
    { id: 6, name: '1-on-1 Prep', thumbnail: '#d9d9d9' }
  ]
};
