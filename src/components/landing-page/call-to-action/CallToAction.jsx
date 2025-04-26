import { useState } from "react";
import {
  CoursesCard,
  SkillCards,
  WhatOurUsersSay,
  WhyChooseAuruora,
} from "./Cards";
import {
  courses,
  skillContent,
  whatOurUsersSay,
  whyChooseAuruora,
} from "./Content";
import "./responsive.css";

function CallToActionPage() {
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  return (
    <div className="flex w-full h-full flex-col ">
      <div className="w-full flex-col justify-center gap-4 flex h-[582px] bg-[#030712] p-[3%]">
        <p className="text-white font-bold text-4xl  lg:text-6xl  lg:max-w-[700px]">
          Learn Languages with AI-Powered Assistance
        </p>
        <p className="font-normal mt-3 text-[#D1D5DB] text-base md:text-lg lg:text-base max-w-full text-left lg:max-w-[600px]">
          AURORA.LA is an innovative AI-powered language learning platform that
          combines personalized tutoring, blockchain technology, and advanced
          language processing to create an engaging and effective learning
          experience.
        </p>
        <div className="w-full mt-5 flex flex-row gap-0">
          <a href="/signup" className="cta-button bg-[#34D399] text-[#111827] hover:bg-[#2dcb8e]">
            Get Started
          </a>
          <a href="/courses" className="cta-button bg-white text-[#22D3EE] border-[#22D3EE] border-[1px] hover:bg-[#f8f8f8]">
            Learn More
          </a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-full bg-[#1F2937] min-h-[500px] py-12 md:py-16 lg:h-[660px] flex flex-col gap-6 md:gap-4 px-5 md:p-[3%] items-center justify-center">
        <p className="w-full md:w-auto lg:w-[623px] font-bold mt-0 md:mt-[32px] text-2xl md:text-3xl lg:text-5xl text-white text-center">
          Improve Your Language Skills
        </p>
        <p className="text-center font-normal text-[#D1D5DB] text-base md:text-lg lg:text-xl max-w-[90%] md:max-w-[80%] lg:max-w-none">
          Practice your English language skills with our AI-powered learning
          platform
        </p>
        <div className="w-full max-w-[300px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] py-6 md:py-[48px] gap-6 md:gap-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-items-center">
          {skillContent.map((values, i) => {
            return <SkillCards {...values} key={`skill-${values.tag}-${i}`} />;
          })}
        </div>
      </div>

      {/* Courses Section */}
      <div className="min-h-[500px] md:min-h-[550px] lg:h-[595px] w-full items-center justify-center px-5 py-12 md:p-[3%] gap-6 md:gap-4 flex-col flex bg-[#111827]">
        <p className="text-white mt-0 md:mt-[32px] text-2xl md:text-3xl lg:text-5xl font-bold text-center">
          Explore Our Courses
        </p>
        <p className="text-[#D1D5DB] font-normal text-center text-base md:text-lg lg:text-xl max-w-[90%] md:max-w-none">
          Find the perfect course to match your learning goals
        </p>
        <div className="h-auto w-full gap-[32px] items-center justify-center flex flex-col">
          <div className="flex space-x-2 md:space-x-4 w-full md:w-fit p-2 items-center rounded-[8px] justify-center bg-gray-700">
            {Object.keys(courses).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-2 py-1 rounded text-sm md:text-base ${
                  selectedLevel === level
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="lg:flex-wrap grid md:grid-cols-2  lg:flex gap-4 items-center justify-center w-full">
            {courses[selectedLevel].map((contents, i) => {
              return <CoursesCard key={i} {...contents} />;
            })}
          </div>
        </div>
      </div>

      {/* Why Choose AURORA Section */}
      <div className="flex flex-col items-center justify-center w-full px-5 py-12 md:p-[3%] gap-6 md:gap-4 bg-[#374151] min-h-[600px] md:min-h-[700px] lg:h-[912px]">
        <p className="w-full md:w-[496px] text-2xl md:text-3xl lg:text-5xl mt-0 md:mt-[32px] font-bold text-white text-center">
          Why Choose AURORA?
        </p>
        <p className="text-center font-normal text-[#D1D5DB] text-base md:text-lg lg:text-xl max-w-[90%] md:max-w-none">
          Our AI-powered platform offers unique advantages for language learners
        </p>
        <div className="gap-6 md:gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mx-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[740px] lg:max-w-[1024px]">
          {whyChooseAuruora.map((content, i) => {
            return <WhyChooseAuruora key={`why-${content.tag}-${i}`} {...content} />;
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#1F2937] w-full min-h-[550px] md:min-h-[600px] lg:h-[608px] items-center gap-6 md:gap-4 py-12 md:py-[5%] px-5 md:px-[2%] lg:p-[3%] flex flex-col justify-center">
        <p className="w-full lg:w-[426px] mt-0 md:mt-[32px] text-white text-center font-bold text-2xl md:text-3xl lg:text-5xl">
          What Our Users Say
        </p>
        <p className="text-[#D1D5DB] font-normal text-center text-base md:text-lg lg:text-xl max-w-[90%] md:max-w-none">
          Hear from language learners who have transformed their skills with
          AURORA
        </p>
        <div className="gap-6 md:gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mx-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[740px] lg:max-w-[1024px]">
          {whatOurUsersSay.map((content, i) => {
            return <WhatOurUsersSay key={`testimonial-${content.name}-${i}`} {...content} />;
          })}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-[#030712] min-h-[350px] md:h-[400px] lg:h-[452px] w-full items-center gap-6 md:gap-4 justify-center flex flex-col px-5 py-12 md:p-[3%]">
        <p className="w-full lg:w-[956px] text-white text-center justify-center font-bold text-2xl md:text-4xl lg:text-5xl">
          Start Your Language Learning Journey Today
        </p>
        <p className="text-[#D1D5DB] font-normal text-base md:text-lg lg:text-xl text-center max-w-[90%] md:max-w-none">
          Join thousands of learners who are transforming their language skills
          with AURORA
        </p>
        <div className="flex flex-row gap-0 justify-center items-center">
          <a href="/signup" className="cta-button bg-[#34D399] text-[#111827] hover:bg-[#2dcb8e]">
            Signup Free
          </a>
          <a href="/courses" className="cta-button bg-white text-[#22D3EE] border-[#22D3EE] border-[1px] hover:bg-[#f8f8f8]">
            Explore Courses
          </a>
        </div>
      </div>
    </div>
  );
}

export default CallToActionPage;
