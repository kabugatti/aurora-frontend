import CTAHeroButton from '../../ui/buttons/CTAHeroButton';
import { heroContent } from '../call-to-action/Content';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ selectedRole, onRoleChange }) => {
  const navigate = useNavigate();
  console.log('HeroSection render - selectedRole:', selectedRole, 'type:', typeof selectedRole);

  const studentContent = {
    title: "Learn Languages with Expert Teachers",
    subtitle: "Connect with qualified teachers worldwide and pay securely with Scrolls cryptocurrency. Get personalized, one-on-one instruction in any language.",
    cta: "Find Your Perfect Teacher",
    benefits: [
      "Safe & secure payments with Scrolls crypto",
      "Personalized learning experience",
      "Certified teachers from around the world",
      "Flexible scheduling"
    ]
  };

  const teacherContent = {
    title: "Earn Extra Money Teaching Your Language",
    subtitle: "Join our platform and start earning immediately with secure Scrolls cryptocurrency payments. Share your native language skills and help students worldwide.",
    cta: "Start Teaching Today",
    benefits: [
      "Get paid instantly in Scrolls crypto",
      "Set your own rates and schedule",
      "No traditional banking fees",
      "Global student base"
    ]
  };

  const handleStudentClick = () => {
    console.log('Student button clicked');
    if (onRoleChange && typeof onRoleChange === 'function') {
      onRoleChange('student');
      console.log('Student role set');
    } else {
      console.error('onRoleChange is not a function:', onRoleChange);
    }
  };

  const handleTeacherClick = () => {
    console.log('Teacher button clicked');
    navigate('/teacher-signup');
  };

  return (
    <>
      {/* Hero Section with Role Selection */}
      <section className="relative w-full bg-[#030712] px-6 py-12 overflow-hidden" aria-label="Hero Section">
        <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-evenly items-center text-white text-4xl font-light select-none opacity-5 whitespace-pre leading-[6rem]">
          <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
          <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
          <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
          <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-8">
          <h2 className="flex flex-col gap-2 text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span>Are you a student or</span>
            <span>a teacher?</span>
          </h2>
          <p className="font-normal mt-3 text-[#D1D5DB] text-lg lg:text-base lg:max-w-[600px]">
            Choose your role to get started with AURORA's innovative language learning platform
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 w-full max-w-6xl">
            <button
              onClick={handleStudentClick}
              className={`flex-1 font-semibold py-8 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl ${
                selectedRole === 'student' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                  : 'bg-gray-800 text-[#D1D5DB] hover:bg-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎓</div>
                <div className="text-2xl font-bold mb-2">I'm a Student</div>
                <div className="text-lg opacity-90">Find expert teachers</div>
              </div>
            </button>
            
            <button
              onClick={handleTeacherClick}
              className={`flex-1 font-semibold py-8 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl ${
                selectedRole === 'teacher' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                  : 'bg-gray-800 text-[#D1D5DB] hover:bg-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">💰💸💵🪙</div>
                <div className="text-2xl font-bold mb-2">I'm a Teacher</div>
                <div className="text-lg opacity-90">Earn extra money</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Scrollable Content Below Hero */}
      {selectedRole === 'student' && (
        <section className="relative w-full bg-[#030712] px-6 py-12 overflow-hidden" aria-label="Student Content">
          <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-evenly items-center text-white text-4xl font-light select-none opacity-5 whitespace-pre leading-[6rem]">
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-8">
            <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {studentContent.title}
            </h2>
            
            <p className="font-normal mt-3 text-[#D1D5DB] text-lg lg:text-base lg:max-w-[600px]">
              {studentContent.subtitle}
            </p>
            
            {/* Benefits List */}
            <div className="mt-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studentContent.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#D1D5DB] text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <CTAHeroButton variant="primary">
                {studentContent.cta}
              </CTAHeroButton>
              <CTAHeroButton variant="outline">
                Learn More
              </CTAHeroButton>
            </div>
          </div>
        </section>
      )}

      {!selectedRole && (
        <section className="relative w-full bg-[#030712] px-6 py-12 overflow-hidden" aria-label="Default Content">
          <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-evenly items-center text-white text-4xl font-light select-none opacity-5 whitespace-pre leading-[6rem]">
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
            <p className="opacity-[0.15]">AURORA        AURORA        AURORA        AURORA        AURORA        AURORA</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-8">
            <h2 className="flex flex-col gap-2 text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span>{heroContent.title.textOne}</span>
              <span>{heroContent.title.textTwo}</span>
            </h2>
            <p className="font-normal mt-3 text-[#D1D5DB] text-lg lg:text-base lg:max-w-[600px]">
              {heroContent.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-5">
              <CTAHeroButton variant="primary">
                {heroContent.buttons[0].text}
              </CTAHeroButton>
              <CTAHeroButton variant="outline">
                {heroContent.buttons[1].text}
              </CTAHeroButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
