import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".blogBox",
      {
        opacity: "0",
        scale: 0.1,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.2,
        stagger: { amount: 1 },

        scrollTrigger: ".blogBox",
      }
    );
  }, []);

  const data = [
    {
      title: "How To Ensure Effective Result In Haematology Analyzers?",
      desc: "How to Ensure  Effective Result in Haematology Analyzers In this article, you will be learning to use Hematology...",
      date: "by admin | Jul 6, 2023",
    },

    {
      title:
        "Basics of 3 part Hematology Analyzer – Every Laboratarians should know",
      desc: "What is a 3-part differential hematology analyzer 3-part differential hematology analyzer  which analyzes the complete...",
      date: "by Mohana Priya | Feb 13, 2023",
    },
    {
      title: "Microalbuminuria",
      desc: "The urinary excretion of albumin greater than or equal to 30mg/day is defined as  Microalbuminuria. In a healthy...",
      date: "by Priyadharshini C | Feb 2, 2023",
    },
  ];
  return (
    <div className=" px-2  ">
      <div className=" flex justify-center  tablet:px-10 tablet:mb-4">
        <p className="text-center laptop:mb-2 largeLaptop:mb-6 largeLaptop:text-4xl text-[#00A786] tablet:text-3xl text-lg font-poppins font-bold ">
          Blog Snippets
        </p>

      </div>
      <p className="flex justify-center items-center tablet:text-lg largeLaptop:text-lg font-poppins mt-2 tablet:px-10 tablet:mb-5 laptop:mb-10">
        We use only the best quality materials on the market in order to provide
        the best products to our patients.
      </p>
      <div className="mt-0 p-1 tablet:mx-10 tablet:my-4 grid tablet:grid-cols-2  laptop:grid-cols-3 gap-4  tablet:gap-4 grid-cols-1 place-items-center my-2  tablet:mb-4 ">
        {data.map((datas, index) => (
          <div
            key={index}
            className="h-auto p-3  border-1 border-custom-green w-full rounded-lg tablet:h-auto  "
          >
            <div className="tablet:h-52 largeLaptop:h-48">
              <p className="text-lg largeLaptop:text-xl font-semibold tablet:mb-2">
                {datas.title}
              </p>
              <p className="text-xs tablet:text-base largeLaptop:text-sm font-medium mt-2">
                {datas.date}
              </p>
              <p className="text-xs tablet:text-sm largeLaptop:text-[16px] mt-4">
                {datas.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

      <div className="flex justify-center mt-4">
        <Link to="blog/">
          <p className="  bg-maincol w-fit tablet:py-3  tablet:w-fit h-fit text-center text-white tablet:text-lg largeLaptop:text-xl rounded-lg text-xs tablet:text-md tablet:font-semibold font-poppins p-2">
            View All
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
