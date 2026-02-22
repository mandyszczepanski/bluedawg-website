"use client";

import { useState, useEffect, useRef } from "react";

/* ───────── FAQ Accordion Item ───────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-white/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
      >
        <span className="text-[15px] font-semibold text-white pr-4">{q}</span>
        <span className={`text-blue-400 text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div
        ref={ref}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: open ? ref.current?.scrollHeight ?? 500 : 0 }}
      >
        <p className="px-6 pb-5 text-[14px] leading-relaxed text-slate-400">{a}</p>
      </div>
    </div>
  );
}

/* ───────── Pricing Card ───────── */
function PricingCard({
  title, subtitle, items, price, note, featured, cta
}: {
  title: string; subtitle: string; items: string[]; price: string; note: string; featured?: boolean; cta: string;
}) {
  return (
    <div className={`relative rounded-2xl p-8 flex flex-col ${featured ? "bg-gradient-to-b from-blue-500/10 to-blue-600/5 border-2 border-blue-500/40" : "bg-white/[0.03] border border-white/10"}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-6">{subtitle}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="text-blue-400 mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <div className="text-3xl font-bold text-white">{price}</div>
        <div className="text-xs text-slate-500 mt-1">{note}</div>
      </div>
      <a href="#cta" className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${featured ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-white/10 hover:bg-white/15 text-white"}`}>
        {cta}
      </a>
    </div>
  );
}

/* ───────── Feature Row ───────── */
function FeatureRow({ icon, title, does, stops }: { icon: string; title: string; does: string; stops: string }) {
  return (
    <div className="grid md:grid-cols-[200px_1fr_1fr] gap-4 py-6 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-white text-sm">{title}</span>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-blue-400 mb-1 font-semibold">What agents do</div>
        <p className="text-sm text-slate-300 leading-relaxed">{does}</p>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-emerald-400 mb-1 font-semibold">What you stop doing</div>
        <p className="text-sm text-slate-400 leading-relaxed">{stops}</p>
      </div>
    </div>
  );
}

