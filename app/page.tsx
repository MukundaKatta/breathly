"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // best-effort
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          Breathly
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="hidden sm:inline hover:opacity-70"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-sky-100 via-sky-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
            Health
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Five minutes. Regulate your nervous system.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Guided breathwork for anxiety, sleep, and focus. No subscription
            paywall on the first week.
          </p>

          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p className="mt-12 text-sm font-medium text-sky-700">
              Thanks. We will ping you the day we launch.
            </p>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See it in action
            </h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-sm rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <div className="relative mx-auto h-48 w-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200 to-sky-400 animate-pulse" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-sky-100 to-sky-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sky-900">
                  <div className="text-2xl font-semibold">Breathe in</div>
                  <div className="mt-1 text-5xl font-bold">4</div>
                </div>
              </div>
              <div className="mt-6 text-sm font-medium text-sky-700">
                4-7-8 · Panic break
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                HRV before: 38 · target during: 55+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🫁</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Sessions that work in a cab
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Three-minute panic-break. Six-minute morning prime. Ten-minute
                evening wind-down.
              </p>
            </div>
            <div>
              <div className="text-3xl">📈</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                HRV-backed
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                We read your Apple Watch HRV before and after. You see the actual
                effect, not a vibe.
              </p>
            </div>
            <div>
              <div className="text-3xl">🎧</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Voices you&apos;ll want to hear
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Calm, different, real humans. No meditation-appointment energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Sign up in seconds
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Email only. No credit card. You&apos;re in before you can
                overthink it.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Set up your context
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Tell us what you&apos;re working on. The whole product tunes
                around that.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Get value on day one
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Not week two. Day one. That&apos;s how fast you&apos;ll know
                it&apos;s working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the
          moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-sky-600 px-7 py-3.5 font-medium text-white transition hover:bg-sky-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
            Breathly
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}
