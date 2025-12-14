'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignNotesMode, DesignNote } from '@/components/vignettes/types';

interface DesignNotesPanelProps {
  modes: DesignNotesMode[];
}

function NoteCallout({
  note,
  accent,
  isInspector
}: {
  note: DesignNote;
  accent: string;
  isInspector: boolean;
}) {
  const alignRight = note.align === 'right';

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{ top: `${note.y}%`, left: `${note.x}%` }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className={`flex items-start gap-3 ${alignRight ? 'flex-row-reverse text-right' : 'text-left'}`}>
        <div className={`flex items-center ${alignRight ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 0 8px ${accent}1a`
            }}
          />
          <div
            className={`h-px w-10 ${alignRight ? 'mr-2' : 'ml-2'}`}
            style={{ backgroundColor: accent }}
          />
        </div>

        <div
          className={`rounded-xl px-3 py-2 shadow-sm max-w-[230px] ${
            isInspector
              ? 'bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm'
              : 'bg-white/95 border border-[#fecdd3] text-[#0f172a]'
          }`}
          style={{
            boxShadow: isInspector
              ? '0 12px 40px rgba(14, 165, 233, 0.25)'
              : '0 12px 40px rgba(248, 113, 113, 0.18)'
          }}
        >
          <p className="text-[13px] font-semibold leading-[1.3]" style={{ color: accent }}>
            {note.label}
          </p>
          <p className={`text-[13px] leading-[1.5] mt-1 ${isInspector ? 'text-white/80' : 'text-[#475569]'}`}>
            {note.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DesignPreview({ mode }: { mode: DesignNotesMode }) {
  const isInspector = mode.id === 'inspector';
  const accent = mode.accent;

  return (
    <div
      className={`relative min-h-[380px] rounded-2xl border overflow-visible ${
        isInspector
          ? 'bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220] border-cyan-500/40 text-white'
          : 'bg-white border-[#e5e7eb] text-[#0f172a]'
      }`}
      style={{ isolation: 'isolate', zIndex: 1 }}
    >
      {isInspector && (
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '38px 38px'
          }}
        />
      )}

      <div className="relative z-10 h-full w-full p-5 space-y-5">
        <div
          className="rounded-2xl border-2 shadow-sm p-5 space-y-4"
          style={{
            borderColor: isInspector ? `${accent}80` : '#a6e5e7',
            background: isInspector
              ? 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.08), transparent 30%), rgba(15, 23, 42, 0.65)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8feff 80%)'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold ${
                isInspector ? 'border-cyan-400/70 bg-white/10 text-white' : 'border-[#a6e5e7] bg-white text-[#0f172a]'
              }`}
              style={{
                boxShadow: isInspector ? '0 10px 30px rgba(8,47,73,0.45)' : '0 10px 30px rgba(14,165,233,0.18)'
              }}
            >
              IA
            </div>
            <div className="space-y-1">
              <p className={`text-[18px] font-semibold ${isInspector ? 'text-white' : 'text-[#0f172a]'}`}>Highlights & Opportunities</p>
              <p className={`text-[14px] ${isInspector ? 'text-white/60' : 'text-[#475569]'}`}>
                Managers verify AI summaries using direct quotes.
              </p>
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 space-y-3 ${isInspector ? 'border-white/10 bg-white/5' : 'border-[#e5e7eb] bg-white'}`}
          >
            <div className="flex items-start gap-2">
              <span className={`material-icons-outlined text-[18px] ${isInspector ? 'text-cyan-300' : 'text-[#0f172a]'}`}>
                star
              </span>
              <div className="flex-1 space-y-1">
                <p className={`text-[15px] font-semibold ${isInspector ? 'text-white' : 'text-[#0f172a]'}`}>Highlight</p>
                <p className={`text-[14px] leading-[1.5] ${isInspector ? 'text-white/70' : 'text-[#475569]'}`}>
                  Early feedback system to validate model output before launch.
                </p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-[12px] ${isInspector ? 'bg-cyan-400/10 text-cyan-100 border border-cyan-400/30' : 'bg-[#ecfeff] text-[#0f172a] border border-[#a6e5e7]'}`}
              >
                2 quotes
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className={`rounded-lg px-3 py-2 border text-[13px] leading-[1.5] ${
                    isInspector ? 'bg-white/5 border-white/10 text-white/80' : 'bg-gray-50 border-gray-200 text-[#475569]'
                  }`}
                >
                  “Model output landed for managers in week {item}, kept flow intact.”
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 space-y-3 ${isInspector ? 'border-white/10 bg-white/5' : 'border-[#e5e7eb] bg-white'}`}
          >
            <div className="flex items-start gap-2">
              <span className={`material-icons-outlined text-[18px] ${isInspector ? 'text-cyan-300' : 'text-[#0f172a]'}`}>
                lightbulb
              </span>
              <div className="flex-1 space-y-1">
                <p className={`text-[15px] font-semibold ${isInspector ? 'text-white' : 'text-[#0f172a]'}`}>Opportunity</p>
                <p className={`text-[14px] leading-[1.5] ${isInspector ? 'text-white/70' : 'text-[#475569]'}`}>
                  Revealed verification friction points and adjusted copy tone.
                </p>
              </div>
              <span
                className={`material-icons-outlined text-[18px] ${isInspector ? 'text-white/60' : 'text-[#94a3b8]'}`}
              >
                unfold_more
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className={`text-[14px] ${isInspector ? 'text-white/70' : 'text-[#475569]'}`}>Is this helpful?</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isInspector ? 'border-white/10 bg-white/5 text-white' : 'border-gray-200 bg-white text-[#0f172a]'}`}
              >
                <span className="material-icons-outlined text-[18px]">thumb_up</span>
              </div>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isInspector ? 'border-white/10 bg-white/5 text-white' : 'border-gray-200 bg-white text-[#0f172a]'}`}
              >
                <span className="material-icons-outlined text-[18px]">thumb_down</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mode.notes.map((note) => (
        <NoteCallout key={note.id} note={note} accent={accent} isInspector={isInspector} />
      ))}
    </div>
  );
}

