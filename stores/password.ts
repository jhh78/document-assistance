import { create } from "zustand";

export const TITLE_PAGE = "title";
export const GAME_PAGE = "game";

type PasswordStoreType = {
  password: string;
  setPassword: (password: string) => void;

  passwordLength: number;
  setPasswordLength: (passwordLength: number) => void;
};

export const usePasswordStore = create<PasswordStoreType>((set) => ({
  password: "",
  setPassword: (password) => set({ password }),

  passwordLength: 8,
  setPasswordLength: (passwordLength) => set({ passwordLength }),
}));
