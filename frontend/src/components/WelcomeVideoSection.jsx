import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Sparkles, GraduationCap, Award, X, ExternalLink } from "lucide-react";
import labImage from "../assets/lab.jpg";

const WelcomeVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube's Official Whitelisted Test Video ID (Allowed on all localhosts & browsers)
  const youtubeVideoId = "M7lc1UVf-VE";

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
          {/* LEFT COLUMN: YOUTUBE VIDEO PLAYER WITH THUMBNAIL OVERLAY */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-700/60 bg-black group">
              {!isPlaying ? (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={labImage}
                    alt="Sanskriti College Campus & Science Labs"
                    className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-between p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-lime-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Campus Tour 2025
                      </span>
                      <a
                        href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 bg-black/60 hover:bg-lime-400 hover:text-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md transition-all"
                      >
                        <span>Open YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="text-center my-auto">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="relative inline-flex items-center justify-center p-4 md:p-5 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 text-slate-950 shadow-2xl hover:scale-110 transition-all duration-300 group/btn"
                        aria-label="Play Campus Video"
                      >
                        <span className="absolute inset-0 rounded-full bg-lime-400 animate-ping opacity-30"></span>
                        <Play className="w-8 h-8 md:w-10 md:h-10 fill-slate-950 ml-1" />
                      </button>
                      <p className="text-xs md:text-sm font-semibold text-slate-200 mt-3 drop-shadow-md">
                        Watch Sanskriti College Life & Campus Experience
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>🎥 Campus & Science Labs Showcase</span>
                      <span>Tap to Play</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-black">
                  <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                    <a
                      href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-950/80 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/20 inline-flex items-center gap-1"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="bg-slate-950/80 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/20"
                      title="Close Video"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&enablejsapi=1`}
                    title="Sanskriti International College Campus Tour Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT & COLLABORATION BADGES */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Inspiring Excellence • Nursery to 12th</span>
            </div>

            <h3 className="text-xl md:text-3xl font-extrabold text-white leading-snug">
              An institute that every student, parent, and teacher loves
            </h3>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              At Sanskriti International College, happiness is at the heart of learning.
              We provide an enriching environment for students from Nursery up to 12th Grade
              (+2 Science, Commerce & Arts), where curiosity is nurtured, values are instilled,
              and academic dreams come true.
            </p>

            {/* EXPLORE MORE BUTTON */}
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-lime-400/80 bg-lime-400/10 text-lime-300 font-bold text-sm md:text-base rounded-xl hover:bg-lime-400 hover:text-slate-950 transition-all shadow-lg group"
              >
                <span>Explore Campus & Facilities</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
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
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs md:text-sm font-bold text-cyan-400">
                      Sanskriti Educational Trust
                    </span>
                  </div>
                </div>

                <div className="h-8 md:h-10 w-[1px] bg-slate-700"></div>

                <div>
                  <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Affiliation & Board
                  </p>
                  <div className="flex items-center justify-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs md:text-sm font-bold text-amber-400">
                      CBSE & State Board
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
