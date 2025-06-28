import React from 'react';
import { whatOurUsersSay } from '../call-to-action/Content';
import { WhatOurUsersSay } from '../call-to-action/Cards';

const TestimonialsSection = () => {
  return (
    <section className="bg-[#1F2937] w-full px-6 py-12 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 bg-[radial-gradient(ellipse_at_top_right,_rgba(192,132,252,0.1),_transparent_80%)]" aria-label="Testimonials Section">
      <div className="flex flex-col gap-4 container mx-auto items-center justify-center">
      <h2 className="block mt-[32px] text-white text-center font-bold text-3xl lg:text-5xl">
        {whatOurUsersSay.title.textOne} {whatOurUsersSay.title.textTwo}
      </h2>
      <p className="text-[#71717A] font-normal text-center text-base lg:text-xl">
        {whatOurUsersSay.subtitle}
      </p>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 items-stretch max-w-5xl justify-center mt-6">
        {whatOurUsersSay.cards.map((content, i) => (
          <WhatOurUsersSay {...content} key={`testimonial-${content.name}`} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 