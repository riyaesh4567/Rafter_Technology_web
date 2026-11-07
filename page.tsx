"use client";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent, type FormEvent } from "react";

/* ===== Edit your business details here ===== */
const CFG = {
  name: "Rafter Technologies",
  phone: "8052839537",
  whatsapp: "918052839537", // country code + number (assumed India, +91)
  email: "hello@yourdomain.com", // TODO: replace
  linkedin: "https://www.linkedin.com/company/rafter-technologies", // TODO: confirm URL
};

/* ===== Inline SVG icons (stroke paths, 24x24) ===== */
const P = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  net: "M5 12.55a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 20h.01M1.4 9a16 16 0 0 1 21.2 0",
  cube: "M21 16V8l-9-5-9 5v8l9 5 9-5zM3.3 7 12 12l8.7-5M12 22V12",
  sup: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-7h3zM3 19a2 2 0 0 0 2 2h1v-7H3z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  cart: "M6 6h15l-2 9H8zM6 6 5 3H2M9 20h.01M18 20h.01",
  cap: "M22 10 12 5 2 10l10 5zM6 12v5c3 2 9 2 12 0v-5",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8",
  mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4",
  trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  up: "M12 19V5M5 12l7-7 7 7",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6 6 18M6 6l12 12",
};
type IconName = keyof typeof P;
const Icon = ({ n }: { n: IconName }) => (
  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={P[n]} /></svg>
);
const Logo = () => (
  /* Placeholder shield logo: replace with your real logo SVG or <Image /> */
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M8 15V9h4a2 2 0 0 1 0 4H8m5 0 2 2" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
);

/* ===== Content ===== */
const SERVICES: [string, [string, IconName, string][]][] = [
  ["IT & Tech", [
    ["IT Consulting", "chat", "Strategy and roadmaps that fit your budget and goals."],
    ["Network Support", "net", "Secure setup, monitoring and fast fixes."],
    ["Complete IT Solutions", "cube", "End-to-end systems, from planning to rollout."],
    ["Tech Support", "sup", "Quick help for day-to-day IT issues."],
    ["Web Development", "code", "Fast, modern websites and web apps."],
    ["E-Commerce Solutions", "cart", "Online stores built to convert."],
  ]],
  ["Training", [
    ["Training Programs", "cap", "Practical, hands-on courses for individuals."],
    ["Corporate Training", "users", "Upskilling programs tailored to your team."],
  ]],
  ["Career & Business", [
    ["Resume Writing & Review", "file", "Resumes that get past filters and into interviews."],
    ["Interview Preparation", "mic", "Mock interviews and honest feedback."],
    ["Career Coaching", "trend", "Clear paths for your next move."],
    ["Marketing & Designing", "pen", "Brand visuals and campaigns that stand out."],
    ["Email Marketing", "mail", "Campaigns that reach inboxes and get replies."],
    ["Marketing Consulting", "target", "Plans built around measurable growth."],
    ["Human Resources", "users", "Hiring and HR support for growing teams."],
  ]],
];
const WHY: [IconName, string, string][] = [
  ["bolt", "Quick support", "Fast responses so small issues never become big ones."],
  ["target", "Practical solutions", "Straightforward fixes that work in the real world."],
  ["shield", "Long-term success", "We build for where your business is heading."],
  ["globe", "Hybrid workforce", "A flexible, remote-first team that covers every need."],
];
const STEPS: [string, string][] = [
  ["Consult", "We listen first and learn your goals."], ["Plan", "A clear scope, timeline and price."],
  ["Deliver", "We build and ship with regular updates."], ["Support", "Ongoing help after launch."],
];
const TECH = ["Linux", "Asterisk (PBX)", "Networking", "Compliance", "IT Recruitment"];
const TESTI: [string, string][] = [ // placeholder reviews: replace with real ones
  ["Rafter set up our network and phone system in days. Support has been fast ever since.", "Placeholder Client, Operations Lead"],
  ["Their interview coaching helped me land my first IT role.", "Placeholder Client, Software Engineer"],
  ["Our team training was practical and well paced. We saw results quickly.", "Placeholder Client, HR Manager"],
];
const FAQ: [string, string][] = [
  ["Do you work with clients remotely?", "Yes. We are remote-first and serve clients worldwide, with on-call support."],
  ["How much do your services cost?", "Pricing depends on scope. Contact us for a free consultation and a clear quote."],
  ["Can you handle both IT and career services?", "Yes. Our hybrid team covers IT, training, marketing and career coaching."],
  ["How fast can we get started?", "Most projects start within a few days after the initial consultation."],
];

