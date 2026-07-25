import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.webp";
import aboutHeroChildren from "../assets/about_hero_children.png";
import aboutCollage from "../assets/about_collage.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroTextRef = useRef(null);
  const introRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const academicsRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      // Intro section (image + text) - stagger
      gsap.fromTo(
        introRef.current?.querySelector(".intro-img"),
        { x: -70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        introRef.current?.querySelector(".intro-text"),
        { x: 70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 80%" },
        }
      );

      // Stats counter cards stagger left to right
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      if (statCards) {
        gsap.fromTo(statCards,
          { x: -100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );
      }

      // Vision block
      gsap.fromTo(
        visionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: visionRef.current, start: "top 85%" },
        }
      );

      // Mission block
      gsap.fromTo(
        missionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: missionRef.current, start: "top 85%" },
        }
      );

      // Academics
      gsap.fromTo(
        academicsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: academicsRef.current, start: "top 85%" },
        }
      );

      // Core Values
      const valueCards = valuesRef.current?.querySelectorAll(".value-card");
      if (valueCards) {
        gsap.fromTo(valueCards,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.3)",
            scrollTrigger: { trigger: valuesRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleImgError = (e, fb) => { e.target.onerror = null; e.target.src = fb; };

  // GSAP Hover Animation Handlers
  const handleCardHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.05 : 1,
      y: enter ? -6 : 0,
      duration: 0.35,
      ease: enter ? "back.out(1.7)" : "power2.out",
    });
  };

  const handleImgHover = (e, enter) => {
    const img = e.currentTarget.querySelector("img") || e.currentTarget;
    gsap.to(img, {
      scale: enter ? 1.08 : 1,
      rotate: enter ? 0.8 : 0,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleItemHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      x: enter ? 8 : 0,
      color: enter ? "#38bdf8" : "",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div className="w-full bg-slate-950 text-white overflow-x-hidden">

      {/* ===================== HERO BANNER ===================== */}
      <section className="relative w-full bg-slate-950 overflow-hidden">
        {/* Exact same image as reference site - children holding About Us banner */}
        <img
          src={aboutHeroChildren}
          alt="About Us - Sanskriti International College Students"
          className="w-full h-auto block"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </section>

      {/* ===================== INTRO: IMAGE LEFT + TEXT RIGHT ===================== */}
      <section ref={introRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {/* Single Collage Image — matches content column height */}
          <div
            className="intro-img h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-slate-700 cursor-pointer"
            onMouseEnter={(e) => handleImgHover(e, true)}
            onMouseLeave={(e) => handleImgHover(e, false)}
          >
            <img
              src={aboutCollage}
              alt="School collage"
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>

          {/* Text */}
          <div className="intro-text space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-400 leading-snug">
              Sanskriti International College —{" "}
              <span className="text-white">A Leading Institution in India</span>
            </h2>
            <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              <strong className="text-white">Sanskriti International College</strong> is a trusted name in technical and academic education, recognized as one of the leading institutes across India. With a strong commitment to academic excellence, discipline, and holistic development, the institute provides a nurturing environment where students grow into confident, responsible, and capable individuals.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Education at Sanskriti International College is designed to build strong academic foundations, inspire creativity, and prepare students for a successful future. The institution focuses on developing knowledge, skills, values, and character that help students thrive both academically and professionally.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              Apply for Admission →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== STATS BAR ===================== */}
      <section ref={statsRef} className="w-full py-4 md:py-6 my-2 border-y border-slate-800/50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "25+", label: "Years of Excellence", color: "text-cyan-400" },
            { value: "150+", label: "Expert Faculty", color: "text-emerald-400" },
            { value: "5000+", label: "Students Placed", color: "text-amber-400" },
            { value: "50+", label: "Global Partners", color: "text-rose-400" },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-card space-y-1 cursor-pointer p-3 rounded-2xl transition-colors hover:bg-slate-900/60"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <p className={`text-3xl md:text-4xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OUR VISION ===================== */}
      <section ref={visionRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Left */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span>🎯</span> Shaping Future Leaders
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              Our <span className="text-cyan-400">Vision</span>
            </h2>
            <div className="w-16 h-1 bg-cyan-500 rounded-full"></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Our vision is to be one of the <strong className="text-white">most respected educational institutions in India</strong>, delivering quality education that shapes academic excellence, leadership abilities, and strong moral values.
            </p>
            <p className="text-gray-400 text-sm md:text-base font-semibold">We aim to develop individuals who:</p>
            <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
              {[
                "Think independently & critically",
                "Act responsibly with strong moral values",
                "Respect culture, discipline, and community",
                "Contribute positively to society and nation",
                "Excel in academics, technology, and life"
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onMouseEnter={(e) => handleItemHover(e, true)}
                  onMouseLeave={(e) => handleItemHover(e, false)}
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-xs md:text-sm italic pt-1">
              "Creating future leaders who are knowledgeable, confident, and ethically strong."
            </p>
          </div>

          {/* Image Right */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={(e) => handleImgHover(e, true)}
            onMouseLeave={(e) => handleImgHover(e, false)}
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-700">
              <img
                src={about3}
                alt="Our Vision - Expert Faculty & Students"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-cyan-500 text-slate-950 font-black px-4 py-2.5 rounded-2xl shadow-xl text-xs md:text-sm">
              🌟 Vision 2030
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR MISSION ===================== */}
      <section ref={missionRef} className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Left */}
          <div
            className="relative group order-2 lg:order-1 cursor-pointer"
            onMouseEnter={(e) => handleImgHover(e, true)}
            onMouseLeave={(e) => handleImgHover(e, false)}
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-700">
              <img
                src={about2}
                alt="Our Mission - Modern Learning Environment"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-xl text-xs md:text-sm">
              🚀 Quality Education
            </div>
          </div>

          {/* Text Right */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span>🚀</span> Empowering Growth
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              Our <span className="text-blue-400">Mission</span>
            </h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Our mission is to provide an empowering, inclusive, and modern educational environment that nurtures holistic student growth.
            </p>
            <p className="text-gray-400 text-sm md:text-base font-semibold">Key pillars of our mission:</p>
            <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
              {[
                "High academic standards & practical skills",
                "Value-based and ethical character building",
                "State-of-the-art laboratory and tech infrastructure",
                "Comprehensive skill development opportunities",
                "Safe, disciplined, and encouraging campus life"
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onMouseEnter={(e) => handleItemHover(e, true)}
                  onMouseLeave={(e) => handleItemHover(e, false)}
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-xs md:text-sm pt-1">
              We continuously work towards improving educational benchmarks for the best student outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== ACADEMIC EXCELLENCE ===================== */}
      <section ref={academicsRef} className="max-w-screen-xl mx-auto px-4 md:px-8 pb-6 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="text-3xl">📚</span> Academic Excellence
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Sanskriti International College follows a structured academic system that focuses on concept clarity and strong learning foundations.
            </p>
            <p className="text-gray-400 text-sm md:text-base">Our academic approach includes:</p>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base">
              {[
                "Well-planned syllabus coverage",
                "Regular assessments and evaluations",
                "Concept-based teaching methods",
                "Practical and activity-based learning",
                "Continuous performance monitoring",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onMouseEnter={(e) => handleItemHover(e, true)}
                  onMouseLeave={(e) => handleItemHover(e, false)}
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-400 text-sm md:text-base">
              Students are guided and supported to achieve consistent academic success and build confidence in their abilities.
            </p>
          </div>

          {/* 4-image grid like Home AboutSection */}
          <div className="grid grid-cols-2 gap-3 order-1 lg:order-2">
            {[
              { src: about2, label: "Modern Labs", rounded: "rounded-t-[80px] rounded-b-2xl" },
              { src: about3, label: "Expert Faculty", rounded: "rounded-3xl" },
              { src: about1, label: "Campus Life", rounded: "rounded-3xl" },
              { src: about4, label: "Achievements", rounded: "rounded-b-[80px] rounded-t-2xl" },
            ].map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden shadow-xl border border-slate-700 cursor-pointer ${img.rounded}`}
                onMouseEnter={(e) => handleImgHover(e, true)}
                onMouseLeave={(e) => handleImgHover(e, false)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  onError={(e) => handleImgError(e, "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400")}
                  className="w-full h-40 md:h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CORE VALUES ===================== */}
      <section ref={valuesRef} className="max-w-screen-xl mx-auto px-4 md:px-8 pb-10 md:pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Our Core Values</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "💡", title: "Innovation", text: "We encourage creative thinking and technological advancement.", color: "border-purple-600/50 hover:border-purple-500" },
            { icon: "🤝", title: "Collaboration", text: "Teamwork and partnerships are at the heart of our growth.", color: "border-cyan-600/50 hover:border-cyan-500" },
            { icon: "🎯", title: "Excellence", text: "We pursue the highest standards in everything we do.", color: "border-amber-600/50 hover:border-amber-500" },
            { icon: "🌍", title: "Global Vision", text: "Preparing students for a connected, global world.", color: "border-rose-600/50 hover:border-rose-500" },
          ].map((val, i) => (
            <div
              key={i}
              className={`value-card bg-slate-900 border-2 ${val.color} rounded-2xl p-5 md:p-6 text-center shadow-lg cursor-pointer`}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="text-4xl mb-3">{val.icon}</div>
              <h3 className="text-base md:text-lg font-extrabold text-white mb-2">{val.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== DIRECTOR'S MESSAGE ===================== */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* Left: Director Image Frame */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div
              className="relative group cursor-pointer overflow-hidden rounded-3xl border-4 border-cyan-500/40 shadow-2xl w-56 h-64 md:w-64 md:h-72 mb-4"
              onMouseEnter={(e) => handleImgHover(e, true)}
              onMouseLeave={(e) => handleImgHover(e, false)}
            >
              <img
                src={about3}
                alt="Director - Dr. Rajesh Sharma"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="bg-cyan-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Director & Founder
                </span>
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-white">Dr. Rajesh Sharma</h3>
            <p className="text-cyan-400 text-xs md:text-sm font-semibold">Ph.D. in Computer Science & Engineering</p>
          </div>

          {/* Right: Message Content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span>💬</span> Leadership Speak
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Director's <span className="text-cyan-400">Message</span>
            </h2>
            <div className="w-16 h-1 bg-cyan-500 rounded-full"></div>

            <div className="relative pl-6 border-l-4 border-cyan-500/60 space-y-3">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                "Welcome to Sanskriti International College. Education is not merely about acquiring knowledge—it is about empowering young minds to think innovatively, solve real-world problems, and lead with integrity."
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                At Sanskriti International College, we are dedicated to fostering an environment where curiosity meets cutting-edge technical infrastructure. Our goal is to equip every student with future-ready skills, practical exposure, and unwavering confidence to excel on global platforms.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <span className="text-gray-400 text-xs italic">Inspiring Excellence Since 1998</span>
              <span className="text-cyan-400 font-bold text-sm">Sanskriti Leadership Board</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="text-center mb-10">
          <span className="px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            ⭐ Why Choose Us
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Why Choose <span className="text-cyan-400">Sanskriti International College?</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
            Discover what sets us apart as a premier institution for technical and academic excellence in India.
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🖥️",
              title: "Smart Labs & Tech Infrastructure",
              desc: "High-speed AI computer labs, smart classrooms, and modern digital learning tools.",
              border: "border-cyan-500/40"
            },
            {
              icon: "🎓",
              title: "Expert Faculty Mentors",
              desc: "Learn from top industry practitioners, researchers, and dedicated academic leaders.",
              border: "border-blue-500/40"
            },
            {
              icon: "🏆",
              title: "100% Placement Support",
              desc: "Dedicated placement cell, resume building, mock interviews, and top recruiter drives.",
              border: "border-emerald-500/40"
            },
            {
              icon: "🌐",
              title: "Global Certifications",
              desc: "Industry-aligned certifications, workshops, and international project exposure.",
              border: "border-amber-500/40"
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-slate-900/90 border-2 ${item.border} rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 shadow-xl cursor-pointer`}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="text-4xl mb-4 bg-slate-800/80 w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-700">
                {item.icon}
              </div>
              <h3 className="text-base md:text-lg font-extrabold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CALL TO ACTION BANNER ===================== */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 pb-14 md:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-900 via-blue-900 to-slate-900 border border-cyan-500/40 p-8 md:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold uppercase tracking-widest border border-cyan-400/30">
              🚀 Admissions Open 2026-27
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Ready to Shape Your Career with <span className="text-cyan-400">Sanskriti International College?</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Take the first step toward academic excellence and global opportunities. Join thousands of successful alumni today!
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/admissions"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm md:text-base"
              >
                Apply for Admission →
              </Link>
              <Link
                to="/contact"
                className="bg-slate-900/90 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-2xl border border-slate-700 hover:border-cyan-500/50 shadow-lg hover:scale-105 transition-all text-sm md:text-base"
              >
                Contact Admissions Us
              </Link>
            </div>
          </div>

          {/* Decorative background ambient circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>

    </div>
  );
};

About.displayName = "About";
export default About;
