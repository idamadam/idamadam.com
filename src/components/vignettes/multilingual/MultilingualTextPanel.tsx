import { multilingualContent } from './content';
import ProcessNotes from '../shared/ProcessNotes';

function ProjectName() {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="size-1.5 rounded-full bg-accent-600" />
      <div className="w-5 h-px bg-black/10" />
      <div className="size-1.5 rounded-full bg-black/10" />
      <span className="ml-1.5 text-[13px] font-medium tracking-tight text-primary">
        {multilingualContent.projectName}
      </span>
    </div>
  );
}

export default function MultilingualTextPanel() {
  return (
    <div className="flex flex-col">
      <ProjectName />

      {/* Headline */}
      <h3 className="type-h2 text-primary">{multilingualContent.headline}</h3>

      {/* Body */}
      <p className="type-body text-primary mt-4">{multilingualContent.body}</p>

      {/* Process notes */}
      <ProcessNotes notes={multilingualContent.processNotes} />
    </div>
  );
}
