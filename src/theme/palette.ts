export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  /** App screen background */
  background: string;
  /** Cards / primary raised surfaces */
  surface: string;
  /** Inputs, subtle fills, secondary surfaces */
  surfaceAlt: string;
  /** Bottom sheet / modal container */
  surfaceElevated: string;
  /** Dark hero headers (stay dark in both modes) */
  headerBg: string;
  /** Text on top of headerBg */
  headerText: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  border: string;
  separator: string;
  overlay: string;

  action: string;
  actionSoft: string;
  onAction: string;

  success: string;
  successBg: string;
  danger: string;
  dangerBg: string;
  deleteBtn: string;

  tabBar: string;
  tabActive: string;
  tabInactive: string;

  /** expo-status-bar style */
  statusBar: "light" | "dark";
}

export const lightTheme: ThemeColors = {
  background: "#F9F9F9",
  surface: "#FFFFFF",
  surfaceAlt: "#F9FAFB",
  surfaceElevated: "#F9F9F9",
  headerBg: "#313131",
  headerText: "#D8D8D8",

  textPrimary: "#242424",
  textSecondary: "#374151",
  textTertiary: "#9CA3AF",

  border: "#E5E7EB",
  separator: "#EBEBEB",
  overlay: "rgba(0,0,0,0.5)",

  action: "#C67C4E",
  actionSoft: "#FDF1E7",
  onAction: "#FFFFFF",

  success: "#10B981",
  successBg: "#E8F8F3",
  danger: "#DC2626",
  dangerBg: "#FCEAEA",
  deleteBtn: "#F9032C",

  tabBar: "#FFFFFF",
  tabActive: "#C67C4E",
  tabInactive: "#A2A2A2",

  statusBar: "light",
};

/** Dark palette based on Apple Human Interface Guidelines (dark appearance). */
export const darkTheme: ThemeColors = {
  background: "#141416",
  surface: "#1F1F22",
  surfaceAlt: "#2B2B2F",
  surfaceElevated: "#1F1F22",
  headerBg: "#1F1F22",
  headerText: "#EBEBF5",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(235,235,245,0.62)",
  textTertiary: "rgba(235,235,245,0.32)",

  border: "rgba(120,120,128,0.32)",
  separator: "rgba(120,120,128,0.24)",
  overlay: "rgba(0,0,0,0.60)",

  action: "#C67C4E",
  actionSoft: "rgba(198,124,78,0.18)",
  onAction: "#FFFFFF",

  success: "#30D158",
  successBg: "rgba(48,209,88,0.15)",
  danger: "#FF453A",
  dangerBg: "rgba(255,69,58,0.15)",
  deleteBtn: "#FF453A",

  tabBar: "#1F1F22",
  tabActive: "#C67C4E",
  tabInactive: "rgba(235,235,245,0.45)",

  statusBar: "light",
};

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};
