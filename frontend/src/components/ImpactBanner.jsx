import React from "react";

const ImpactBanner = () => {
  const stats = [
    {
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      ),
      count: "30000+",
      label: "LEARNERS BASE",
      color: "text-cyan-400",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      count: "20000+",
      label: "HAPPY PARENTS",
      color: "text-amber-400",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
      ),
      count: "6000+",
      label: "ALUMNI BASE",
      color: "text-orange-400",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
        </svg>
      ),
      count: "28+",
      label: "YEARS LEGACY",
      color: "text-sky-400",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z" />
        </svg>
      ),
      count: "250+",
      label: "EDUCATORS",
      color: "text-amber-500",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      ),
      count: "50+",
      label: "RESEARCH LABS",
      color: "text-emerald-400",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
        </svg>
      ),
      count: "100+",
      label: "EXCELLENCE AWARDS",
      color: "text-yellow-400",
    },
  ];

  // Duplicate items 3 times for seamless infinite left-to-right ticker loop
  const tickerItems = [...stats, ...stats, ...stats];

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border-t border-white/15 py-3 shadow-2xl relative overflow-hidden">
      {/* CONTINUOUS LEFT-TO-RIGHT MARQUEE TICKER OVERLAY */}
      <div className="w-full overflow-hidden relative">
        {/* Soft edge blur overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-l2r flex items-center space-x-8 whitespace-nowrap px-4 cursor-pointer">
          {tickerItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-black/50 border border-white/15 px-4 py-2 rounded-xl transition hover:scale-105 hover:bg-black/70 shadow-lg backdrop-blur-sm"
            >
              <div className="shrink-0">{item.icon}</div>
              <div className="flex flex-col text-left">
                <span className={`text-lg font-extrabold tracking-tight ${item.color}`}>
                  {item.count}
                </span>
                <span className="text-[10px] font-bold text-gray-200 tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;
