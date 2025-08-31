import React from "react";
import { whyChooseAuruora } from "../call-to-action/Content";
import { WhyChooseAuruora as FeatureCard } from "../call-to-action/Cards";

const WhyChooseAurora = ({ selectedRole }) => {
  const studentContent = {
    title: "Why Choose",
    subtitle: "AURORA?",
    content: "Our platform offers unique advantages for students learning languages",
    cards: [
      {
        icons: <span className="text-2xl">👨‍🏫</span>,
        tag: "Expert Teachers",
        content: "Connect with certified language teachers from around the world who specialize in your target language.",
      },
      {
        icons: <span className="text-2xl">🔒</span>,
        tag: "Safe Payments",
        content: "Pay for classes securely with Scrolls cryptocurrency. Safe, instant transactions with no traditional banking fees.",
      },
      {
        icons: <span className="text-2xl">🎯</span>,
        tag: "Personalized Learning",
        content: "Get customized lessons tailored to your learning style, goals, and current proficiency level.",
      },
      {
        icons: <span className="text-2xl">🌍</span>,
        tag: "Global Community",
        content: "Connect with other learners and native speakers to practice and improve your language skills.",
      },
      {
        icons: <span className="text-2xl">📜</span>,
        tag: "Certified Progress",
        content: "Track your advancement with recognized certifications that validate your language proficiency.",
      },
      {
        icons: <span className="text-2xl">💬</span>,
        tag: "Interactive Practice",
        content: "Practice real-world conversation scenarios with our advanced AI chatbot technology.",
      },
    ],
  };

  const teacherContent = {
    title: "Why Teach on",
    subtitle: "AURORA?",
    content: "Our platform offers unique advantages for teachers earning extra income",
    cards: [
      {
        icons: <span className="text-2xl">💰</span>,
        tag: "Instant Payments",
        content: "Get paid immediately in Scrolls cryptocurrency after each class. No waiting for international transfers!",
      },
      {
        icons: <span className="text-2xl">⚡</span>,
        tag: "Flexible Schedule",
        content: "Set your own hours and rates. Teach when it's convenient for you and earn what you're worth.",
      },
      {
        icons: <span className="text-2xl">🌐</span>,
        tag: "Global Reach",
        content: "Access students from around the world. No geographical limitations on your earning potential.",
      },
      {
        icons: <span className="text-2xl">📈</span>,
        tag: "Growing Demand",
        content: "Language learning is booming. Join a platform with increasing student demand for qualified teachers.",
      },
      {
        icons: <span className="text-2xl">🛡️</span>,
        tag: "Secure Platform",
        content: "Teach with confidence knowing all payments are secured through blockchain technology.",
      },
      {
        icons: <span className="text-2xl">🎓</span>,
        tag: "Professional Growth",
        content: "Build your teaching portfolio and gain experience with students from diverse backgrounds.",
      },
    ],
  };

  const defaultContent = whyChooseAuruora;

  const currentContent = selectedRole === 'student' ? studentContent : 
                        selectedRole === 'teacher' ? teacherContent : 
                        defaultContent;

  return (
    <section className="flex flex-col items-center justify-center w-full p-[3%] gap-4 h-auto pb-16 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 bg-[radial-gradient(ellipse_at_top_left,_rgba(6,182,212,0.07),_transparent)]" aria-label="Why Choose Aurora Section">
      <h2 className="flex flex-col text-3xl lg:text-5xl mt-[32px] font-bold text-white text-center">
        {currentContent.title} {currentContent.subtitle}
      </h2>
      <p className="text-center font-normal text-[#71717A] text-xl">
        {currentContent.content}
      </p>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-5xl w-full mt-4">
        {currentContent.cards.map((content, i) => (
          <FeatureCard key={i} {...content} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseAurora;
