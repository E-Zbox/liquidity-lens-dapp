import { create } from "zustand";
// .
import { IRecord } from ".";
// utils
import { theme } from "@/utils/data";

interface IThemeStore {
  isDark: boolean;
  state: IRecord;
  toggleIsDark: () => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
  isDark: true,
  state: theme.dark,
  toggleIsDark: () =>
    set((_state) => ({
      isDark: !_state.isDark,
      state: _state.isDark ? theme.light : theme.dark,
    })),
}));
