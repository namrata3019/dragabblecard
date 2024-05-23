// components/DraggableList.tsx
import React, { useRef } from "react";
import clamp from "lodash-es/clamp";
import swap from "lodash-move";
import { useGesture } from "@use-gesture/react";
import { useSprings } from "react-spring";
import DraggableItem from "./DraggableItem";
import { getSpringStyles } from "../utils/springStyles";

interface DraggableListProps {
  items: string[];
}

const DraggableList: React.FC<DraggableListProps> = ({ items }) => {
  const order = useRef(items.map((_, index) => index)); // Store indices as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, (index) =>
    getSpringStyles({
      order: order.current,
      down: false,
      originalIndex: -1,
      curIndex: -1,
      y: 0,
    })(index)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useGesture({
    onDrag: ({ args: [originalIndex], down, movement: [_, y] }) => {
      const curIndex = order.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * 100 + y) / 100),
        0,
        items.length - 1
      );
      const newOrder = swap(order.current, curIndex, curRow);
      setSprings((index) =>
        getSpringStyles({ order: newOrder, down, originalIndex, curIndex, y })(
          index
        )
      );
      if (!down) order.current = newOrder;
    },
  });

  return (
    <div className="content" style={{ height: items.length * 100 }}>
      {springs.map((style, i) => (
        <DraggableItem key={i} style={style} bind={bind(i)}>
          {items[i]}
        </DraggableItem>
      ))}
    </div>
  );
};

export default DraggableList;
