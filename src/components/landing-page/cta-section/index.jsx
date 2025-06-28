import React from 'react';
import { callToAction } from '../call-to-action/Content';
//import CTAHeroButton from '@/components/ui/buttons/CTAHeroButton';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-[#030712]" aria-label="Call to Action Section">
      <div className="flex flex-col gap-4 container mx-auto items-center justify-center py-24">
      <h2 className="text-white text-center justify-center font-bold text-4xl lg:text-5xl">
        {callToAction.title.textOne} {callToAction.title.textTwo}
      </h2>
      <p className="text-[#71717A] font-normal text-base lg:text-xl text-center">
        {callToAction.subtitle}
      </p>
      <div className="mt-6 flex justify-center">
      <Link
        to="/waitlist"
        className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold text-base px-6 py-3 rounded-lg shadow-md transition-all duration-300">
        Join Our Waitlist
      </Link>
      </div>
      </div>
    </section>
  );
};

export default CTASection; 