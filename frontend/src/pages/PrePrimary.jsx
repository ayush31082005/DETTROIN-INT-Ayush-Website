import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ── GSAP Loader ── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
      s2.onload = () => { window.gsap.registerPlugin(window.ScrollTrigger); resolve(window.gsap); };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  });

const CLASSES = [
  {
    grade: "LKG",
    full: "Lower Kindergarten",
    age: "3–4 Years",
    color: "from-pink-500 to-rose-400",
    accent: "text-pink-400",
    border: "border-pink-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/48.jpg",
    classImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    teacher: "Ms. Ritu Saxena",
    subjects: ["Phonetics & Alphabets", "Numbers 1–20", "Rhymes & Storytelling", "Color & Shape Recognition", "Motor Skills & Sensory Play"],
    highlight: "Play-Way Montessori Method",
    icon: "🧸",
  },
  {
    grade: "UKG",
    full: "Upper Kindergarten",
    age: "4–5 Years",
    color: "from-amber-500 to-orange-400",
    accent: "text-amber-400",
    border: "border-amber-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/60.jpg",
    classImg: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    teacher: "Ms. Meenal Joshi",
    subjects: ["Reading & Writing Basics", "Numbers 1–100", "EVS Introduction", "Art & Craft", "Yoga & Breathing"],
    highlight: "Activity-Based Learning",
    icon: "🌻",
  },
  {
    grade: "1st – 2nd",
    full: "Primary (Foundation)",
    age: "5–7 Years",
    color: "from-cyan-500 to-blue-400",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/33.jpg",
    classImg: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    teacher: "Ms. Ananya Das",
    subjects: ["English Grammar & Reading", "Mathematics (Addition/Sub)", "Environmental Science", "Hindi", "Art & Craft"],
    highlight: "Smart-Board Interactive Classes",
    icon: "📚",
  },
  {
    grade: "3rd – 5th",
    full: "Primary (Advanced)",
    age: "7–10 Years",
    color: "from-violet-500 to-purple-400",
    accent: "text-violet-400",
    border: "border-violet-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/22.jpg",
    classImg: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
    teacher: "Ms. Kavita Sharma",
    subjects: ["English & Creative Writing", "Mathematics & Mental Math", "Science & Experiments", "Social Studies", "Computer Basics"],
    highlight: "Project-Based Learning",
    icon: "🔬",
  },
];

