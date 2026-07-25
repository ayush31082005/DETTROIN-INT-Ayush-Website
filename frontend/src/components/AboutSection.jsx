import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. Image Grid Animation (Stagger Reveal)
      const images = gridRef.current?.querySelectorAll(".about-img-box");
      if (images && images.length > 0) {
        gsap.fromTo(
          images,
          { scale: 0.8, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 3. Right Text Content Animation
      gsap.fromTo(
        textRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageError = (e, fallbackSrc) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <section ref={sectionRef} className="w-full bg-slate-950 text-white border-b border-slate-800 overflow-hidden">
      {/* TOP COUNTER / HIGHLIGHT STATS BAR */}
      <div className="w-full bg-slate-900/90 border-y border-slate-800 py-5 md:py-6 shadow-inner">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black text-cyan-400">6,000+</h3>
            <p className="text-xs md:text-sm font-semibold text-gray-300">Students & Faculties</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black text-emerald-400">60+</h3>
            <p className="text-xs md:text-sm font-semibold text-gray-300">National & International Awards</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black text-teal-400">100%</h3>
            <p className="text-xs md:text-sm font-semibold text-gray-300">Parents Satisfaction</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black text-amber-400">AICTE & UGC</h3>
            <p className="text-xs md:text-sm font-semibold text-gray-300">Affiliated Institute</p>
          </div>
        </div>
      </div>

      {/* MAIN ABOUT US CONTENT SECTION */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-7 md:mb-9">
          <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold text-sm tracking-wider uppercase">
            <span className="w-8 h-[2px] bg-emerald-400 inline-block"></span>
            <span>About us</span>
            <span className="w-8 h-[2px] bg-emerald-400 inline-block"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            Sanskriti International College
          </h2>
        </div>

        {/* 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* LEFT COLUMN: 4-IMAGE CREATIVE COLLAGE (ASYMMETRIC ARCHES & RECTS) */}
          <div ref={gridRef} className="lg:col-span-6 grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
            {/* Image 1: Arch Top Left */}
            <div className="about-img-box overflow-hidden rounded-t-[100px] rounded-b-2xl shadow-2xl border-2 border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                alt="Students in Lab"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=600")}
                className="w-full h-44 md:h-52 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Image 2: Rounded Rect Top Right */}
            <div className="about-img-box overflow-hidden rounded-3xl shadow-2xl border-2 border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600"
                alt="Smiling Students"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600")}
                className="w-full h-44 md:h-52 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Image 3: Rounded Rect Bottom Left */}
            <div className="about-img-box overflow-hidden rounded-3xl shadow-2xl border-2 border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=600"
                alt="Sports & Campus"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600")}
                className="w-full h-44 md:h-52 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Image 4: Arch Bottom Right */}
            <div className="about-img-box overflow-hidden rounded-b-[100px] rounded-t-2xl shadow-2xl border-2 border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                alt="Library Study"
                onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600")}
                className="w-full h-44 md:h-52 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT DESCRIPTION */}
          <div ref={textRef} className="lg:col-span-6 space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
            <p>
              Amongst the best technical & academic institutes, <strong className="text-white">Sanskriti International College</strong> is set amidst 15 acres of lush green campus, away from the city's noise and pollution. The institute provides an ideal environment for academic and co-curricular excellence.
            </p>

            <p>
              The institute has all state-of-the-art facilities required for the overall development of students. Facilities such as a fully-equipped digital library, advanced science & engineering laboratories, sports arenas, and innovation hubs ensure students excel in academics while enhancing their creative talents.
            </p>

            <p>
              The institute is committed to the cause of promoting sound moral values, encouraging a scientific temperament, and developing leadership qualities. Regular industrial workshops, expert guest lectures, and student counseling give students an insight into the competitive world ahead, empowering them to build a healthy spirit of success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
