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
    grade: "6th – 8th",
    full: "Middle School Wing",
    age: "10–13 Years",
    color: "from-blue-500 to-indigo-400",
    accent: "text-blue-400",
    border: "border-blue-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/71.jpg",
    classImg: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    teacher: "Ms. Neha Gulati",
    subjects: ["English & Literature", "Mathematics & Algebra", "General Science", "Social Studies & History", "Computer Fundamentals", "Hindi"],
    highlight: "NTSE & Olympiad Coaching",
    icon: "📐",
  },
  {
    grade: "9th – 10th",
    full: "High School (Board Prep)",
    age: "13–15 Years",
    color: "from-emerald-500 to-teal-400",
    accent: "text-emerald-400",
    border: "border-emerald-500/40",
    teacherImg: "https://randomuser.me/api/portraits/men/67.jpg",
    classImg: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
    teacher: "Mr. Alok Tiwari",
    subjects: ["CBSE Mathematics", "Physics", "Chemistry", "Biology", "English Language & Lit.", "Social Science"],
    highlight: "100% CBSE Board Pass Prep",
    icon: "🏫",
  },
  {
    grade: "11th – 12th",
    full: "Senior Sec — Science Stream",
    age: "15–17 Years",
    color: "from-cyan-500 to-blue-400",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    teacherImg: "https://randomuser.me/api/portraits/women/44.jpg",
    classImg: "https://images.unsplash.com/photo-1532094349884-543559822432?auto=format&fit=crop&w=600&q=80",
    teacher: "Dr. Arti Sharma",
    subjects: ["Physics (Theory + Lab)", "Chemistry (Organic/Inorganic)", "Biology / Mathematics", "English Core", "NEET / JEE Coaching"],
    highlight: "Integrated NEET / JEE Coaching",
    icon: "🔬",
  },
  {
    grade: "11th – 12th",
    full: "Senior Sec — Commerce & Arts",
    age: "15–17 Years",
    color: "from-violet-500 to-purple-400",
    accent: "text-violet-400",
    border: "border-violet-500/40",
    teacherImg: "https://randomuser.me/api/portraits/men/32.jpg",
    classImg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    teacher: "Dr. Rajesh Sharma",
    subjects: ["Accountancy", "Business Studies", "Economics", "English Core", "History / Political Science", "Informatics Practices"],
    highlight: "CA / CS Foundation Prep",
    icon: "📊",
  },
];

