"use client";

import { motion } from "motion/react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Achievements from "./Achievements";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectShowcase from "./ProjectShowcase";
import {
  Certifications,
  Education,
} from "./CertificationsEducation";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import ContributionsDisplay from "./ContributionsDisplay";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/resume";

function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeading
            eyebrow="About"
            title="Professional Summary"
            className="lg:mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-300">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                "Agentic RAG",
                "Generative AI",
                "Azure-native",
                "Event-Driven",
                "AI Copilots",
                "Workflow Automation",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GitHubSection() {
  return (
    <section className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity"
          description="Consistent contributions across AI frameworks, MCP servers, and developer tooling."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-4 sm:p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
        >
          <ContributionsDisplay
            username="deepak-5"
            variant="compact"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function NewHeroSection() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{ fontFamily: "var(--font-hk-grotesk)" }}
    >
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Achievements />
        <ExperienceSection />
        <SkillsSection />
        <ProjectShowcase />
        <GitHubSection />
        <Certifications />
        <Education />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
