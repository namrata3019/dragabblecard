// utils/springStyles.ts
interface SpringStylesParams {
  order: number[];
  down: boolean;
  originalIndex: number;
  curIndex: number;
  y: number;
}

interface SpringStyles {
  y: number;
  scale: number;
  zIndex: number;
  shadow: number;
  immediate: (key: string) => boolean;
}

export const getSpringStyles =
  ({ order, down, originalIndex, curIndex, y }: SpringStylesParams) =>
  (index: number): SpringStyles => {
    return down && index === originalIndex
      ? {
          y: curIndex * 100 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key) => key === "y" || key === "zIndex",
        }
      : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: () => false,
        };
  };