export default function DesignNotesPanel({ modes }: DesignNotesPanelProps) {
  const safeModes = useMemo(() => modes.filter(Boolean), [modes]);
  const [activeModeId, setActiveModeId] = useState(safeModes[0]?.id ?? '');
  const activeMode = safeModes.find((mode) => mode.id === activeModeId) ?? safeModes[0];

  if (!activeMode) return null;

  return (
    <div className="space-y-4">
      <div className="inline-flex flex-wrap gap-2 border border-gray-200 rounded-xl p-1 bg-white">
        {safeModes.map((mode) => {
          const isActive = mode.id === activeMode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveModeId(mode.id)}
              className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all ${
                isActive
                  ? 'shadow-sm'
                  : 'text-[#4b5563] hover:bg-gray-50'
              }`}
              style={{
                color: isActive ? '#0f172a' : undefined,
                backgroundColor: isActive ? `${mode.accent}1a` : undefined,
                border: isActive ? `1px solid ${mode.accent}40` : '1px solid transparent'
              }}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full"
        >
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6 items-start">
            <DesignPreview mode={activeMode} />

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[15px] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
                  {activeMode.label}
                </p>
                <p className="text-[14px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)]">
                  {activeMode.description}
                </p>
              </div>

              <div className="space-y-3">
                {activeMode.notes.map((note) => (
                  <div key={note.id} className="p-3 border border-gray-200 rounded-xl bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-[13px] uppercase tracking-[0.08em] text-gray-500">{note.label}</p>
                        <p className="text-[14px] leading-[1.6] text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
                          {note.detail}
                        </p>
                      </div>
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5"
                        style={{ backgroundColor: activeMode.accent }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {activeMode.specs && (
                <div className="space-y-2">
                  <p className="text-[13px] uppercase tracking-[0.08em] text-gray-500">Specs</p>
                  <div className="flex flex-wrap gap-2">
                    {activeMode.specs.map((spec) => (
                      <div
                        key={`${spec.label}-${spec.value}`}
                        className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)]"
                      >
                        <p className="text-[12px] uppercase tracking-[0.08em] text-gray-500">{spec.label}</p>
                        <p className="text-[14px] text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
