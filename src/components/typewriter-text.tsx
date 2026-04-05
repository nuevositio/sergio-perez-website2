"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  texts: string[];
  /** ms por caracter al escribir */
  typingSpeed?: number;
  /** ms por caracter al borrar */
  deletingSpeed?: number;
  /** pausa (ms) después de escribir toda la frase */
  pauseAfterWrite?: number;
  /** pausa (ms) antes de empezar a escribir la siguiente */
  pauseBeforeWrite?: number;
  className?: string;
}

export default function TypewriterText({
  texts,
  typingSpeed = 55,
  deletingSpeed = 28,
  pauseAfterWrite = 2200,
  pauseBeforeWrite = 400,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const indexRef = useRef(0); // índice del texto actual
  const charRef = useRef(0);  // posición del carácter

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      const target = texts[indexRef.current];
      if (charRef.current < target.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, charRef.current + 1));
          charRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseAfterWrite);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (charRef.current > 0) {
        timeout = setTimeout(() => {
          charRef.current -= 1;
          setDisplayed(texts[indexRef.current].slice(0, charRef.current));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          indexRef.current = (indexRef.current + 1) % texts.length;
          setPhase("waiting");
        }, pauseBeforeWrite);
      }
    } else if (phase === "waiting") {
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [phase, displayed, texts, typingSpeed, deletingSpeed, pauseAfterWrite, pauseBeforeWrite]);

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden="true"
        className="ml-[2px] inline-block w-[2px] animate-blink bg-current align-text-bottom"
        style={{ height: "1.1em" }}
      />
    </span>
  );
}
