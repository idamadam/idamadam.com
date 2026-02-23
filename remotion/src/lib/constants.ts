export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1080;

// Scene durations in frames
export const INTRO_DURATION = 90; // 3.0s
export const BROWSER_DEMO_DURATION = 660; // 22.0s
export const OUTRO_DURATION = 120; // 4.0s

// Transition overlap
export const TRANSITION_FRAMES = 15; // 0.5s fade

// Total duration (scenes minus overlapping transitions)
export const TOTAL_FRAMES =
  INTRO_DURATION +
  BROWSER_DEMO_DURATION +
  OUTRO_DURATION -
  TRANSITION_FRAMES * 2; // 2 transitions between 3 scenes = 840

// Browser frame
export const BROWSER_WIDTH = 960;
export const BROWSER_PADDING = 60;
