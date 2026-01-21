// ============================================================
// INTRO SEQUENCES CONFIGURATION
// ============================================================
// 
// 🎬 HOW TO EDIT THE INTRO:
// 
// 1. Find the sequence you want to edit (defaultSequences, problemSolutionSequences, etc.)
// 2. Each sequence has an array of "screens" - each screen shows for its duration
// 3. Each screen has "words" - these animate in together
// 
// 📝 WORD OPTIONS:
//   text: "Your text here"
//   animation: "typewriter" | "drop" | "pop" | "rotate" | "fade" | "slide" | "scale" | "shake" | "bounce" | "glitch"
//   className: Tailwind classes for styling (colors, sizes, fonts)
//   delay: Stagger delay in seconds (0.1 = 100ms after previous word)
// 
// 🔊 SOUND OPTIONS (per screen):
//   sound: "whoosh" | "pop" | "click" | "success" | null
// 
// ⏱️ TIMING:
//   duration: How long the screen shows in milliseconds (1000 = 1 second)
// 
// 🎨 EXAMPLE:
//   { text: "Hello", animation: "typewriter", className: "text-sage text-6xl" }
//   { text: "World", animation: "rotate", className: "text-mustard", delay: 0.2 }
// 
// ============================================================

export type AnimationType = "drop" | "pop" | "rotate" | "fade" | "slide" | "scale" | "typewriter" | "shake" | "bounce" | "glitch";

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

// ============================================================
// DEFAULT "REFERRAL STORY" SEQUENCE
// This is the main intro - edit this to change what users see!
// ============================================================
export const defaultSequences: IntroConfig = {
  id: "referral-story",
  name: "Referral Story",
  sequences: [
    {
      words: [
        { text: "You know", animation: "typewriter" },
        { text: "great people.", animation: "typewriter", className: "text-sage", delay: 0.8 }
      ],
      duration: 2400,
      layout: "center",
      sound: "click",
    },
    {
      words: [
        { text: "They", animation: "typewriter" },
        { text: "know", animation: "typewriter", delay: 0.3 },
        { text: "you.", animation: "pop", className: "font-bold text-mustard", delay: 0.6 }
      ],
      duration: 2200,
      layout: "center",
      sound: "click",
    },
    {
      words: [
        { text: "That's", animation: "fade" },
        { text: "valuable.", animation: "rotate", className: "text-sage italic", delay: 0.3 }
      ],
      duration: 1800,
      layout: "center",
      sound: "whoosh",
    },
    {
      words: [
        { text: "Agencies", animation: "slide" },
        { text: "charge", animation: "slide", delay: 0.15 }
      ],
      duration: 1400,
      layout: "center",
      sound: null,
    },
    {
      words: [
        { text: "20–25%", animation: "shake", className: "text-rose text-6xl md:text-8xl font-bold" }
      ],
      duration: 1800,
      layout: "center",
      sound: "pop",
    },
    {
      words: [
        { text: "You get", animation: "fade", className: "text-muted-foreground" },
        { text: "nothing.", animation: "glitch", className: "line-through text-muted-foreground", delay: 0.4 }
      ],
      duration: 1600,
      layout: "center",
      sound: null,
    },
    {
      words: [
        { text: "Until", animation: "fade" },
        { text: "now.", animation: "bounce", className: "text-foreground font-bold text-5xl md:text-7xl", delay: 0.4 }
      ],
      duration: 2000,
      layout: "center",
      sound: "success",
    },
    {
      words: [
        { text: "Refer.", animation: "pop", className: "text-sage" },
        { text: "Earn.", animation: "pop", className: "text-mustard", delay: 0.2 },
        { text: "Repeat.", animation: "rotate", className: "text-rose", delay: 0.4 }
      ],
      duration: 2400,
      layout: "center",
      sound: "pop",
    },
    {
      words: [
        { text: "Referd", animation: "typewriter", className: "text-7xl md:text-9xl font-bold tracking-tight" }
      ],
      duration: 3000,
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
