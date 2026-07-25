import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NamastePreloader from "../components/NamastePreloader";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Only show preloader if user hasn't seen it in this session
    return !sessionStorage.getItem("hasSeenIntro");
  });
  const [preloaderKey, setPreloaderKey] = useState(0);

  const handleFinishPreloader = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowPreloader(false);
  };

  const handleReplayIntro = () => {
    setShowPreloader(true);
    setPreloaderKey((prev) => prev + 1);
  };

  return (
    <>
      {showPreloader && (
        <NamastePreloader
          key={preloaderKey}
          onFinish={handleFinishPreloader}
        />
      )}
      <Navbar onReplayIntro={handleReplayIntro} />
      <div className="pt-16 flex-1 flex flex-col min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
