// components/DraggableItem.tsx
import React from "react";
import { animated, to as interpolate } from "react-spring";
import { SpringValue } from "react-spring";

interface DraggableItemProps {
  style: {
    y: SpringValue<number>;
    scale: SpringValue<number>;
    zIndex: SpringValue<number>;
    shadow: SpringValue<number>;
  };
  bind: (...args: any[]) => { [key: string]: any };
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  style,
  bind,
  children,
}) => (
  <animated.div
    {...bind}
    style={{
      zIndex: style.zIndex,
      boxShadow: style.shadow.to(
        (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
      ),
      transform: interpolate(
        [style.y, style.scale],
        (y, s) => `translate3d(0,${y}px,0) scale(${s})`
      ),
    }}
  >
    {children}
  </animated.div>
);

export default DraggableItem;