/* ===== Hooks ===== */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
const Tilt = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  return <div className={`glass card rv ${className}`} onMouseMove={move} onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>{children}</div>;
};
function Count({ to = 0, suffix = "", text }: { to?: number; suffix?: string; text?: string }) {
  const ref = useRef<HTMLElement>(null), [v, setV] = useState(0);
  useEffect(() => {
    if (text) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); p < 1 && requestAnimationFrame(tick); };
      requestAnimationFrame(tick); io.disconnect();
    });
    io.observe(ref.current!); return () => io.disconnect();
  }, [to, text]);
  return <b ref={ref} className="grad-t">{text || v + suffix}</b>;
}
function Typing({ words }: { words: string[] }) {
  const [i, setI] = useState(0), [s, setS] = useState("");
  useEffect(() => {
    const w = words[i % words.length]; let n = 0, dir = 1, t: ReturnType<typeof setTimeout>;
    const run = () => {
      n += dir; setS(w.slice(0, n));
      if (n === w.length) { dir = -1; t = setTimeout(run, 1400); }
      else if (n === 0) { setI((x) => x + 1); }
      else t = setTimeout(run, dir > 0 ? 80 : 40);
    };
    t = setTimeout(run, 300); return () => clearTimeout(t);
  }, [i, words]);
  return <div className="type" aria-live="off">{s}<i /></div>;
}
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, h = 0, raf = 0, pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const size = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; pts = Array.from({ length: Math.min(70, w / 16) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 })); };
    size(); addEventListener("resize", size);
    const draw = () => {
      x.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        x.fillStyle = "rgba(255,138,43,.7)"; x.beginPath(); x.arc(p.x, p.y, 1.6, 0, 7); x.fill();
        for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y); if (d < 120) { x.strokeStyle = `rgba(224,30,38,${.25 * (1 - d / 120)})`; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(pts[j].x, pts[j].y); x.stroke(); } }
      });
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}

