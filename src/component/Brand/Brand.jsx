import React, { useEffect, useState } from "react";
import sachika from "../../assets/image/sachika-timeline.jpg";
import frame from "../../assets/image/Frame-md.png";
import jeev from "../../assets/image/jeev.jpg";
import fluoroMatGrey from "../../assets/Fluoromat50.png";
import cpc from "../../assets/image/cpc-manufacturing.jpeg";
import itracklogo from "../../assets/image/i-track-logo.png";
import itrack from "../../assets/image/i-track-parallex.png";
import sachika1 from "../../../src/images/sachika-1.jpeg";
import sachika2 from "../../../src/images/sachika-2.jpeg";
import sachika3 from "../../../src/images/sachika-3.jpeg";
import jeev1 from "../../../src/images/jeev-1.jpeg";
import jeev2 from "../../../src/images/jeev-2.jpeg";
import jeev3 from "../../../src/images/jeev-3.jpeg";
import plexmat from "../AllDatas/ProductImages/Immunology/Plexmat4/PlexMAT4.webp";
import itrack1 from "../../../src/images/itrack1.jpg";
import itracknew from "../../assets/i-track.png";
import cpcmanufacturingunit from "../../../src/assets/image/cpcmanufacturingunit.jpeg";

import Aos from "aos";
import "aos/dist/aos.css";
import { SiTicktick } from "react-icons/si";

import Footer from "../../homepages/Footer/Footer";
import Loader from "../Loader/Loader";
import '../../App.css'

const content = {
  heading1: "About us",
  inner1: (
    <>
      <p>
        At Sachika, knowledge comes first. For over 14 years, we have focused exclusively on education and hands-on training in autoimmune diagnostics. By prioritizing learning and clinical insight, we’ve built a legacy that transcends business goals—because we believe that when doctors are empowered, everything else follows.
        Whether you're a budding medical professional or a seasoned specialist, Sachika offers a unique environment where expertise, curiosity, and collaboration come together.
      </p>
    </>
  ),

  heading2: "Programmes Covered at Sachika",
  inner2: (
    <>
      <ul>
        <li>
          <strong>Basic Level Immunofluorescence:</strong> This foundational
          course provides participants with essential knowledge and skills in
          immunofluorescence techniques, preparing them for diagnostic accuracy
          and efficiency.
        </li>
        <li>
          <strong>Advanced Immunofluorescence & Immunology Training:</strong>{" "}
          For professionals looking to specialize, this advanced course covers
          cutting-edge immunofluorescence techniques and in-depth training in
          immunology, allowing participants to handle complex diagnostic
          challenges.
        </li>
        <li>
          <strong>Clinical Lab Practices & Automation:</strong> Focusing on
          clinical automation and laboratory best practices, this program equips
          professionals with the expertise to optimize workflow and improve
          operational efficiency in labs.
        </li>
      </ul>
    </>
  ),

  heading3: "What We Offer",
  inner3: (
    <>
      <p>
        At Sachika – Everlife CPC Diagnostics, we are committed to empowering Doctors through structured, hands-on programs in the field of autoimmune diagnostics. Our training modules are meticulously designed to enhance theoretical understanding and practical proficiency in immunofluorescence techniques, autoimmune disease diagnostics, and emerging laboratory technologies.

      </p>
    </>
  ),
};

const jeevcon = {
  heading1: "Reagent Manufacturing Facility",
  content1: (
    <>
      Reagent manufacturing facility, a wholly owned subsidiary of Everlife CPC, is dedicated to manufacturing high-quality in-vitro
      clinical chemistry reagents. Operating since <b>2011</b> and headquartered
      in Chennai, India, Reagent manufacturing facility caters to clinical
      laboratories, hospitals, and diagnostic centers across the region. With a
      reputation for producing reliable reagents in{" "}
      <b>
        Biochemistry, Immunoturbidimetry, Hematology, and Molecular Diagnostics,
      </b>{" "}
      Reagent manufacturing facility products ensure accuracy and quality in
      critical diagnostic applications.
    </>
  ),

  // heading2: "Fully Automated Instruments",
  // content2: (
  //   <>
  //     Reagent manufacturing facility produces a wide range of{" "}
  //     <b>IVD reagents </b>compatible with both <b>semi-automated</b> and{" "}
  //     <b>fully automated instruments.</b> These reagents support advanced
  //     systems like <b> Turbochem100, ChemWell,</b> and
  //     <b> Biolis 50i.</b> With fully automated capabilities, Reagent
  //     manufacturing facility ensures that laboratories can achieve
  //     high-throughput, efficiency, and precision, seamlessly integrating into
  //     diagnostic workflows for accurate, consistent results.
  //   </>
  // ),

  heading3: "Stringent Quality Control",
  content3: (
    <>
      <p>
        Reagent manufacturing facility is committed to upholding stringent
        quality standards across its entire manufacturing process. Each reagent
        undergoes rigorous testing to meet <b> international quality norms,</b>{" "}
        ensuring reliable and high-performance products. By adhering to strict
        production protocols, Reagent manufacturing facility guarantees that its
        reagents offer unparalleled consistency and accuracy, empowering
        healthcare providers to deliver better patient outcomes.
      </p>
    </>
  ),
};

