import { useEffect, useState } from "react";

export default function Typewriter({ text, speed }: { text: string, speed: number }) {
  const [displayed, setDisplayed] = useState<string>("");

  const graphemes = [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)].map(s => s.segment);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev: string) => prev + graphemes[i]);
      i++;
      if (i >= graphemes.length - 1) {
        clearInterval(interval);
        document.body.classList.remove("fade-blocked");
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}