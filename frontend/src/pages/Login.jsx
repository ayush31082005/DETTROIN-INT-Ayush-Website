// src/pages/Login.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { buildApiUrl } from "../services/api";

/* ── GSAP Loader ──────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const cardRef   = useRef(null);
  const leftRef   = useRef(null);

  useEffect(() => {
    loadGSAP().then((gsap) => {
      gsap.from(leftRef.current, { opacity: 0, x: -80, duration: 1, ease: "power3.out", clearProps: "opacity,x" });
      gsap.from(cardRef.current, { opacity: 0, x:  80, duration: 1, ease: "power3.out", delay: 0.15, clearProps: "opacity,x" });
    });
    const fb = setTimeout(() => {
      if (cardRef.current) cardRef.current.style.opacity = "1";
      if (leftRef.current) leftRef.current.style.opacity = "1";
    }, 3000);
    return () => clearTimeout(fb);
  }, []);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(buildApiUrl("/auth/login"), form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",  res.data.role);
      if (res.data.role.toLowerCase() === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-stretch font-sans relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(8, 13, 26, 0.55) 0%, rgba(13, 31, 69, 0.45) 50%, rgba(8, 13, 26, 0.60) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')`,
      }}
    >
      {/* ── LEFT PANEL (decorative – hidden on mobile) ── */}
      <div
        ref={leftRef}
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12 backdrop-blur-sm bg-slate-950/50 border-r border-slate-700/50 shadow-2xl"
      >
        {/* Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo + tagline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl">S</div>
            <span className="text-white font-extrabold text-lg">NextGen College</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-4">
            Welcome Back to Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Academic Journey
            </span>
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Log in to access your student portal, track your admission, download documents, and stay updated.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {[
            ["🎓", "Admission Tracking",     "Monitor your application status"],
            ["📄", "Document Download",      "Get your admission letter instantly"],
            ["📅", "Timetable & Results",    "Stay on top of your academics"],
            ["🔔", "Instant Notifications",  "Never miss important updates"],
          ].map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur rounded-2xl px-4 py-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <p className="relative z-10 text-gray-500 text-xs italic">
          "Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats
        </p>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div ref={cardRef} className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl">S</div>
            <span className="text-white font-extrabold text-base">NextGen College</span>
          </div>

          {/* Card */}
          <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-7 md:p-9 shadow-2xl">
            <div className="mb-7">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Welcome back 👋</h1>
              <p className="text-gray-400 text-sm">Sign in to your student portal account</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email" name="email" required value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Password</label>
                  <button type="button" className="text-cyan-400 text-xs hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"} name="password" required value={form.password} onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm outline-none transition"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-lg">
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-70 text-slate-950 font-black py-3.5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-100 transition-all text-base flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Signing in…</>
                ) : <>🔐 Login to Portal</>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 font-bold hover:underline">Create Account →</Link>
            </p>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            By logging in, you agree to our{" "}
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Terms of Service</span> &{" "}
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
