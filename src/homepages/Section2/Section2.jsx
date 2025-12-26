import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import world from "./images/humanitarian.webm";
import Employees from "./images/management.webm";
import Customers from "./images/loyalty.webm";
import Principles from "./images/consultation.webm";
import partners from "./images/warehouse.webm";

gsap.registerPlugin(ScrollTrigger);

function Section2() {
  const stats = [
    { end: 3, label: "Country presence", webm: world, alt: "Support icon representing healthcare assistance and social responsibility" },
    { end: 300, label: "Employees", webm: Employees, alt: "Icon showing workflow and organization for efficient operational processes." },
    { end: 1000, label: "Customers", webm: Customers, alt: "Icon symbolizing customer trust and relationships" },
    { end: 16, label: "Principals", webm: Principles, alt: "Medical consultation icon…" },
    { end: 500, label: "Channel partners", webm: partners, alt: "Inventory storage and logistics" },
  ];


  const statRefs = useRef([]);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      statRefs.current.forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: stats[index].end,
            duration: 1,
            ease: "power3.inOut",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="
    grid 
    grid-cols-1 gap-4 
    sm:grid-cols-3 
    tablet:grid-cols-5 
    justify-items-center 
    w-full 
    items-center 
    largeLaptop:h-fit
  ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 hover:scale-105 cursor-pointer duration-200 transition-all"
        >
          <div className="flex items-center flex-col justify-center ">
            <div className="flex mt-10">
              <video
                className="tablet:w-[100px] w-[100px] sm:w-[50px]"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={stat.webm} type="video/webm" />
                <source src={stat.mp4} type="video/mp4" />
              </video>

              <span
                ref={(el) => (statRefs.current[index] = el)}
                className="text-[55px] tablet:text-4xl laptop:text-5xl font-semibold mt-4  "
                style={{ fontFamily: "Poppins", color: "#00A786" }}
              >
                {window.innerWidth < 768 ? stat.end : "0"}
              </span>
              <span
                className="text-4xl tablet:text-3xl mt-4"
                style={{ fontFamily: "Poppins, sans-serif", color: "#00A786" }}
              >
                +
              </span>
            </div>
            <p
              className="text-2xl tablet:text-sm laptop:text-lg sm:font-semibold font-semibold largeLaptop:text-xl"
              style={{ fontFamily: "Poppins" }}
            >
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Section2;
