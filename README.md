# SelfFinance

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Zustand-5-443E38?style=for-the-badge" alt="Zustand" />
</p>

A simple React Native app for tracking personal income and expenses — entirely on-device, with no login and no backend. Add transactions, search and filter them, swipe to delete, and see where your money goes with a category breakdown chart.

> [!NOTE]
> 💸 **Project Status:** Functional and actively refined. Built as a minimal, local-first finance tracker — a transaction list, an analytics screen, and a profile screen, nothing more.

---

## 🛠 Tech Stack

| Domain            | Technology                                                                                   |
| :---------------- | :------------------------------------------------------------------------------------------- |
| **Framework**     | React Native (Expo, dev-client build — not compatible with Expo Go, see below)               |
| **Language**      | TypeScript                                                                                   |
| **Navigation**    | React Navigation (bottom tabs + stack)                                                       |
| **Styling**       | NativeWind (Tailwind for React Native), light/dark theme                                     |
| **State**         | Zustand, persisted to MMKV via a custom `StateStorage` adapter                               |
| **Forms**         | `react-hook-form` + `zod` schema validation                                                  |
| **Lists**         | React Native `SectionList` (day-grouped, with month dividers)                                |
| **Animations**    | `react-native-reanimated`, `react-native-gesture-handler` (swipeable rows, draggable sheet)  |
| **Charts / Icons**| `react-native-svg` (pie chart), `smooth-icon`                                                |
| **Haptics**       | `expo-haptics`                                                                               |
| **Testing**       | Jest (`jest-expo`) + `@testing-library/react-native`                                         |

No backend, no analytics, no third-party services — every record lives in MMKV on the device.

---

## 🚀 Getting Started

### Prerequisites

Node.js and npm, plus an Android/iOS device or emulator with a **development build** installed.

> [!WARNING]
> This project can **not** run inside the plain Expo Go app. `react-native-mmkv` is a native module that requires a custom dev client build.

### Installation & Setup

1. **Clone the repository and enter the project folder:**

   ```bash
   git clone https://github.com/mehmtcankilnc/SelfFinance.git
   cd SelfFinance
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build and install a dev client** (only needed once, or after native deps/config change):

   ```bash
   npx expo run:android   # or: npx expo run:ios
   ```

4. **Start Metro and run the app:**

   ```bash
   npx expo start --dev-client
   ```

   Open the already-installed dev client on your device/emulator — it connects to Metro automatically.

5. **Run the tests** (optional):

   ```bash
   npm test
   ```

> [!IMPORTANT]
> No `.env` file or credentials are needed — the app has no backend to configure. Everything runs and persists locally on the device.

---

## 📐 Technical Architecture & Decisions

### 🗂️ Three screens, one flow

- **Home** — a greeting header with search, type (all / income / expense), category and date (today / this week / this month) filters, and a day-grouped transaction list ("Today", "Yesterday", then full dates) with month dividers. Tap a row to edit it; swipe it to delete.
- **Analytics** — income, expense and balance summary cards plus a category pie chart that toggles between income and expense, driven by an animated segmented control.
- **Profile** — display name, currency, avatar and profile color, a light/dark theme toggle, and a confirmed "clear all transactions" action. Reached from the header avatar, never part of the tab bar.

### ➕ Add / edit via a global bottom sheet

The center `+` button in the tab bar opens a single, app-wide draggable bottom sheet (`GlobalBottomSheet`) that hosts the add-transaction form, the edit-transaction form and the profile editor. Which content is shown is a small Zustand store (`useBottomSheet`), so any screen can open it without prop drilling. Forms are built with `react-hook-form` and validated by a `zod` schema (`addTransactionSchema`); category choices come from separate income and expense category lists.

### 👆 Swipeable rows

`SwipeableRow` is a custom gesture-driven row built on `react-native-gesture-handler` and `react-native-reanimated` (worklets run on the UI thread). Dragging reveals a delete action; dragging past a threshold or flicking fast triggers a full-swipe delete, with spring physics and haptic feedback at the key moments.

### 🔍 Search & filtering

Search text is debounced (`useDebounce`, 300 ms) and combined with the type, category and date filters using AND logic. Filtering is a pure `useMemo` over the persisted transaction array, and the result is grouped by day (`groupBySection`) before being handed to `SectionList` — so the list never remounts while you type.

### 🎨 Theming

Colors live in a single palette (`src/theme/palette.ts`) and are exposed through a `useThemeColors` hook, so every component reads light or dark values from one place. The selected theme and the profile (name, currency, avatar, color) are persisted just like the transactions.

### 💾 Local-first persistence

Each Zustand store uses the `persist` middleware with a tiny adapter over `react-native-mmkv` (`src/utilities/storage.ts`). MMKV reads and writes are synchronous, so there is no loading state on startup. Running totals (income, expense, balance) are kept in the transactions store and updated on every add, edit and delete.

### 🧪 Tests

Unit tests cover the pure logic: `groupBySection` (Today / Yesterday / date labels and month dividers) and the `useDebounce` hook.

---

## 📜 License

Built as a personal project for tracking day-to-day income and expenses.
