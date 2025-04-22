import React from "react";
import { ArrowRight, Brain, MessageSquare, Award } from "lucide-react";
import { NavLink } from "react-router-dom";
import AuroraIcon from "@/assets/Aurora_word.jpg";
import CallToActionPage from "@/components/landing-page/call-to-action/CallToAction";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CallToActionPage />
    </div>
  );
};

export default HomePage;
