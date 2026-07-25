import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { buildApiUrl } from "../services/api";

/* ── GSAP CDN Loader ────────────────────────────────────────── */
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

/* ── Step definitions ───────────────────────────────────────── */
const STEP_META = [
  { label: "Personal Info", icon: "👤", desc: "Your basic details" },
  { label: "Documents",     icon: "📄", desc: "Upload required files" },
  { label: "Payment",       icon: "💳", desc: "Secure fee payment" },
  { label: "Confirmation",  icon: "🎓", desc: "Admission confirmed" },
];

const COURSES = [
  // Pre-Primary
  "LKG (Lower Kindergarten)",
  "UKG (Upper Kindergarten)",
  // Primary
  "Class 1st",
  "Class 2nd",
  "Class 3rd",
  "Class 4th",
  "Class 5th",
  // Middle School
  "Class 6th",
  "Class 7th",
  "Class 8th",
  // High School
  "Class 9th",
  "Class 10th",
  // Senior Secondary
  "Class 11th – Science Stream",
  "Class 11th – Commerce Stream",
  "Class 11th – Arts Stream",
  "Class 12th – Science Stream",
  "Class 12th – Commerce Stream",
  "Class 12th – Arts Stream",
];

const FILE_FIELDS = [
  { key: "tenthMarksheet",    label: "10th Marksheet",     icon: "📋", accept: ".pdf,.jpg,.jpeg,.png" },
  { key: "twelfthMarksheet",  label: "12th Marksheet",     icon: "📋", accept: ".pdf,.jpg,.jpeg,.png" },
  { key: "idProof",           label: "ID Proof (Aadhar)",  icon: "🪪", accept: ".pdf,.jpg,.jpeg,.png" },
];

const PAYMENT_METHODS = [
  { id: "UPI",         icon: "📱", label: "UPI / GPay",    color: "from-violet-600 to-purple-700", border: "border-violet-500" },
  { id: "Card",        icon: "💳", label: "Debit / Credit Card", color: "from-cyan-600 to-blue-700",   border: "border-cyan-500" },
  { id: "NetBanking",  icon: "🏦", label: "Net Banking",   color: "from-emerald-600 to-teal-700", border: "border-emerald-500" },
];

