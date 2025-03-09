import { HolidayResponseType } from "@/type/holiday";
import { create } from "zustand";

export const TITLE_PAGE = "title";
export const GAME_PAGE = "game";

type HolidayStoreType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string;
  setError: (error: string) => void;

  holidays: HolidayResponseType[];
  setHolidays: (holidays: HolidayResponseType[]) => void;
};

export const useHolidayStore = create<HolidayStoreType>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),

  error: "",
  setError: (error) => set({ error }),

  holidays: [],
  setHolidays: (holidays) => set({ holidays }),
}));
