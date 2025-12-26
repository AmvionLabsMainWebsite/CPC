import React, { useEffect, useState } from "react";
import "./TestimonialSlider.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function TestimonialSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const data = [
    {
      name: "Mr. Venkatesh",
      title:
        "LABORATORY INCHARGE, CSIR - CENTRAL ELECTROCHEMICAL RESEARCH INSTITUTE, KARAIKUDI",
      desc: "For the past ten years, we’ve been using ichem 100 and identi chemical. We are able to provide accurate results by achieving proper internal and external QC values. Reagent stability is also excellent. The itrack service offered by CPC Diagnostics is quite useful in finding and resolving any QC-related issues quickly.",
    },
    {
      name: "Dr. Vijay Mohan",
      title: "Vijaya Medical Centre, Visakhapatnam",
      desc: "Thanks to CPC Diagnostics for all of the information, installation, and training on the Labtype HLA A, B, and DRB1 SSO Typing assay methods. The detailed explanations to the data analysis part using One Lambda software is very appreciable. We could gain good clarity on the most crucial aspects of these assays. We are happy with all the services and training provided by you.",
    },
    // {
    //   name: "Dr. Anitha Kumar",
    //   title: "Apollo Diagnostics, Chennai",
    //   desc: "The reagents and equipment from CPC Diagnostics have made our workflow much more efficient. Their after-sales service and technical support are outstanding.",
    // },
    // {
    //   name: "Dr. Ramesh Babu",
    //   title: "Medicare Labs, Hyderabad",
    //   desc: "We have been using CPC Diagnostics products for more than five years. Their commitment to innovation and quality is truly commendable.",
    // },
  ];

  // Track screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesPerView = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(data.length / slidesPerView);

  // Auto-slide with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const startIndex = activeSlide * slidesPerView;
  const visibleData = data.slice(startIndex, startIndex + slidesPerView);

  return (
    <div className="testimonial-container overflow-hidden h-auto py-10">
      {/* Header */}
      <div className="flex justify-center items-center flex-col gap-2 text-center mb-6">
        <p className="text-lg tablet:text-4xl text-[#00A786] font-semibold font-poppins">
          Testimonials
        </p>
        <p className="tablet:text-lg text-gray-900 tracking-wide w-11/12 tablet:w-full">
          Our commitment to quality and innovation shines through our customers' words.
        </p>
      </div>

      {/* Slider Section */}
      <div
        className={`grid transition-opacity duration-700 ease-in-out ${fade ? "opacity-100" : "opacity-0"
          } ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6 px-5 tablet:px-10`}
      >
        {visibleData.map((item, i) => (
          <div
            key={i}
            className="shadow-md border border-custom-green bg-white rounded-lg p-6 flex flex-col justify-between gap-4 w-full font-poppins"
          >
            <div className="flex items-start gap-2 text-[#00A786] text-xl">
              <FaQuoteLeft />
            </div>

            <p className="text-gray-700 text-sm tablet:text-base leading-relaxed">
              {item.desc}
            </p>

            <div className="flex justify-end text-[#00A786] text-xl">
              <FaQuoteRight />
            </div>

            <div className="mt-3">
              <p className="font-semibold text-lg text-black">{item.name}</p>
              <p className="text-sm text-gray-600">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center mt-6 gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${activeSlide === index
              ? "bg-maincol scale-110"
              : "bg-gray-400 hover:bg-gray-500"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialSlider;
