"use client";

import { FaGithub, FaLinkedin, FaPaperclip, FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { profile } from "@/data/resume";
import Link from "next/link";

const links = [
  { icon: FaGithub, label: "GitHub", href: profile.socials.github },
  { icon: FaXTwitter, label: "Twitter", href: profile.socials.twitter },
  { icon: FaLinkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { icon: IoMdMail, label: "Email", href: `mailto:${profile.email}` },
  { icon: FaPaperclip, label: "Resume", href: profile.socials.resume },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-black/5 bg-white/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                DC
              </span>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {profile.name}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {profile.role} · {profile.specialty}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2.5 text-sm font-medium text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-violet-400"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 text-sm text-neutral-400 dark:border-white/10 dark:text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              href="/projects"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Writing
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
