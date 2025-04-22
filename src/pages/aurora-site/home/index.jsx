import React from "react";

import AuroraIcon from "@/assets/Aurora_word.jpg";
import CallToActionPage from "@/components/landing-page/call-to-action/CallToAction";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <img
                src={AuroraIcon}
                alt="Aurora Icon"
                className="w-36 h-20 object-contain"
              />
              <span className="text-xl font-semibold text-gray-900"></span>
            </div>
          </div>
        </div>
      </nav>

      <CallToActionPage />
    </div>
  );
};

export default HomePage;
