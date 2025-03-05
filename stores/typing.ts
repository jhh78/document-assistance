import { create } from "zustand";

export const TITLE_PAGE = "title";
export const GAME_PAGE = "game";

type TypingGameStoreType = {
  screenMode: typeof TITLE_PAGE | typeof GAME_PAGE;
  csvData: string[];
  score: number;
  language: string;
  initStore: () => void;
  setCsvData: (data: string[]) => void;
  setScreenMode: (mode: typeof TITLE_PAGE | typeof GAME_PAGE) => void;
  setAnswer: (answer: string) => void;
  setLanguage: (language: string) => void;
};

export const useTypingGameStore = create<TypingGameStoreType>((set) => ({
  screenMode: TITLE_PAGE,
  csvData: [],
  score: 0,
  language: "",
  setLanguage: (language) => set({ language }),
  initStore: () => set({ screenMode: TITLE_PAGE, csvData: [], score: 0 }),
  setCsvData: (data) => set({ csvData: data }),
  setScreenMode: (mode) => set({ screenMode: mode }),
  setAnswer: (answer) => {
    set(({ csvData }) => ({
      csvData: csvData.filter((data) => data !== answer),
    }));
  },
}));
