import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── GSAP Loader ─────────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
      s2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve(window.gsap);
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  });

/* ── Enquiry form default state ───────────────────────────── */
const INITIAL = {
  name: "",
  phone: "",
  email: "",
  city: "",
  grade: "",
  stream: "",
  board: "",
  message: "",
};

/* ── Academic Divisions Offered ─────────────────────────── */
const DIVISIONS = [
  {
    icon: "🧸",
    title: "Pre-Primary Wing",
    grades: ["LKG", "UKG", "Playgroup"],
    desc: "Montessori & Activity-based early childhood education.",
    color: "from-pink-500 to-rose-600",
    border: "border-pink-500/40",
    accent: "text-pink-400",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "📚",
    title: "Primary Wing",
    grades: ["Class 1st", "Class 2nd", "Class 3rd", "Class 4th", "Class 5th"],
    desc: "Foundation in literacy, numeracy, smart classes & sports.",
    color: "from-amber-500 to-orange-600",
    border: "border-amber-500/40",
    accent: "text-amber-400",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "📐",
    title: "Middle School",
    grades: ["Class 6th", "Class 7th", "Class 8th"],
    desc: "Subject mastery, lab practicals, Olympiad & NTSE prep.",
    color: "from-cyan-500 to-blue-600",
    border: "border-cyan-500/40",
    accent: "text-cyan-400",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "🏫",
    title: "Secondary Wing",
    grades: ["Class 9th", "Class 10th (CBSE)"],
    desc: "Rigorous CBSE board prep with 100% pass record.",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/40",
    accent: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "🔬",
    title: "Senior Sec — Science",
    grades: ["11th & 12th (PCM / PCB)"],
    desc: "Integrated NEET / JEE coaching with Physics, Chem & Bio labs.",
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/40",
    accent: "text-violet-400",
    image: "https://images.unsplash.com/photo-1532094349884-543559822432?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "📊",
    title: "Senior Sec — Commerce & Arts",
    grades: ["11th & 12th (Comm / Arts)"],
    desc: "CA Foundation, Economics, Computer Science & Humanities.",
    color: "from-indigo-500 to-blue-600",
    border: "border-indigo-500/40",
    accent: "text-indigo-400",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
];

/* ── Process steps ──────────────────────────────────────────── */
const STEPS = [
  { num: "01", icon: "📋", title: "Submit Enquiry Form", desc: "Fill your child's details and grade of interest in the form below." },
  { num: "02", icon: "📞", title: "Counsellor Callback", desc: "Our admission advisor will call you within 24 hours to clarify queries." },
  { num: "03", icon: "🏫", title: "Campus Interaction / Tour", desc: "Visit our smart campus, meet the Principal & HODs." },
  { num: "04", icon: "📄", title: "Document Submission", desc: "Submit TC, previous marksheet, Aadhar & photographs." },
  { num: "05", icon: "🎓", title: "Seat Allocation", desc: "Receive formal admission confirmation & book your seat." },
];

/* ══════════════════════════════════════════════════════════════ */
const AdmissionEnquiry = () => {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Refs for GSAP */
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroGridRef = useRef(null);
  const divisionsRef = useRef(null);
  const divCardsRef = useRef([]);
  const stepsRef = useRef(null);
  const stepCardsRef = useRef([]);
  const formRef = useRef(null);
  const formInnerRef = useRef(null);

  /* ── GSAP animations ────────────────────────────────────── */
  useEffect(() => {
    loadGSAP().then((gsap) => {
      /* Hero entrance timeline */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (heroTextRef.current) {
        tl.fromTo(heroTextRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 }
        );
      }
      if (heroGridRef.current) {
        tl.fromTo(heroGridRef.current.children,
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.4)" },
          "-=0.5"
        );
      }

      /* Division Cards Stagger */
      const validDivs = divCardsRef.current.filter(Boolean);
      if (validDivs.length && divisionsRef.current) {
        gsap.fromTo(validDivs,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: divisionsRef.current, start: "top 80%" },
          }
        );
      }

      /* Steps Stagger */
      const validSteps = stepCardsRef.current.filter(Boolean);
      if (validSteps.length && stepsRef.current) {
        gsap.fromTo(validSteps,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
          }
        );
      }

      /* Form inner scale */
      if (formInnerRef.current && formRef.current) {
        gsap.fromTo(formInnerRef.current,
          { scale: 0.94, opacity: 0, y: 40 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 75%" },
          }
        );
      }
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans overflow-x-hidden">

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[75vh] flex items-center py-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.85) 100%), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Glow orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text */}
          <div ref={heroTextRef} className="lg:col-span-6 space-y-5">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-widest">
                🎓 Admissions Open 2025–26 · LKG to Class 12
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Admission{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Enquiry Desk
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              Give your child the gift of excellence at <strong className="text-white">Sanskriti International College</strong>. Fill out the quick enquiry form and our dedicated counsellors will assist you.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#enquiry-form"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all text-sm md:text-base"
              >
                Fill Enquiry Form →
              </a>
              <Link
                to="/admissions"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-2xl border border-slate-700 hover:border-cyan-500/50 shadow-lg hover:scale-105 transition-all text-sm md:text-base"
              >
                Direct Online Admission
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 max-w-md">
              {[
                { num: "25+ Yrs", label: "Legacy" },
                { num: "100%", label: "CBSE Result" },
                { num: "15,000+", label: "Alumni" },
              ].map((st, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg md:text-xl font-black text-cyan-400">{st.num}</div>
                  <div className="text-xs text-gray-400 font-semibold">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right School Image Collage */}
          <div ref={heroGridRef} className="lg:col-span-6 grid grid-cols-2 gap-3 relative">
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
                  alt="Classroom"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
                  alt="Students learning"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-3 pt-6">
              <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543559822432?auto=format&fit=crop&w=600&q=80"
                  alt="Science Lab"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                  alt="School Events"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Center Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/90 border border-cyan-500/50 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl text-center pointer-events-none">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">🏫 Sanskriti Campus</span>
              <span className="text-[11px] text-gray-300">LKG to Class 12 CBSE</span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ ACADEMIC DIVISIONS ═══════════════ */}
      <section ref={divisionsRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            🏫 Academics Offered
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
            Explore Programs by <span className="text-cyan-400">Wing / Grade</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            From playful Montessori foundation to focused 12th CBSE board & NEET/JEE preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVISIONS.map((div, i) => (
            <div
              key={i}
              ref={(el) => (divCardsRef.current[i] = el)}
              className={`group relative rounded-2xl overflow-hidden bg-slate-900/80 border ${div.border} hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              {/* Image Header */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={div.image}
                  alt={div.title}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <span className="absolute top-3 left-3 text-2xl bg-slate-950/80 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                  {div.icon}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-lg font-black text-white mb-1">{div.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{div.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {div.grades.map((g) => (
                    <span key={g} className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 ${div.accent}`}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ADMISSION PROCESS ═══════════════ */}
      <section ref={stepsRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
            🗺 Step-by-Step
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
            Enquiry to <span className="text-purple-400">Admission Flow</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">Simple 5-step process to secure your seat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepCardsRef.current[i] = el)}
              className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-4 text-center transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-2xl mb-3">
                {step.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1">Step {step.num}</span>
              <h4 className="text-sm font-black text-white mb-1">{step.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ENQUIRY FORM SECTION ═══════════════ */}
      <section id="enquiry-form" ref={formRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Campus Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                alt="Sanskriti Campus"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"; }}
                className="w-full h-64 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  Have Questions?
                </span>
                <h3 className="text-xl font-black text-white">We're Here to Help Your Child Succeed</h3>
                <p className="text-xs text-gray-300 mt-1">Our counsellors reply within 24 working hours.</p>
              </div>
            </div>

            {/* Helpdesk Cards */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Admission Desk</h4>
              {[
                { icon: "📞", label: "Phone Helpline", val: "+91 98765 43210 / +91 98765 43211" },
                { icon: "📧", label: "Email Support", val: "admissions@sanskriticollege.edu" },
                { icon: "🕐", label: "School Hours", val: "Mon – Sat, 8:00 AM – 4:00 PM" },
                { icon: "📍", label: "Campus Address", val: "Sanskriti International Campus, Main Road" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold">{item.label}</p>
                    <p className="text-white font-semibold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7" ref={formInnerRef}>
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="mb-6">
                <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider">
                  📝 Quick Enquiry
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
                  Admission <span className="text-cyan-400">Enquiry Form</span>
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  Fill in your details below and our team will get back to you with prospectus & fee details.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-black text-cyan-400">Enquiry Submitted Successfully!</h3>
                  <p className="text-gray-300 text-sm max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{form.name}</strong>! Our admission counsellor will call you on <strong className="text-cyan-400">{form.phone}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                    className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black px-6 py-2.5 rounded-2xl hover:scale-105 transition-all text-xs uppercase tracking-wider"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Student / Parent Name *</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Mobile Number *</label>
                    <input
                      type="tel" name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">City / Location *</label>
                    <input
                      type="text" name="city" required value={form.city} onChange={handleChange}
                      placeholder="Your City"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>

                  {/* Grade Seeking */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Class / Grade Seeking *</label>
                    <select
                      name="grade" required value={form.grade} onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Grade</option>
                      <option>LKG / UKG / Nursery</option>
                      <option>Primary (Class 1st to 5th)</option>
                      <option>Middle School (Class 6th to 8th)</option>
                      <option>High School (Class 9th & 10th)</option>
                      <option>11th Science (PCM / PCB)</option>
                      <option>11th Commerce / Arts</option>
                      <option>12th Science (PCM / PCB)</option>
                      <option>12th Commerce / Arts</option>
                    </select>
                  </div>

                  {/* Board */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Current Board *</label>
                    <select
                      name="board" required value={form.board} onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Board</option>
                      <option>CBSE</option>
                      <option>ICSE</option>
                      <option>State Board</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label className="block text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">Specific Message / Query (Optional)</label>
                    <textarea
                      name="message" rows="3" value={form.message} onChange={handleChange}
                      placeholder="Ask any questions about fees, transport, hostel or curriculum..."
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-70 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>📩 Send Admission Enquiry</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AdmissionEnquiry;
