const Questions = [
  {
    id: "interaction_frequency",
    title: "Interaction Frequency",
    questions: [
      {
        id: "interaction_X",
        text: "How often do you interact with this person?",
      },
      {
        id: "interaction_Y",
        text: "How often does this person interact with you?",
      },
    ],
  },
  {
    id: "trust_level",
    title: "Trust Level",
    questions: [
      {
        id: "trust_X",
        text: "How much do you trust this person?",
      },
      {
        id: "trust_Y",
        text: "How much does this person trust you?",
      },
    ],
  },
  {
    id: "conversational_depth",
    title: "Conversational Depth",
    questions: [
      {
        id: "convo_X",
        text: "How deep do you usually go while in conversation with this person?",
      },
      {
        id: "convo_Y",
        text: "How deep does this person go while in conversation with you?",
      },
    ],
  },
  {
    id: "emotional_depth",
    title: "Emotional Depth",
    questions: [
      {
        id: "emotional_X",
        text: "How emotionally attached are you to this person?",
      },
      {
        id: "emotional_Y",
        text: "How emotionally attached is this person to you?",
      },
    ],
  },
  {
    id: "enjoyment_positivity",
    title: "Enjoyment / Positivity",
    questions: [
      {
        id: "happiness_X",
        text: "How happy does interacting with this person make you?",
      },
      {
        id: "happiness_Y",
        text: "How happy is this person when interacting with you?",
      },
    ],
  },
  {
    id: "effort",
    title: "Effort",
    questions: [
      {
        id: "effort_X",
        text: "How much effort do you put into this relationship?",
      },
      {
        id: "effort_Y",
        text: "How much effort has this person put into this relationship?",
      },
    ],
  },
  {
    id: "growth_future",
    title: "Growth / Future",
    questions: [
      {
        id: "growth_alignment",
        text: "How aligned are your future goals with this person?",
      },
    ],
  },
];

export default Questions;

[
  { id: 1, name: "joe" },
  { id: 2, name: "joe" },
  { id: 3, name: "joey" },
  { id: 4, name: "joi" },
  { id: 5, name: "joiy" },
  { id: 6, name: "joy" },
  { id: 7, name: "joye" },
  { id: 8, name: "joji" },
  {
    id: 9,
    name: "jocky",
    quizAnswers: {
      convo_X: 1,
      convo_Y: 2,
      effort_X: 1,
      effort_Y: 2,
      emotional_X: 1,
      emotional_Y: 2,
      growth_alignment: 2,
      happiness_X: 1,
      happiness_Y: 2,
      interaction_X: 1,
      interaction_Y: 2,
      trust_X: 1,
      trust_Y: 2,
    },
  },
];

[
  { id: 1, name: "joe" },
  { id: 2, name: "joe" },
  { id: 3, name: "joey" },
  { id: 4, name: "joi" },
  { id: 5, name: "joiy" },
  { id: 6, name: "joy" },
  { id: 7, name: "joye" },
  { id: 8, name: "joji" },
  {
    id: 9,
    name: "jocky",
    quizAnswers: {
      convo_X: 1,
      convo_Y: 2,
      effort_X: 1,
      effort_Y: 2,
      emotional_X: 1,
      emotional_Y: 2,
      growth_alignment: 2,
      happiness_X: 1,
      happiness_Y: 2,
      interaction_X: 1,
      interaction_Y: 2,
      trust_X: 1,
      trust_Y: 2,
    },
  },
  {
    id: 10,
    name: "rocky",
    quizAnswers: {
      convo_X: 1,
      convo_Y: 0,
      effort_X: 0,
      effort_Y: 1,
      emotional_X: 1,
      emotional_Y: 2,
      growth_alignment: -1,
      happiness_X: 1,
      happiness_Y: 1,
      interaction_X: 2,
      interaction_Y: 1,
      trust_X: 1,
      trust_Y: 2,
    },
  },
];
