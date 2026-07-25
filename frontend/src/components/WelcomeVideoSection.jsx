import React from "react";
import { Link } from "react-router-dom";

const WelcomeVideoSection = () => {
  return (
    <section className="w-full py-10 md:py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* TOP CENTERED HEADING */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-lime-400">Welcome to </span>
            <span className="text-blue-400 relative inline-block">
              Sanskriti International College
              {/* Decorative Underline Swoosh */}
              <svg
                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-36 md:w-48 h-2.5 text-amber-500"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 5 6 Q 100 12, 195 6 Q 100 0, 5 6"
                  fill="currentColor"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* 2-COLUMN GRID: LEFT VIDEO, RIGHT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* LEFT COLUMN: YOUTUBE VIDEO PLAYER */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-700/60 bg-black">
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?rel=0&modestbranding=1"
                title="Sanskriti International College Overview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT & COLLABORATION BADGES */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
              An institute that every student, parent, and teacher loves
            </h3>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              At Sanskriti International College, happiness is at the heart of learning.
              Experience an environment where every student feels valued, every
              parent feels heard, and every teacher feels inspired.
            </p>

            {/* EXPLORE MORE BUTTON */}
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border-2 border-gray-300 text-white font-semibold text-sm md:text-base rounded-xl hover:bg-pink-600 hover:border-pink-600 hover:text-white transition shadow-lg group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
                <span>Explore More</span>
              </Link>
            </div>

            {/* PROMOTED BY & ACADEMIC COLLABORATION BADGES BOX */}
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 md:p-5 shadow-xl mt-2">
              <div className="flex items-center justify-around gap-2 md:gap-4 text-center">
                <div>
                  <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Promoted By
                  </p>
                  <div className="flex items-center justify-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <span className="text-base md:text-lg">🏛️</span>
                    <span className="text-xs md:text-sm font-bold text-cyan-400">
                      Sanskriti Group
                    </span>
                  </div>
                </div>

                <div className="h-8 md:h-10 w-[1px] bg-slate-700"></div>

                <div>
                  <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Academic Collaboration
                  </p>
                  <div className="flex items-center justify-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <span className="text-base md:text-lg">🎓</span>
                    <span className="text-xs md:text-sm font-bold text-amber-400">
                      AICTE & UGC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeVideoSection;
