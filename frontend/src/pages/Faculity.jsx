import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ── GSAP Loader ───────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
      s2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve(window.gsap);
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  });

/* ── Category Filters ─────────────────────────────────────── */
const CATEGORIES = [
  { id: "all", label: "🌟 All Educators" },
  { id: "preprimary", label: "🧸 Pre-Primary (LKG-UKG)" },
  { id: "primary", label: "🎨 Primary (1st-5th)" },
  { id: "middle", label: "📐 Middle School (6th-8th)" },
  { id: "high", label: "🏫 High School (9th-10th)" },
  { id: "senior", label: "🎓 Senior Sec (11th-12th)" },
  { id: "sports", label: "⚽ Sports & Arts" },
];

/* ── Faculty Data (LKG to 12th) ───────────────────────────── */
const FACULTY_MEMBERS = [
  // Leadership & Senior Sec (11-12)
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    role: "Director & Principal",
    category: "senior",
    level: "Management & Senior Sec",
    qualification: "Ph.D. in Physics, M.Sc. (Gold Medalist)",
    experience: "22+ Years",
    subjects: ["Advanced Physics (11th-12th)", "Academic Leadership"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Dr. Rajesh Sharma has guided over 15,000 students to top IITs, AIIMS, and global universities with a holistic educational vision.",
    email: "principal@sanskriticollege.edu",
    badgeColor: "from-amber-500 to-orange-600",
    award: "🏆 National Best Principal Award 2024",
  },
  {
    id: 2,
    name: "Dr. Arti Sharma",
    role: "Vice-Principal & Head of Science",
    category: "senior",
    level: "Senior Secondary (11th-12th)",
    qualification: "Ph.D. in Chemistry, M.Sc., B.Ed.",
    experience: "18+ Years",
    subjects: ["Organic Chemistry (11th-12th)", "NEET/JEE Prep"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate about making complex chemical equations intuitive and fun for board & competitive exams.",
    email: "arti.sharma@sanskriticollege.edu",
    badgeColor: "from-cyan-500 to-blue-600",
    award: "✨ Excellence in Chemistry Education",
  },
  {
    id: 3,
    name: "Prof. Rohan Verma",
    role: "PGT Computer Science & AI",
    category: "senior",
    level: "Senior Secondary (11th-12th)",
    qualification: "M.Tech in Computer Science, B.Ed.",
    experience: "12+ Years",
    subjects: ["Python Programming", "AI & Machine Learning", "Web Dev"],
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    bio: "Leader of our Smart Coding Lab. Trains students in Python, robotics, web development, and AI tools.",
    email: "rohan.verma@sanskriticollege.edu",
    badgeColor: "from-violet-500 to-purple-600",
    award: "🤖 Mentor of National Robotics Winners",
  },
  {
    id: 4,
    name: "Ms. Sunita Roy",
    role: "PGT Mathematics",
    category: "senior",
    level: "Senior Secondary (11th-12th)",
    qualification: "M.Sc. Mathematics, B.Ed., GATE Qualified",
    experience: "15+ Years",
    subjects: ["Calculus", "Vectors & 3D Geometry", "JEE Math"],
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    bio: "Renowned for 100% board score records and building conceptual clarity in complex mathematical proofs.",
    email: "sunita.roy@sanskriticollege.edu",
    badgeColor: "from-emerald-500 to-teal-600",
    award: "🥇 100% Board Success Specialist",
  },

  // High School (9th-10th)
  {
    id: 5,
    name: "Mr. Alok Tiwari",
    role: "TGT Physics & Mathematics",
    category: "high",
    level: "High School (9th-10th)",
    qualification: "M.Sc. Physics, B.Ed.",
    experience: "10+ Years",
    subjects: ["Physics (9th-10th)", "NTSE & Olympiad Math"],
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Helps 9th & 10th graders build strong conceptual foundations for board exams and competitive Olympiads.",
    email: "alok.tiwari@sanskriticollege.edu",
    badgeColor: "from-blue-500 to-indigo-600",
    award: "🌟 Best NTSE Mentor Award",
  },
  {
    id: 6,
    name: "Ms. Sakshi Kapoor",
    role: "TGT English & Public Speaking",
    category: "high",
    level: "High School (9th-10th)",
    qualification: "M.A. English Literature, B.Ed.",
    experience: "9+ Years",
    subjects: ["English Grammar", "Debate & Public Speaking"],
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Focuses on communicative fluency, creative writing, and public speaking confidence for young leaders.",
    email: "sakshi.kapoor@sanskriticollege.edu",
    badgeColor: "from-pink-500 to-rose-600",
    award: "🎭 Inter-School Debate Coach",
  },

  // Middle School (6th-8th)
  {
    id: 7,
    name: "Ms. Neha Gulati",
    role: "Middle School Science Head",
    category: "middle",
    level: "Middle School (6th-8th)",
    qualification: "M.Sc. Environmental Science, B.Ed.",
    experience: "8+ Years",
    subjects: ["General Science", "Ecology & Biology", "Lab Practicals"],
    image: "https://randomuser.me/api/portraits/women/71.jpg",
    bio: "Encourages hands-on experiments, eco-club initiatives, and scientific curiosity among middle schoolers.",
    email: "neha.gulati@sanskriticollege.edu",
    badgeColor: "from-teal-500 to-emerald-600",
    award: "🌱 Eco-Club Master Teacher",
  },
  {
    id: 8,
    name: "Mr. Deepak Mishra",
    role: "Middle School Mathematics",
    category: "middle",
    level: "Middle School (6th-8th)",
    qualification: "M.Sc. Applied Math, B.Ed.",
    experience: "7+ Years",
    subjects: ["Algebra", "Geometry", "Vedic Math"],
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    bio: "Eliminates math phobia using visual geometry tools, puzzle games, and mental math tricks.",
    email: "deepak.mishra@sanskriticollege.edu",
    badgeColor: "from-cyan-500 to-blue-600",
    award: "🧩 Innovative Math Educator",
  },

  // Primary (1st-5th)
  {
    id: 9,
    name: "Ms. Kavita Sharma",
    role: "Primary Section Head (1st-5th)",
    category: "primary",
    level: "Primary (1st-5th)",
    qualification: "M.A., B.Ed., Early Childhood Ed.",
    experience: "13+ Years",
    subjects: ["English", "Environmental Science", "Moral Science"],
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Dedicated to nurturing young minds with care, creative activities, values, and strong foundational literacy.",
    email: "kavita.sharma@sanskriticollege.edu",
    badgeColor: "from-purple-500 to-indigo-600",
    award: "❤️ Loving Teacher Award",
  },
  {
    id: 10,
    name: "Ms. Ananya Das",
    role: "PRT Mathematics & Art",
    category: "primary",
    level: "Primary (1st-5th)",
    qualification: "B.Sc., B.Ed., Fine Arts Diploma",
    experience: "6+ Years",
    subjects: ["Primary Math", "Art & Craft", "Origami"],
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Blends art and numbers to make primary learning joyful, engaging, and colorful.",
    email: "ananya.das@sanskriticollege.edu",
    badgeColor: "from-pink-500 to-purple-600",
    award: "🎨 Creative Pedagogy Excellence",
  },

  // Pre-Primary (LKG-UKG)
  {
    id: 11,
    name: "Ms. Ritu Saxena",
    role: "Pre-Primary Head (LKG & UKG)",
    category: "preprimary",
    level: "Pre-Primary (LKG-UKG)",
    qualification: "Montessori Certified, B.A., NTT",
    experience: "11+ Years",
    subjects: ["Phonetics", "Rhymes & Storytelling", "Activity Learning"],
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    bio: "Creates a warm, loving home-away-from-home for LKG and UKG toddlers with play-way Montessori methods.",
    email: "ritu.saxena@sanskriticollege.edu",
    badgeColor: "from-amber-400 to-orange-500",
    award: "🧸 Best Kindergarten Educator",
  },
  {
    id: 12,
    name: "Ms. Meenal Joshi",
    role: "Pre-Primary Co-Teacher (LKG)",
    category: "preprimary",
    level: "Pre-Primary (LKG-UKG)",
    qualification: "Child Psychology Diploma, NTT",
    experience: "5+ Years",
    subjects: ["Motor Skills", "Sensory Play", "Alphabets & Numbers"],
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    bio: "Focuses on emotional bonding, habit formation, and motor skills development in little kids.",
    email: "meenal.joshi@sanskriticollege.edu",
    badgeColor: "from-rose-400 to-pink-500",
    award: "🌟 Toddler Care Excellence",
  },

  // Sports & Arts
  {
    id: 13,
    name: "Coach Rajesh Rawat",
    role: "Head of Sports & PE",
    category: "sports",
    level: "All Grades (LKG - 12th)",
    qualification: "M.P.Ed., NIS Certified Coach",
    experience: "14+ Years",
    subjects: ["Athletics", "Cricket & Football", "Yoga & Fitness"],
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "Trains students for State & National sports championships while instilling discipline and teamwork.",
    email: "sports@sanskriticollege.edu",
    badgeColor: "from-emerald-500 to-green-600",
    award: "🏆 State Sports Coach Award",
  },
  {
    id: 14,
    name: "Pandit Ravi Shankar",
    role: "Head of Music & Arts",
    category: "sports",
    level: "All Grades (LKG - 12th)",
    qualification: "Sangeet Visharad, M.A. Music",
    experience: "17+ Years",
    subjects: ["Vocal Music", "Instruments (Sitar, Tabla)", "Choir"],
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    bio: "Nurtures musical talents, guiding students to win regional and national cultural fests.",
    email: "music@sanskriticollege.edu",
    badgeColor: "from-violet-500 to-purple-600",
    award: "🎵 Cultural Heritage Educator",
  },
];

/* ── HOD Leadership Spotlight Data ──────────────────────── */
const HOD_LEADERS = [
  {
    name: "Dr. Arti Sharma",
    dept: "Department of Science (11th-12th)",
    exp: "18+ Yrs Exp",
    desc: "Oversees Physics, Chemistry & Biology labs. Prepares NEET/JEE aspirants with 100% board excellence.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    badge: "Science HOD",
  },
  {
    name: "Prof. Rohan Verma",
    dept: "Department of IT & Computer Science",
    exp: "12+ Yrs Exp",
    desc: "Directs AI, Python & Robotics labs. Equips students with 21st-century digital coding skills.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    badge: "Computer Science HOD",
  },
  {
    name: "Ms. Kavita Sharma",
    dept: "Primary School Academic Head (1st-5th)",
    exp: "13+ Yrs Exp",
    desc: "Ensures joyful, activity-based foundational education for primary students.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    badge: "Primary HOD",
  },
  {
    name: "Ms. Ritu Saxena",
    dept: "Pre-Primary & Kindergarten Head (LKG-UKG)",
    exp: "11+ Yrs Exp",
    desc: "Creates a loving play-way environment for our youngest toddlers starting their school journey.",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    badge: "Kindergarten HOD",
  },
];

/* ── FAQ Data ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What is the qualification standard for teachers at NextGen College?",
    a: "100% of our faculty members hold Post-Graduate degrees (M.Sc., M.A., M.Tech, M.Ed.), with over 20% holding Ph.D. doctorates. Pre-Primary teachers are Montessori and Early Childhood certified.",
  },
  {
    q: "What is the Teacher to Student ratio in classes from LKG to 12th?",
    a: "We maintain a low Teacher-Student ratio of 1:15 in Kindergarten (LKG/UKG) with dedicated co-teachers, and 1:25 in Primary to Senior Secondary classes for individual attention.",
  },
  {
    q: "How can parents communicate or book 1-on-1 meetings with teachers?",
    a: "Parents can book meetings through the Parent Portal, call our reception helpdesk, or attend monthly Parent-Teacher Meetings (PTM) held on Saturdays.",
  },
  {
    q: "Do teachers undergo continuous training in modern smart-class tools?",
    a: "Yes! All teachers participate in mandatory quarterly workshops covering AI in education, smart-board interactive tools, child psychology, and CBSE/Board curriculum updates.",
  },
];

/* ══════════════════════════════════════════════════════════════ */
function Faculity() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  /* Refs for GSAP */
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const hodRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const awardRef = useRef(null);

  /* ── GSAP Animations ── */
  useEffect(() => {
    loadGSAP().then((gsap) => {
      /* Hero entrance */
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
          clearProps: "opacity,y",
        });
      }
      /* Stats entrance */
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          clearProps: "opacity,y",
        });
      }
      /* HOD entrance */
      if (hodRef.current) {
        gsap.from(hodRef.current, {
          scrollTrigger: { trigger: hodRef.current, start: "top 80%" },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "opacity,y",
        });
      }
      /* Cards entrance */
      const validCards = cardsRef.current.filter(Boolean);
      if (gridRef.current && validCards.length) {
        gsap.from(validCards, {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          opacity: 0,
          y: 40,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "opacity,y",
        });
      }
      /* Awards banner entrance */
      if (awardRef.current) {
        gsap.from(awardRef.current, {
          scrollTrigger: { trigger: awardRef.current, start: "top 80%" },
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "opacity,scale",
        });
      }
    });

    const fallback = setTimeout(() => {
      [heroRef, statsRef, hodRef, gridRef, awardRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  /* Filter logic */
  const filteredMembers = FACULTY_MEMBERS.filter((m) => {
    const matchesCat = activeCategory === "all" || m.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.qualification.toLowerCase().includes(q) ||
      m.subjects.some((s) => s.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080d1a] text-white font-sans overflow-x-hidden">
      {/* ═══════════════ HERO HEADER ═══════════════ */}
      <section
        className="relative overflow-hidden py-16 md:py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(8, 13, 26, 0.50) 0%, rgba(13, 31, 69, 0.45) 50%, rgba(8, 13, 26, 0.55) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-sm">
            👩‍🏫 Inspiring Education Excellence from LKG to 12th
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">
            Our Distinguished{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400">
              Faculty & Mentors
            </span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            Meet our highly qualified team of educators, Ph.D. scholars, Montessori trainers, and sports coaches dedicated to nurturing students at{" "}
            <strong className="text-white">NextGen College</strong>.
          </p>
        </div>
      </section>

      {/* ═══════════════ STATS MARQUEE TICKER ═══════════════ */}
      <section ref={statsRef} className="w-full bg-slate-950/80 backdrop-blur-md border-y border-slate-700/50 py-3 shadow-2xl overflow-hidden">
        {(() => {
          const stats = [
            { value: "65+",    label: "Expert Educators",       icon: "👨‍🏫", color: "text-cyan-400" },
            { value: "100%",   label: "Post-Graduate / Ph.D.",  icon: "🎓",   color: "text-pink-400" },
            { value: "15+ Yrs",label: "Average Experience",     icon: "⭐",   color: "text-amber-400" },
            { value: "1:15",   label: "Teacher-Student Ratio",  icon: "🤝",   color: "text-emerald-400" },
            { value: "15,000+",label: "Successful Alumni",      icon: "🚀",   color: "text-violet-400" },
            { value: "25+",    label: "Years of Excellence",    icon: "🏆",   color: "text-rose-400" },
          ];
          const ticker = [...stats, ...stats, ...stats];
          return (
            <div className="relative overflow-hidden w-full">
              {/* Fade edges */}
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-950/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-950/80 to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-l2r flex items-center gap-4 whitespace-nowrap px-4">
                {ticker.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-900/70 border border-slate-700/60 px-5 py-2.5 rounded-2xl shrink-0"
                  >
                    <span className="text-xl">{stat.icon}</span>
                    <div className="flex flex-col">
                      <span className={`text-base font-black ${stat.color}`}>{stat.value}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ═══════════════ SECTION: HOD LEADERSHIP SPOTLIGHT ═══════════════ */}
      <section ref={hodRef} className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-8">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            👑 Department Leadership
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Heads of <span className="text-amber-400">Departments (HODs)</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Academic leaders driving excellence across Senior Secondary, High School, Primary, and Kindergarten wings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOD_LEADERS.map((leader, i) => (
            <div
              key={i}
              className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg">
                    {leader.badge}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-bold">{leader.dept}</p>
                  <p className="text-gray-400 text-xs leading-relaxed pt-1">{leader.desc}</p>
                </div>
              </div>
              <div className="p-5 pt-0 text-xs text-gray-400 font-semibold border-t border-slate-800/80 mt-2">
                ⌛ {leader.exp}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ MAIN FACULTY EXPLORER ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Search & Filter Header */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Our Education <span className="text-cyan-400">Experts</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm">Filter teachers by grade level or search by name & subject.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search teacher, subject, role..."
                className="w-full bg-slate-950/50 backdrop-blur-md border border-slate-700/60 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-400 rounded-2xl px-4 py-3 text-sm outline-none transition shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-xl scale-105"
                    : "bg-slate-950/40 backdrop-blur-md border-slate-700/60 text-gray-400 hover:text-white hover:border-slate-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── FACULTY GRID ── */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-14 bg-slate-950/50 backdrop-blur-md rounded-3xl border border-slate-800 space-y-3">
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-bold text-white">No Educator Found</h3>
            <p className="text-gray-400 text-sm">No teachers match your search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-2 bg-cyan-500 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((fac, i) => (
              <div
                key={fac.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative bg-slate-950/50 backdrop-blur-md border border-slate-700/50 hover:border-cyan-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo & Badge */}
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Level badge */}
                    <span
                      className={`absolute top-3 left-3 bg-gradient-to-r ${fac.badgeColor} text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg`}
                    >
                      {fac.level}
                    </span>

                    {/* Experience pill */}
                    <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur text-cyan-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                      ⌛ {fac.experience}
                    </span>
                  </div>

                  {/* Info Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                        {fac.name}
                      </h3>
                      <p className="text-xs font-bold text-pink-400">{fac.role}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-300">
                      <p className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">🎓</span>
                        <span className="text-gray-300">{fac.qualification}</span>
                      </p>

                      {fac.award && (
                        <p className="flex items-start gap-1.5 text-amber-300 font-semibold">
                          <span>🏆</span>
                          <span className="line-clamp-1">{fac.award}</span>
                        </p>
                      )}
                    </div>

                    {/* Subjects tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {fac.subjects.map((sub, idx) => (
                        <span key={idx} className="bg-slate-800/80 border border-slate-700/80 text-gray-300 text-[10px] px-2 py-0.5 rounded-md">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedFaculty(fac)}
                    className="w-full bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2.5 rounded-xl text-xs border border-slate-700/80 hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════ SUBJECT & STREAM MATRIX SECTION ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-8">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
            📚 Subject Coverage
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Academic <span className="text-purple-400">Streams & Subjects</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Comprehensive curriculum taught by specialized subject teachers across all grades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              wing: "🧸 Pre-Primary (LKG - UKG)",
              color: "border-amber-500/40",
              subjects: ["Phonics & Reading", "Rhymes & Storytelling", "Sensory & Motor Skills", "Basic Numbers"],
            },
            {
              wing: "🎨 Primary Wing (1st - 5th)",
              color: "border-purple-500/40",
              subjects: ["English & Hindi Grammar", "Mathematics & Abacus", "Environmental Studies (EVS)", "Art & Craft"],
            },
            {
              wing: "📐 Middle Wing (6th - 8th)",
              color: "border-teal-500/40",
              subjects: ["General Science & Lab", "Algebra & Geometry", "Social Sciences", "Sanskrit & Computer"],
            },
            {
              wing: "🏫 High School (9th - 10th)",
              color: "border-blue-500/40",
              subjects: ["Physics, Chemistry, Bio", "Mathematics & Statistics", "Social Studies", "NTSE & Olympiad Prep"],
            },
            {
              wing: "🔬 Senior Secondary Science (11-12)",
              color: "border-cyan-500/40",
              subjects: ["Physics & Chemistry", "Math / Biology", "Python & Computer Science", "NEET & JEE Coaching"],
            },
            {
              wing: "📊 Commerce & Arts (11-12)",
              color: "border-rose-500/40",
              subjects: ["Accountancy & Business", "Economics & Statistics", "English Literature", "Political Science"],
            },
          ].map((item, i) => (
            <div key={i} className={`bg-slate-950/50 backdrop-blur-md border-2 ${item.color} rounded-3xl p-6 shadow-xl space-y-3`}>
              <h3 className="text-base font-extrabold text-white">{item.wing}</h3>
              <div className="space-y-1.5 pt-1">
                {item.subjects.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-8">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            ❓ FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-950/50 backdrop-blur-md border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left font-bold text-sm md:text-base text-white flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`text-cyan-400 text-xl transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ JOIN FACULTY CTA ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="bg-slate-950/60 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white">Want to Join Our Teaching Team?</h3>
            <p className="text-gray-400 text-sm">We are always looking for passionate, experienced educators from LKG to 12th.</p>
          </div>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            Apply for Faculty Post →
          </Link>
        </div>
      </section>

      {/* ═══════════════ MODAL: FACULTY DETAILS ═══════════════ */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold flex items-center justify-center transition shadow-lg"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="relative h-48 sm:h-56">
              <img src={selectedFaculty.image} alt={selectedFaculty.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <span className={`absolute top-4 left-4 bg-gradient-to-r ${selectedFaculty.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {selectedFaculty.level}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 -mt-6 relative z-10">
              <div>
                <h3 className="text-2xl font-extrabold text-white">{selectedFaculty.name}</h3>
                <p className="text-sm font-bold text-cyan-400">{selectedFaculty.role}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 space-y-2 text-xs">
                <p>
                  <strong className="text-gray-400 uppercase tracking-wider">Qualification:</strong>{" "}
                  <span className="text-white font-semibold">{selectedFaculty.qualification}</span>
                </p>
                <p>
                  <strong className="text-gray-400 uppercase tracking-wider">Experience:</strong>{" "}
                  <span className="text-cyan-400 font-semibold">{selectedFaculty.experience}</span>
                </p>
                <p>
                  <strong className="text-gray-400 uppercase tracking-wider">Email:</strong>{" "}
                  <span className="text-gray-300">{selectedFaculty.email}</span>
                </p>
                {selectedFaculty.award && (
                  <p className="text-amber-300 font-semibold pt-1 border-t border-slate-700">
                    {selectedFaculty.award}
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">About & Philosophy</h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedFaculty.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Subjects Taught</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFaculty.subjects.map((sub, idx) => (
                    <span key={idx} className="bg-slate-800 border border-slate-700 text-cyan-300 text-xs px-3 py-1 rounded-xl">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs hover:scale-105 transition"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faculity;
