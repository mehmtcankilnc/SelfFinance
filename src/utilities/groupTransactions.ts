import { Transaction } from "../types/types";

export interface TransactionSection {
  /** Day label: "Today", "Yesterday" or "9 September 2025". */
  title: string;
  /** Month label: "September 2025". */
  month: string;
  /** True when this section starts a new month (render a month divider). */
  showMonth: boolean;
  /** Position of this section in the list (0-based). */
  index: number;
  data: Transaction[];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const dayLabel = (date: Date, now: Date): string => {
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / 86_400_000,
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Groups an already date-sorted (newest first) transaction list into
 * one section per calendar day, flagging the first section of each month
 * so the UI can render a month divider.
 */
export function groupBySection(
  transactions: Transaction[],
  now: Date = new Date(),
): TransactionSection[] {
  const sections: TransactionSection[] = [];
  let lastDayKey = "";
  let lastMonthKey = "";

  for (const tx of transactions) {
    const date = new Date(tx.date);
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (dayKey !== lastDayKey) {
      sections.push({
        title: dayLabel(date, now),
        month: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
        showMonth: monthKey !== lastMonthKey,
        index: sections.length,
        data: [tx],
      });
      lastDayKey = dayKey;
      lastMonthKey = monthKey;
    } else {
      sections[sections.length - 1].data.push(tx);
    }
  }

  return sections;
}
