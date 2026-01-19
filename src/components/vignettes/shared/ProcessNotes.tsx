interface ProcessNotesProps {
  notes: string[];
}

export default function ProcessNotes({ notes }: ProcessNotesProps) {
  if (notes.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2 mt-2">
      {notes.map((note, index) => (
        <li key={index} className="flex items-start gap-2 py-1">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-600 mt-[7px]" />
          <span className="type-body-sm text-primary">{note}</span>
        </li>
      ))}
    </ul>
  );
}
