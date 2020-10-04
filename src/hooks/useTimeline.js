import { useRef, useEffect, useCallback } from "react";

// stores an array of timelineNodes and provides the ability to navigate using ctrl-z and ctrl-shift-z
// exposes a function to add timelineNodes
// Each node must be a object with (action, counter) methods
// action being the action taken to reach that point in time.
// counter being a function to reverse the action taken.

export default function useTimeline(history) {
  const timeline = useRef([...history]);
  const pointInTime = useRef(history.length);

  useEffect(() => {
    function getPrevState() {
      if (pointInTime.current <= 0) return;
      const prevPoint = pointInTime.current - 1;
      pointInTime.current = prevPoint;
      timeline.current[prevPoint].counter();
    }

    function getNextState() {
      if (pointInTime.current >= timeline.current.length) return;
      const now = pointInTime.current;
      pointInTime.current = now + 1;
      timeline.current[now].action();
    }

    const handleKeypress = (e) => {
      if (!e.shiftKey && e.metaKey && e.key === "z") {
        getPrevState();
      } else if (e.shiftKey && e.metaKey && e.key === "z") getNextState();
    };
    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  const addToTimeline = useCallback(
    (timelineNode) => {
      const newTimeline = [
        ...timeline.current.slice(0, pointInTime.current),
        timelineNode,
      ];
      timeline.current = newTimeline;
      pointInTime.current = pointInTime.current + 1;
    },
    []
  );

  return [addToTimeline];
}
