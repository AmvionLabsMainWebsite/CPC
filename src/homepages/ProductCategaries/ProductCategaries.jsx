import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import chemistry from "../ProductCategaries/GIF/chemistry.webm";
import pieChart from "../ProductCategaries/GIF/pie-chart.webm";
import medicine from "../ProductCategaries/GIF/medicine.webm";
import mask from "../ProductCategaries/GIF/surgical-mask.webm";
import microbiology from "../ProductCategaries/GIF/Clinical microbiology.webm";
import covid from "../ProductCategaries/GIF/covid 19.webm";
import electrolyte from "../ProductCategaries/GIF/electrolyte.webm";
import heamatology from "../ProductCategaries/GIF/heamatology.webm";
import care from "../ProductCategaries/GIF/Point of care.webm";
import Immunology from "../ProductCategaries/GIF/Immunology.webm";
import PreAnalytical from "../ProductCategaries/GIF/Pre-analytical-automation.webm";
import BioChemistry from "../ProductCategaries/GIF/Bio Chemistry.webm";

import "./cat.css";
import Magnetic from "../../component/magneticButton/Magnetic";
import { SectionCategory } from "../../component/Context/SectionCategory";
import { CategoryContext } from "../../component/Context/CategoryContext";

const categoryItems = [
  { name: "biochemistry-analyzer/", orgname: "Biochemistry", webm: chemistry, alt: "Symbolizing laboratory chemical analysis and diagnostic testing." },
  { name: "hematology-analyzer/", orgname: "Hematology", webm: pieChart, alt: "Pie chart icon representing data analytics, performance metrics, and statistical insights." },
  { name: "point-of-care/", orgname: "Point of Care", webm: medicine, alt: "Icon depicting pharmaceutical care, medical supplies, and treatment essentials" },
  { name: "immunoassay-analyzer/", orgname: "Immunology", webm: microbiology, alt: "Icon showing pathogen testing and laboratory microorganism analysis" },
  { name: "electrolyte-analyzer/", orgname: "Electrolyte Analyzer", webm: covid, alt: "Virus icon representing pandemic testing, safety, and diagnostic processes" },
  { name: "pre-analytical-automation/", orgname: "Pre-Analytical Automation", webm: heamatology, alt: "Icon symbolizing blood testing, CBC analysis, and laboratory diagnostics" },
];

const categoryItems2 = [
  { name: "point-of-care/", orgname: "Point of Care", webm: care, alt: "Icon representing rapid diagnostics and on-site medical testing." },
  { name: "electrolyte-analyzer/", orgname: "Electrolyte Analyzer", webm: covid },
  { name: "hematology-analyzer/'", orgname: "Hematology", webm: pieChart },
  { name: "biochemistry-analyzer/", orgname: "Biochemistry", webm: BioChemistry, alt: "Icon showing biochemical testing, analyzers, and lab diagnostic procedures" },
  { name: "pre-analytical-automation/", orgname: "Pre-Analytical Automation", webm: PreAnalytical, alt: "Icon representing automated sample handling and lab workflow." },
  { name: "immunoassay-analyzer/", orgname: "Immunology", webm: Immunology, alt: "Icon symbolizing immune system testing and antibody-based diagnostics" },
];

