import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "../src/hooks/useDebounce";

describe("useDebounce Hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should return the initial value", () => {
    const { result } = renderHook(() => useDebounce("first_value", 300));

    expect(result.current).toBe("first_value");
  });

  test("should update the value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "first_value", delay: 300 } },
    );

    rerender({ value: "new_value", delay: 300 });

    expect(result.current).toBe("first_value");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("new_value");
  });

  test("should get the latest value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "first_value", delay: 300 } },
    );

    rerender({ value: "second_value", delay: 300 });

    expect(result.current).toBe("first_value");

    rerender({ value: "third_value", delay: 300 });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current).toBe("third_value");
  });

  test("should work with number type as well", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: number; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: 100, delay: 300 } },
    );

    rerender({ value: 200, delay: 300 });

    expect(result.current).toBe(100);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(200);
  });

  test("should work with null and undefined values", () => {
    const { result, rerender } = renderHook(
      ({
        value,
        delay,
      }: {
        value: string | null | undefined | number;
        delay: number;
      }) => useDebounce(value, delay),
      {
        initialProps: {
          value: null as string | null | undefined | number,
          delay: 300,
        },
      },
    );

    expect(result.current).toBeNull();

    rerender({ value: undefined, delay: 300 });

    expect(result.current).toBeNull();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBeUndefined();
  });
});
