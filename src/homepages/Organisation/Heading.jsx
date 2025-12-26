import gsap from "gsap";
import React, { useEffect } from "react";
import AOS from "aos";
import sachika from "../../images/organisation/sachikaNew.png";

function Heading() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center mt-6 mb-4 
     gap-4"
    >
      {/* <p className="text-lg tablet:text-3xl largeLaptop:text-4xl text-[#00A786] font-semibold title1 uppercase">
        Sachika
      </p> */}
      <div className="">
        <img
          src={sachika}
          alt="Sachika logo – institute for biomedical and healthcare technology training"
          className="w-[280px] tablet:w-[320px]  object-contain rounded-lg"
        />
      </div>
      {/* <p
        className="font-poppins text-sm tablet:text-xl max-w-xl text-center title2 largeLaptop:text-3xl
      largeLaptop:max-w-3xl"
      >
        Explore our network of affiliated companies that enhance healthcare
        globally.
      </p> */}
    </div>
  );
}

export default Heading;
