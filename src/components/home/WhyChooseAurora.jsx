import React from 'react';
import { BookOpen, BrainIcon, Globe, GraduationCap, MessageCircle, Users } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:bg-gray-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer group">
      <div className='h-12 w-12 text-[#00B8D4]'>
        {icon}
      </div>
      <h3 className="text-white font-medium text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
      <p className="text-[#71717A] text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const WhyChooseAurora = () => {
  const features = [
    {
      icon: <BrainIcon className="w-full h-full" />,
      title: "AI-Powered Learning",
      description: "Our AI technology personalizes your language learning journey for maximum efficiency and results."
    },
    {
      icon: <Globe className="w-full h-full" />,
      title: "Web3 Integration",
      description: "Earn rewards and certificates on blockchain as you progress through your language learning journey."
    },
    {
      icon: <Users className="w-full h-full" />,
      title: "Community Learning",
      description: "Connect with other learners and native speakers to practice and improve your language skills."
    },
    {
      icon: <GraduationCap className="w-full h-full" />,
      title: "Certified Progress",
      description: "Track your advancement with recognized certifications that validate your language proficiency."
    },
    {
      icon: <MessageCircle className="w-full h-full" />,
      title: "Interactive Conversations",
      description: "Practice real-world conversation scenarios with our advanced AI chatbot technology."
    },
    {
      icon: <BookOpen className="w-full h-full" />,
      title: "Comprehensive Resources",
      description: "Access a vast library of learning materials, exercises, and tools to enhance your language skills."
    }
  ];

  return (
    <section className="py-16 bg-[#374151] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="flex flex-col items-center text-5xl font-bold leading-[48px]">
            <span>Why Choose</span>
            <span>AURORA?</span>
          </h2>
          <p className="text-[#D1D5DB] text-[20px] font-normal leading-[32.5px] mt-2 opacity-80">Our AI-powered platform offers unique advantages for language learners.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAurora; 

