// Intro Sequences Configuration
// Easily swap between different messaging for A/B testing

export type AnimationType = "drop" | "pop" | "rotate" | "fade" | "slide" | "scale" | "typewriter";

export interface WordConfig {
  text: string;
  className?: string;
  animation?: AnimationType;
  delay?: number;
}

export interface SequenceConfig {
  words: WordConfig[];
  duration: number;
  layout?: "center" | "stacked" | "scattered";
  sound?: "whoosh" | "pop" | "click" | "success" | null;
}

export interface IntroConfig {
  id: string;
  name: string;
  sequences: SequenceConfig[];
}

// Default "Referral Story" sequence
export const defaultSequences: IntroConfig = {
  id: "referral-story",
  name: "Referral Story",
  sequences: [
    {
      words: [{ text: "You know", animation: "fade" }, { text: "great people.", animation: "pop", className: "text-sage" }],
      duration: 1800,
      layout: "center",
      sound: "pop",
    },
    {
      words: [{ text: "They know", animation: "slide" }, { text: "you.", animation: "scale", className: "font-bold" }],
      duration: 1600,
      layout: "center",
      sound: "whoosh",
    },
    {
      words: [{ text: "That's", animation: "fade" }, { text: "valuable.", animation: "rotate", className: "text-mustard" }],
      duration: 1800,
      layout: "center",
      sound: "pop",
    },
    {
      words: [{ text: "Agencies charge", animation: "drop", className: "text-muted-foreground" }],
      duration: 1200,
      layout: "center",
      sound: "whoosh",
    },
    {
      words: [{ text: "20-25%", animation: "pop", className: "text-rose text-6xl md:text-8xl font-bold" }],
      duration: 1600,
      layout: "center",
      sound: "pop",
    },
    {
      words: [{ text: "You get", animation: "fade" }, { text: "nothing.", animation: "drop", className: "text-muted-foreground line-through" }],
      duration: 1400,
      layout: "center",
      sound: null,
    },
    {
      words: [{ text: "Until now.", animation: "scale", className: "text-foreground font-bold text-5xl md:text-7xl" }],
      duration: 1800,
      layout: "center",
      sound: "success",
    },
    {
      words: [
        { text: "Refer.", animation: "pop", className: "text-sage" },
        { text: "Earn.", animation: "pop", className: "text-mustard", delay: 0.15 },
        { text: "Repeat.", animation: "pop", className: "text-rose", delay: 0.3 },
      ],
      duration: 2200,
      layout: "center",
      sound: "pop",
    },
    {
      words: [{ text: "Referd", animation: "typewriter", className: "text-7xl md:text-9xl font-bold tracking-tight" }],
      duration: 2500,
      layout: "center",
      sound: "click",
    },
  ],
};

// Alternative "Problem-Solution" sequence for A/B testing
export const problemSolutionSequences: IntroConfig = {
  id: "problem-solution",
  name: "Problem Solution",
  sequences: [
    {
      words: [{ text: "Hiring is", animation: "fade" }, { text: "broken.", animation: "drop", className: "text-rose" }],
      duration: 1600,
      layout: "center",
      sound: "whoosh",
    },
    {
      words: [{ text: "Recruiters take", animation: "slide" }, { text: "too much.", animation: "pop", className: "font-bold" }],
      duration: 1600,
      layout: "center",
      sound: "pop",
    },
    {
      words: [{ text: "Your network", animation: "fade" }, { text: "is untapped.", animation: "rotate", className: "text-mustard" }],
      duration: 1800,
      layout: "center",
      sound: "whoosh",
    },
    {
      words: [{ text: "What if you", animation: "fade" }, { text: "got paid?", animation: "scale", className: "text-sage font-bold" }],
      duration: 1800,
      layout: "center",
      sound: "success",
    },
    {
      words: [{ text: "Referd", animation: "typewriter", className: "text-7xl md:text-9xl font-bold tracking-tight" }],
      duration: 2500,
      layout: "center",
      sound: "click",
    },
  ],
};

// Minimal "Direct" sequence
export const minimalSequences: IntroConfig = {
  id: "minimal",
  name: "Minimal Direct",
  sequences: [
    {
      words: [{ text: "Your connections.", animation: "fade", className: "text-muted-foreground" }],
      duration: 1400,
      layout: "center",
      sound: null,
    },
    {
      words: [{ text: "Your earnings.", animation: "fade", className: "text-muted-foreground" }],
      duration: 1400,
      layout: "center",
      sound: null,
    },
    {
      words: [{ text: "Referd", animation: "typewriter", className: "text-7xl md:text-9xl font-bold tracking-tight" }],
      duration: 2500,
      layout: "center",
      sound: "click",
    },
  ],
};

// All available sequences for A/B testing
export const allSequences: IntroConfig[] = [
  defaultSequences,
  problemSolutionSequences,
  minimalSequences,
];

// Get a random sequence for A/B testing
export const getRandomSequence = (): IntroConfig => {
  const index = Math.floor(Math.random() * allSequences.length);
  return allSequences[index];
};

// Get sequence by ID
export const getSequenceById = (id: string): IntroConfig | undefined => {
  return allSequences.find((seq) => seq.id === id);
};

// Current active sequence (change this for quick testing)
export const activeSequenceId = "referral-story";

export const getActiveSequence = (): IntroConfig => {
  return getSequenceById(activeSequenceId) || defaultSequences;
};
