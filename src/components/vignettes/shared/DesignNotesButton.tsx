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
      className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      style={{
        backgroundColor: isActive ? `${DESIGN_NOTES_ACCENT}12` : 'white',
        borderColor: isActive ? `${DESIGN_NOTES_ACCENT}50` : undefined,
        color: isActive ? DESIGN_NOTES_ACCENT : undefined,
      }}
    >
      <span
        className="material-icons-outlined text-[18px]"
        style={{ color: isActive ? DESIGN_NOTES_ACCENT : '#0f172a' }}
      >
        {isActive ? 'close' : 'edit'}
      </span>
      {isActive ? 'Hide design details' : 'Show design details'}
    </button>
  );
}
