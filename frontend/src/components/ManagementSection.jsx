import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ManagementSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const card1Ref = useRef(null);
  const img1Ref = useRef(null);
  const text1Ref = useRef(null);

  const card2Ref = useRef(null);
  const img2Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. SECTION TITLE REVEAL
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. CHAIRPERSON (CARD 1) - IMAGE SLIDE & ZOOM IN FROM LEFT
      gsap.fromTo(
        img1Ref.current,
        { x: -80, scale: 0.8, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 80%",
          },
        }
      );

      // 3. CHAIRPERSON (CARD 1) - TEXT SLIDE IN FROM RIGHT
      gsap.fromTo(
        text1Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 80%",
          },
        }
      );

      // 4. PRINCIPAL (CARD 2) - IMAGE SLIDE & ZOOM IN FROM LEFT
      gsap.fromTo(
        img2Ref.current,
        { x: -80, scale: 0.8, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 80%",
          },
        }
      );

      // 5. PRINCIPAL (CARD 2) - TEXT SLIDE IN FROM RIGHT
      gsap.fromTo(
        text2Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 80%",
          },
        }
      );

      // 6. GENTLE HOVER FLOATING EFFECT ON LEADER PHOTOS
      gsap.to([img1Ref.current, img2Ref.current], {
        y: -6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageError = (e, fallbackSrc) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 bg-slate-100 text-slate-900 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* SECTION HEADER */}
        <div ref={titleRef} className="text-center mb-10 md:mb-12">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest bg-cyan-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-cyan-200 shadow-sm">
            MANAGEMENT & LEADERSHIP
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            School Board Of Management
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* MESSAGES CONTAINER */}
        <div className="space-y-8 md:space-y-12">
          {/* ================= CARD 1: CHAIRPERSON MESSAGE ================= */}
          <div
            ref={card1Ref}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200/80 transition-all hover:shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* IMAGE COLUMN (GSAP ANIMATED) */}
              <div className="md:col-span-4 flex justify-center">
                <div
                  ref={img1Ref}
                  className="relative p-2.5 rounded-2xl md:rounded-3xl border-2 border-dashed border-cyan-500 bg-cyan-50/50 shadow-md max-w-xs w-full flex justify-center transform transition-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                    alt="Ms. Priya Jain - Chairperson"
                    onError={(e) =>
                      handleImageError(
                        e,
                        "https://images.unsplash.com/photo-1580894732413-e726b91c0b32?auto=format&fit=crop&q=80&w=600"
                      )
                    }
                    className="w-full h-64 md:h-76 object-cover rounded-xl md:rounded-2xl shadow-inner"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-cyan-600 text-white p-2.5 rounded-full shadow-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CONTENT COLUMN (GSAP ANIMATED) */}
              <div
                ref={text1Ref}
                className="md:col-span-8 space-y-3.5 text-center md:text-left"
              >
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                    Ms. Priya Jain
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-amber-500 tracking-wider uppercase mt-1">
                    OUR CHAIRPERSON
                  </p>
                </div>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-1">
                  At NextGen College, we take pride in shaping not only
                  bright minds but also compassionate hearts. For us, education
                  is a holistic journey that extends beyond academic success,
                  nurturing emotional well-being, moral values, and resilience. We
                  believe learning should be a joyful and enriching experience,
                  free from undue pressure. By fostering a positive and
                  stress-free environment, we empower students to explore their
                  unique potential with confidence. This approach instills a
                  genuine love for learning, sharpens focus, and helps shape
                  well-rounded individuals prepared to thrive in all aspects of
                  life.
                </p>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: PRINCIPAL MESSAGE ================= */}
          <div
            ref={card2Ref}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200/80 transition-all hover:shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* IMAGE COLUMN (GSAP ANIMATED) */}
              <div className="md:col-span-4 flex justify-center">
                <div
                  ref={img2Ref}
                  className="relative p-2.5 rounded-2xl md:rounded-3xl border-2 border-dashed border-amber-500 bg-amber-50/50 shadow-md max-w-xs w-full flex justify-center transform transition-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
                    alt="Dr. Arti Sharma - Principal"
                    onError={(e) =>
                      handleImageError(
                        e,
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                      )
                    }
                    className="w-full h-64 md:h-76 object-cover rounded-xl md:rounded-2xl shadow-inner"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2.5 rounded-full shadow-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CONTENT COLUMN (GSAP ANIMATED) */}
              <div
                ref={text2Ref}
                className="md:col-span-8 space-y-3.5 text-center md:text-left"
              >
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                    Dr. Arti Sharma
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-amber-500 tracking-wider uppercase mt-1">
                    PRINCIPAL
                  </p>
                </div>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-1">
                  I am pleased and privileged to be the principal of Sanskriti International
                  College. The institution has established a reputation for
                  academic and holistic excellence through the hard work of our
                  students, teachers, parents, and staff at a institute with such
                  a rich tradition both in and out of the classroom. We, on the
                  other hand, do not believe in complacency. Our country's
                  education is changing into a new form, shifting from content to
                  concept. We, too, are committed and dedicated to overcoming the
                  paradigm shift difficulty. The institute is embracing and
                  adjusting the modifications in a comprehensive manner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementSection;