/* ───────── Step Card ───────── */
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
        {num}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ───────── Stat ───────── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#06090f] text-white selection:bg-blue-500/30">

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#06090f]/80 backdrop-blur-xl border-b border-white/5" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold tracking-tight">
            <span className="text-blue-400">Blue</span>Dawg
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a href="#cta" className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Book a Demo
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Autonomous AI Workforce
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
            Your Business Is Running Itself.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              You Just Don&apos;t Know It Yet.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            BlueDawg deploys an autonomous AI workforce that works like a dawg so you don&apos;t have to — handling customers, creating content, managing operations, and closing deals 24/7 while you focus on what actually matters.
          </p>
          <p className="text-sm text-slate-500 mb-10">
            No prompts. No babysitting. No "AI tools" you have to learn. Just results showing up in your inbox every morning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              See It In Action →
            </a>
            <a href="#how" className="text-slate-400 hover:text-white font-medium px-8 py-4 text-base transition-colors">
              Learn How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="20+" label="AI Systems Deployed" />
          <Stat value="100+" label="Businesses Running" />
          <Stat value="<2s" label="Avg Response Time" />
          <Stat value="24/7" label="Autonomous Operation" />
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              You&apos;re Paying 47 People to Do What{" "}
              <span className="text-red-400">3 AI Agents</span> Handle Before Breakfast.{" "}
              <span className="text-slate-500 text-2xl md:text-3xl font-medium block mt-2">Your business deserves a best friend. Not more headcount.</span>
            </h2>
            <p className="text-slate-400 text-base">Every day your business bleeds money on:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              ["⏰", "Customer support tickets sitting unanswered at 2am while competitors respond in seconds"],
              ["📅", "Content calendars that never get executed because your team is \"too busy\""],
              ["📞", "Lead follow-up dying on the vine because nobody called back within 5 minutes"],
              ["📊", "Data entry and reporting consuming 20+ hours/week of your best people's time"],
              ["🔧", "Scheduling, invoicing, inventory — the operational quicksand that buries growth"],
            ].map(([icon, text], i) => (
              <div key={i} className={`flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5 ${i === 4 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""}`}>
                <span className="text-xl">{icon}</span>
                <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-red-500/5 border border-red-500/10 rounded-xl p-6">
            <p className="text-sm text-red-300/80">
              <strong className="text-red-300">The cost of doing nothing?</strong> Your competitors are already deploying autonomous AI. Every month you wait, the gap widens.
            </p>
          </div>
        </div>
      </section>

      {/* ─── OPPORTUNITY (Epiphany Bridge) ─── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-500/[0.02] to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
            This Isn&apos;t Another AI Tool.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">This Is Your New Workforce.</span>
          </h2>
          <div className="space-y-5 text-[15px] text-slate-400 leading-relaxed">
            <p>
              We spent 4 years building AI systems for businesses. Over 20 custom-built deployments. 100+ companies running our software. And we kept seeing the same thing.
            </p>
            <p>
              Every business bought AI tools. ChatGPT subscriptions. Zapier automations. Chatbots that frustrated customers. <strong className="text-white">And nothing changed.</strong> Because tools don&apos;t do work. <em>People</em> do work. And AI tools still need people to run them.
            </p>
            <p className="text-white text-lg font-semibold">
              So we asked a different question: What if AI didn&apos;t need you at all?
            </p>
            <p>
              BlueDawg isn&apos;t a tool you add to your workflow. <strong className="text-white">BlueDawg IS the workflow.</strong> A parent AI audits your entire business, identifies every process that can be automated, then builds and deploys specialized child agents that handle it — autonomously, permanently, and better every single day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              One AI Parent. Unlimited Workers.{" "}
              <span className="text-blue-400">Trained to Serve You.</span>
            </h2>
          </div>
          <div className="space-y-12">
            <Step num="01" title="The Audit" desc="BlueDawg's parent AI analyzes your business top to bottom. Every workflow. Every bottleneck. Every wasted hour. You get a complete map of everything costing you money, time, and sanity." />
            <Step num="02" title="The Build" desc="Based on the audit, BlueDawg self-configures a team of specialized AI agents — each one purpose-built for a specific function in YOUR business. Customer support. Content. Sales. Operations. Each trained on your data, your voice, your processes." />
            <Step num="03" title="The Deploy" desc="Your AI workforce goes live 24/7/365. They learn from every interaction. They get better every week. BlueDawg's parent AI monitors performance, catches errors, and optimizes continuously. You don't manage them. BlueDawg does." />
          </div>
        </div>
      </section>

      {/* ─── FEATURES TABLE ─── */}
      <section id="features" className="py-20 md:py-28 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            Everything You Wish Your Team Did{" "}
            <span className="text-blue-400">Without Being Asked</span>
          </h2>
          <p className="text-center text-slate-500 text-sm mb-14">Loyal. Relentless. Never sleeps. Man&apos;s best friend wasn&apos;t a person. It was BlueDawg.</p>
          <div>
            <FeatureRow icon="💬" title="Customer Experience" does="Respond to every inquiry in under 60 seconds, 24/7. Handle returns, complaints, and upsells in your brand voice." stops="Hiring night-shift support reps. Apologizing for slow response times." />
            <FeatureRow icon="✍️" title="Content & Social" does="Write, schedule, and publish content across every platform. Repurpose one video into 15 pieces of content." stops="Begging your team to post consistently. Paying agencies $8K/mo for mediocre output." />
            <FeatureRow icon="📈" title="Sales & Follow-Up" does="Instant lead response. Nurture sequences that actually nurture. Book calls on your calendar automatically." stops="Watching leads go cold. Wondering why your CRM is a graveyard." />
            <FeatureRow icon="⚙️" title="Operations" does="Scheduling, invoicing, inventory tracking, vendor communication, reporting. All handled." stops="Drowning in spreadsheets. Paying someone $60K/year to copy-paste between systems." />
            <FeatureRow icon="📊" title="Data & Intelligence" does="Real-time dashboards. Anomaly detection. Competitor monitoring. Market research on demand." stops="Flying blind. Making gut decisions when you should have data." />
          </div>
        </div>
      </section>

      {/* ─── ARCHITECTURE ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-14">
            Built Different. <span className="text-blue-400">On Purpose.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["🧠", "Multi-Agent Orchestration", "Not one chatbot pretending to do everything. A coordinated team of specialized agents, each world-class at its function."],
              ["💾", "Persistent Memory", "Your agents remember every customer interaction, every preference, every context. They build relationships."],
              ["🔌", "Tool Integration", "Connect to your CRM, email, social, payments, inventory, calendars. They work WITH your systems."],
              ["🔒", "Enterprise Security", "Data never trains public models. SOC 2 compliant. Role-based access. Encryption at rest and in transit."],
              ["📈", "Self-Improving", "Parent AI continuously monitors performance, identifies weaknesses, and deploys improvements automatically."],
              ["♾️", "Infinite Scale", "Need more agents? Deployed. New department? New agents. New location? Replicated in days."],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-blue-500/20 transition-colors">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="py-20 md:py-28 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Enterprise */}
            <div className="bg-gradient-to-b from-blue-500/[0.05] to-transparent border border-blue-500/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Enterprise · $10M–$100M Revenue</div>
              <h3 className="text-xl font-bold text-white mb-4">&ldquo;We Replaced 6 Departments With 6 Agents. Revenue Went Up.&rdquo;</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {[
                  "Centralized customer experience across all locations",
                  "Unified reporting and intelligence",
                  "Standardized operations that actually stay standard",
                  "Sales follow-up that never sleeps or forgets",
                  "Content production at a scale no human team can match",
                ].map((t, i) => <li key={i} className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span>{t}</li>)}
              </ul>
              <div className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                <p className="text-xs text-blue-300/70">
                  <strong className="text-blue-300">The ROI math:</strong> If you&apos;re paying $500K/year in salaries for work AI agents handle better — you&apos;re not saving money. You&apos;re burning it.
                </p>
              </div>
            </div>
            {/* Creators */}
            <div className="bg-gradient-to-b from-purple-500/[0.05] to-transparent border border-purple-500/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">Creators · 1M+ Followers</div>
              <h3 className="text-xl font-bold text-white mb-4">&ldquo;Your Brand Runs While You Create.&rdquo;</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {[
                  "Repurpose every piece of content across every platform",
                  "Respond to DMs and comments in your voice",
                  "Manage community, flag conversations, nurture superfans",
                  "Handle sponsorship inquiries and scheduling",
                  "Track analytics and surface what's working",
                ].map((t, i) => <li key={i} className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">→</span>{t}</li>)}
              </ul>
              <div className="mt-6 bg-purple-500/5 border border-purple-500/10 rounded-lg p-4">
                <p className="text-xs text-purple-300/70">
                  <strong className="text-purple-300">You became a creator to create.</strong> BlueDawg handles everything else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              What Would You Pay for a Team That{" "}
              <span className="text-blue-400">Never Sleeps?</span>
            </h2>
            <p className="text-slate-500 text-sm">Less than one part-time employee. More impact than an entire department.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PricingCard
              title="BlueDawg Box"
              subtitle="For creators and growing businesses"
              items={[
                "Custom AI workforce audit & blueprint",
                "Purpose-built agent team (content, support, ops)",
                "Persistent memory & learning system",
                "Full tool integration (CRM, social, email, calendar)",
                "Parent AI monitoring & self-optimization",
                "Dedicated onboarding & configuration",
                "Monthly performance reviews & agent updates",
              ]}
              price="$2K–$3K/mo"
              note="$5,000 setup · $36,000+ total value"
              cta="Start Your Audit →"
            />
            <PricingCard
              featured
              title="BlueDawg Cloud"
              subtitle="Enterprise-scale autonomous AI"
              items={[
                "Everything in Box, plus:",
                "Deep organizational audit (every dept, every workflow)",
                "Enterprise agent architecture & custom build",
                "Multi-location deployment & coordination",
                "Enterprise security & compliance (SOC 2)",
                "Dedicated success team & priority support",
                "Continuous optimization & agent expansion",
                "Executive intelligence dashboard",
              ]}
              price="Custom"
              note="Typical: $30–50K setup + $5–10K/mo · $128K+ value"
              cta="Book a Demo →"
            />
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-5 py-2 rounded-full">
              <span>🛡️</span>
              Loyal to Results — No measurable ROI in 6 months? We optimize free for another 6. That&apos;s the BlueDawg promise.
            </div>
          </div>
        </div>
      </section>

      {/* Social proof section - testimonials coming soon */}

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <FAQItem q="What if AI makes mistakes?" a="BlueDawg's parent AI monitors every agent interaction. Errors are caught, corrected, and learned from in real-time. For high-stakes decisions, you set the guardrails — agents escalate to humans when you want them to. The question isn't whether AI makes mistakes. It's whether AI makes fewer mistakes than your current team at 3am on a Tuesday." />
            <FAQItem q="We already use ChatGPT / other AI tools." a="Great. Those are tools. Someone on your team still has to prompt them, review the output, and do something with it. BlueDawg is a workforce. It prompts itself, reviews itself, and acts on its own. The difference between a power drill and a construction crew." />
            <FAQItem q="Is our data safe?" a="Your data never trains public models. Enterprise-grade encryption. SOC 2 compliant infrastructure. Role-based access. We take security as seriously as you do — because our enterprise clients demand it." />
            <FAQItem q="How long until we see results?" a="Most clients see their first autonomous workflows running within 2 weeks of deployment. Measurable ROI typically appears within 60-90 days. Our 6-month guarantee means you have zero risk." />
            <FAQItem q="What if we outgrow it?" a="You won't outgrow it. BlueDawg scales with you. Need more agents? They're deployed. New department? New agents. New location? Replicated in days. Your AI workforce grows as fast as your business does." />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="cta" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Your AI Workforce Is Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Work Like a Dawg.</span>
          </h2>
          <p className="text-slate-400 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Your competitors are deploying autonomous AI right now. They&apos;re cutting costs, accelerating growth, and operating 24/7. Deploy BlueDawg and wake up tomorrow to a business that runs itself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              Book a Demo
            </a>
            <a href="mailto:hello@bluedawg.app" className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors">
              Start Your Audit
            </a>
            <a href="mailto:hello@bluedawg.app" className="text-slate-400 hover:text-white font-medium px-8 py-4 text-base transition-colors">
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-lg font-bold"><span className="text-blue-400">Blue</span>Dawg</span>
            <p className="text-xs text-slate-600 mt-1">Every business deserves a best friend. Yours just learned to code.</p>
          </div>
          <div className="text-xs text-slate-600">
            A LeadCatcher company. Built in Detroit. Deployed everywhere. © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
// auto-deploy test 1771776229
