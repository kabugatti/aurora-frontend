import React from 'react';
import { callToAction } from '../call-to-action/Content';
import { Link } from 'react-router-dom';

const CTASection = ({ selectedRole }) => {
  const studentCTA = {
    title: {
      textOne: "Start Your Language Learning Journey",
      textTwo: "Today",
    },
    subtitle: "Join thousands of students who are connecting with expert teachers and paying safely with Scrolls crypto on AURORA.",
    buttonText: "Find Your Teacher",
    buttonLink: "/teacher-directory"
  };

  const teacherCTA = {
    title: {
      textOne: "Start Earning Money Teaching",
      textTwo: "Today",
    },
    subtitle: "Join our growing community of teachers who are earning extra income with secure Scrolls cryptocurrency payments.",
    buttonText: "Become a Teacher",
    buttonLink: "/register"
  };

  const defaultCTA = {
    title: callToAction.title,
    subtitle: callToAction.subtitle,
    buttonText: "Join Our Waitlist",
    buttonLink: "/waitlist"
  };

  const currentCTA = selectedRole === 'student' ? studentCTA : 
                    selectedRole === 'teacher' ? teacherCTA : 
                    defaultCTA;

  return (
    <section className="bg-[#030712] relative overflow-hidden" aria-label="Call to Action Section">
      
      {/* Marca de agua de fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-evenly items-center text-white text-4xl font-light select-none opacity-5 whitespace-pre leading-[6rem]">
        <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA</p>
        <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA</p>
        <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA</p>
        <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA</p>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col gap-4 container mx-auto items-center justify-center py-24">
        <h2 className="text-white text-center font-bold text-4xl lg:text-5xl">
          {currentCTA.title.textOne} {currentCTA.title.textTwo}
        </h2>
        <p className="text-[#71717A] font-normal text-base lg:text-xl text-center">
          {currentCTA.subtitle}
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to={currentCTA.buttonLink}
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold text-base px-6 py-3 rounded-lg shadow-md transition-all duration-300">
            {currentCTA.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