const COLLAGE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80", label: "Story Telling Corner" },
  { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", label: "Smart Classroom" },
  { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80", label: "Creative Craft Lab" },
  { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", label: "Outdoor Play Area" },
];

const SCHEDULE = [
  { time: "08:30 AM", title: "Morning Assembly & Yoga", desc: "Daily prayers, breathing exercises & warm-up activities.", icon: "🧘" },
  { time: "09:15 AM", title: "Phonics & Numeracy", desc: "Interactive smart-board learning, numbers & language basics.", icon: "🔤" },
  { time: "11:00 AM", title: "Nutritious Break & Play", desc: "Supervised lunch time & outdoor playground games.", icon: "🍎" },
  { time: "12:15 PM", title: "Creative Art & Craft", desc: "Painting, clay modeling, music and sensory activities.", icon: "🎨" },
  { time: "01:30 PM", title: "Story Time & Dismissal", desc: "Audio-visual storytelling, moral values & safe dispersal.", icon: "📖" },
];

const TESTIMONIALS = [
  {
    parent: "Mrs. Sangeeta Verma",
    child: "Mother of Aarav (LKG)",
    text: "Sanskriti's Montessori approach made my 3-year-old love coming to school every single day. The teachers are incredibly caring!",
    rating: "⭐⭐⭐⭐⭐",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    parent: "Mr. Rajesh Malhotra",
    child: "Father of Ananya (Class 3rd)",
    text: "The smart classrooms and project-based learning have improved my daughter's confidence tremendously. Highly recommended!",
    rating: "⭐⭐⭐⭐⭐",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const FEATURES = [
  { icon: "🏫", title: "Smart Classrooms", desc: "Interactive whiteboards and digital learning tools in every classroom." },
  { icon: "🎨", title: "Creative Arts Lab", desc: "Dedicated craft, music, and drawing room for holistic development." },
  { icon: "🌿", title: "Nature Corner", desc: "In-class plants, aquariums and nature walks to build curiosity." },
  { icon: "📖", title: "Story Library", desc: "Illustrated books, audio stories, and reading corners for young readers." },
  { icon: "🧘", title: "Yoga & Wellness", desc: "Daily morning yoga and breathing exercises for mental calmness." },
  { icon: "🤝", title: "Parent Connect", desc: "Monthly PTM, parent portal access, and weekly progress updates." },
];

export default function PrePrimary() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const collageRef = useRef(null);
  const scheduleRef = useRef(null);
  const testRef = useRef(null);
  const featureRef = useRef(null);

  useEffect(() => {
    loadGSAP().then((gsap) => {
      /* Hero Entrance */
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
        );
      }

      /* Cards Stagger */
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        gsap.fromTo(validCards,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: validCards[0], start: "top 85%" }
          }
        );
      }

      /* Schedule Stagger */
      if (scheduleRef.current) {
        gsap.fromTo(scheduleRef.current.children,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: scheduleRef.current, start: "top 80%" }
          }
        );
      }

      /* Testimonials Stagger */
      if (testRef.current) {
        gsap.fromTo(testRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: testRef.current, start: "top 80%" }
          }
        );
      }

      /* Collage Grid Bounce */
      if (collageRef.current) {
        gsap.fromTo(collageRef.current.children,
          { scale: 0.85, opacity: 0, y: 30 },
          {
            scale: 1, opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "back.out(1.4)",
            scrollTrigger: { trigger: collageRef.current, start: "top 80%" }
          }
        );
      }

      /* Feature Grid */
      if (featureRef.current) {
        gsap.fromTo(featureRef.current.children,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: featureRef.current, start: "top 85%" }
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans overflow-x-hidden">

      {/* ── HERO SECTION ── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[65vh] flex items-center overflow-hidden py-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.90) 100%), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div ref={titleRef} className="lg:col-span-7 space-y-4">
            <span className="inline-block bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              🧸 Nursery · LKG · UKG · Class 1st to 5th
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Pre-Primary &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">
                Primary Wing
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
              Sparking curiosity, creativity, and character — from Montessori early learning to 5th grade foundation.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["🧸 Play-Way Montessori", "🎨 Art & Craft", "🧘 Yoga & Fitness", "📚 Smart Classes"].map((badge) => (
                <span key={badge} className="text-xs font-bold bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Hero Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
            {COLLAGE_PHOTOS.map((ph, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src={ph.url}
                  alt={ph.label}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-36 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {ph.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CLASS CARDS ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            👶 Early Childhood Learning
          </span>
          <h2 className="text-3xl font-black text-white mt-3">Academic Structure & Classrooms</h2>
          <p className="text-gray-400 text-sm mt-1">Curriculum tailored for every developmental stage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLASSES.map((cls, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`rounded-2xl bg-slate-900/80 border ${cls.border} overflow-hidden hover:bg-slate-900 transition-all duration-300 group shadow-xl`}
            >
              {/* Class image banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cls.classImg}
                  alt={cls.full}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-xs font-black text-white px-3 py-1 rounded-full border border-white/10">
                  {cls.icon} {cls.grade}
                </div>
                <div className="absolute top-3 right-3 text-xs font-semibold text-gray-300 bg-slate-950/70 px-2.5 py-0.5 rounded-full">
                  {cls.age}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <img src={cls.teacherImg} alt={cls.teacher} className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{cls.full}</h3>
                    <p className="text-xs text-gray-400">Class Lead: <span className={cls.accent}>{cls.teacher}</span></p>
                  </div>
                </div>

                <ul className="space-y-1 my-3">
                  {cls.subjects.map((s, j) => (
                    <li key={j} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cls.color} shrink-0`} />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className={`mt-3 inline-block text-[11px] font-black px-3 py-1 rounded-full bg-gradient-to-r ${cls.color} text-white shadow-md`}>
                  ✨ {cls.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW SECTION 1: DAILY ROUTINE ── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <span className="px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            ⏰ A Day at Sanskriti
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Daily Learning Routine</h2>
          <p className="text-gray-400 text-xs mt-1">Structured schedule balancing academics, play, and creativity</p>
        </div>

        <div ref={scheduleRef} className="space-y-3">
          {SCHEDULE.map((sc, i) => (
            <div key={i} className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 hover:border-pink-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-2xl shrink-0">
                {sc.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-pink-400">{sc.time}</span>
                  <span className="text-sm font-bold text-white truncate">{sc.title}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{sc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO COLLAGE SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Campus Life</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Pre-Primary Activity Gallery</h2>
        </div>

        <div ref={collageRef} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80", title: "Montessori Activity" },
            { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", title: "Smart Classroom" },
            { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80", title: "Drawing & Craft" },
            { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", title: "Yoga Session" },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
              <img
                src={item.url}
                alt={item.title}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"; }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/70 px-2 py-0.5 rounded-md">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW SECTION 2: PARENT REVIEWS ── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <span className="px-3.5 py-1 rounded-full bg-pink-950/80 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            💬 Parent Speak
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">What Parents Say</h2>
        </div>

        <div ref={testRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-amber-400 text-sm">{t.rating}</div>
              <p className="text-xs text-gray-300 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <img src={t.img} alt={t.parent} className="w-9 h-9 rounded-full object-cover border border-pink-400/40" />
                <div>
                  <div className="text-xs font-black text-white">{t.parent}</div>
                  <div className="text-[10px] text-pink-400 font-semibold">{t.child}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FACILITIES GRID ── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-center text-white mb-6">Facilities & Learning Tools</h2>
        <div ref={featureRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-900/60 border border-slate-800 p-4 hover:border-pink-500/40 transition-colors">
              <span className="text-2xl mt-0.5">{f.icon}</span>
              <div>
                <div className="text-sm font-bold text-white mb-0.5">{f.title}</div>
                <div className="text-xs text-gray-400">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW SECTION 3: ENROLLMENT CTA BANNER ── */}
      <section className="max-w-4xl mx-auto px-4 pb-16 pt-4 text-center">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-950 via-purple-950 to-slate-900 border border-pink-500/40 p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Enroll Your Child for <span className="text-pink-400">2025–26 Session</span>
          </h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Limited seats in Kindergarten & Primary Wing. Book a campus tour or fill out the enquiry form today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/admission-enquiry"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Fill Admission Enquiry →
            </Link>
            <Link
              to="/admissions"
              className="bg-slate-900 text-white border border-slate-700 font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider hover:scale-105 transition-all"
            >
              Direct Online Admission
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
