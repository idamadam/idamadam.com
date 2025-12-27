'use client';

import { DESIGN_NOTES_ACCENT } from './constants';

interface DesignNotesButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function DesignNotesButton({
  isActive,
  onToggle,
}: DesignNotesButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="btn-interactive px-3 py-2 rounded-lg border transition-colors"
      style={{
        backgroundColor: isActive ? `${DESIGN_NOTES_ACCENT}12` : 'white',
        borderColor: isActive ? `${DESIGN_NOTES_ACCENT}50` : 'var(--border)',
        color: isActive ? DESIGN_NOTES_ACCENT : 'var(--primary)',
      }}
    >
      <span
        className="material-icons-outlined"
        style={{ color: isActive ? DESIGN_NOTES_ACCENT : undefined }}
      >
        {isActive ? 'close' : 'edit'}
      </span>
      {isActive ? 'Hide design details' : 'Show design details'}
    </button>
  );
}
