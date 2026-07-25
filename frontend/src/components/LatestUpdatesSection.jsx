import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, ChevronLeft, ChevronRight, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LatestUpdatesSection = () => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const updates = [
    {
      id: 1,
      title: "Special Assembly - International Olympic Day",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=600",
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
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
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
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
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
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600",
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
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
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

  const handleImageError = (e, fallbackSrc) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  const sliderSettings = {
    dots: false,
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
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 md:py-14 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* SECTION TITLE */}
        <div ref={titleRef} className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-lime-400">Latest </span>
            <span className="text-blue-400 relative inline-block">
              Updates
              <svg
                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-28 md:w-36 h-2.5 text-amber-500"
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
        <div className="relative px-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 p-2.5 md:p-3 rounded-full shadow-2xl hover:bg-lime-400 hover:scale-110 transition-all border border-slate-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 p-2.5 md:p-3 rounded-full shadow-2xl hover:bg-lime-400 hover:scale-110 transition-all border border-slate-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <Slider ref={sliderRef} {...sliderSettings}>
            {updates.map((item) => (
              <div key={item.id} className="px-2 md:px-3 py-2">
                <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 hover:-translate-y-2 transition-all duration-300 flex flex-col h-[440px] group">
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) =>
                        handleImageError(
                          e,
                          "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=600"
                        )
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {item.badgeText}
                      </span>
                      <h4 className="text-xs md:text-sm font-extrabold line-clamp-1 drop-shadow-md">
                        {item.subText}
                      </h4>
                    </div>
                  </div>

                  <div className="relative flex justify-center -mt-5 z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center shadow-lg font-black text-white text-sm">
                      G
                    </div>
                  </div>

                  <div className="text-center px-3 pt-1 pb-1">
                    <p className="font-extrabold text-xs text-slate-900">
                      {item.handle}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">
                      @{item.handle} • {item.date}
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <div className="p-1 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white shadow-sm">
                        <Instagram className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed text-center">
                      {item.caption}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold px-1">
                      <span className="flex items-center gap-1 text-pink-500">
                        <Heart className="w-3 h-3 fill-pink-500" />
                        {item.likes} likes
                      </span>
                      <span className="text-blue-600 hover:underline cursor-pointer">
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
