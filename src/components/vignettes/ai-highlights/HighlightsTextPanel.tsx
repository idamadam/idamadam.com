import { aiHighlightsContent } from './content';
import DecisionStories, {
  DecisionStory,
} from '../shared/DecisionStories';

function ProjectName() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="size-1.5 rounded-full bg-neutral-400" />
      <span className="text-[13px] font-medium tracking-tight text-primary font-[family-name:var(--font-inter)]">
        {aiHighlightsContent.projectName}
      </span>
    </div>
  );
}

interface HighlightsTextPanelProps {
  onActiveStoryChange?: (story: DecisionStory | null) => void;
}

export default function HighlightsTextPanel({
  onActiveStoryChange,
}: HighlightsTextPanelProps) {
  return (
    <div className="flex flex-col">
      <ProjectName />

      {/* Headline */}
      <h3 className="type-h2 text-primary">{aiHighlightsContent.headline}</h3>

      {/* Body */}
      <p className="type-body text-primary mt-5">{aiHighlightsContent.body}</p>
      {aiHighlightsContent.keyResult && (
        <p className="type-body text-primary mt-4">
          <span className="key-result-label">Key result: </span>
          {aiHighlightsContent.keyResult}
        </p>
      )}

      {/* Decision stories */}
      <DecisionStories
        stories={aiHighlightsContent.decisionStories}
        onActiveStoryChange={onActiveStoryChange}
      />
    </div>
  );
}
