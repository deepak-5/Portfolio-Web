"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { BlogPost } from "@/types/blog";

interface BlogsListClientProps {
  blogs: BlogPost[];
}

export default function BlogsListClient({ blogs }: BlogsListClientProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{ fontFamily: "var(--font-hk-grotesk)" }}
    >
      <Navbar />
      <main className="pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mb-10 sm:mb-14"
          >
            <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
              Writing
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Blogs
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
              Technical writings and thoughts on AI engineering.
            </p>
          </motion.div>

          {blogs.length > 0 ? (
            <div className="group">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.05,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm uppercase tracking-wide text-neutral-500">
              Coming soon
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
