import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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


function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const slides = [
    {
      img: slide1,
      title: "Welcome to Sanskriti International College",
      text: "Empowering students for a brighter future",
      link: "/admissions",
      btn: "Apply Now",
    },
    {
      img: slide2,
      title: "Innovative Learning",
      text: "Explore science & engineering excellence",
      link: "/about",
      btn: "Learn More",
    },
    {
      img: slide3,
      title: "Arts & Creativity",
      text: "Fostering imagination and expression",
      link: "/arts",
      btn: "Explore Arts",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-slate-950 text-white">

      {/* ================= HERO FULL SCREEN (100vh) ================= */}
      <section className="w-full h-screen overflow-hidden relative">
        <Slider {...settings}>
          {slides.map((s, i) => (
            <div key={i} className="w-full h-screen">
              <div className="relative w-full h-full">
                <img
                  src={s.img}
                  alt="slide"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/55 flex items-center justify-center pt-16 pb-20">
                  <div className="text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                      {s.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md">
                      {s.text}
                    </p>
                    <Link
                      to={s.link}
                      className="inline-block bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full font-semibold transition shadow-xl hover:scale-105"
                    >
                      {s.btn}
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

      {/* ================= ACADEMICS ================= */}
    

      {/* ================= ADMISSION ENQUIRY ================= */}
      <AdmissionEnquirySection />
    </div>
  );
}

export default Home;
