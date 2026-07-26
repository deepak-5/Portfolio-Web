"use client";

import Link from "next/link";
import DiagonalPattern from "./DiagonalPattern";
import BannerSection from "./BannerSection";
import ProfileHeader from "./ProfileHeader";
import ContentSection from "./ContentSection";
import ContentParagraph from "./ContentParagraph";
import SectionBorder from "./SectionBorder";
import ExperienceContent from "./ExperienceContent";
import Reachout from "./Reachout";
import CallToAction from "./CallToAction";
import ContributionsDisplay from "./ContributionsDisplay";
import OpenSourceContributionsCard from "./ContributionCard";
import TechStackMarquee from "./TechStackMarquee";
import { Reveal } from "./Reveal";
import { projects } from "@/data/projects";
import { MasonryProjectCard } from "./MasonryProjectCard";
import { blogs } from "@/data/blogs";
import { BlogCard } from "./BlogCard";
import { sponsors } from "@/data/sponsors";
import SponsorShowcase from "./SponsorShowcase";
import SponsorButton from "./SponsorButton";
import NeumorphButton from "./NeumorphButton";

export default function NewHeroSection() {
  return (
    <div
      className="min-h-screen transition-colors duration-300 relative"
      style={{ fontFamily: "var(--font-hk-grotesk)" }}
    >
      <div className="relative mx-auto max-w-4xl">
        {/* Diagonal Patterns */}
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />

        {/* Main Content */}
        <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl sm:px-0">
          {/* Banner Section */}
          <Reveal delay={0.1}>
            <BannerSection
              bannerImage="/deepak_banner_pic.png"
              quote="I don't just build AI features — I architect production-grade, enterprise-hardened AI systems."
            />
          </Reveal>

          {/* Profile Header */}
          <Reveal delay={0.2}>
            <ProfileHeader
              name="Deepak AC"
              age=""
              title="AI engineer • full-stack developer"
              profileImage="/profilepic.jpeg"
              socialLinks={{
                twitter: "https://x.com/Deepakgowda05",
                github: "https://github.com/deepak-5",
                linkedin: "https://www.linkedin.com/in/deepak-ac/",
                resume:
                  "https://drive.google.com/file/d/1Mlj0N57oBI6IZEofpFriZ0Zkwj0mezsk/view?usp=sharing",
              }}
            />
          </Reveal>

          {/* Content Prose */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-base">
              {/* Current Role Section */}
              <Reveal delay={0.1}>
                <ContentSection
                  subtitle="Senior AI Engineer | AI R&D Lead"
                  title=""
                  className="mt-6"
                >
                  <div></div>
                </ContentSection>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              {/* About Section */}
              <Reveal delay={0.1}>
                <ContentSection className="pb-6 sm:pb-8 pt-4 sm:pt-6 px-2 sm:px-0">
                  <ContentParagraph className="mb-2 text-base sm:text-lg">
                    <span className="font-medium dark:text-white text-black">
                      Results-driven Senior AI Engineer
                    </span>{" "}
                    with 3+ years of experience architecting, developing, and
                    deploying production-grade AI-powered enterprise
                    applications at FNF India (Fortune 500). Specialized in
                    building end-to-end intelligent systems leveraging Azure
                    OpenAI, Agentic AI frameworks, RAG pipelines, and
                    cloud-native microservices architectures. Delivered 6+
                    mission-critical AI products from concept to production,
                    reducing development cycles by 50%, and achieving 98%+ model
                    accuracy in enterprise document intelligence workflows.
                  </ContentParagraph>
                </ContentSection>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-6" />
              </Reveal>

              {/* Experience Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-12 py-2">
                  <h2 className="text-base sm:text-xl mb-3 opacity-70 mt-4 sm:mt-6 px-4 font-[family-name:var(--font-instrument-serif)]">
                    Professional Experience
                  </h2>
                  <div className="px-4">
                    <ExperienceContent />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-4" />
              </Reveal>

              {/* Proof of Work */}
              <Reveal delay={0.1}>
                <div className="sm:px-12 py-2">
                  <div className="px-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
                    <h2 className="text-base sm:text-xl opacity-70 font-[family-name:var(--font-instrument-serif)]">
                      Proof of Work
                    </h2>
                  </div>
                  <div className="px-4">
                    <div className="grid grid-cols-1 gap-4 sm:gap-3 sm:grid-cols-2 group">
                      {projects.slice(0, 6).map((project) => (
                        <MasonryProjectCard
                          key={project.id}
                          project={project}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 flex justify-center mt-6 sm:mt-8 mb-4 sm:mb-6">
                    <Link href="/projects">
                      <NeumorphButton className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white">
                        <span>View All</span>
                        <span>→</span>
                      </NeumorphButton>
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* GitHub Contributions */}
              <Reveal delay={0.1}>
                <div className="sm:px-12 px-0 mt-4">
                  <h2 className="text-base font-[family-name:var(--font-instrument-serif)] sm:text-xl opacity-40 leading-relaxed -tracking-[0.01em] mb-4 px-4">
                    GitHub Contributions <span className="opacity-40">●</span>{" "}
                    @deepak-5
                  </h2>
                  <div className="mb-4 sm:mb-6">
                    <ContributionsDisplay
                      username="deepak-5"
                      variant="compact"
                      className="w-full"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Tech Stack Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-12 mt-4 sm:mt-6 mb-4 sm:mb-6">
                  <div className="px-4">
                    <TechStackMarquee className="w-full" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Thoughts Section */}
              <Reveal delay={0.1}>
                <div className="sm:px-12 py-2">
                  <div className="px-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
                    <h2 className="text-base sm:text-xl opacity-50 font-[family-name:var(--font-instrument-serif)]">
                      Curated Reads
                    </h2>
                  </div>
                  <div className="px-4">
                    <div className="space-y-0 group">
                      {blogs.slice(0, 3).map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 flex justify-center mt-6 sm:mt-8 mb-4 sm:mb-6">
                    <Link href="/blogs">
                      <NeumorphButton className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm text-neutral-800 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white">
                        <span>View All</span>
                        <span>→</span>
                      </NeumorphButton>
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* call to action*/}
              <Reveal delay={0.1}>
                <div className="px-4 sm:px-12">
                  <CallToAction />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* Reachout Section */}
              <Reveal delay={0.1}>
                <div className="mt-4 sm:mt-6">
                  <Reachout
                    title="Let's connect"
                    subtitle="Find me on these platforms"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
