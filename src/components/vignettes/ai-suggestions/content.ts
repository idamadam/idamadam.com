interface AISuggestionsRecommendation {
  title: string;
  description: string;
}

export interface AISuggestionsContent {
  title: string;
  description: string;
  questionNumber: number;
  questionText: string;
  instructionText: string;
  beforeText: string;
  afterText: string;
  recommendations: AISuggestionsRecommendation[];
  sharingNote: string;
}

export const aiSuggestionsContent: AISuggestionsContent = {
  title: 'Improved feedback quality with people science-backed AI',
  description:
    'Performance reviews often ended up subpar despite hours of work. I partnered with organizational psychologists to ground AI coaching in people science. The system scans for research-backed feedback qualities (specific, shows impact, objective, actionable) and provides structured improvement suggestions. 80% of managers found it effective.',
  questionNumber: 2,
  questionText: 'How has this person progressed over this review period?',
  instructionText:
    "Explain how this growth has helped this person achieve their goals and how it has positively impacted their performance. Refer to this person's feedback, self-reflection and goals in the profile to the right. This will give you a more holistic view of their performance over the last review period and make the evaluation easier for you to complete.",
  beforeText:
    "Alex Johnson has made some progress, but it's not really enough. They still have a long way to go. Their performance hasn't improved much, and they haven't met their goals in a meaningful way. They should try to be better next review period.",
  afterText:
    "I would appreciate more constructive feedback. When you raise your voice during meetings, it makes it difficult for the team to have productive conversations. I'd like to discuss ways we can communicate more effectively.",
  recommendations: [
    {
      title: 'Be specific:',
      description:
        "The feedback is too general and lacks specific context. It mentions 'progress' and 'goals' but doesn't provide any examples or details about what those goals were, what actions were taken, or what the specific outcomes were. It also uses vague phrases like 'not really enough' and 'long way to go' without providing concrete examples to support these claims."
    },
    {
      title: 'Identify impact:',
      description:
        "The feedback focuses on the lack of progress and unmet goals, but it doesn't explicitly describe the impact of Alex's actions. It doesn't clarify how their performance affected the team, objectives, or the organization. The feedback mentions 'not enough' and 'long way to go' but doesn't connect these to specific outcomes."
    },
    {
      title: 'Suggest actions:',
      description:
        'The feedback is vague and does not provide specific, actionable steps for improvement. It states that Alex should "try to be better" but doesn\'t offer concrete suggestions on how to achieve that. The feedback lacks a growth mindset and future-focused guidance.'
    },
    {
      title: 'Be objective:',
      description:
        'The feedback uses subjective language like "not really enough", "long way to go", and "meaningful way." It also makes assumptions about Alex\'s intent with "They should try to be better." It lacks specific examples of actions and their impact.'
    }
  ],
  sharingNote: 'May be shared with Lena'
};
