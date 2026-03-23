import React from "react";
import { FiBookmark, FiCompass, FiLayers, FiUsers } from "react-icons/fi";

const highlights = [
  {
    icon: FiBookmark,
    title: "Well-organized notes",
    description:
      "Students can create, edit, pin, and manage notes with a cleaner workflow built for daily study use.",
  },
  {
    icon: FiCompass,
    title: "Fast discovery",
    description:
      "Search, categories, pinned notes, and profile-driven ownership make resources easier to find and trust.",
  },
  {
    icon: FiUsers,
    title: "Community sharing",
    description:
      "CampusNotes keeps the barrier low so classmates can contribute useful study material for everyone.",
  },
];

const values = [
  "Free access to practical academic resources",
  "A cleaner experience for browsing and sharing notes",
  "A student-first platform that rewards contribution",
];

const About = () => {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#111827_0%,#1e293b_45%,#f59e0b_180%)] p-6 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.65)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                About CampusNotes
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
                A better place for students to share notes that are actually easy to use.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                CampusNotes was built to make study material feel less scattered and more dependable.
                The goal is simple: give students one calm, polished workspace where notes can be
                shared, revisited, and organized without friction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Focus</p>
                <p className="mt-2 text-2xl font-semibold">Useful notes</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Experience</p>
                <p className="mt-2 text-2xl font-semibold">Clean and fast</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Community</p>
                <p className="mt-2 text-2xl font-semibold">Built for students</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
                <FiLayers className="text-xl" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Our Mission
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                  Make academic resources easier to discover and worth coming back to.
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              We believe educational tools should feel generous, not cluttered. CampusNotes helps
              students upload study materials, keep important notes pinned, update them over time,
              and explore content in a layout that feels intentional instead of overwhelming.
            </p>

            <div className="mt-6 space-y-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 sm:p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Founder
            </p>
            <div className="mt-5 rounded-[28px] bg-[linear-gradient(145deg,#f8fafc_0%,#fff7ed_100%)] p-6 dark:bg-[linear-gradient(145deg,#0f172a_0%,#1e293b_100%)]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-3xl text-white dark:bg-amber-400 dark:text-slate-900">
                A
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">
                Anmol Jadgilwar
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">
                Founder and Developer
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                CampusNotes is shaped around a simple idea: students should spend less time hunting
                for material and more time learning from it.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
                <Icon className="text-xl" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default About;
