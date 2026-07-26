import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, ChevronLeft, ChevronRight, Heart } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.webp";
import arts1 from "../assets/arts1.jpeg";
import lab from "../assets/lab.jpg";

gsap.registerPlugin(ScrollTrigger);

const LatestUpdatesSection = () => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const updates = [
    {
      id: 1,
      title: "Special Assembly - International Olympic Day",
      image: slide1,
      badgeText: "SPECIAL ASSEMBLY",
      subText: "International Olympic Day",
      handle: "globaltechinstitute",
      date: "2 weeks ago",
      caption:
        "Celebrating the spirit of sports, unity, and perseverance with our vibrant students 🏅✨",
      likes: "342",
    },
    {
      id: 2,
      title: "Grandparents Day Celebration",
      image: slide2,
      badgeText: "GRANDPARENTS DAY 2025",
      subText: "Love & Gratitude",
      handle: "globaltechinstitute",
      date: "3 weeks ago",
      caption:
        "Tiny hands and hearts so true, wrapped in love that grew from you. Honoring our beloved grandparents! ❤️",
      likes: "512",
    },
    {
      id: 3,
      title: "Happy Father's Day Event",
      image: arts1,
      badgeText: "FATHER'S DAY CELEBRATION",
      subText: "Superheroes In Our Lives",
      handle: "sanskriticollege",
      date: "1 month ago",
      caption:
        "On a cheerful Father's Day morning, Sanskriti International College celebrated our real-life superheroes! 🦸‍♂️👨‍👦",
      likes: "420",
    },
    {
      id: 4,
      title: "International Yoga Day",
      image: slide3,
      badgeText: "YOGA DAY 2025",
      subText: "Harmony & Wellness",
      handle: "sanskriticollege",
      date: "1 month ago",
      caption:
        "Sanskriti International College observed International Yoga Day with holistic mindfulness & yoga sessions 🧘‍♀️✨",
      likes: "610",
    },
    {
      id: 5,
      title: "Annual Science & Tech Expo",
      image: lab,
      badgeText: "TECH EXPO 2025",
      subText: "AI & Robotics Showcase",
      handle: "globaltechinstitute",
      date: "Just now",
      caption:
        "Students showcased groundbreaking AI and robotics projects at our annual flagship tech expo! 🚀🤖",
      likes: "780",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = slide1;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-8 md:py-14 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800"
    >
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6">
        {/* SECTION TITLE */}
        <div ref={titleRef} className="text-center mb-6 md:mb-10">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-lime-400">Latest </span>
            <span className="text-blue-400 relative inline-block">
              Updates
              <svg
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:-bottom-2 w-16 sm:w-28 md:w-36 h-2 sm:h-2.5 text-amber-500"
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

        {/* CAROUSEL WRAPPER */}
        <div className="relative px-1 sm:px-4 pb-6">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="hidden md:flex absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 p-2.5 md:p-3 rounded-full shadow-2xl hover:bg-lime-400 hover:scale-110 transition-all border border-slate-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="hidden md:flex absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 p-2.5 md:p-3 rounded-full shadow-2xl hover:bg-lime-400 hover:scale-110 transition-all border border-slate-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <Slider ref={sliderRef} {...sliderSettings}>
            {updates.map((item) => (
              <div key={item.id} className="px-2 sm:px-3 py-2">
                <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 hover:-translate-y-2 transition-all duration-300 flex flex-col h-[430px] sm:h-[440px] md:h-[450px] group max-w-sm sm:max-w-none mx-auto">
                  <div className="relative h-48 sm:h-48 md:h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3.5 text-white">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        {item.badgeText}
                      </span>
                      <h4 className="text-xs sm:text-sm md:text-base font-extrabold line-clamp-1 drop-shadow-md">
                        {item.subText}
                      </h4>
                    </div>
                  </div>

                  <div className="relative flex justify-center -mt-5 z-10">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center shadow-lg font-black text-white text-sm sm:text-base">
                      G
                    </div>
                  </div>

                  <div className="text-center px-3 pt-1 pb-1">
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {item.handle}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                      @{item.handle} • {item.date}
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <div className="p-1 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white shadow-sm">
                        <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed text-center">
                      {item.caption}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
                      <span className="flex items-center gap-1 text-pink-500">
                        <Heart className="w-3.5 h-3.5 fill-pink-500" />
                        {item.likes} likes
                      </span>
                      <span className="text-blue-600 hover:underline cursor-pointer font-bold">
                        View Post &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdatesSection;

