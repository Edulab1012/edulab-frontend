import { create } from "zustand";

interface TimerState {
  hour: number;
  minute: number;
  second: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => {
  let interval: NodeJS.Timeout | null = null;

  return {
    hour: 0,
    minute: 0,
    second: 0,
    isRunning: false,

    start: () => {
      if (!get().isRunning) {
        interval = setInterval(() => get().tick(), 1000);
        set({ isRunning: true });
      }
    },

    stop: () => {
      if (interval) clearInterval(interval);
      interval = null;
      set({ isRunning: false });
    },

    reset: () => {
      if (interval) clearInterval(interval);
      interval = null;
      set({ hour: 0, minute: 0, second: 0, isRunning: false });
    },

    tick: () => {
      const { second, minute, hour } = get();
      if (second + 1 === 60) {
        if (minute + 1 === 60) {
          set({ hour: hour + 1, minute: 0, second: 0 });
        } else {
          set({ minute: minute + 1, second: 0 });
        }
      } else {
        set({ second: second + 1 });
      }
    },
  };
});