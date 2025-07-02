import React from 'react';
import { whatOurUsersSay } from '../call-to-action/Content';
import { WhatOurUsersSay } from '../call-to-action/Cards';

const TestimonialsSection = () => {
  return (
   <section
  className="relative w-full px-6 py-12 bg-[#030712] overflow-hidden"
  aria-label="Testimonials Section"
>
  <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#030712] via-[#111827] to-black"></div>

  {/* Reflejos morado y cyan sutiles */}
  <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_rgba(168,85,247,0.15),_transparent_70%)]"></div>
  <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,211,238,0.15),_transparent_70%)]"></div>

      <div className="relative z-10 flex flex-col gap-4 container mx-auto items-center justify-center">
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