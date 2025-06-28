import React from "react";
import { whyChooseAuruora } from "../call-to-action/Content";
import { WhyChooseAuruora as FeatureCard } from "../call-to-action/Cards";

const WhyChooseAurora = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full p-[3%] gap-4 h-auto pb-16 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 bg-[radial-gradient(ellipse_at_top_left,_rgba(6,182,212,0.07),_transparent)]" aria-label="Why Choose Aurora Section">
      <h2 className="flex flex-col text-3xl lg:text-5xl mt-[32px] font-bold text-white text-center">
        {whyChooseAuruora.title} {whyChooseAuruora.subtitle}
      </h2>
      <p className="text-center font-normal text-[#71717A] text-xl">
        {whyChooseAuruora.content}
      </p>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-5xl w-full mt-4">
        {whyChooseAuruora.cards.map((content, i) => (
          <FeatureCard key={i} {...content} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseAurora;
