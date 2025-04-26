import { Quote } from "lucide-react";

/* eslint-disable react/prop-types */
export function SkillCards({ icons, tag, content }) {
  return (
    <div className="bg-white rounded-[8px] w-full lg:w-[238px] h-[172px] p-4 flex-col flex shadow-sm items-center justify-center">
      {icons}

      <strong className="font-bold  text-[#09090B] text-lg">{tag}</strong>
      <p className="text-center  w-full flex flex-col font-normal text-lg lg:text-sm">
        {content}
      </p>
    </div>
  );
}

export function CoursesCard({ icons, tag, content }) {
  return (
    <div className="flex-col flex w-full lg:w-[434px] h-[148px] p-[24px] bg-[#FFFFFF] rounded-[8px] border-none">
      <div className="flex flex-row gap-4">
        {icons}
        <div className=" flex flex-col ">
          <p className="text-[#09090B] font-bold text-xl lg:text-base ">
            {tag}
          </p>
          <p className="text-[#71717A] font-normal text-lg lg:text-sm ">
            {content}
          </p>
        </div>
      </div>
      <button className="bg-[#00B8D4] text-[#FAFAFA] font-medium text-sm rounded-[6px] border-none ">
        Start Learning
      </button>
    </div>
  );
}

export function WhyChooseAuruora({ icons, tag, content }) {
  return (
    <div className="bg-[#1F2937] rounded-xl p-6 flex flex-col items-center text-center hover:bg-[#111827] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 group border border-transparent hover:border-[#00B8D4] cursor-default h-[220px]">
      <div className="h-12 w-12 text-[#00B8D4] group-hover:text-white transition-colors duration-300">
        {icons}
      </div>
      <strong className="text-white font-medium text-lg mb-2 group-hover:text-[#00B8D4] transition-colors duration-300">
        {tag}
      </strong>
      <p className="text-[#71717A] group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
        {content}
      </p>
    </div>
  );
}

export function CTACard({ children, styles }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        styles ?? "w-[320px] bg-[#1F2937]rounded-[8px] p-[24px] h-[220px]"
      } `}
    >
      {children}
    </div>
  );
}

export function WhatOurUsersSay({ name, tag, content }) {
  return (
    <div className="flex-col flex w-full lg:w-[320px] h-[228px] py-[24px] p-[24px] bg-[#FFFFFF] rounded-[8px] border-none">
      <div className="flex flex-row gap-4 w-full">
        <div className="w-[40px] h-[40px] rounded-full bg-[#00B8D41A]/10 flex items-center justify-center">
          <Quote className="text-[#00B8D4]" />
        </div>
        <div className=" flex flex-col w-full">
          <p className="text-[#111827] font-semibold text-base ">{name}</p>
          <p className="text-[#71717A] font-normal text-sm ">{tag}</p>
        </div>
      </div>
      <p className=" text-[#4B5563] font-normal text-base w-full  ">
        {content}
      </p>
    </div>
  );
}
