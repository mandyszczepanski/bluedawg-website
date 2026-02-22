"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

function AnimatedSection({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[11px] uppercase tracking-[0.25em] text-blue-400 font-semibold mb-4">{children}</div>;
}

function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm rounded-lg",
    md: "px-8 py-4 text-[15px] rounded-xl",
    lg: "px-10 py-[1.125rem] text-[15px] rounded-xl",
  }[size];

  const variantClasses = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_8px_32px_rgba(59,130,246,0.2)] pulse-glow shimmer border border-blue-400/30",
    secondary:
      "bg-white/10 border border-white/10 text-white hover:bg-white/15 shimmer",
    ghost:
      "bg-transparent text-slate-400 hover:text-white border border-transparent hover:border-white/10",
  }[variant];

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`button-shell group ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span>{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
        →
      </span>
    </motion.a>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    let startTs: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (startTs === null) startTs = timestamp;
      const elapsed = timestamp - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setCount(next);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ScrollIndicator() {
  return (
    <motion.div className="flex flex-col items-center gap-2 mt-16" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-blue-500/50 to-transparent" />
    </motion.div>
  );
}

function MarqueeBar() {
  const items = ["AI-Powered", "24/7 Autonomous", "Detroit Built", "Multi-Agent", "Self-Improving", "Enterprise Ready"];
  return (
    <div className="overflow-hidden border-y border-white/5 py-4 bg-white/[0.01] marquee-fade">
      <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-semibold text-slate-600 uppercase tracking-[0.2em] flex items-center gap-8">
            {item} <span className="text-blue-500/30">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function MobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#06090f]/95 backdrop-blur-xl border-t border-white/10 p-4">
      <a href="#cta" className="block text-center bg-blue-500 text-white font-semibold py-3.5 rounded-xl pulse-glow">
        Book a Strategy Call →
      </a>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="card-glow glass border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-white/20">
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

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative pl-16 card-glow rounded-2xl border border-white/5 bg-white/[0.02] p-6 pr-5">
      <div className="absolute left-6 top-6 w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
        {num}
      </div>
      <div className="pl-10">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#06090f] text-white selection:bg-blue-500/30">
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass bg-[#06090f]/75 backdrop-premium border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold tracking-tight font-display">
            <span className="text-blue-400">Blue</span>Dawg
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#how" className="hover:text-white transition-colors draw-underline">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors draw-underline">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors draw-underline">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors draw-underline">FAQ</a>
          </div>
          <Button href="#cta" variant="secondary" size="sm" className="hidden sm:inline-flex bg-white text-[#06090f] hover:bg-white/90 border-white/20">
            Book a Strategy Call
          </Button>
          <Button href="#cta" variant="secondary" size="sm" className="sm:hidden bg-white text-[#06090f] hover:bg-white/90 border-white/20 px-4">
            Book
          </Button>
        </div>
      </nav>

      <section ref={heroRef} id="hero" className="relative pt-36 pb-24 md:pt-52 md:pb-40 overflow-hidden mesh-divider">
        <div className="grid-background" />
        <div className="floating-orb top-24 left-[6%] w-40 h-40 bg-blue-500" />
        <div className="floating-orb top-40 right-[10%] w-52 h-52 bg-cyan-400" style={{ animationDelay: "-6s" }} />
        <div className="floating-orb bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-400" style={{ animationDelay: "-11s" }} />

        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-b from-blue-600/[0.07] via-blue-500/[0.04] to-transparent rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[100px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px] font-medium px-5 py-2 rounded-full mb-10 tracking-[0.15em] uppercase glass"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Now deploying autonomous AI workforces
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] xl:text-8xl font-bold tracking-[-0.035em] leading-[1.02] mb-8 text-balance">
              <span className="block text-white">We Build the AI.</span>
              <span className="block gradient-text">It Runs Your Business.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-lg md:text-[1.35rem] text-slate-400 max-w-2xl mx-auto mb-12 leading-[1.7] font-light text-balance">
              BlueDawg deploys a custom AI workforce across your entire operation. Sales, support, content, ops. Your team stops doing $30/hr work and starts doing $300/hr work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button href="#cta" variant="primary" size="lg" className="desktop-glow">
              Book a Strategy Call
            </Button>
            <Button href="#how" variant="ghost" size="md" className="text-slate-500 hover:text-white">
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-slate-600">
              <span className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">20+</span> AI systems deployed
              </span>
              <span className="w-px h-4 bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">100+</span> businesses powered
              </span>
              <span className="w-px h-4 bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">6-month</span> ROI guarantee
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ScrollIndicator />
          </motion.div>
        </motion.div>
      </section>

      <AnimatedSection className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { target: 20, suffix: "+", label: "AI Systems Deployed" },
            { target: 100, suffix: "+", label: "Businesses Using Our Software" },
            { target: 40, suffix: "-60%", label: "Avg Cost Reduction" },
            { target: 24, suffix: "/7", label: "Autonomous Operation" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-display">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-section-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>THE PROBLEM</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
              You&apos;re Paying 47 People to Do What{" "}
              <span className="text-red-400">3 AI Agents</span> Handle Before Breakfast.{" "}
              <span className="text-slate-500 text-2xl md:text-3xl lg:text-4xl font-medium block mt-3">Your business deserves a best friend. Not more headcount.</span>
            </h2>
            <p className="text-slate-400 text-base">Every day your business bleeds money on:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              ["⏰", 'Customer support tickets sitting unanswered at 2am while competitors respond in seconds'],
              ["📅", 'Content calendars that never get executed because your team is "too busy"'],
              ["📞", "Lead follow-up dying on the vine because nobody called back within 5 minutes"],
              ["📊", "Data entry and reporting consuming 20+ hours/week of your best people's time"],
              ["🔧", "Scheduling, invoicing, inventory — the operational quicksand that buries growth"],
            ].map(([icon, text], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card-glow flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-5 ${i === 4 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""}`}
              >
                <span className="text-xl">{icon}</span>
                <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center bg-red-500/5 border border-red-500/10 rounded-xl p-6 card-glow">
            <p className="text-sm text-red-300/80">
              <strong className="text-red-300">The cost of doing nothing?</strong> Your competitors are already deploying autonomous AI. Every month you wait, the gap widens.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>THE OPPORTUNITY</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              This Isn&apos;t Another AI Tool.{" "}
              <span className="gradient-text">This Is Your New Workforce.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[15px] text-slate-400 leading-relaxed glass rounded-2xl border border-white/5 p-8 card-glow">
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
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-section-fade-alt">
        <div id="how" className="max-w-3xl mx-auto px-6 scroll-mt-24">
          <div className="text-center mb-14">
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-balance">
              One AI Parent. Unlimited Workers.{" "}
              <span className="text-blue-400">Trained to Serve You.</span>
            </h2>
          </div>
          <div className="space-y-6">
            <Step num="01" title="The Audit" desc="BlueDawg's parent AI analyzes your business top to bottom. Every workflow. Every bottleneck. Every wasted hour. You get a complete map of everything costing you money, time, and sanity." />
            <Step num="02" title="The Build" desc="Based on the audit, BlueDawg self-configures a team of specialized AI agents — each one purpose-built for a specific function in YOUR business. Customer support. Content. Sales. Operations. Each trained on your data, your voice, your processes." />
            <Step num="03" title="The Deploy" desc="Your AI workforce goes live 24/7/365. They learn from every interaction. They get better every week. BlueDawg's parent AI monitors performance, catches errors, and optimizes continuously. You don't manage them. BlueDawg does." />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-white/[0.01]">
        <div id="features" className="max-w-5xl mx-auto px-6 scroll-mt-24">
          <div className="text-center mb-14">
            <SectionLabel>CAPABILITIES</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-4 text-balance">
              Everything You Wish Your Team Did <span className="text-blue-400">Without Being Asked</span>
            </h2>
            <p className="text-center text-slate-500 text-sm">Loyal. Relentless. Never sleeps. Man&apos;s best friend wasn&apos;t a person. It was BlueDawg.</p>
          </div>
          <div className="glass card-glow rounded-2xl border border-white/5 p-4 md:p-6">
            <FeatureRow icon="💬" title="Customer Experience" does="Respond to every inquiry in under 60 seconds, 24/7. Handle returns, complaints, and upsells in your brand voice." stops="Hiring night-shift support reps. Apologizing for slow response times." />
            <FeatureRow icon="✍️" title="Content & Social" does="Write, schedule, and publish content across every platform. Repurpose one video into 15 pieces of content." stops="Begging your team to post consistently. Paying agencies $8K/mo for mediocre output." />
            <FeatureRow icon="📈" title="Sales & Follow-Up" does="Instant lead response. Nurture sequences that actually nurture. Book calls on your calendar automatically." stops="Watching leads go cold. Wondering why your CRM is a graveyard." />
            <FeatureRow icon="⚙️" title="Operations" does="Scheduling, invoicing, inventory tracking, vendor communication, reporting. All handled." stops="Drowning in spreadsheets. Paying someone $60K/year to copy-paste between systems." />
            <FeatureRow icon="📊" title="Data & Intelligence" does="Real-time dashboards. Anomaly detection. Competitor monitoring. Market research on demand." stops="Flying blind. Making gut decisions when you should have data." />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-section-fade">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>ARCHITECTURE</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Built Different. <span className="text-blue-400">On Purpose.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["🧠", "Multi-Agent Orchestration", "Not one chatbot pretending to do everything. A coordinated team of specialized agents, each world-class at its function."],
              ["💾", "Persistent Memory", "Your agents remember every customer interaction, every preference, every context. They build relationships."],
              ["🔌", "Tool Integration", "Connect to your CRM, email, social, payments, inventory, calendars. They work WITH your systems."],
              ["🔒", "Enterprise Security", "Data never trains public models. SOC 2 compliant. Role-based access. Encryption at rest and in transit."],
              ["📈", "Self-Improving", "Parent AI continuously monitors performance, identifies weaknesses, and deploys improvements automatically."],
              ["♾️", "Infinite Scale", "Need more agents? Deployed. New department? New agents. New location? Replicated in days."],
            ].map(([icon, title, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="card-glow bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-blue-500/20"
              >
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <SectionLabel>USE CASES</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Deployed for Teams That Need Results <span className="text-blue-400">Now.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glow bg-gradient-to-b from-blue-500/[0.05] to-transparent border border-blue-500/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Enterprise · $10M–$100M Revenue</div>
              <h3 className="text-xl font-bold text-white mb-4">&ldquo;We Replaced 6 Departments With 6 Agents. Revenue Went Up.&rdquo;</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {[
                  "Centralized customer experience across all locations",
                  "Unified reporting and intelligence",
                  "Standardized operations that actually stay standard",
                  "Sales follow-up that never sleeps or forgets",
                  "Content production at a scale no human team can match",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">→</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 card-glow">
                <p className="text-xs text-blue-300/70">
                  <strong className="text-blue-300">The ROI math:</strong> If you&apos;re paying $500K/year in salaries for work AI agents handle better — you&apos;re not saving money. You&apos;re burning it.
                </p>
              </div>
            </div>
            <div className="card-glow bg-gradient-to-b from-purple-500/[0.05] to-transparent border border-purple-500/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">Creators · 1M+ Followers</div>
              <h3 className="text-xl font-bold text-white mb-4">&ldquo;Your Brand Runs While You Create.&rdquo;</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {[
                  "Repurpose every piece of content across every platform",
                  "Respond to DMs and comments in your voice",
                  "Manage community, flag conversations, nurture superfans",
                  "Handle sponsorship inquiries and scheduling",
                  "Track analytics and surface what's working",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">→</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-purple-500/5 border border-purple-500/10 rounded-lg p-4 card-glow">
                <p className="text-xs text-purple-300/70">
                  <strong className="text-purple-300">You became a creator to create.</strong> BlueDawg handles everything else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-section-fade-alt">
        <div id="pricing" className="max-w-5xl mx-auto px-6 scroll-mt-24">
          <div className="text-center mb-14">
            <SectionLabel>PRICING</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-balance">
              What Would You Pay for a Team That <span className="text-blue-400">Never Sleeps?</span>
            </h2>
            <p className="text-slate-500 text-sm">Less than one part-time employee. More impact than an entire department.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="relative rounded-2xl p-8 flex flex-col bg-white/[0.03] border border-white/10 card-glow">
              <h3 className="text-2xl font-bold text-white mb-1 font-display">BlueDawg Box</h3>
              <p className="text-sm text-slate-400 mb-6">For creators and growing businesses</p>
              <div className="space-y-2.5 mb-6 flex-1">
                {[
                  ["Custom AI workforce audit & blueprint", "$10,000"],
                  ["Purpose-built agent team (replaces 2-3 FTEs)", "$150,000/yr"],
                  ["Persistent memory & learning system", "$5,000"],
                  ["Full tool integration (CRM, social, email, calendar)", "$8,000"],
                  ["Parent AI monitoring & self-optimization", "$24,000/yr"],
                  ["Dedicated onboarding & configuration", "$5,000"],
                  ["Monthly performance reviews & agent updates", "$12,000/yr"],
                ].map(([item, val], i) => (
                  <div key={i} className="flex items-start justify-between gap-3 text-sm">
                    <span className="flex items-start gap-2 text-slate-300">
                      <span className="text-blue-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </span>
                    <span className="text-slate-500 text-xs whitespace-nowrap font-mono">{val}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 mb-5 text-center card-glow">
                <span className="text-xs text-slate-500 line-through">Total value: $214,000+/yr</span>
                <div className="text-2xl font-bold text-white mt-1 font-display">$2K-$3K/mo</div>
                <div className="text-xs text-blue-400 font-semibold mt-1">$5,000 setup · You pay ~15 cents on the dollar</div>
              </div>
              <Button href="#cta" variant="secondary" size="md" className="w-full justify-center">
                Start Your Audit
              </Button>
            </div>
            <div className="relative rounded-2xl p-8 flex flex-col bg-gradient-to-b from-blue-500/10 to-blue-600/5 border-2 border-blue-500/40 card-glow gradient-border">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 font-display">BlueDawg Cloud</h3>
              <p className="text-sm text-slate-400 mb-6">Enterprise-scale autonomous AI</p>
              <div className="space-y-2.5 mb-6 flex-1">
                {[
                  ["Everything in Box, plus:", ""],
                  ["Deep organizational audit (every dept, every workflow)", "$25,000"],
                  ["Enterprise agent architecture & custom build", "$50,000"],
                  ["Multi-location deployment & coordination", "$30,000"],
                  ["Enterprise security & compliance (SOC 2)", "$15,000"],
                  ["Dedicated success team & priority support", "$36,000/yr"],
                  ["Continuous optimization & agent expansion", "$24,000/yr"],
                  ["Executive intelligence dashboard", "$18,000/yr"],
                ].map(([item, val], i) => (
                  <div key={i} className="flex items-start justify-between gap-3 text-sm">
                    <span className="flex items-start gap-2 text-slate-300">
                      <span className="text-blue-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </span>
                    {val && <span className="text-slate-500 text-xs whitespace-nowrap font-mono">{val}</span>}
                  </div>
                ))}
              </div>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 mb-5 text-center card-glow">
                <span className="text-xs text-slate-500 line-through">Total value: $412,000+/yr</span>
                <div className="text-2xl font-bold text-white mt-1 font-display">Custom</div>
                <div className="text-xs text-blue-400 font-semibold mt-1">Typical: $30-50K setup + $5-10K/mo</div>
              </div>
              <Button href="#cta" variant="primary" size="md" className="w-full justify-center pulse-glow">
                Book a Demo
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold px-6 py-3 rounded-xl card-glow">
              <span>⚡</span>
              We onboard a maximum of 5 new clients per month. Each deployment requires hands-on configuration by our senior team. <strong>March: 3 spots remaining.</strong>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-gradient-to-b from-emerald-500/[0.03] to-transparent">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>GUARANTEE</SectionLabel>
          <div className="text-4xl mb-6">🛡️</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            The &ldquo;Work Like a Dawg&rdquo; <span className="text-emerald-400">Guarantee</span>
          </h2>
          <div className="text-[15px] text-slate-400 leading-relaxed space-y-4 max-w-2xl mx-auto mb-8 glass rounded-2xl border border-emerald-500/10 p-8 card-glow">
            <p>We don&apos;t hide behind vague promises. Here&apos;s exactly what we guarantee:</p>
            <p className="text-lg text-white font-semibold">
              Deploy BlueDawg. Use it for 6 full months. If you can&apos;t point to measurable ROI — reduced costs, increased revenue, time saved, leads converted — we will optimize your entire AI workforce for free for another 6 months until you do.
            </p>
            <p>No fine print. No weasel clauses. We win when you win.</p>
            <p>Why can we guarantee this? Because we&apos;ve done it 100+ times. We know what works. And we don&apos;t take clients we can&apos;t help.</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold px-6 py-3 rounded-full card-glow">
            🛡️ 6-Month ROI Guarantee — or 6 more months on us.
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 lg:py-32 bg-section-fade">
        <div id="faq" className="max-w-2xl mx-auto px-6 scroll-mt-24">
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-balance">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            <FAQItem q="What if AI makes mistakes?" a="BlueDawg's parent AI monitors every agent interaction. Errors are caught, corrected, and learned from in real-time. For high-stakes decisions, you set the guardrails — agents escalate to humans when you want them to. The question isn't whether AI makes mistakes. It's whether AI makes fewer mistakes than your current team at 3am on a Tuesday." />
            <FAQItem q="We already use ChatGPT / other AI tools." a="Great. Those are tools. Someone on your team still has to prompt them, review the output, and do something with it. BlueDawg is a workforce. It prompts itself, reviews itself, and acts on its own. The difference between a power drill and a construction crew." />
            <FAQItem q="Is our data safe?" a="Your data never trains public models. Enterprise-grade encryption. SOC 2 compliant infrastructure. Role-based access. We take security as seriously as you do — because our enterprise clients demand it." />
            <FAQItem q="How long until we see results?" a="Most clients see their first autonomous workflows running within 2 weeks of deployment. Measurable ROI typically appears within 60-90 days. Our 6-month guarantee means you have zero risk." />
            <FAQItem q="What if we outgrow it?" a="You won't outgrow it. BlueDawg scales with you. Need more agents? They're deployed. New department? New agents. New location? Replicated in days. Your AI workforce grows as fast as your business does." />
          </div>
        </div>
      </AnimatedSection>

      <MarqueeBar />

      <AnimatedSection className="py-24 lg:py-32 relative overflow-hidden bg-section-fade-alt">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent pointer-events-none" />
        <div id="cta" className="relative max-w-3xl mx-auto px-6 text-center scroll-mt-24">
          <SectionLabel>READY TO DEPLOY</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Your AI Workforce Is Ready to <span className="gradient-text">Work Like a Dawg.</span>
          </h2>
          <p className="text-slate-400 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Your competitors are deploying autonomous AI right now. They&apos;re cutting costs, accelerating growth, and operating 24/7. Deploy BlueDawg and wake up tomorrow to a business that runs itself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button href="https://calendly.com" target="_blank" rel="noopener noreferrer" variant="primary" size="md">
              Book a Demo
            </Button>
            <Button href="mailto:hello@bluedawg.app" variant="secondary" size="md">
              Start Your Audit
            </Button>
            <Button href="mailto:hello@bluedawg.app" variant="ghost" size="md" className="text-slate-400 hover:text-white">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <footer className="border-t border-white/5 py-10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-lg font-bold font-display"><span className="text-blue-400">Blue</span>Dawg</span>
            <p className="text-xs text-slate-600 mt-1">Every business deserves a best friend. Yours just learned to code.</p>
          </div>
          <div className="text-xs text-slate-600">
            A LeadCatcher company. Built in Detroit. Deployed everywhere. © {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      <MobileCTA />
    </div>
  );
}
