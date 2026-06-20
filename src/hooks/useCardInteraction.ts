import { useMotionValue, useMotionTemplate } from 'motion/react';
import { useCallback } from 'react';

export function useCardInteraction() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  return { onMouseMove, mouseX, mouseY };
}