const cpccon = {
  heading1: "Field of indigenous manufacturing",
  content1:
    "Everlife CPC takes pride in its commitment to indigenous manufacturing, bridging the gap between instruments and reagents. By embracing backward integration, CPC ensures empowerment, reliability, and innovation in the field of local manufacturing. This dedication enables CPC to pioneer solutions that meet the specific needs of healthcare diagnostics, fostering trust and quality in every product..",

  heading2:
    " Instruments Manufacturing Facility – Manufacturing Arm of Diagnostic Instruments",
  content2:
    "Everlife Instruments manufacturing facility is 100% indigenous, certified with CE and ISO standards. As the manufacturing arm of diagnostic instruments, CPC is known for its stringent quality control measures, ensuring every product meets the highest industry standards. The unit is the first to design and manufacture the revolutionary Hematology Analyzer Xcyte, a testament to CPC's leadership in the field of diagnostics.",

  heading3: " Popular Models of CPC",
  content3: (
    <>
      <ul>
        <li>
          Everlife CPC's dedication to innovation is reflected in its popular
          product models, including:
        </li>
        <li>
          <strong>PlexMAT 4/8/16:</strong> An Automated Line Immuno Assay
          processor designed for flexibility and precision.
        </li>
        <li>
          <strong>FluoroMAT50:</strong> A cutting-edge Automated Indirect
          Immunofluorescence slide processor, ensuring accuracy and reliability
          in diagnostic processes.
        </li>
      </ul>
    </>
  ),
};

const itrackcon = {
  heading1: "About i-track",
  content1:
    "In yet another pioneering venture Everlife CPC developed the i-track team, Our home grown design for remote support for instruments. Using innovative technology, i-track connects to users across India, Sri Lanka, Philippines, Africa and Nepal offering online solutions to our customer needs in real time. Combining analytics with effective preventive and predictive maintenance, Your instrument is at its most productive when you have i-track backing you!",

  heading2: "Power of Remote Connectivity",
  content6: "Real time Online Support",
  content2: "Online remote connectivity ensuring immediate service and application support",
  content3: "Dedicated technical team supporting multilingual ability. ",
  content4: "Cutdown wastage of man hours and reduce down time.",
};

