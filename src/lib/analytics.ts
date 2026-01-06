import posthog from 'posthog-js';

export type VignetteId =
  | 'ai-highlights'
  | 'ai-suggestions'
  | 'prototyping'
  | 'multilingual'
  | 'home-connect'
  | 'vibe-coding';

export type VignetteStage = 'solution' | 'designNotes';

const SOLUTION_VIEW_THRESHOLD = 3;
let solutionViewCount = 0;
let surveyEventFired = false;

export function trackVignetteInteracted(vignetteId: VignetteId, stage: VignetteStage) {
  posthog.capture('vignette_interacted', {
    vignette_id: vignetteId,
    stage,
  });

  if (stage === 'solution') {
    solutionViewCount++;
    if (solutionViewCount >= SOLUTION_VIEW_THRESHOLD && !surveyEventFired) {
      surveyEventFired = true;
      posthog.capture('portfolio_feedback_ready');
    }
  }
}

export function trackDesignNoteViewed(vignetteId: VignetteId, noteId: string) {
  posthog.capture('design_note_viewed', {
    vignette_id: vignetteId,
    note_id: noteId,
  });
}

export function trackExternalLinkClicked(linkId: string, destinationUrl: string) {
  posthog.capture('external_link_clicked', {
    link_id: linkId,
    destination_url: destinationUrl,
  });
}
