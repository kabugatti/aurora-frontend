import React from 'react';
import { skillContent } from '../call-to-action/Content';
import { SkillCards } from '../call-to-action/Cards';

const SkillSection = () => {
  return (
    <section className="w-full bg-[#1F2937] px-6 py-12">
      <div className="flex flex-col gap-4 max-w-[1024px] mx-auto items-center justify-center">
      <p className="font-bold mt-[32px] text-3xl lg:text-5xl text-white text-center">
        {skillContent.title}
      </p>
      <p className="text-center font-normal text-[#D1D5DB] text-base lg:text-xl">
        {skillContent.subtitle}
      </p>
      <div className="py-[24px] gap-[24px] lg:grid-cols-4 grid md:grid-cols-2 items-center justify-center">
        {skillContent.cards.map((values, i) => (
          <SkillCards {...values} key={i} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default SkillSection; 