function Brand() {
  const [openPopup, setOpenPopup] = useState(false);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    Aos.init({ duration: 1000 });
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div className="">
          <h1 className="text-center text-maincol text-4xl font-semibold mt-10">
            Our Brands and Global Partners
          </h1>
          <h2
            className="text-maincol text-4xl font-semibold text-center mt-10"
            data-aos="fade-up"
            data-aos-easing="ease-in-out"
          >
            <u className="underline-offset-8">Sachika</u>
          </h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 mt-10  p-10 gap-5 max-w-[1300px] mx-auto">
            {/* content 1 */}

            <div
              className="text-justify"
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol tablet:text-2xl text-[20px] mt-10 font-semibold">
                {content.heading1}
              </h4>
              <div className="flex gap-4">
                <SiTicktick size={170} color="#02a884" className="" />
                <p className="mt-2 leading-7 text-fontextra">
                  {content.inner1}
                </p>
              </div>
            </div>
            <div
              className="flex justify-center"
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
            >
              <img
                src={sachika1}
                alt=""
                className="w-full mt-5 rounded-lg shadow-lg "
              />
            </div>

            {/* content 2 */}
            {/* <div
              className="flex justify-center items-center mt-20"
              data-aos="flip-right"
              data-aos-easing="ease-in-out"
            >
              <img
                src={sachika2}
                alt=""
                className="w-full h-96 mt-5 rounded-lg shadow-lg "
              />
            </div>

            <div
              className="text-justify"
              data-aos="flip-right"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol text-2xl mt-40 font-semibold">
                {content.heading2}
              </h4>
              <div className="flex gap-4">
                <SiTicktick size={80} color="#02a884" className="mt-4" />
                <p className=" mt-4 leading-8 text-fontextra">
                  {content.inner2}
                </p>
              </div>
            </div> */}

            {/* content 3 */}

            <div
              className="flex justify-center items-center tablet:mt-32 mt-10"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <img
                src={sachika3}
                alt=""
                className="w-full tablet:h-96 rounded-lg shadow-lg "
              />
            </div>
            <div
              className="text-justify"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-40 font-semibold">
                {content.heading3}
              </h4>

              <div className="flex gap-4">
                <SiTicktick size={150} color="#02a884" className="" />
                <p className="mt-3 leading-7 text-fontextra">
                  {content.inner3}
                </p>
              </div>
            </div>
            <section className="p-4 sm:p-6 md:p-8 bg-white text-gray-800">
              {/* Main Content */}


              {/* Read More Button */}
              <button
                onClick={() => setOpenPopup(true)}
                className="text-[#00A786] rounded-md text-sm sm:text-sm border-[#00A786] tablet:relative tablet:left-[620px] tablet:top-[-170px]"
              >
                Read More....
              </button>

              {/* Popup Modal */}
              {openPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl sm:max-w-2xl p-6 relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setOpenPopup(false)}
                      className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
                    >
                      ×
                    </button>

                    {/* Popup Heading */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#032F5D] mb-3">
                      We currently offer three Flagship programs:
                    </h2>

                    {/* Popup Content */}
                    <p className="text-[13px] sm:text-[14px] leading-7 text-gray-700 text-justify tablet:h-[30vw] h-[100vw] overflow-y-auto">

                      <br></br><br></br>
                      <span className=" leading-9">
                        <strong>1. Basic Immunofluorescence Training Program</strong>
                        <br></br> Who can attend?
                        Medical doctors new to immunofluorescence-based diagnostics.<br></br>
                        <strong>Duration: 3 Days</strong><br></br>
                        <strong>Program Highlights:</strong>
                        <br></br>
                        • Understand the clinical relevance of antinuclear antibodies (ANA) and ACR guidelines. <br></br>

                        • Identification and interpretation of ANA patterns. <br></br>
                        • Hands-on IFA Training: Intensive practical sessions and troubleshooting. <br></br>
                        • Intensive Microscopy sessions on Control slides <br></br>
                        • ANCA Diagnostics:: Theoretical and microscopy sessions on ANCA-associated vasculitis <br></br>
                        • Allergy Diagnostics : an overview of allergy panels. <br></br>

                        • Automation Modules: Introduction to PlexMAT, FluoroMAT 50 and CLIA platforms <br></br>

                        • Certification & Feedback: Final day includes a quiz, feedback, and award of certification. <br></br>

                      </span>
                      <span className=" leading-9">
                        <strong>2. Advanced Immunofluorescence Training Program</strong>
                        <br></br>Who can attend?: Doctors with prior experience in immunodiagnostics looking to deepen their expertise.<br></br>
                        <strong>Duration: 3 Days</strong><br></br>
                        <strong>Program Highlights:</strong><br></br>
                        • Deep dive into rheumatic diseases, primary membranous nephropathy, and autoimmune liver conditions.<br></br>

                        • Detailed sessions on autoimmune encephalitis, paraneoplastic neurological syndromes, NMOSD, and more.<br></br>

                        • Comprehensive sessions on Autoimmune bullous dermatoses, Coeliac Disease and allergy diagnostics<br></br>
                        • Automation Modules: Introduction to PlexMAT, FluoroMAT 50 and CLIA platforms<br></br>

                        • Certification & Feedback: Final day includes a quiz, feedback, and award of certification.<br></br>
                      </span>
                      <span className=" leading-9">
                        <strong>3. Immunofluorescence Technologist Training Program</strong>
                        <br></br>
                        Who can attend? :  Laboratory technologists and technical staff involved in immunodiagnostic testing.<br></br>
                        <strong>Duration: 2 Days</strong><br></br>

                        <strong>Program Highlights :</strong><br></br>
                        ◦ Basics of immunology and diagnostic methodologies<br></br>

                        ◦ Overview of immunofluorescence, IIFT principles, Biochip and Titerplane technologies<br></br>
                        ◦ Hands-On IFA & Troubleshooting
                        ◦ Performing autoimmune panels : ANA, ANCA, PLA2R, Gastroenterology & Neurology<br></br>

                        ◦  Focused session on slide reading and result validation using Eurostar microscopy system<br></br>

                        ◦ Allergy Testing: overview of Euroimmun allergy panels<br></br>

                        ◦ Immunoblotting with PLEXMAT  - Demonstration<br></br>
                        ◦ FluoroMat Demo: Live demonstration on automated slide processing<br></br>

                        ◦ Troubleshooting, practical Q&A, and test assessment<br></br>

                        ◦ Certification awarded upon successful completion<br></br>
                      </span>
                    </p>

                    {/* Close Button (bottom for mobile users) */}
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => setOpenPopup(false)}
                        className="px-4 py-2 bg-[#00A786] text-white rounded-md text-sm sm:text-base border-[#00A786]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>


          </div>

          {/* jeev diagonositcs */}
          <h3
            className="text-maincol tablet:text-4xl text-xl font-semibold mt-10 text-center"
            data-aos="zoom-in-up"
            data-aos-easing="ease-in-out"
          >
            <u className="underline-offset-8 capitalize ">
              Reagent manufacturing facility
            </u>
          </h3>
          <div className="grid grid-cols-1 tablet:grid-cols-2 p-10 gap-5 max-w-[1300px] mx-auto">
            {/* content 1 */}
            <div
              className="text-justify"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol tablet:text-2xl text-[16px] tablet:mt-28 font-semibold">
                {jeevcon.heading1}
              </h4>
              <div className="flex gap-4">
                <SiTicktick size={140} color="#02a884" className="" />
                <p className="mt-3 leading-7 text-fontextra">
                  {jeevcon.content1}
                </p>
              </div>
            </div>

            <div
              className="flex justify-center tablet:mt-20"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <img
                src={jeev1}
                alt=""
                className="w-full rounded-lg shadow-lg "
              />
            </div>
            {/* content 2 */}
            {/* <div
              className="flex justify-center mt-20 "
              data-aos="flip-right"
              data-aos-easing="ease-in-out"
            >
              <img
                src={jeev2}
                alt=""
                className="w-full rounded-lg shadow-lg "
              />
            </div>

            <div
              className="text-justify"
              data-aos="flip-right"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol text-2xl mt-28 font-semibold">
                {jeevcon.heading2}
              </h4>
              <div className="flex gap-4">
                <SiTicktick size={120} color="#02a884" className="" />
                <p className="mt-3 leading-7 text-fontextra">
                  {jeevcon.content2}
                </p>
              </div>
            </div> */}

            {/* content 3 */}
            <div
              className="flex justify-center tablet:mt-20 mt-10"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <img
                src={jeev3}
                alt=""
                className="w-full rounded-lg shadow-lg "
              />
            </div>
            <div
              className="text-justify"
              data-aos="flip-left"
              data-aos-easing="ease-in-out"
            >
              <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-28 mt-6 font-semibold">
                {jeevcon.heading3}
              </h4>
              <div className="flex gap-4">
                <SiTicktick size={120} color="#02a884" className="mt-6" />
                <p className="mt-4 leading-7 text-fontextra">
                  {jeevcon.content3}
                </p>
              </div>
            </div>


          </div>

          <div className=" p-4">
            <h3
              className="text-maincol tablet:text-4xl text-2xl font-semibold tablet:mt-10 text-center"
              data-aos="zoom-in-up"
              data-aos-easing="ease-in-out"
            >
              <u className="underline-offset-8 capitalize">
                Instruments manufacturing facility
              </u>
            </h3>
            <div className="grid grid-cols-1 tablet:grid-cols-2 p-10 gap-5 max-w-[1300px] mx-auto ">
              {/* content 1 */}
              <div
                className=""
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <h4 className="text-maincol tablet:text-2xl text-[15px] tablet:mt-28 font-semibold">
                  {cpccon.heading1}
                </h4>

                <div className="flex gap-4">
                  <SiTicktick size={105} color="#02a884" className="" />
                  <p className="mt-3 leading-7 text-fontextra">
                    {cpccon.content1}
                  </p>
                </div>
              </div>

              <div
                className="flex justify-center tablet:mt-20 mt-4"
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <img
                  src={cpc}
                  alt=""
                  className="w-full rounded-lg shadow-lg "
                />
              </div>
              {/* content 2 */}
              <div
                className="flex justify-center tablet:mt-20 mt-10"
                data-aos="flip-right"
                data-aos-easing="ease-in-out"
              >
                <img
                  src={cpcmanufacturingunit}
                  alt=""
                  className="w-full rounded-lg shadow-lg "
                />
              </div>

              <div
                className=""
                data-aos="flip-right"
                data-aos-easing="ease-in-out"
              >
                <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-28 mt-6 font-semibold">
                  {cpccon.heading2}
                </h4>
                <div className="flex gap-4">
                  <SiTicktick size={115} color="#02a884" className="mt-6" />
                  <p className="mt-4 leading-7 text-fontextra">
                    {cpccon.content2}
                  </p>
                </div>
              </div>

              {/* content 3 */}

              <div
                className="text-justify"
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-28 mt-6 font-semibold">
                  {cpccon.heading3}
                </h4>
                <div className="flex gap-4">
                  <SiTicktick size={47} color="#02a884" className="mt-6" />{" "}
                  <p className="mt-4 leading-7 text-fontextra">
                    {cpccon.content3}
                  </p>
                </div>
              </div>

              <div
                className="flex justify-center mt-0"
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <div className="relative w-full h-[350px] overflow-hidden rounded-lg tablet:mt-10">
                  <img
                    src={plexmat}
                    alt=""
                    className="absolute w-full h-full object-contain bg-transparent animate-fade1"
                  />
                  <img
                    src={fluoroMatGrey}
                    alt=""
                    className="absolute w-full h-full object-contain bg-transparent animate-fade2"
                  />
                </div>

              </div>
            </div>
          </div>

          <div className="tablet:mt-10">
            <div
              className="flex justify-center"
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
            >
              <img src={itracklogo} alt="" className="w-44 " />
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-2 p-10 gap-5 max-w-[1300px] mx-auto">
              {/* content 1 */}
              <div
                className="text-justify"
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-28 mt-4 font-semibold">
                  {itrackcon.heading1}
                </h4>
                <div className="flex gap-4">
                  <SiTicktick size={120} color="#02a884" className="" />{" "}
                  <p className="mt-4 leading-7 text-fontextra">
                    {itrackcon.content1}
                  </p>
                </div>
              </div>

              <div
                className="flex justify-center tablet:mt-20 mt-4"
                data-aos="flip-left"
                data-aos-easing="ease-in-out"
              >
                <img src={itracknew} alt="" className="w-full rounded-lg  " />
              </div>
              {/* content 2 */}
              <div
                className="flex justify-center tablet:mt-20 mt-4"
                data-aos="flip-right"
                data-aos-easing="ease-in-out"
              >
                <img
                  src={itrack1}
                  alt=""
                  className="w-full rounded-lg shadow-lg "
                />
              </div>

              <div
                className="text-justify"
                data-aos="flip-right"
                data-aos-easing="ease-in-out"
              >
                <h4 className="text-maincol tablet:text-2xl text-[19px] tablet:mt-28 mt-4 font-semibold">
                  {itrackcon.heading2}
                </h4>
                <div className="flex gap-4">
                  <SiTicktick color="#02a884" className="mt-7 tablet:w-6 w-4" />
                  <p className="mt-4 leading-7 text-fontextra">
                    {itrackcon.content6}
                  </p>
                </div>
                <div className="flex gap-4">
                  <SiTicktick color="#02a884" className="mt-7 tablet:w-6 w-10" />
                  <p className="mt-4 leading-7 text-fontextra">
                    {itrackcon.content2}
                  </p>
                </div>
                <div className="flex gap-4">
                  <SiTicktick color="#02a884" className="mt-7 tablet:w-6 w-6" />
                  <p className="mt-4 leading-7 text-fontextra">
                    {itrackcon.content3}
                  </p>
                </div>
                <div className="flex gap-4">
                  <SiTicktick color="#02a884" className="mt-7 tablet:w-6 w-7" />
                  <p className="mt-4 leading-7 text-fontextra">
                    {itrackcon.content4}
                  </p>
                </div>
                <br />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Brand;
