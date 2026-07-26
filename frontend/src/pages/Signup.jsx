// src/pages/Signup.jsx
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

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "User" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass]  = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength]  = useState(0); // password strength 0–4

  const cardRef = useRef(null);
  const leftRef = useRef(null);

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

  /* ── Password strength ── */
  const calcStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 6)                   s++;
    if (pwd.length >= 10)                  s++;
    if (/[A-Z]/.test(pwd))                 s++;
    if (/[0-9]/.test(pwd))                 s++;
    if (/[^A-Za-z0-9]/.test(pwd))         s++;
    return Math.min(s, 4);
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"];

  const handleChange = (e) => {
    setError("");
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "password") setStrength(calcStrength(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    setError("");
    try {
      const { confirmPassword, ...payload } = form;
      const res = await axios.post(buildApiUrl("/auth/signup"), payload);
      alert(res.data.message || "Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-stretch font-sans relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 6, 48, 0.55) 0%, rgba(38, 10, 90, 0.45) 50%, rgba(15, 6, 48, 0.60) 100%), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')`,
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        ref={leftRef}
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12 backdrop-blur-sm bg-slate-950/50 border-r border-slate-700/50 shadow-2xl"
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl">S</div>
            <span className="text-white font-extrabold text-lg">NextGen College</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-4">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              Sanskriti Family
            </span>
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Create your student portal account today and unlock access to admissions, learning resources, results and much more.
          </p>
        </div>

        {/* Benefits */}
        <div className="relative z-10 space-y-4">
          {[
            ["🚀", "Quick Admission",       "Apply for courses in minutes"],
            ["📚", "Learning Resources",    "Access study materials anytime"],
            ["📊", "Track Your Progress",   "Monitor results & attendance"],
            ["🎓", "Digital Certificates",  "Download documents instantly"],
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

        <p className="relative z-10 text-gray-500 text-xs italic">
          "The beautiful thing about learning is that no one can take it away from you." — B.B. King
        </p>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div ref={cardRef} className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-xl">S</div>
            <span className="text-white font-extrabold text-base">NextGen College</span>
          </div>

          <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-7 md:p-9 shadow-2xl">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Create Account 🎓</h1>
              <p className="text-gray-400 text-sm">Join thousands of students at NextGen College</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-slate-800 border border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email" name="email" required value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Password *</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"} name="password" required value={form.password} onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="w-full bg-slate-800 border border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm outline-none transition"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-lg transition">
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3,4].map((n) => (
                        <div key={n} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength >= n ? strengthColor[strength] : "bg-slate-700"}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-bold ${strength <= 1 ? "text-red-400" : strength === 2 ? "text-amber-400" : strength === 3 ? "text-yellow-400" : "text-emerald-400"}`}>
                      {strengthLabel[strength]}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1.5 uppercase tracking-wider">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"} name="confirmPassword" required value={form.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`w-full bg-slate-800 border text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm outline-none transition
                      ${form.confirmPassword && form.password !== form.confirmPassword
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"}`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-lg transition">
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Passwords do not match</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:opacity-70 text-white font-black py-3.5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-100 transition-all text-base flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Creating Account…</>
                ) : <>✨ Create My Account</>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 font-bold hover:underline">Sign In →</Link>
            </p>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            By signing up, you agree to our{" "}
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Terms of Service</span> &{" "}
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
