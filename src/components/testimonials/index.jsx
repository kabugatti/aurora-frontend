import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah K.",
      title: "Business Professional",
      quote: "AURORA has transformed my business English skills. The AI feedback helped me improve my presentations and emails dramatically."
    },
    {
      id: 2,
      name: "Miguel R.",
      title: "Student",
      quote: "I love how the platform adapts to my learning style. The interactive conversations with the AI feel so natural and have helped me gain confidence."
    },
    {
      id: 3,
      name: "Aisha T.",
      title: "Language Enthusiast",
      quote: "The Web3 integration is brilliant! I love earning certificates that are verifiable on the blockchain as I complete my courses."
    }
  ];

  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Set up event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const nextIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(testimonials.length - 1, currentIndex + 1);
      
      setCurrentIndex(nextIndex);
      
      if (isMobile) {
        const cardWidth = scrollContainerRef.current.querySelector('.testimonial-card').offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (cardWidth + 16), 
          behavior: 'smooth'
        });
      }
    }
  };

  
  const fullWidthStyle = {
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    width: '100vw',
    backgroundColor: '#111827',
    padding: '4rem 0',
  };

  return (
    
    <section style={{ ...fullWidthStyle, overflow: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">What Our Users Say</h2>
        <p className="text-gray-400 text-lg">
        Hear from language learners who have transformed their skills with AURORA
        </p>
      </div>
      
      {/* Testimonials Container with Mobile Carousel */}
      <div className="relative">
        {/* Navigation Buttons - Always visible on mobile, hidden on desktop unless hovered */}
        {(isMobile || testimonials.length > 3) && (
        <>
          <button 
          onClick={() => scroll('left')}
          disabled={currentIndex === 0}
          className={`absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 
            bg-white p-2 rounded-full text-gray-800 hover:bg-gray-100 transition shadow-md
            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            md:hidden`}
          aria-label="Previous testimonial"
          >
          <ChevronLeft size={24} />
          </button>
          
          <button 
          onClick={() => scroll('right')}
          disabled={currentIndex === testimonials.length - 1}
          className={`absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 
            bg-white p-2 rounded-full text-gray-800 hover:bg-gray-100 transition shadow-md
            ${currentIndex === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            md:hidden`}
          aria-label="Next testimonial"
          >
          <ChevronRight size={24} />
          </button>
        </>
        )}
        
        {/* Testimonials */}
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 
              md:grid md:grid-cols-3 md:gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          {/* Mobile Pagination Indicators */}
          {isMobile && (
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (scrollContainerRef.current) {
                      const cardWidth = scrollContainerRef.current.querySelector('.testimonial-card').offsetWidth;
                      scrollContainerRef.current.scrollTo({
                        left: index * (cardWidth + 16),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card bg-white rounded-lg p-6 shadow-lg flex-shrink-0 w-full max-w-xs mx-auto md:mx-0 md:max-w-none snap-center">
      
      <div className="flex items-center mb-4">
        
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: '#06B6D4' }}>
          <span className="text-white text-2xl" style={{ fontWeight: 700 }}>"</span>
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </div>
      
      
      <p className="text-gray-800 text-lg leading-relaxed">
        "{testimonial.quote}"
      </p>
    </div>
  );
};

export default TestimonialsSection;