const COLLAGE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1532094349884-543559822432?auto=format&fit=crop&w=600&q=80", label: "Science & Physics Lab" },
  { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", label: "Smart Classroom" },
  { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", label: "Computer & AI Lab" },
  { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80", label: "Board Toppers Event" },
];

const METHODOLOGY = [
  { icon: "🎯", title: "CBSE Board Specialization", desc: "NCERT-aligned syllabus with regular chapterwise test series and previous 10-year paper solutions." },
  { icon: "⚡", title: "Integrated NEET & JEE Batches", desc: "Expert faculty for Physics, Chem, Math & Biology with weekly All India Mock Tests." },
  { icon: "💡", title: "1-on-1 Doubt Resolution", desc: "Dedicated daily doubt-clearing sessions after regular school hours for every student." },
  { icon: "📊", title: "Performance Analytics", desc: "Monthly report cards & personalized performance tracking shared with parents via portal." },
];

const TOPPERS = [
  { name: "Priya Sharma", score: "98.4%", stream: "Class 12th Science", rank: "District Topper", img: "https://randomuser.me/api/portraits/women/54.jpg" },
  { name: "Rohan Gupta", score: "97.8%", stream: "Class 12th Commerce", rank: "School Topper", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Aditya Verma", score: "99.0%", stream: "Class 10th CBSE", rank: "Perfect 100 in Math", img: "https://randomuser.me/api/portraits/men/36.jpg" },
];

const ACHIEVEMENTS = [
  { number: "98%", label: "Board Result 2024", icon: "📋", color: "text-cyan-400" },
  { number: "120+", label: "IIT / NIT Selections", icon: "🏛️", color: "text-blue-400" },
  { number: "85+", label: "Medical Seats (NEET)", icon: "🏥", color: "text-emerald-400" },
  { number: "200+", label: "Merit Scholarships", icon: "🎖️", color: "text-amber-400" },
];

const FACILITIES = [
  { icon: "🧪", title: "Science Labs", desc: "Physics, Chemistry & Biology labs with latest experiment equipment." },
  { icon: "💻", title: "Computer & AI Lab", desc: "50-seat AC lab with high-speed internet, Python & AI tools." },
  { icon: "📚", title: "Digital Library", desc: "10,000+ books, e-journals, reference books and NCERT e-resources." },
  { icon: "🎭", title: "Cultural & Debates", desc: "Annual fests, inter-school debates, drama and leadership camps." },
  { icon: "⚽", title: "Sports Complex", desc: "Cricket pitch, football ground, athletics track and fitness arena." },
  { icon: "🏆", title: "Olympiad & Competitive", desc: "NSO, IMO, IEO, NTSE, NEET & JEE dedicated coaching batches." },
];

export default function Secondary() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const achieveRef = useRef(null);
  const methodRef = useRef(null);
  const topperRef = useRef(null);
  const featureRef = useRef(null);
  const collageRef = useRef(null);

  useEffect(() => {
    loadGSAP().then((gsap) => {
      /* Hero text */
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
        );
      }

      /* Achievements bounce */
      if (achieveRef.current) {
        gsap.fromTo(achieveRef.current.children,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.7)",
            scrollTrigger: { trigger: achieveRef.current, start: "top 85%" }
          }
        );
      }

      /* Cards stagger */
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        gsap.fromTo(validCards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: validCards[0], start: "top 85%" }
          }
        );
      }

      /* Methodology Stagger */
      if (methodRef.current) {
        gsap.fromTo(methodRef.current.children,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: methodRef.current, start: "top 80%" }
          }
        );
      }

      /* Toppers Stagger */
      if (topperRef.current) {
        gsap.fromTo(topperRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: topperRef.current, start: "top 80%" }
          }
        );
      }

      /* Collage Grid */
      if (collageRef.current) {
        gsap.fromTo(collageRef.current.children,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "back.out(1.4)",
            scrollTrigger: { trigger: collageRef.current, start: "top 80%" }
          }
        );
      }

      /* Facilities */
      if (featureRef.current) {
        gsap.fromTo(featureRef.current.children,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: featureRef.current, start: "top 80%" }
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
          backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.90) 100%), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div ref={titleRef} className="lg:col-span-7 space-y-4">
            <span className="inline-block bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              🏫 Class 6th to 12th · CBSE Board Affiliated
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Secondary &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Senior Secondary
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
              Academic excellence from Class 6th to 12th — Science, Commerce & Arts streams with NEET/JEE coaching.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["🔬 Science (PCM/PCB)", "📊 Commerce & CA", "🎭 Arts & Humanities", "🏆 NEET / JEE Coaching"].map((badge) => (
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
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80"; }}
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

      {/* ── ACHIEVEMENT BANNER ── */}
      <section className="bg-slate-900/70 border-y border-slate-700/50 py-6 px-4">
        <div ref={achieveRef} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i}>
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className={`text-2xl md:text-3xl font-black ${a.color}`}>{a.number}</div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLASS CARDS ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            📚 CBSE Curriculum By Stream
          </span>
          <h2 className="text-3xl font-black text-white mt-3">Secondary & Senior Secondary Wings</h2>
          <p className="text-gray-400 text-sm mt-1">From Middle School foundation to Board & Competitive exam preparation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLASSES.map((cls, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`rounded-2xl bg-slate-900/80 border ${cls.border} overflow-hidden hover:bg-slate-900 transition-all duration-300 group shadow-xl`}
            >
              {/* Banner image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cls.classImg}
                  alt={cls.full}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80"; }}
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

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <img src={cls.teacherImg} alt={cls.teacher} className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{cls.full}</h3>
                    <p className="text-xs text-gray-400">Wing Head: <span className={cls.accent}>{cls.teacher}</span></p>
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

      {/* ── NEW SECTION 1: COACHING METHODOLOGY ── */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <span className="px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            💡 Our Pedagogy
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Board & Competitive Prep Methodology</h2>
        </div>

        <div ref={methodRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {METHODOLOGY.map((m, i) => (
            <div key={i} className="flex items-start gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors">
              <span className="text-3xl shrink-0 p-2 bg-cyan-500/10 rounded-xl">{m.icon}</span>
              <div>
                <h3 className="text-base font-extrabold text-white mb-1">{m.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO COLLAGE SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Campus Infrastructure</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Secondary & Labs Gallery</h2>
        </div>

        <div ref={collageRef} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { url: "https://images.unsplash.com/photo-1532094349884-543559822432?auto=format&fit=crop&w=600&q=80", title: "Physics & Chemistry Lab" },
            { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", title: "Smart Classroom" },
            { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", title: "Computer Science Lab" },
            { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80", title: "Felicitation Ceremony" },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
              <img
                src={item.url}
                alt={item.title}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80"; }}
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

      {/* ── NEW SECTION 2: BOARD TOPPERS ── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <span className="px-4 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            🏆 Hall of Fame
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Class 10th & 12th Board Toppers 2024</h2>
        </div>

        <div ref={topperRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOPPERS.map((tp, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center space-y-3 hover:border-amber-500/40 transition-all">
              <img src={tp.img} alt={tp.name} className="w-16 h-16 rounded-full mx-auto border-2 border-amber-400 object-cover" />
              <div>
                <div className="text-2xl font-black text-amber-400">{tp.score}</div>
                <div className="text-base font-bold text-white">{tp.name}</div>
                <div className="text-xs text-gray-400">{tp.stream}</div>
                <span className="inline-block mt-2 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  🎖️ {tp.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FACILITIES GRID ── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-center text-white mb-6">Facilities & Infrastructure</h2>
        <div ref={featureRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FACILITIES.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-900/60 border border-slate-800 p-4 hover:border-cyan-500/40 transition-colors">
              <span className="text-2xl mt-0.5">{f.icon}</span>
              <div>
                <div className="text-sm font-bold text-white mb-0.5">{f.title}</div>
                <div className="text-xs text-gray-400">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW SECTION 3: ADMISSION CTA ── */}
      <section className="max-w-4xl mx-auto px-4 pb-16 pt-4 text-center">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-cyan-500/40 p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Prepare for Board & <span className="text-cyan-400">Competitive Excellence</span>
          </h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Admissions open for Class 6th to 12th (Science, Commerce, Arts). Book your child's seat today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/admissions"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Apply Online Now →
            </Link>
            <Link
              to="/admission-enquiry"
              className="bg-slate-900 text-white border border-slate-700 font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider hover:scale-105 transition-all"
            >
              Enquire Details
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