/* ══════════════════════════════════════════════════════════════ */
const Admission = () => {
  const [step, setStep]               = useState(1);
  const [admissionId, setAdmissionId] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", course: "",
  });
  const [files, setFiles] = useState({
    tenthMarksheet: null, twelfthMarksheet: null, idProof: null,
  });
  const [fileNames, setFileNames] = useState({
    tenthMarksheet: "", twelfthMarksheet: "", idProof: "",
  });

  /* ── Refs ── */
  const headerRef  = useRef(null);
  const stepBarRef = useRef(null);
  const cardRef    = useRef(null);

  /* ── GSAP on mount ── */
  useEffect(() => {
    loadGSAP().then((gsap) => {
      if (headerRef.current)
        gsap.from(headerRef.current, { opacity: 0, y: -50, duration: 0.9, ease: "power3.out", clearProps: "opacity,y" });
      if (stepBarRef.current)
        gsap.from(stepBarRef.current, { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: "power3.out", clearProps: "opacity,y" });
      if (cardRef.current)
        gsap.from(cardRef.current, { opacity: 0, y: 50, duration: 0.9, delay: 0.5, ease: "power3.out", clearProps: "opacity,y" });
    });
    const fb = setTimeout(() => {
      [headerRef, stepBarRef, cardRef].forEach(r => { if (r.current) r.current.style.opacity = "1"; });
    }, 3000);
    return () => clearTimeout(fb);
  }, []);

  /* Animate card on step change */
  useEffect(() => {
    if (!cardRef.current) return;
    loadGSAP().then((gsap) => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", clearProps: "opacity,x" }
      );
    });
  }, [step]);

  const token = localStorage.getItem("token");

  const handleChange      = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange  = (e) => {
    const { name, files: f } = e.target;
    setFiles(prev => ({ ...prev, [name]: f[0] }));
    setFileNames(prev => ({ ...prev, [name]: f[0]?.name || "" }));
  };

  /* ── STEP 1: Submit form ── */
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in to apply!");
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    Object.entries(files).forEach(([k, v]) => v && data.append(k, v));
    try {
      const res = await axios.post(buildApiUrl("/admission"), data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setAdmissionId(res.data.admission._id);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please make sure you are logged in!");
    } finally {
      setLoading(false);
    }
  };

  /* ── STEP 2: Payment ── */
  const handlePayment = () => {
    if (!paymentMethod) return alert("Please select a payment method");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); setStep(4); }, 1800);
  };

  /* ── STEP 3 → now step 4: Download PDF ── */
  const downloadPDF = async () => {
    try {
      const res = await axios.get(buildApiUrl(`/admission/letter/${admissionId}`), {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url  = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href  = url;
      link.setAttribute("download", "admission_letter.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("PDF download failed. Please try again.");
    }
  };

  /* ── Progress % ── */
  const progress = ((step - 1) / (STEP_META.length - 1)) * 100;

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <div className="min-h-screen bg-[#080d1a] text-white font-sans">
      {/* ══ HERO HEADER ══ */}
      <div
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(8,13,26,0.65) 0%, rgba(13,31,69,0.80) 100%), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-8 left-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div ref={headerRef} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-widest mb-5">
            🎓 Admissions Open 2025–26 · LKG to Class 12
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            School{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Admission Portal
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
            Secure your child's seat at{" "}
            <strong className="text-white">Sanskriti International College</strong>{" "}
            — from LKG Nursery to Class 12th CBSE Board.
          </p>

          {/* Quick highlights */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
            {[
              ["🔒", "Secure Process"],
              ["⚡", "Quick Approval"],
              ["📜", "Instant Letter"],
              ["💬", "24×7 Support"],
            ].map(([icon, txt]) => (
              <div key={txt} className="flex items-center gap-2 text-sm text-gray-300">
                <span>{icon}</span>
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WHY CHOOSE US STRIP ══ */}
      <div className="bg-slate-900/60 border-y border-slate-700/40 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🏆", num: "25+ Years", label: "of Excellence" },
            { icon: "👨‍🎓", num: "15,000+", label: "Alumni Strong" },
            { icon: "📋", num: "100%", label: "CBSE Board Results" },
            { icon: "🏫", num: "LKG–12th", label: "All Classes" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-cyan-400">{s.num}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: School Image + Info Panel ── */}
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-20 space-y-4">

              {/* Big campus image — full height to match form */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/40">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80"
                  alt="Sanskriti Campus"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=700&q=80"; }}
                  className="w-full h-72 object-cover"
                />
                <div className="bg-slate-900/90 px-4 py-3 border-t border-slate-700/40">
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">🏫 Sanskriti International College</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">CBSE Affiliated · LKG to Class 12</p>
                </div>
              </div>

              {/* Info cards */}
              <div className="space-y-2">
                {[
                  { icon: "📅", title: "Session 2025–26", sub: "Applications Open Now" },
                  { icon: "🏫", title: "Classes Available", sub: "LKG, UKG, 1st–12th" },
                  { icon: "📚", title: "CBSE Affiliated", sub: "Board Code: XXXXX" },
                  { icon: "📞", title: "Helpline", sub: "+91 98765 43210" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-900/50 border border-slate-700/40 rounded-xl px-4 py-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second school photo */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700/40">
                <img
                  src="https://images.unsplash.com/photo-1580894732413-a70d2a840e67?auto=format&fit=crop&w=700&q=80"
                  alt="Students in classroom"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80"; }}
                  className="w-full h-40 object-cover"
                />
              </div>

            </div>
          </aside>

          {/* ── Right: Step Form ── */}
          <div className="lg:col-span-3">

        {/* ── Step Progress Bar ── */}
        <div ref={stepBarRef} className="mb-10 md:mb-14">
          {/* Progress line */}
          <div className="relative flex items-center justify-between mb-4">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-700 z-0 rounded-full mx-6 sm:mx-10" />
            {/* Filled line */}
            <div
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-0 rounded-full mx-6 sm:mx-10 transition-all duration-700"
              style={{ width: `calc(${progress}% * (100% - 3rem) / 100)` }}
            />

            {STEP_META.map((s, i) => {
              const num      = i + 1;
              const isActive  = step === num;
              const isDone    = step > num;

              return (
                <div key={i} className="relative z-10 flex flex-col items-center flex-1 gap-2">
                  {/* Circle */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-extrabold text-sm sm:text-base shadow-xl transition-all duration-500 border-2
                      ${isDone  ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400 text-white scale-105"
                      : isActive ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white scale-110 ring-4 ring-cyan-500/30"
                      : "bg-slate-800 border-slate-600 text-gray-400"}`}
                  >
                    {isDone ? "✓" : s.icon}
                  </div>
                  {/* Label */}
                  <div className="text-center hidden sm:block">
                    <p className={`text-xs font-bold ${isActive ? "text-cyan-400" : isDone ? "text-emerald-400" : "text-gray-500"}`}>
                      {s.label}
                    </p>
                    <p className="text-gray-600 text-[10px]">{s.desc}</p>
                  </div>
                  {/* Mobile label */}
                  <p className={`text-[10px] font-bold sm:hidden ${isActive ? "text-cyan-400" : isDone ? "text-emerald-400" : "text-gray-600"}`}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Step Card ── */}
        <div ref={cardRef}>

          {/* ══ STEP 1: Personal Info + Documents ══ */}
          {step === 1 && (
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              {/* Personal Info */}
              <div className="bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-lg md:text-xl font-extrabold text-white mb-1 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Personal Information
                </h2>
                <p className="text-gray-400 text-sm mb-6">Fill in your basic details for the admission form.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input
                      name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Your full name as per documents"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Email Address *</label>
                    <input
                      name="email" type="email" required value={formData.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Mobile Number *</label>
                    <input
                      name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Full Address *</label>
                    <input
                      name="address" required value={formData.address} onChange={handleChange}
                      placeholder="City, State, PIN Code"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>

                  {/* Class/Grade */}
                  <div className="sm:col-span-2">
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Class / Grade Applying For *</label>
                    <select
                      name="course" required value={formData.course} onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white rounded-xl px-4 py-3 text-sm outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="">— Select Class / Grade —</option>
                      {COURSES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-lg md:text-xl font-extrabold text-white mb-1 flex items-center gap-2">
                  <span className="text-2xl">📁</span> Document Upload
                </h2>
                <p className="text-gray-400 text-sm mb-6">Upload required documents. Accepted: PDF, JPG, PNG (max 5MB each).</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {FILE_FIELDS.map(({ key, label, icon, accept }) => (
                    <div key={key} className="flex flex-col">
                      <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">
                        {icon} {label} *
                      </label>
                      <label
                        htmlFor={key}
                        className={`group flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl px-4 py-6 cursor-pointer transition-all
                          ${fileNames[key]
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-slate-600 hover:border-cyan-500 bg-slate-800/60 hover:bg-slate-800"}`}
                      >
                        <span className="text-3xl">{fileNames[key] ? "✅" : "📤"}</span>
                        <span className="text-xs text-center text-gray-400 group-hover:text-white transition">
                          {fileNames[key]
                            ? <span className="text-emerald-400 font-semibold">{fileNames[key].slice(0, 20)}{fileNames[key].length > 20 ? "…" : ""}</span>
                            : "Click to upload"}
                        </span>
                        <input
                          id={key} type="file" name={key} accept={accept}
                          onChange={handleFileChange} required className="hidden"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-70 text-slate-950 font-black py-4 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-100 transition-all text-base tracking-wide flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting your form…
                  </>
                ) : (
                  <> Continue to Payment →</>
                )}
              </button>

              {/* Login Notice */}
              {!token && (
                <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-amber-400 text-xl flex-shrink-0">⚠️</span>
                  <p className="text-amber-300 text-sm">
                    You must be <strong>logged in</strong> to submit your admission form.{" "}
                    <a href="/login" className="underline font-bold">Login here →</a>
                  </p>
                </div>
              )}
            </form>
          )}

          {/* ══ STEP 2: Payment ══ */}
          {step === 2 && (
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 md:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">💳</div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Select Payment Method</h2>
                <p className="text-gray-400 text-sm mt-2">Choose your preferred mode to pay the admission fee securely.</p>
              </div>

              {/* Fee Summary Box */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 mb-8 max-w-md mx-auto">
                <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Fee Summary</h3>
                {[
                  ["Registration Fee", "₹500"],
                  ["Admission Processing", "₹1,000"],
                  ["Security Deposit", "₹2,000"],
                ].map(([label, amt]) => (
                  <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-700 last:border-0">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-white font-semibold text-sm">{amt}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 mt-2">
                  <span className="text-white font-extrabold">Total Payable</span>
                  <span className="text-cyan-400 font-extrabold text-xl">₹3,500</span>
                </div>
              </div>

              {/* Payment method cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {PAYMENT_METHODS.map(({ id, icon, label, color, border }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`relative flex flex-col items-center gap-3 rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer
                      ${paymentMethod === id
                        ? `bg-gradient-to-br ${color} ${border} text-white shadow-xl scale-105`
                        : "bg-slate-800/70 border-slate-600 text-gray-300 hover:border-slate-500 hover:bg-slate-800"
                      }`}
                  >
                    {paymentMethod === id && (
                      <span className="absolute top-3 right-3 text-xs bg-white/20 rounded-full px-2 py-0.5 font-bold">✓ Selected</span>
                    )}
                    <span className="text-4xl">{icon}</span>
                    <span className="font-bold text-sm text-center">{label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition text-sm"
                >
                  ← Go Back
                </button>
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={!paymentMethod || loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all text-base flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Processing Payment…
                    </>
                  ) : <>Pay ₹3,500 & Confirm →</>}
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 4: Confirmation ══ */}
          {step === 4 && (
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-3xl p-8 md:p-14 shadow-2xl text-center">
              {/* Animated check */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
                  ✓
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Admission <span className="text-emerald-400">Confirmed!</span> 🎉
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-2">
                Congratulations, <strong className="text-white">{formData.name}</strong>! Your admission to{" "}
                <strong className="text-white">Sanskriti International College</strong> has been confirmed.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                A confirmation email has been sent to <span className="text-cyan-400">{formData.email}</span>.
              </p>

              {/* Detail recap */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left">
                <h4 className="text-white font-extrabold text-sm mb-3 uppercase tracking-wider">Admission Details</h4>
                {[
                  ["Name",    formData.name],
                  ["Course",  formData.course],
                  ["Email",   formData.email],
                  ["Payment", paymentMethod],
                  ["Session", "2026–27"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-slate-700 last:border-0 text-sm">
                    <span className="text-gray-400">{k}</span>
                    <span className="text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadPDF}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  📥 Download Admission Letter
                </button>
                <a
                  href="/"
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3.5 rounded-2xl border border-slate-600 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  🏠 Back to Home
                </a>
              </div>
            </div>
          )}
        </div>
          </div>{/* end lg:col-span-3 */}
        </div>{/* end grid */}
        {/* ── 2 New Related Sections ── */}

        {/* Section 1: Required Documents Checklist */}
        <section className="mt-12 bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">📋</span>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white">Documents Required at the Time of Admission</h3>
              <p className="text-xs text-gray-400">Keep soft copies ready for online upload or physical verification</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "📄", title: "10th Marksheet", desc: "Original + 2 photocopies" },
              { icon: "📜", title: "12th Marksheet", desc: "Required for Class 11th/12th" },
              { icon: "🪪", title: "Aadhar Card", desc: "Student & Parent ID proof" },
              { icon: "🏫", title: "Transfer Certificate", desc: "Issued by previous school" },
              { icon: "🖼️", title: "Passport Photos", desc: "6 recent passport size photos" },
              { icon: "🩺", title: "Medical Fitness Certificate", desc: "From registered practitioner" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Scholarships & Fee Aid */}
        <section className="mt-8 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl p-2 bg-blue-500/20 text-blue-400 rounded-xl">🎓</span>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white">Scholarships & Fee Concessions</h3>
              <p className="text-xs text-gray-400">Rewarding academic performance, sports achievers & sibling enrollment</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Merit Scholarship", badge: "Up to 50% Off", desc: "For students scoring 90%+ in 10th CBSE / State Board exams." },
              { title: "Sibling Concession", badge: "15% Fee Off", desc: "Applicable on tuition fee for second child enrolled in school." },
              { title: "Sports Quota Aid", badge: "Up to 30% Off", desc: "State and National level sports winners in recognized games." },
            ].map((sch, i) => (
              <div key={i} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider inline-block mb-2">
                    {sch.badge}
                  </span>
                  <h4 className="text-sm font-extrabold text-white mb-1">{sch.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{sch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
};

export default Admission;
