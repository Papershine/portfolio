import { useEffect, useState } from "react";
import GraphemeSplitter from 'grapheme-splitter';


export default function Typewriter({ text, speed }: { text: string, speed: number }) {
  const [displayed, setDisplayed] = useState<string>("");

  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(text);

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

  return <span>{displayed}&nbsp;</span>;
}