import { create } from "zustand";

export const TITLE_PAGE = "title";
export const GAME_PAGE = "game";

type TypingGameStoreType = {
  screenMode: typeof TITLE_PAGE | typeof GAME_PAGE;
  csvData: string[];
  score: number;
  initStore: () => void;
  setCsvData: (data: string[]) => void;
  setScreenMode: (mode: typeof TITLE_PAGE | typeof GAME_PAGE) => void;
  setAnswer: (answer: string) => void;
};

export const useTypingGameStore = create<TypingGameStoreType>((set) => ({
  screenMode: TITLE_PAGE,
  csvData: [],
  score: 0,
  initStore: () => set({ screenMode: TITLE_PAGE, csvData: [], score: 0 }),
  setCsvData: (data) => set({ csvData: data }),
  setScreenMode: (mode) => set({ screenMode: mode }),
  setAnswer: (answer) => {
    console.log(answer);
    set((state) => {
      const newData = state.csvData.filter((data) => data === answer);
      return { csvData: newData };
    });
  },
}));