function ProductCategaries() {
  const { setSelectedCategory } = useContext(CategoryContext);

  const topItemsRef = useRef(null);
  const bottomItemsRef = useRef(null);
  const horizontalLeftRef = useRef(null);
  const horizontalRightRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const topAnim = gsap.to(topItemsRef.current, { y: "-100%", repeat: -1, duration: 20, ease: "linear" });
    const bottomAnim = gsap.to(bottomItemsRef.current, { y: "100%", repeat: -1, duration: 20, ease: "linear" });
    const leftAnim = gsap.to(horizontalLeftRef.current, { x: "100%", repeat: -1, duration: 20, ease: "linear" });
    const rightAnim = gsap.to(horizontalRightRef.current, { x: "-100%", repeat: -1, duration: 20, ease: "linear" });

    const addHover = (element, anim) => {
      element?.addEventListener("mouseenter", () => anim.pause());
      element?.addEventListener("mouseleave", () => anim.play());
    };

    addHover(topItemsRef.current, topAnim);
    addHover(bottomItemsRef.current, bottomAnim);
    addHover(horizontalLeftRef.current, leftAnim);
    addHover(horizontalRightRef.current, rightAnim);

    return () => {
      topItemsRef.current?.removeEventListener("mouseenter", () => topAnim.pause());
      topItemsRef.current?.removeEventListener("mouseleave", () => topAnim.play());

      bottomItemsRef.current?.removeEventListener("mouseenter", () => bottomAnim.pause());
      bottomItemsRef.current?.removeEventListener("mouseleave", () => bottomAnim.play());

      horizontalLeftRef.current?.removeEventListener("mouseenter", () => leftAnim.pause());
      horizontalLeftRef.current?.removeEventListener("mouseleave", () => leftAnim.play());

      horizontalRightRef.current?.removeEventListener("mouseenter", () => rightAnim.pause());
      horizontalRightRef.current?.removeEventListener("mouseleave", () => rightAnim.play());
    };
  }, []);

  return (
    <div className="tablet:flex justify-around w-full items-center gap-3 container1 tablet:h-[400px] laptop:h-screen overflow-hidden">
      {/* Left info */}
      <div className="w-1/2 flex flex-col gap-3 hidden md:block">
        <div className="">
          <p className="text-[#00A786] text-2xl tablet:text-[42px] font-poppins font-semibold mb-2">
            Product
          </p>
          <p className="text-2xl tablet:text-[42px] font-poppins font-semibold text-[#00A786]">
            Categories
          </p>
        </div>
        <h2 className="tablet:text-[16px] mt-4 mb-4 text-black leading-8 laptop:max-w-md text-sm font-poppins text-gray-500">
          Explore our diverse range of laboratory equipment for all your medical and diagnostic needs.
        </h2>

        <Link
          className="text-left text-black shadow-custom-green text-sm p-2 bg-white border font-poppins w-fit tablet:px-3 tablet:py-2 rounded-md font-medium hover:scale-90 transition-all shadow-md"
          to="biochemistry-analyzer/"
          onClick={() => setSelectedCategory("biochemistry-analyzer")}
        >
          Explore Products
        </Link>
      </div>

      <div className="sm:block lg:hidden md:hidden">
        <div>
          <p className="text-[#00A786] text-2xl tablet:text-[42px] font-poppins font-semibold mb-2 text-center">
            Product Categories
          </p>
        </div>
        <h2 className="tablet:text-[16px] mt-4 mb-4 text-black leading-8 laptop:max-w-md text-sm font-poppins text-gray-500 text-center">
          Explore our diverse range of laboratory equipment for all your medical and diagnostic needs.
        </h2>
        <div className="text-center">
          <Link
            className="text-left text-black shadow-custom-green text-sm p-2 bg-white border font-poppins w-fit tablet:px-3 tablet:py-2 rounded-md font-medium hover:scale-90 transition-all shadow-md mt-4 mb-4"
            to="biochemistry-analyzer/"
            onClick={() => setSelectedCategory("biochemistry-analyzer")}
          >
            Explore Products
          </Link>
        </div>
      </div>


      {/* Right vertical marquee - Desktop & Tablet */}
      <div className="hidden md:flex gap-3 laptop:!gap-10 laptop:h-[80vh] h-full">
        {/* Top */}
        <div ref={topItemsRef} className="flex flex-col gap-2 laptop:!gap-5">
          {categoryItems.map((val, i) => (
            <Link key={i} to={val.name} onClick={() => setSelectedCategory(val.name)}>
              <Magnetic>
                <div className="cursor-pointer border-1 laptop:rounded-xl bg-white border-custom-green shadow-md shadow-custom-green h-fit laptop:w-32 laptop:!p-3 flex flex-col-reverse items-center p-1 rounded-sm">
                  <video
                    className="tablet:w-14 w-12 h-fit object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={val.webm} type="video/webm" />
                    {val.mp4 && <source src={val.mp4} type="video/mp4" />}
                  </video>

                  <p className="text-[10px] text-black tablet:text-xs text-center laptop:text-sm font-medium">{val.orgname}</p>
                </div>
              </Magnetic>
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div ref={bottomItemsRef} className="flex flex-col-reverse gap-2 laptop:!gap-5">
          {categoryItems2.map((val, i) => (
            <Link key={i} to={val.name} onClick={() => setSelectedCategory(val.name)}>
              <Magnetic>
                <div className="cursor-pointer border-1 laptop:rounded-xl bg-white border-custom-green shadow-md shadow-custom-green h-fit laptop:w-32 laptop:!p-3 flex flex-col items-center p-1 rounded-sm">
                  <video
                    className="tablet:w-14 w-12 h-fit object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={val.webm} type="video/webm" />
                    {val.mp4 && <source src={val.mp4} type="video/mp4" />}
                  </video>

                  <p className="text-center text-black text-[10px] tablet:text-xs laptop:text-sm font-medium">{val.orgname}</p>
                </div>
              </Magnetic>
            </Link>
          ))}
        </div>
      </div>

      {/* Horizontal marquee - Mobile only */}
      <div className="md:hidden w-full mt-10 overflow-hidden relative">
        {/* Left to Right */}
        <div
          ref={horizontalLeftRef}
          className="flex gap-3 w-[200%] animate-marquee-left"
        >
          {categoryItems.map((val, i) => (
            <Link key={i} to={val.name} onClick={() => setSelectedCategory(val.name)}>
              <Magnetic>
                <div className="cursor-pointer bg-white border border-custom-green shadow-md shadow-custom-green rounded-lg flex flex-col items-center justify-center p-3 w-32 h-40">
                  <video
                    className="tablet:w-14 w-12 h-fit object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={val.webm} type="video/webm" />
                    {val.mp4 && <source src={val.mp4} type="video/mp4" />}
                  </video>

                  <p className="text-xs text-center font-medium text-black">{val.orgname}</p>
                </div>
              </Magnetic>
            </Link>
          ))}
        </div>

        {/* Right to Left */}
        <div
          ref={horizontalRightRef}
          className="flex gap-3 w-[200%] animate-marquee-right mt-5"
        >
          {categoryItems2.map((val, i) => (
            <Link key={i} to={val.name} onClick={() => setSelectedCategory(val.name)}>
              <Magnetic>
                <div className="cursor-pointer bg-white border border-custom-green shadow-md shadow-custom-green rounded-lg flex flex-col items-center justify-center p-3 w-32 h-40">
                  <video
                    className="tablet:w-14 w-12 h-fit object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={val.webm} type="video/webm" />
                    {val.mp4 && <source src={val.mp4} type="video/mp4" />}
                  </video>

                  <p className="text-xs text-center font-medium text-black">{val.orgname}</p>
                </div>
              </Magnetic>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductCategaries;


/* <div className="h-[100vh] flex justify-center items-center mb-10">
<div className="flex w-full">
  {/* Left Section */

// <div className="flex flex-col flex-[1.5] gap-3 pl-24 pt-12 mt-32">
//   <div className="text-white" style={{ lineHeight: "3px" }}>
//     <p className="text-[#00A786] text-6xl max-w-lg text-start font-poppins font-semibold">
//       Product
//     </p>
//     <p className="text-6xl max-w-lg text-start font-poppins font-semibold text-[#00A786]">
//       Categories
//     </p>
//   </div>
//   <h2 className="text-xl max-w-lg text-start font-poppins text-gray-500">
//     Explore our diverse range of laboratory equipment for all your
//     medical and diagnostic needs.
//   </h2>
//   <button className="text-left text-white text-xl bg-sky-400 font-poppins w-fit pl-3 pr-3 pt-2 pb-2 rounded-md font-medium hover:scale-90 transition-all shadow-md">
//     Explore Products
//   </button>
// </div>

{
  /* Right Section */
}
// <div className="flex-1 flex relative text-2xl w-full h-screen">
//   <div className="w-[15vw] h-screen flex justify-center">
//     <div className="flex items-center">
//       <Marquee
//         direction="up"
//         pauseOnHover
//         className="flex gap-3 overflow-hidden"
//         speed={30}
//       >
//         {categoryItems2.map((item) => (
//           <Link
//             to="/product"
//             onClick={() => setSelectedCategory(item.name)}
//           >
//             <Magnetic key={item.name}>
//               <div
//                 style={{ margin: "10px 10px" }}
//                 className="flex flex-col-reverse items-center justify-center pt-4 pb-4 pr-8 pl-8 text-center bg-white rounded-xl gap-2 w-[11vw] border-1 border-custom-green shadow-md shadow-custom-green"
//               >
//                 <img width="70px" src={item.image} alt={item.name} />
//                 <p className="text-sm font-semibold font-poppins truncate max-w-[9vw]">
//                   {item.name}
//                 </p>
//               </div>
//             </Magnetic>
//           </Link>
//         ))}
//       </Marquee>
//     </div>
//   </div>

//   <div className="w-[15vw] h-screen flex justify-center">
//     <div className="flex items-center">
//       <Marquee
//         direction="down"
//         pauseOnHover
//         className="flex gap-3"
//         speed={30}
//       >
//         {categoryItems.map((item) => (
//           <Link
//             to="/product"
//             onClick={() => setSelectedCategory(item.name)}
//           >
//             <div
//               style={{ margin: "10px 10px" }}
//               key={item.name}
//               className="flex flex-col items-center justify-center pt-4 pb-4 pr-8 pl-8 text-center bg-white border-1 border-custom-green shadow-md shadow-custom-green rounded-xl gap-2 w-[11vw]"
//             >
//               <img width="70px" src={item.image} alt={item.name} />
//               <p className="text-sm font-semibold font-poppins truncate max-w-[9vw]">
//                 {item.name}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </Marquee>
//     </div>
//   </div>
// </div>
// </div>
// </div> */}
