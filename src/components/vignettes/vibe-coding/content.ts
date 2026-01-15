export interface NarrativeNote {
  text: string;
}

interface VibeCodingContent {
  projectName: string;
  headline: string;
  body: string;
  notes: NarrativeNote[];
}

export const vibeCodingContent: VibeCodingContent = {
  projectName: 'Personal Exploration',
  headline: 'Building my own tools',
  body: 'Learning new tech. Figuring out how to build things myself. I have an eye on doing my own thing at some point.',

  notes: [
    {
      text: 'Built a prototyping tool. Give it an idea, it builds a prototype. Has versioning and a "Scrubber" to review like a movie.',
    },
    {
      text: 'Figured out how to bring a coding agent CLI into a browser. Designed interactions around that behavior.',
    },
    {
      text: 'This is how I learned to build the Design Sandbox at work. Personal project was the proving ground.',
    },
    {
      text: 'I can design and build. Deep fluency from actual experience, not just curiosity.',
    },
  ],
};
