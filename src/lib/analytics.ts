import posthog from 'posthog-js';

export type VignetteId =
  | 'ai-highlights'
  | 'ai-suggestions'
  | 'prototyping'
  | 'multilingual'
  | 'home-connect'
  | 'vibe-coding';

export function trackVignetteViewed(vignetteId: VignetteId) {
  posthog.capture('vignette_viewed', {
    vignette_id: vignetteId,
  });
}

export function trackDesignDetailViewed(vignetteId: VignetteId, detailNumber: number) {
  posthog.capture('design_detail_viewed', {
    vignette_id: vignetteId,
    detail_number: detailNumber,
  });
}

export function trackProcessNotesExpanded(vignetteId: VignetteId) {
  posthog.capture('process_notes_expanded', {
    vignette_id: vignetteId,
  });
}

export function trackExternalLinkClicked(linkId: string, destinationUrl: string) {
  posthog.capture('external_link_clicked', {
    link_id: linkId,
    destination_url: destinationUrl,
  });
}
