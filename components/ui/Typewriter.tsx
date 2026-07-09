"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  strings: string[];
}

export function Typewriter({ strings }: TypewriterProps) {
  const [text, setText] = useState("");
  const gIdx = useRef(0);
  const cIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const current = strings[gIdx.current];
      if (deleting.current) {
        cIdx.current--;
        setText(current.slice(0, cIdx.current));
        if (cIdx.current === 0) {
          deleting.current = false;
          gIdx.current = (gIdx.current + 1) % strings.length;
          timeoutId = setTimeout(tick, 400);
          return;
        }
        timeoutId = setTimeout(tick, 35);
      } else {
        cIdx.current++;
        setText(current.slice(0, cIdx.current));
        if (cIdx.current === current.length) {
          deleting.current = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
        timeoutId = setTimeout(tick, 75 + Math.random() * 50);
      }
    }

    timeoutId = setTimeout(tick, 100);

    return () => clearTimeout(timeoutId);
  }, [strings]);

  return (
    <>
      {text}
      <span className="cursor"></span>
    </>
  );
}
