import HeroSection from '../hero-section';
import SkillSection from '../skill-section';
import CoursesSection from '../courses-section';
import WhyChooseAurora from '../why-choose-aurora';
import TestimonialsSection from '../testimonials-section';
import CTASection from '../cta-section';

const CallToActionPage = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <HeroSection />
      <WhyChooseAurora />
      <CoursesSection />
      {/* <SkillSection /> */} 
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default CallToActionPage;
