/* Server-rendered split heading: every word sits in its own mask so it can rise into view.
   *word* (or *several words*) renders in gilded italic; "|" forces a new line. */
type Props = { text: string; as?: React.ElementType; className?: string; load?: boolean; id?: string; lineClass?: (i: number) => string | undefined };

export default function Split({ text, as: Tag = "h2", className, load, id, lineClass }: Props) {
  let italic = false;
  const lines = text.split("|").map((line) =>
    line.trim().split(/\s+/).map((raw) => {
      let w = raw, open = italic;
      if (w.startsWith("*")) { open = true; w = w.slice(1); }
      const closes = w.endsWith("*");
      if (closes) w = w.slice(0, -1);
      italic = open && !closes;
      return { w, em: open };
    }),
  );
  return (
    <Tag className={className} data-split={load ? "load" : ""} id={id} aria-label={text.replace(/[*|]/g, "").replace(/\s+/g, " ")}>
      {lines.map((words, li) => (
        <span key={li} className={lineClass?.(li) ?? (lines.length > 1 ? "r" : undefined)} aria-hidden="true" style={lines.length > 1 && !lineClass ? { display: "block" } : undefined}>
          {words.map(({ w, em }, wi) => (
            <span key={wi}>
              <span className="sw"><span>{em ? <em>{w}</em> : w}</span></span>
              {wi < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
