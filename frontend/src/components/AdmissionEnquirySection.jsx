import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  User,
  BookOpen,
  Calendar,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AdmissionEnquirySection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const badgesRef = useRef(null);
  const imgRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    session: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", course: "", session: "", message: "" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content slides in from left
      gsap.fromTo(
        leftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Image zooms in with a slight delay
      gsap.fromTo(
        imgRef.current,
        { scale: 0.85, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Badge items stagger in
      const badges = badgesRef.current?.querySelectorAll(".badge-item");
      if (badges) {
        gsap.fromTo(
          badges,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: badgesRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Right form slides in from right
      gsap.fromTo(
        rightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Floating animation on the image
      gsap.to(imgRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    "AICTE & UGC Approved Institution",
    "100% Placement Assistance",
    "World-class Labs & Infrastructure",
    "Scholarships Available for Meritorious Students",
    "Experienced & Dedicated Faculty Team",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-10 md:py-14 overflow-hidden border-t border-slate-800"
    >
      {/* DECORATIVE BG BLOBS */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6">

        {/* SECTION BADGE */}
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-900/40 px-4 py-1.5 rounded-full border border-cyan-700/50 mb-3 shadow">
            <GraduationCap className="w-4 h-4" />
            Admissions Open 2025–26
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Admission{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Enquiry
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Take the first step towards your bright future. Fill the enquiry form and our team will contact you shortly.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* ===== LEFT: CONTENT + IMAGE ===== */}
          <div ref={leftRef} className="space-y-8">
            {/* Admission Image */}
            <div
              ref={imgRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/60"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Admission at Sanskriti International College"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800";
                }}
                className="w-full h-56 md:h-72 object-cover"
              />
              {/* Overlay badge on image */}
              <div className="absolute top-4 left-4 bg-cyan-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                🎓 Admissions Open
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-bold text-sm md:text-base">Sanskriti International College — Shaping Future Leaders</p>
              </div>
            </div>

            {/* WHY JOIN US HIGHLIGHTS */}
            <div ref={badgesRef} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Why Join{" "}
                <span className="text-cyan-400">Sanskriti International College?</span>
              </h3>
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="badge-item flex items-start gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 hover:border-cyan-600/60 transition"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>

            {/* CONTACT INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50">
                <Phone className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-400">Call Us</p>
                <p className="text-xs text-white font-bold">+91 9876543210</p>
              </div>
              <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50">
                <Mail className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-400">Email</p>
                <p className="text-xs text-white font-bold">info@globaltech.edu</p>
              </div>
              <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50">
                <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-400">Campus</p>
                <p className="text-xs text-white font-bold">New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: ENQUIRY FORM ===== */}
          <div ref={rightRef}>
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">
                Fill Enquiry Form
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Our admissions team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <h4 className="text-xl font-bold text-white">Enquiry Submitted!</h4>
                  <p className="text-gray-400 text-sm">Thank you! We'll contact you shortly. 🎓</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name *"
                      className="w-full bg-slate-800 border border-slate-600 text-white text-sm placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address *"
                        className="w-full bg-slate-800 border border-slate-600 text-white text-sm placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number *"
                        className="w-full bg-slate-800 border border-slate-600 text-white text-sm placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                  </div>

                  {/* Row 3: Course + Session */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition appearance-none"
                      >
                        <option value="" disabled>Select Course *</option>
                        <option>B.Tech (CSE)</option>
                        <option>B.Tech (ECE)</option>
                        <option>B.Tech (ME)</option>
                        <option>BCA</option>
                        <option>MBA</option>
                        <option>MCA</option>
                        <option>B.Sc</option>
                        <option>Diploma</option>
                      </select>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition appearance-none"
                      >
                        <option value="" disabled>Session *</option>
                        <option>2025–26</option>
                        <option>2026–27</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific query or message..."
                    className="w-full bg-slate-800 border border-slate-600 text-white text-sm placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition resize-none"
                  />

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm md:text-base py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Submit Enquiry
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-gray-500 mt-2">
                    🔒 Your information is 100% safe and will not be shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionEnquirySection;
