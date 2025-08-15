import React from 'react';
import { whatOurUsersSay } from '../call-to-action/Content';
import { WhatOurUsersSay } from '../call-to-action/Cards';

const TestimonialsSection = ({ selectedRole }) => {
  const studentTestimonials = {
    title: {
      textOne: "What Our Students",
      textTwo: "Say",
    },
    subtitle: "Hear from students about their learning experience with AURORA",
    cards: [
      {
        name: "Sarah K.",
        tag: "Business Professional",
        content: '"AURORA connected me with an amazing Spanish teacher. Paying with Scrolls was so secure and convenient, and the personalized lessons have dramatically improved my business Spanish."',
      },
      {
        name: "Miguel R.",
        tag: "Student",
        content: '"I love how easy it is to find and safely pay teachers on this platform. The Scrolls crypto payments make it simple to book classes with teachers from different countries."',
      },
      {
        name: "Emma L.",
        tag: "Language Learner",
        content: '"The personalized approach and certified teachers make learning so much more effective. I\'ve made incredible progress in just a few months!"',
      },
    ]
  };

  const teacherTestimonials = {
    title: {
      textOne: "What Our Teachers",
      textTwo: "Say",
    },
    subtitle: "Hear from teachers about their earning experience with AURORA",
    cards: [
      {
        name: "Aisha T.",
        tag: "Arabic Teacher",
        content: '"Teaching on AURORA has been amazing! I earn extra money teaching Arabic and get paid instantly in Scrolls cryptocurrency. No more waiting for international transfers!"',
      },
      {
        name: "Carlos M.",
        tag: "Spanish Teacher",
        content: '"I\'ve been teaching Spanish for 2 years on AURORA and now earn $800+ monthly. The platform is secure and the student base is growing rapidly."',
      },
      {
        name: "Yuki S.",
        tag: "Japanese Teacher",
        content: '"The flexible schedule and instant payments are perfect for my lifestyle. I can teach when I want and get paid immediately. Highly recommend!"',
      },
    ]
  };

  const defaultTestimonials = whatOurUsersSay;

  const currentTestimonials = selectedRole === 'student' ? studentTestimonials : 
                             selectedRole === 'teacher' ? teacherTestimonials : 
                             defaultTestimonials;

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
        {currentTestimonials.title.textOne} {currentTestimonials.title.textTwo}
      </h2>
      <p className="text-[#71717A] font-normal text-center text-base lg:text-xl">
        {currentTestimonials.subtitle}
      </p>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 items-stretch max-w-5xl justify-center mt-6">
        {currentTestimonials.cards.map((content, i) => (
          <WhatOurUsersSay {...content} key={`testimonial-${content.name}`} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 