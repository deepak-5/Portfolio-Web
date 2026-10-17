"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, profile } from "@/data/resume";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("about");

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") return;
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname, mobileOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document
    ) {
      (
        document as Document & {
          startViewTransition: (cb: () => void) => void;
        }
      ).startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#") || pathname !== "/") return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
              DC
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-neutral-900 dark:text-white sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === "/" &&
                activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/60 text-neutral-600 transition-all duration-200 hover:scale-105 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:text-white"
            >
              {mounted &&
                (theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                ))}
            </button>

            <a
              href={profile.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-500/25 dark:bg-white dark:text-neutral-900 sm:flex"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/60 text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-black/5 bg-white/95 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/95 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/blogs"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/5"
              >
                Writing
              </Link>
              <a
                href={profile.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-xl bg-neutral-900 px-4 py-3 text-center text-base font-medium text-white dark:bg-white dark:text-neutral-900"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
