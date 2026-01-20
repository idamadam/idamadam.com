import { aiSuggestionsContent } from './content';
import ProcessNotes from '../shared/ProcessNotes';

function ProjectName() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="size-1.5 rounded-full bg-accent-600" />
      <span className="text-[13px] font-medium tracking-tight text-primary font-[family-name:var(--font-inter)]">
        {aiSuggestionsContent.projectName}
      </span>
    </div>
  );
}

export default function SuggestionsTextPanel() {
  return (
    <div className="flex flex-col">
      <ProjectName />

      {/* Headline */}
      <h3 className="type-h2 text-primary">{aiSuggestionsContent.headline}</h3>

      {/* Body */}
      <p className="type-body text-primary mt-5">{aiSuggestionsContent.body}</p>
      {aiSuggestionsContent.keyResult && (
        <p className="type-body text-primary mt-4">
          <span className="key-result-label">Key result: </span>
          {aiSuggestionsContent.keyResult}
        </p>
      )}

      {/* Process notes */}
      <ProcessNotes notes={aiSuggestionsContent.processNotes} />
    </div>
  );
}