/* ===== Page ===== */
export default function Home() {
  const [theme, setTheme] = useState("dark"), [open, setOpen] = useState(false), [top, setTop] = useState(false);
  const [slide, setSlide] = useState(0), [faq, setFaq] = useState(0), [err, setErr] = useState<Record<string, string>>({}), [sent, setSent] = useState(false);
  const bar = useRef<HTMLDivElement>(null), glow = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => { const t = localStorage.getItem("theme"); if (t) setTheme(t); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement; bar.current!.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
      setTop(h.scrollTop > 600);
      if (glow.current) glow.current.style.transform = `translateY(${h.scrollTop * 0.25}px)`; // parallax
    };
    addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { const t = setInterval(() => setSlide((s) => (s + 1) % TESTI.length), 6000); return () => clearInterval(t); }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>, er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s-]{6,14}$/.test(f.phone)) er.phone = "Enter a valid phone number.";
    if (!f.service) er.service = "Choose a service.";
    if (f.message.trim().length < 10) er.message = "Tell us a little more (10+ characters).";
    setErr(er); setSent(false);
    if (!Object.keys(er).length) {
      // TODO: send `f` to your backend, Formspree, EmailJS or a Next.js route handler.
      console.log("Form data", f); setSent(true); e.currentTarget.reset();
    }
  };
  const nav = [["Services", "#services"], ["Why us", "#why"], ["Process", "#process"], ["FAQ", "#faq"], ["Contact", "#contact"]];
  const Field = ({ id, label, children }: { id: string; label: string; children: ReactNode }) => (<label>{label}{children}<span className="err" id={id + "-e"} role="alert">{err[id]}</span></label>);
  const a = (id: string) => ({ id, name: id, "aria-invalid": !!err[id], "aria-describedby": id + "-e" });

  return (
    <>
      <div className="prog" ref={bar} />
      <nav className="nav" aria-label="Main">
        <div className="wrap">
          <a href="#top" className="logo"><Logo />{CFG.name}</a>
          <div className={`links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
            {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          </div>
          <div className="tools">
            <button className="icb" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Icon n={theme === "dark" ? "sun" : "moon"} /></button>
            <a href="#contact" className="btn sm hide-m">Get a Free Consultation</a>
            <button className="icb burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon n={open ? "x" : "menu"} /></button>
          </div>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <Particles />
          <div className="glow" ref={glow} style={{ width: 460, height: 460, background: "var(--red)", top: "-5%", right: "-5%" }} />
          <div className="glow" style={{ width: 340, height: 340, background: "var(--org)", bottom: "-8%", left: "5%" }} />
          <div className="float glass" style={{ top: "22%", right: "14%" }}><Icon n="code" /></div>
          <div className="float glass" style={{ top: "55%", right: "7%", animationDelay: "-2s" }}><Icon n="net" /></div>
          <div className="float glass" style={{ top: "72%", right: "24%", animationDelay: "-4s" }}><Icon n="shield" /></div>
          <div className="wrap" style={{ position: "relative" }}>
            <h1>Solution of <span className="grad-t">Tech Desires</span></h1>
            <Typing words={["Web Development", "IT Support", "Training", "Career Growth"]} />
            <p className="lead">A remote-first hybrid team covering the full spectrum of IT and non-IT services, with a focus on innovation, quality and client success.</p>
            <div className="ctas"><a href="#contact" className="btn">Get a Free Consultation</a><a href="#services" className="btn ghost">Explore services</a></div>
          </div>
        </header>

        <section className="sec" aria-label="Stats"><div className="wrap stats">
          <div className="glass stat rv"><Count to={2024} /><span>Founded</span></div>
          <div className="glass stat rv"><Count to={4} suffix="K+" /><span>LinkedIn followers</span></div>
          <div className="glass stat rv"><Count text="11-50" /><span>Experts on the team</span></div>
          <div className="glass stat rv"><Count text="Remote" /><span>First support, worldwide</span></div>
        </div></section>

        <section className="sec" id="services" style={{ paddingTop: 0 }}><div className="wrap">
          <h2 className="rv">Everything your business and career needs</h2>
          <p className="lead rv">One team for technology, training and growth.</p>
          {SERVICES.map(([cat, items]) => (
            <div className="cat" key={cat}><h3>{cat}</h3>
              <div className="grid">{items.map(([t, i, d]) => <Tilt key={t}><Icon n={i} /><h4>{t}</h4><p>{d}</p></Tilt>)}</div>
            </div>
          ))}
        </div></section>

        <section className="sec" id="why" style={{ background: "var(--bg2)" }}><div className="wrap">
          <h2 className="rv">Why choose Rafter</h2><p className="lead rv">Quick support and practical solutions, built for long-term success.</p>
          <div className="grid">{WHY.map(([i, t, d]) => <Tilt key={t}><Icon n={i} /><h4>{t}</h4><p>{d}</p></Tilt>)}</div>
        </div></section>

        <section className="sec" id="process"><div className="wrap">
          <h2 className="rv">How we work</h2><p className="lead rv">Four simple steps from first call to ongoing support.</p>
          <ol className="tl" style={{ listStyle: "none" }}>{STEPS.map(([t, d]) => <li className="glass step rv" key={t}><h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>{t}</h3><p>{d}</p></li>)}</ol>
        </div></section>

        <div className="mq" aria-label="Tech expertise"><div>{[...TECH, ...TECH, ...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div></div>

        <section className="sec"><div className="wrap">
          <h2 className="rv">What clients say</h2><p className="lead rv">Placeholder reviews: swap in real testimonials.</p>
          <div className="car"><div className="glass slide" aria-live="polite"><q>{TESTI[slide][0]}</q><span>{TESTI[slide][1]}</span></div>
            <div className="dots">{TESTI.map((_, i) => <button key={i} aria-label={`Show review ${i + 1}`} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} />)}</div></div>
        </div></section>

        <section className="sec" id="faq" style={{ background: "var(--bg2)" }}><div className="wrap faq">
          <h2 className="rv">Questions, answered</h2><p className="lead rv">Can't find yours? Message us.</p>
          {FAQ.map(([q, ans], i) => (
            <div key={q} className={`glass q ${faq === i ? "open" : ""}`}>
              <button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}>{q}<span className="pl">+</span></button>
              <div className="a"><p>{ans}</p></div>
            </div>))}
        </div></section>

        <section className="sec" id="contact"><div className="wrap">
          <h2 className="rv">Let's build your solution</h2><p className="lead rv">Tell us what you need. We reply within one business day.</p>
          <div className="cg">
            <div className="glass ci rv">
              <a className="btn" href={`tel:+91${CFG.phone}`}><Icon n="phone" />Call {CFG.phone}</a>
              <a className="btn ghost" href={`https://wa.me/${CFG.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              <a className="btn ghost" href={CFG.linkedin} target="_blank" rel="noreferrer">Follow on LinkedIn</a>
              <p style={{ color: "var(--mut)" }}>{CFG.email}<br />Remote, serving clients worldwide.</p>
            </div>
            <form className="glass rv" onSubmit={submit} noValidate>
              <Field id="name" label="Name"><input {...a("name")} autoComplete="name" /></Field>
              <Field id="email" label="Email"><input type="email" {...a("email")} autoComplete="email" /></Field>
              <Field id="phone" label="Phone"><input type="tel" {...a("phone")} autoComplete="tel" /></Field>
              <Field id="service" label="Service"><select {...a("service")} defaultValue=""><option value="" disabled>Choose a service</option>{SERVICES.flatMap(([, x]) => x).map(([t]) => <option key={t}>{t}</option>)}</select></Field>
              <Field id="message" label="Message"><textarea rows={4} {...a("message")} /></Field>
              <button className="btn" type="submit">Send message</button>
              {sent && <p className="ok" role="status">Thanks! Your message is ready to send. Connect a backend to deliver it.</p>}
            </form>
          </div>
        </div></section>
      </main>

      <footer><div className="wrap">
        <div className="fg">
          <div><a href="#top" className="logo"><Logo />{CFG.name}</a><p style={{ color: "var(--mut)", marginTop: 8 }}>Solution of Tech Desires</p></div>
          <ul aria-label="Quick links">{nav.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>
          <ul aria-label="Social"><li><a href={CFG.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li><li><a href={`https://wa.me/${CFG.whatsapp}`}>WhatsApp</a></li></ul>
        </div>
        <p className="copy">© 2026 Rafter Technologies. All rights reserved.</p>
      </div></footer>

      <a href="#top" aria-label="Back to top" className={`btn icb top ${top ? "show" : ""}`} style={{ padding: 0, background: "var(--grad)" }}><Icon n="up" /></a>
    </>
  );
}