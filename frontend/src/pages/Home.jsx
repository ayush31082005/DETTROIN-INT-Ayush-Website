import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { 
  Sparkles, 
  Calendar, 
  ArrowRight
} from "lucide-react";

import ImpactBanner from "../components/ImpactBanner";
import WelcomeVideoSection from "../components/WelcomeVideoSection";
import ManagementSection from "../components/ManagementSection";
import LatestUpdatesSection from "../components/LatestUpdatesSection";
import AdmissionEnquirySection from "../components/AdmissionEnquirySection";
import AboutSection from "../components/AboutSection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.webp";
import labImage from "../assets/lab.jpg";

function Home() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    fade: true,
    arrows: false,
    customPaging: () => (
      <div className="w-3.5 h-3.5 rounded-full bg-white/40 hover:bg-lime-400 transition-all duration-300"></div>
    ),
  };

  const slides = [
    {
      img: slide1,
      badge: "Nursery to 12th Grade • CBSE/State Board Curriculum",
      title: "Nurturing Young Minds For a Brighter Future",
      highlight: "Nursery to 12th",
      subtitle:
        "Providing holistic education, moral values, and academic brilliance from early childhood to Senior Secondary (+2 Science, Commerce & Arts).",
      primaryBtn: "Apply For Admission 2025-26",
      primaryLink: "/admissions",
      secondaryBtn: "College Events",
      secondaryLink: "/events",
    },
    {
      img: labImage,
      badge: "Modern STEM & Robotics Labs",
      title: "Future-Ready Science & Experiential Learning",
      highlight: "Experiential Learning",
      subtitle:
        "Empowering 11th & 12th Science students with state-of-the-art Physics, Chemistry, Biology and Computer AI laboratories.",
      primaryBtn: "Explore Science Stream",
      primaryLink: "/science",
      secondaryBtn: "College Events",
      secondaryLink: "/events",
    },
    {
      img: slide3,
      badge: "Arts, Commerce & Sports Excellence",
      title: "Shaping Leaders With All-Round Growth",
      highlight: "All-Round Growth",
      subtitle:
        "From vibrant pre-primary activity zones to competitive Inter-College sports and creative arts, every child shines brightly.",
      primaryBtn: "Apply Now",
      primaryLink: "/admissions",
      secondaryBtn: "College Events",
      secondaryLink: "/events",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-slate-950 text-white">
      {/* ================= HERO SECTION (CLEAN SLIDER WITHOUT SIDE ARROWS) ================= */}
      <section className="w-full min-h-[92vh] md:h-screen overflow-hidden relative group">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((s, i) => (
            <div key={i} className="w-full h-[92vh] md:h-screen relative outline-none">
              {/* Clear & Bright Background Image */}
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover brightness-90 transition-transform duration-1000"
              />

              {/* Light Subtle Gradient Vignette so text is readable & image is crystal clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/40 to-black/20 flex items-center justify-center pt-16 pb-24 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center space-y-5 md:space-y-6">
                  
                  {/* Top Floating Badge */}
                  <div className="inline-flex items-center gap-2 bg-slate-950/70 border border-lime-400/50 backdrop-blur-md px-4 py-1.5 rounded-full text-lime-300 text-xs sm:text-sm font-bold tracking-wide shadow-xl">
                    <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
                    <span>{s.badge}</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-2xl">
                    {s.title.split(s.highlight)[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-amber-300 to-blue-400 underline underline-offset-8 decoration-lime-400/50">
                      {s.highlight}
                    </span>
                    {s.title.split(s.highlight)[1]}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed drop-shadow-lg mx-auto">
                    {s.subtitle}
                  </p>

                  {/* CTA Buttons - Centered */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                    <Link
                      to={s.primaryLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 px-7 sm:px-9 py-3.5 rounded-xl font-extrabold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-lime-500/25 hover:scale-105 group/btn"
                    >
                      <span>{s.primaryBtn}</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to={s.secondaryLink}
                      className="inline-flex items-center gap-2 bg-slate-950/60 hover:bg-slate-900/80 text-white border border-white/30 backdrop-blur-md px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:border-lime-400/60"
                    >
                      <Calendar className="w-4 h-4 text-lime-400" />
                      <span>{s.secondaryBtn}</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* MARQUEE TICKER OVERLAY DIRECTLY ON TOP OF HERO IMAGE AT BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <ImpactBanner />
        </div>
      </section>

      {/* ================= WELCOME & VIDEO SECTION ================= */}
      <WelcomeVideoSection />

      {/* ================= BOARD OF MANAGEMENT & PRINCIPAL (GSAP ANIMATED) ================= */}
      <ManagementSection />

      {/* ================= LATEST UPDATES SOCIAL SLIDER ================= */}
      <LatestUpdatesSection />

      {/* ================= ABOUT SECTION (KRISHNA INTERNATIONAL STYLE + GSAP) ================= */}
      <AboutSection />

      {/* ================= ADMISSION ENQUIRY ================= */}
      <AdmissionEnquirySection />
    </div>
  );
}

export default Home;
