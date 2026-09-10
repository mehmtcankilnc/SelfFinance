import { useTheme } from "../store/useTheme";
import { ThemeColors, themes } from "./palette";

interface UseThemeColors {
  c: ThemeColors;
  isDark: boolean;
  mode: "light" | "dark";
}

/**
 * Returns the active theme's semantic color tokens.
 * `c` is the palette, `isDark` a convenience flag, `mode` the raw value.
 */
export function useThemeColors(): UseThemeColors {
  const mode = useTheme((state) => state.mode);
  return { c: themes[mode], isDark: mode === "dark", mode };
}
