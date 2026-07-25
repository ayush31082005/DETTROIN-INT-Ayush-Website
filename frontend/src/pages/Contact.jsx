import React, { useState, useEffect, useRef } from "react";

/* ── GSAP Loader ───────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const headerRef = useRef(null);
  const infoRef   = useRef(null);
  const formRef   = useRef(null);
  const mapRef    = useRef(null);

  useEffect(() => {
    loadGSAP().then((gsap) => {
      if (headerRef.current) gsap.from(headerRef.current, { opacity: 0, y: -50, duration: 0.9, ease: "power3.out", clearProps: "opacity,y" });
      if (infoRef.current)   gsap.from(infoRef.current,   { opacity: 0, x: -60, duration: 0.9, delay: 0.3, ease: "power3.out", clearProps: "opacity,x" });
      if (formRef.current)   gsap.from(formRef.current,   { opacity: 0, x:  60, duration: 0.9, delay: 0.3, ease: "power3.out", clearProps: "opacity,x" });
      if (mapRef.current)    gsap.from(mapRef.current,    { opacity: 0, y:  50, duration: 0.9, delay: 0.5, ease: "power3.out", clearProps: "opacity,y" });
    });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div
      className="min-h-screen text-white font-sans relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(8, 13, 26, 0.55) 0%, rgba(13, 31, 69, 0.45) 50%, rgba(8, 13, 26, 0.60) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000')`,
      }}
    >
      {/* ── HERO ── */}
      <div className="relative overflow-hidden py-8 md:py-12">
        <div className="absolute top-4 left-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 right-8 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div ref={headerRef} className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
            📬 Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Us</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            We'd love to hear from you! Reach out for admissions, courses, events, or any general queries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10 space-y-6">

        {/* ── INFO + FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Info Card */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl h-full">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
                <span>📍</span> Reach Us
              </h3>

              <div className="space-y-5">
                {[
                  { icon: "📍", label: "Address",      val: "Sanskriti International College, Near City Centre, Lucknow, UP – 226001" },
                  { icon: "📞", label: "Phone",        val: "+91 98765 43210" },
                  { icon: "📧", label: "Email",        val: "info@sanskriticollege.edu" },
                  { icon: "🕐", label: "Office Hours", val: "Mon–Fri: 9 AM – 5 PM  |  Sat: 9 AM – 1 PM  |  Sun: Closed" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl px-4 py-3">
                    <span className="text-2xl mt-0.5 flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm mt-0.5 leading-relaxed">{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-6 pt-5 border-t border-slate-700/60">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Follow Us</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { icon: "📘", label: "Facebook",  color: "hover:bg-blue-600" },
                    { icon: "📸", label: "Instagram", color: "hover:bg-pink-600" },
                    { icon: "🐦", label: "Twitter",   color: "hover:bg-sky-500" },
                    { icon: "▶️", label: "YouTube",   color: "hover:bg-red-600" },
                  ].map(({ icon, label, color }) => (
                    <button
                      key={label}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-800/60 border border-slate-700/60 ${color} transition-colors`}
                      title={label}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                <span>✉️</span> Send a Message
              </h3>
              <p className="text-gray-400 text-sm mb-6">We usually reply within 24 hours.</p>

              {sent ? (
                <div className="py-14 text-center space-y-4">
                  <div className="text-5xl">🎉</div>
                  <h4 className="text-xl font-extrabold text-cyan-400">Message Sent!</h4>
                  <p className="text-gray-300 text-sm">Thank you, <strong className="text-white">{formData.name}</strong>! We'll get back to you at <strong className="text-white">{formData.email}</strong> within 24 hours.</p>
                  <button onClick={() => { setSent(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold px-6 py-2.5 rounded-2xl hover:scale-105 transition text-sm">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name"
                        className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com"
                        className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000"
                        className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white rounded-xl px-4 py-3 text-sm outline-none transition appearance-none cursor-pointer">
                        <option value="">Select Subject</option>
                        <option>Admission Enquiry</option>
                        <option>Course Information</option>
                        <option>Fee Structure</option>
                        <option>Events & Activities</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="Write your message here…"
                      className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition resize-none" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-70 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all text-base flex items-center justify-center gap-2">
                    {loading ? (
                      <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Sending…</>
                    ) : <>📨 Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── MAP (OpenStreetMap — free, no API key) ── */}
        <div ref={mapRef} className="rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
          <div className="bg-slate-950/60 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 flex items-center gap-3">
            <span className="text-xl">🗺️</span>
            <div>
              <h3 className="text-white font-extrabold text-base">Our Location</h3>
              <p className="text-gray-400 text-xs">Sanskriti International College, Lucknow, Uttar Pradesh</p>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=26.8467&mlon=80.9462#map=15/26.8467/80.9462"
              target="_blank" rel="noopener noreferrer"
              className="ml-auto text-xs text-cyan-400 border border-cyan-500/40 rounded-lg px-3 py-1.5 hover:bg-cyan-500/10 transition"
            >
              Open in Maps ↗
            </a>
          </div>
          <iframe
            title="Sanskriti International College Location"
            className="w-full h-72 md:h-96"
            src="https://www.openstreetmap.org/export/embed.html?bbox=80.9262%2C26.8267%2C80.9662%2C26.8667&layer=mapnik&marker=26.8467%2C80.9462"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
};

export default Contact;
