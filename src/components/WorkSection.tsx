'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from './SectionTitle';
import HighlightsPanel from './vignettes/ai-highlights/HighlightsPanel';
import SuggestionsPanel from './vignettes/ai-suggestions/SuggestionsPanel';
import TranslationManagementPanel from './vignettes/multilingual/TranslationManagementPanel';
import SandboxPanel from './vignettes/prototyping/SandboxPanel';
import BrowserFrame from './state-explorer/BrowserFrame';
import DemoApp from './state-explorer/demo/DemoApp';
import AgentOverlay from './state-explorer/demo/AgentOverlay';
import { useDemoStore } from './state-explorer/demo/demoStore';
import NotebookApp from '@/design-notebooks/_harness/NotebookApp';
import '@/design-notebooks/_harness/notebook.css';
import { ITERATIONS, PROJECT } from './design-notebook/iterations';
import { aiSuggestionsContent, defaultBorderSettings } from './vignettes/ai-suggestions/content';
import type { BorderSettings } from './vignettes/ai-suggestions/content';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  label: string;
  href?: string;
}

const workItems: WorkItem[] = [
  {
    id: 'notebook',
    title: 'Design Notebook',
    description: 'An interactive timeline of design iterations. Diverge, pick the best parts, and always know how you got there.',
    label: 'Claude Code Skill',
    href: '/notebook',
  },
  {
    id: 'states',
    title: 'States',
    description: 'A control panel that reveals hidden UI variations — empty states, edge cases, loading races, error conditions.',
    label: 'Claude Code Skill',
    href: '/states',
  },
  {
    id: 'highlights',
    title: 'Highlights and Opportunities',
    description: 'AI summaries to make performance reviews easier.',
    label: 'AI & Intelligence',
  },
  {
    id: 'suggestions',
    title: 'AI Suggest Improvements',
    description: 'AI suggestions to help managers write better feedback.',
    label: 'AI & Intelligence',
  },
  {
    id: 'multilingual',
    title: 'Multilingual Performance Cycles',
    description: 'A simple workflow to run a multilingual performance cycle.',
    label: 'Platform & Systems',
  },
  {
    id: 'prototyping',
    title: 'Design Sandbox',
    description: 'Built an internal repository to make AI prototyping faster and easier.',
    label: 'Platform & Systems',
  },
];

function StatesDemo() {
  const autoPlay = useDemoStore((s) => s.autoPlay);

  useEffect(() => {
    const timer = setTimeout(() => autoPlay(), 500);
    return () => clearTimeout(timer);
  }, [autoPlay]);

  return (
    <div className="demo-theme">
      <div className="relative overflow-hidden rounded-lg">
        <BrowserFrame url="localhost:5174">
          <DemoApp highlightedCode="" />
        </BrowserFrame>
        <AgentOverlay />
      </div>
    </div>
  );
}

function NotebookDemo() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-200 [&>div]:!min-h-0">
      <NotebookApp iterations={ITERATIONS} project={PROJECT} defaultFilmstripOpen />
    </div>
  );
}

function PanelRenderer({ activeId }: { activeId: string }) {
  const [borderSettings, setBorderSettings] = useState<BorderSettings>(defaultBorderSettings);
  const handleBorderSettingsChange = useCallback((settings: BorderSettings) => {
    setBorderSettings(settings);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {activeId === 'states' && <StatesDemo />}
        {activeId === 'notebook' && <NotebookDemo />}
        {activeId === 'highlights' && (
          <HighlightsPanel activeStory={null} showBeforeState={false} />
        )}
        {activeId === 'suggestions' && (
          <SuggestionsPanel
            content={aiSuggestionsContent}
            activeStory={null}
            borderSettings={borderSettings}
            onBorderSettingsChange={handleBorderSettingsChange}
          />
        )}
        {activeId === 'multilingual' && (
          <TranslationManagementPanel initialComplete activeStory={null} showBeforeState={false} />
        )}
        {activeId === 'prototyping' && (
          <SandboxPanel activeStory={null} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function WorkSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const activeId = hoveredId ?? lockedId;

  return (
    <section id="work" className="w-full pb-16 lg:pb-24 px-6 lg:px-10 2xl:px-16 scroll-mt-20">
      <div className="max-w-[1408px] mx-auto pt-16 lg:pt-24">
        <SectionTitle disableScrollTrigger>Work</SectionTitle>
      </div>
      <motion.div className="max-w-[1408px] mx-auto mt-8" {...fadeInUp}>
        {/* Mobile: stacked list */}
        <div className="lg:hidden flex flex-col gap-6">
          {workItems.map((item) => {
            const inner = (
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-primary">{item.title}</h3>
                <p className="text-tertiary">{item.description}</p>
              </div>
            );
            return item.href ? (
              <Link key={item.id} href={item.href}>
                {inner}
              </Link>
            ) : (
              <div key={item.id}>{inner}</div>
            );
          })}
        </div>

        {/* Desktop: text left, panel right */}
        <div className="hidden lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-16 items-start">
          {/* Left: text list */}
          <div className="flex flex-col -mx-3" onMouseLeave={() => setHoveredId(null)}>
            {workItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`text-left py-3 px-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                    isActive ? 'bg-muted' : 'bg-transparent'
                  }`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => setLockedId(item.id)}
                >
                  <h3 className="font-medium text-primary !m-0">{item.title}</h3>
                  <p className="text-tertiary">{item.description}</p>
                </button>
              );
            })}
          </div>

          {/* Right: interactive panel — only visible on hover */}
          <div className="sticky top-24 overflow-hidden">
            {activeId && <PanelRenderer activeId={activeId} />}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
