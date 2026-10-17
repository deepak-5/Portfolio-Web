"use client";

import { motion } from "motion/react";
import { Award, GraduationCap, MapPin } from "lucide-react";
import { certifications, education } from "@/data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

export function Certifications() {
  return (
    <section id="certifications" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Microsoft Certified across Azure AI and Azure development tracks."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <SpotlightCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1 sm:hover:scale-[1.02]">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:text-violet-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-semibold text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
                    {cert.code}
                  </span>
                </div>
                <p className="mt-5 text-sm font-medium text-violet-500 dark:text-violet-400">
                  {cert.issuer}
                </p>
                <h3 className="mt-1 text-base font-semibold leading-snug text-neutral-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {cert.year}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative w-full pb-20 sm:pb-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Background" title="Education" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-violet-500 dark:text-violet-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">
                    {education.institution}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                    {education.degree}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400 dark:text-neutral-500">
                    <span>{education.period}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {education.location}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
