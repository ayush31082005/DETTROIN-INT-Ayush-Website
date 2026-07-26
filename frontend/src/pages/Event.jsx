import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─── GSAP Loader ─────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((res) => {
    if (window.gsap) return res(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
      s2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        res(window.gsap);
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s);
  });

/* ─── Data ────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 1,
    title: "Annual Science Fair",
    subtitle: "Innovate · Explore · Present",
    date: "15 Aug 2025", day: "15", month: "AUG",
    place: "Main Auditorium, Block A",
    category: "Academic",
    gradient: "from-cyan-500 to-blue-600",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    desc: "Class 6–12 students showcase science models, NEET/JEE research posters and working prototypes. Judged by industry experts.",
    tags: ["Class 6–12", "NEET/JEE", "₹15,000 Prize"],
  },
  {
    id: 2,
    title: "Annual Sports Meet",
    subtitle: "Run · Jump · Win",
    date: "5 Sep 2025", day: "05", month: "SEP",
    place: "Sports Ground & Indoor Arena",
    category: "Sports",
    gradient: "from-emerald-500 to-green-600",
    accent: "text-emerald-400",
    border: "border-emerald-500/40",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80",
    desc: "Athletics, cricket, football, kabaddi and indoor games for all — from LKG running race to 12th inter-house championship.",
    tags: ["LKG–12th", "All Sports", "Gold Medal"],
  },
  {
    id: 3,
    title: "Sanskriti Cultural Fest",
    subtitle: "Celebrate · Perform · Shine",
    date: "20 Oct 2025", day: "20", month: "OCT",
    place: "Open Auditorium",
    category: "Cultural",
    gradient: "from-violet-500 to-purple-600",
    accent: "text-violet-400",
    border: "border-violet-500/40",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80",
    desc: "3-day mega event — classical dance, folk music, drama, street plays, fashion show and singing competitions for all grades.",
    tags: ["LKG–12th", "Dance & Music", "Best Performer Trophy"],
  },
  {
    id: 4,
    title: "Tech Hackathon & Coding Olympiad",
    subtitle: "Code · Build · Deploy",
    date: "10 Nov 2025", day: "10", month: "NOV",
    place: "Smart Computer Lab",
    category: "Technical",
    gradient: "from-rose-500 to-pink-600",
    accent: "text-rose-400",
    border: "border-rose-500/40",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=800&q=80",
    desc: "24-hour hackathon for Class 9–12. Python, AI project demos, robotics challenge and web dev sprint with industry mentors as judges.",
    tags: ["Class 9–12", "Python/AI", "₹25,000 + Internships"],
  },
  {
    id: 5,
    title: "Art & Craft Exhibition",
    subtitle: "Create · Express · Inspire",
    date: "25 Nov 2025", day: "25", month: "NOV",
    place: "Exhibition Hall, Ground Floor",
    category: "Cultural",
    gradient: "from-amber-500 to-orange-600",
    accent: "text-amber-400",
    border: "border-amber-500/40",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
    desc: "Annual gallery with paintings, sculpture, pottery and photography by students from LKG to Class 12. Best works enter School Art Gallery.",
    tags: ["LKG–12th", "Painting", "Gallery Display"],
  },
  {
    id: 6,
    title: "Graduation & Board Felicitation",
    subtitle: "Honour · Inspire · Achieve",
    date: "15 Dec 2025", day: "15", month: "DEC",
    place: "Main Auditorium",
    category: "Academic",
    gradient: "from-indigo-500 to-blue-600",
    accent: "text-indigo-400",
    border: "border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    desc: "Felicitating Class 10 & 12 board toppers, scholarship winners, sportspersons and cultural achievers. Parents and alumni invited.",
    tags: ["Class 10 & 12", "Board Toppers", "Trophies + Scholarships"],
  },
];

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80", label: "Science Fair 2024" },
  { url: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=700&q=80", label: "Sports Day 2024" },
  { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80", label: "Cultural Fest 2024" },
  { url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80", label: "Tech Hackathon 2024" },
  { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80", label: "Art Exhibition 2024" },
  { url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80", label: "Graduation Day 2024" },
];

const STATS = [
  { n: "25+", label: "Events/Year", icon: "📅", color: "text-pink-400" },
  { n: "15,000+", label: "Students", icon: "🎓", color: "text-cyan-400" },
  { n: "200+", label: "Awards", icon: "🏆", color: "text-amber-400" },
  { n: "50+", label: "Partners", icon: "🤝", color: "text-emerald-400" },
];

const CATEGORIES = ["All", "Academic", "Cultural", "Technical", "Sports"];

/* ─── Component ─────────────────────────────────────────── */
export default function Event() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const heroBadgeRef   = useRef(null);
  const heroTitleRef   = useRef(null);
  const heroSubRef     = useRef(null);
  const statsRef       = useRef(null);
  const featuredRef    = useRef(null);
  const filterRef      = useRef(null);
  const cardsRef       = useRef([]);
  const timelineRef    = useRef(null);
  const galleryRef     = useRef(null);
  const whyRef         = useRef(null);
  const ctaRef         = useRef(null);

  const filtered = useMemo(
    () => (filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter)),
    [filter]
  );

  /* ── GSAP on mount ── */
  useEffect(() => {
    loadGSAP().then((gsap) => {

      /* Hero entrance with strict null checks */
      if (heroBadgeRef.current && heroTitleRef.current && heroSubRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(heroBadgeRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
          .fromTo(heroTitleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, "-=0.3")
          .fromTo(heroSubRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");
      }

      /* Stats */
      if (statsRef.current && statsRef.current.children.length) {
        gsap.fromTo(Array.from(statsRef.current.children),
          { scale: 0.5, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "back.out(1.6)",
            scrollTrigger: { trigger: statsRef.current, start: "top 88%" } }
        );
      }

      /* Featured */
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current, { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 82%" } }
        );
      }

      /* Filter pills */
      if (filterRef.current && filterRef.current.children.length) {
        gsap.fromTo(Array.from(filterRef.current.children),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.4,
            scrollTrigger: { trigger: filterRef.current, start: "top 90%" } }
        );
      }

      /* Cards */
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        gsap.fromTo(validCards,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: validCards[0], start: "top 88%" } }
        );
      }

      /* Timeline */
      if (timelineRef.current) {
        const rows = timelineRef.current.querySelectorAll(".tl-row");
        if (rows.length) {
          gsap.fromTo(Array.from(rows),
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: timelineRef.current, start: "top 85%" } }
          );
        }
      }

      /* Gallery */
      if (galleryRef.current && galleryRef.current.children.length) {
        gsap.fromTo(Array.from(galleryRef.current.children),
          { scale: 0.85, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: galleryRef.current, start: "top 85%" } }
        );
      }

      /* Why section */
      if (whyRef.current && whyRef.current.children.length) {
        gsap.fromTo(Array.from(whyRef.current.children),
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: whyRef.current, start: "top 85%" } }
        );
      }

      /* CTA */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 90%" } }
        );
      }
    });
  }, []);

  /* Re-animate cards on filter change */
  useEffect(() => {
    if (!window.gsap) return;
    const valid = cardsRef.current.filter(Boolean);
    if (!valid.length) return;
    window.gsap.fromTo(valid,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power2.out" }
    );
  }, [filter]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="bg-slate-950 text-white font-sans overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section
        className="relative w-full min-h-[62vh] flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.92) 100%),
            url('https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1600&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated gradient orbs */}
        <div className="absolute top-16 left-1/4 w-72 h-72 bg-pink-600/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-16 right-1/4 w-72 h-72 bg-violet-600/25 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

        <div className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
          <div ref={heroBadgeRef} className="mb-6">
            <span className="inline-block bg-pink-500/20 border border-pink-400/50 text-pink-300 text-xs font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full">
              🎉 NextGen College — LKG to 12th
            </span>
          </div>

          <h1 ref={heroTitleRef} className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-5">
            School{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400">
              Events
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              & Celebrations 2025
            </span>
          </h1>

          <p ref={heroSubRef} className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Science Fairs · Cultural Fests · Sports Meets · Tech Hackathons · Graduation Ceremonies
            <span className="block text-gray-400 text-xs md:text-sm mt-2">Every student, every grade — LKG to Class 12</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["🔬 Science", "🎭 Cultural", "🏅 Sports", "💻 Tech", "🎓 Graduation"].map((tag) => (
              <span key={tag} className="text-xs font-bold bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ══════ STATS BAND ══════ */}
      <section className="bg-slate-900/70 border-y border-slate-700/50 py-5 px-4">
        <div ref={statsRef} className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-2xl md:text-3xl font-black ${s.color}`}>{s.n}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ FEATURED BANNER ══════ */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div ref={featuredRef} className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
            alt="Featured Event"
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className="max-w-lg">
              <span className="inline-block bg-pink-500 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                ⭐ Featured Event 2025
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                Annual Science Fair<br />
                <span className="text-cyan-400">& Innovation Challenge</span>
              </h2>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed max-w-sm">
                Class 6–12 students present research, compete for ₹15,000 prize pool, and get evaluated by industry professionals.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold text-cyan-400 border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 rounded-full">📅 15 Aug 2025</span>
                <span className="text-xs font-bold text-white border border-white/20 bg-white/5 px-3 py-1 rounded-full">📍 Main Auditorium</span>
                <span className="text-xs font-bold text-amber-400 border border-amber-400/40 bg-amber-400/10 px-3 py-1 rounded-full">🏆 ₹15,000 Prize</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FILTER + EVENT CARDS ══════ */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <h2 className="text-2xl font-black text-white">All Events — 2025–26</h2>
          <span className="text-xs font-bold text-gray-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {filtered.length} Events
          </span>
        </div>

        {/* Filter */}
        <div ref={filterRef} className="flex flex-wrap gap-2 mb-7">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                  : "bg-slate-800/70 text-gray-300 border border-slate-700 hover:border-slate-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ev, i) => (
            <div
              key={ev.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`group relative rounded-2xl overflow-hidden bg-slate-900/80 border ${ev.border} hover:border-opacity-80 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80`; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Date chip */}
                <div className={`absolute top-3 left-3 bg-gradient-to-br ${ev.gradient} text-white text-center rounded-xl px-3 py-1.5 shadow-lg min-w-[44px]`}>
                  <div className="text-xl font-black leading-none">{ev.day}</div>
                  <div className="text-[10px] font-black uppercase tracking-wide">{ev.month}</div>
                </div>

                {/* Category pill */}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-[11px] font-black text-white px-2.5 py-0.5 rounded-full border border-white/10">
                  {ev.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-black text-white mb-0.5 leading-tight">{ev.title}</h3>
                <p className={`text-[11px] font-bold uppercase tracking-wider ${ev.accent} mb-2`}>{ev.subtitle}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{ev.desc}</p>

                {/* Place */}
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-3">
                  <span>📍</span>
                  <span className="truncate">{ev.place}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {ev.tags.map((t) => (
                    <span key={t} className="text-[10px] font-semibold bg-slate-800 border border-slate-700/60 text-gray-300 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className={`text-xs font-bold ${ev.accent}`}>{ev.date}</span>
                  <button className={`text-[11px] font-black bg-gradient-to-r ${ev.gradient} text-white px-4 py-1.5 rounded-full hover:scale-105 transition-transform shadow-lg`}>
                    Register →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ EVENT TIMELINE ══════ */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-black text-center text-white mb-1">Event Calendar 2025–26</h2>
        <p className="text-center text-gray-400 text-sm mb-8">All key dates at a glance</p>

        <div ref={timelineRef} className="relative space-y-3">
          {/* Vertical track */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-pink-500 via-violet-500 to-cyan-400 rounded-full" />

          {EVENTS.map((ev) => (
            <div key={ev.id} className="tl-row flex items-center gap-4 pl-11 relative">
              {/* Dot */}
              <div className={`absolute left-[11px] w-4 h-4 rounded-full bg-gradient-to-br ${ev.gradient} border-2 border-slate-950 shadow-lg z-10`} />
              {/* Row card */}
              <div className="flex-1 flex items-center gap-3 bg-slate-900/50 border border-slate-700/40 rounded-xl px-4 py-2.5 hover:border-slate-600 transition-colors group cursor-pointer">
                <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-white truncate">{ev.title}</div>
                  <div className="text-[11px] text-gray-400 truncate">{ev.date} · {ev.place}</div>
                </div>
                <span className={`text-[10px] font-black ${ev.accent} shrink-0 border ${ev.border} px-2 py-0.5 rounded-full`}>
                  {ev.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-center text-white mb-1">Event Highlights Gallery</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Captured moments from Sanskriti events</p>

        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={g.url}
                alt={g.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-xs font-bold bg-slate-950/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                  {g.label}
                </span>
              </div>
              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 border border-white/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ WHY EVENTS MATTER ══════ */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
            alt="Students at event"
            className="w-full h-60 md:h-72 object-cover rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <div ref={whyRef} className="space-y-4">
          <span className="text-pink-400 text-xs font-black uppercase tracking-widest">Beyond Textbooks</span>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Events Build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
              Future Leaders
            </span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            At Sanskriti, every event from LKG to Class 12 is a chance to discover talent, build confidence, earn recognition, and grow beyond the classroom.
          </p>
          <div className="space-y-2.5">
            {[
              { icon: "🎯", text: "Develops public speaking & leadership" },
              { icon: "🧠", text: "Sparks innovation & scientific thinking" },
              { icon: "🤝", text: "Builds teamwork across all grade levels" },
              { icon: "🏆", text: "Real awards, trophies & certificates" },
              { icon: "🌐", text: "Industry exposure for senior students" },
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-200">
                <span className="text-lg shrink-0">{pt.icon}</span>
                <span>{pt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section ref={ctaRef} className="max-w-4xl mx-auto px-4 pb-14">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
            alt="Graduation"
            className="w-full h-52 md:h-60 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Ready to Participate?
            </h3>
            <p className="text-gray-300 text-sm mb-5 max-w-md">
              Register your child for upcoming events and make this academic year unforgettable.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-full text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition-all">
                Register Now →
              </button>
              <button className="px-6 py-2.5 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-white font-bold rounded-full text-sm border border-slate-600 hover:scale-105 transition-all">
                Download Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ LIGHTBOX ══════ */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[lightbox].url} alt={GALLERY[lightbox].label} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-white text-center mt-3 font-bold text-sm">{GALLERY[lightbox].label}</p>
          </div>
        </div>
      )}

    </div>
  );
}
