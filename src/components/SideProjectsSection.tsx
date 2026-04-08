'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from './SectionTitle';

const sideProjects = [
  {
    name: 'States',
    description:
      'A prompt-based tool that figures out which states a prototype has, then builds a control panel to flip between them. Empty states, edge cases, loading races, error conditions — without clicking through flows.',
    href: '/states',
    label: 'Claude Code Skill',
  },
  {
    name: 'Design Notebook',
    description:
      'An interactive timeline of design iterations. Diverge into multiple directions, pick the best parts, and always know how you got there.',
    href: '/notebook',
    label: 'Claude Code Skill',
  },
];

export default function SideProjectsSection() {
  return (
    <section className="w-full pb-12 lg:pb-20 px-6 lg:px-10 2xl:px-16 scroll-mt-20">
      <div className="max-w-[1408px] mx-auto border-t border-border/60 pt-10 lg:pt-14">
        <SectionTitle>Projects</SectionTitle>
      </div>
      <div className="max-w-[1408px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 lg:mt-10">
        {sideProjects.map((project) => (
          <Link key={project.name} href={project.href}>
            <motion.article
              className="group relative rounded-2xl border border-border/60 bg-white p-8 lg:p-10 h-full flex flex-col gap-4 hover:border-border transition-colors duration-200"
              {...fadeInUp}
            >
              <span className="type-label text-tertiary">{project.label}</span>
              <h3 className="type-h2 !text-[1.5rem] lg:!text-[1.75rem]">{project.name}</h3>
              <p className="text-body text-secondary leading-relaxed flex-1">
                {project.description}
              </p>
              <span className="text-sm font-medium text-primary group-hover:underline underline-offset-2 mt-2">
                View project →
              </span>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
