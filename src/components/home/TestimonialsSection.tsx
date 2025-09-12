import React from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import SectionTitle from '@/components/SectionTitle';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now posses, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference in before working with Kiera to where we are now and I would highly recommend her to everyone.",
      author: "Matthew Addai",
      role: "Co-Founder and CEO",
      company: "Afrofiliate /Cashblack"
    },
    {
      quote: "We went from 3,600 restaurants to receiving 8,000 restaurant submissions in 2020… Each one takes 10–15 minutes to review. I'd still be going through them today if I hadn't trusted other people to get involved...Kiera came in, taught herself the system, trained people, and built an amazing team. It's been incredible ever since.",
      author: "Anthony Edwards Jr.",
      role: "Founder and CEO",
      company: "EatOkra, Inc."
    }
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-10 px-6 sm:py-24 sm:px-0 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-black section-title-accent center text-[32px] leading-[40px] sm:text-[48px] md:text-[64px] sm:leading-tight">
            What Others Are Saying
          </h2>
          <p className="text-xl text-jet-gray font-heading font-medium max-w-3xl mx-auto">
            Real feedback from partners…
          </p>
        </div>
        
        <div className="mt-16 overflow-hidden">
          {/* Container that shows only 2 testimonials at a time */}
          <div className="max-w-4xl mx-auto overflow-hidden relative">
            {/* Infinite scroll container */}
            <div className="flex animate-infinite-scroll gap-8 w-max">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[500px] lg:w-[600px]">
                  <div className="testimonial-enhanced">
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                      company={testimonial.company}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-accent-100 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-accent-100 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
