import { groupBySection } from "../src/utilities/groupTransactions";
import { Transaction } from "../src/types/types";

const tx = (id: number, date: string): Transaction => ({
  id,
  type: "expense",
  title: `tx-${id}`,
  category: { id: 1, title: "Bills", colorCode: "#000" },
  date: new Date(date) as unknown as Date,
  amount: "10",
});

describe("groupBySection", () => {
  const now = new Date("2026-09-10T12:00:00");

  test("returns an empty array for no transactions", () => {
    expect(groupBySection([], now)).toEqual([]);
  });

  test("labels today and yesterday relative to `now`", () => {
    const sections = groupBySection(
      [tx(1, "2026-09-10T09:00:00"), tx(2, "2026-09-09T09:00:00")],
      now,
    );
    expect(sections.map((s) => s.title)).toEqual(["Today", "Yesterday"]);
  });

  test("groups multiple transactions from the same day into one section", () => {
    const sections = groupBySection(
      [tx(1, "2026-09-10T09:00:00"), tx(2, "2026-09-10T18:00:00")],
      now,
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].data).toHaveLength(2);
  });

  test("flags the first section of each month with showMonth", () => {
    const sections = groupBySection(
      [
        tx(1, "2026-09-10T09:00:00"),
        tx(2, "2026-09-02T09:00:00"),
        tx(3, "2026-08-30T09:00:00"),
      ],
      now,
    );
    expect(sections.map((s) => s.showMonth)).toEqual([true, false, true]);
    expect(sections[2].month).toBe("August 2026");
  });

  test("uses an absolute label for older days", () => {
    const sections = groupBySection([tx(1, "2026-09-02T09:00:00")], now);
    expect(sections[0].title).toBe("2 September 2026");
  });
});
