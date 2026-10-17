"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy } from "lucide-react";
import { achievements } from "@/data/resume";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const isFloat = !Number.isInteger(target);
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      setDisplay(isFloat ? Math.round(value * 10) / 10 : Math.round(value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {isFloatSafe(target, display)}
      {suffix}
    </span>
  );
}

function isFloatSafe(target: number, display: number) {
  return Number.isInteger(target) ? display : display.toFixed(1);
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Impact"
          title="Key Achievements"
          description="Measurable outcomes from shipping production AI systems at enterprise scale."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <SpotlightCard className="group h-full p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-1 sm:hover:scale-[1.02]">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:text-violet-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  <CountUp target={a.stat} suffix={a.suffix} />
                </div>
                <p className="mt-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                  {a.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {a.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
