import React, { useEffect, useState } from "react";
import "./slider.css";
import image1 from "../AllDatas/ProductImages/Immunology/fluoroMat/fluoromat.png";
import image2 from "../AllDatas/ProductImages/Immunology/Iflash1800/iflash 1800.png";
import image3 from "../AllDatas/ProductImages/Immunology/Iflash3000/iflash 3000.png";
import image4 from "../AllDatas/ProductImages/Immunology/Kryptor/Kryptor.webp";
import image5 from "../AllDatas/ProductImages/Molecular Diagnostics/Labscan 3D/labscan 3d.png";
import image6 from "../AllDatas/ProductImages/Molecular Diagnostics/Labscan 100/labscan 100.png";
import image7 from "../AllDatas/ProductImages/Immunology/Plexmat4/PlexMAT4.webp";
import { Link } from "react-router-dom";

const Slider = () => {
  const [isHover, setIsHover] = useState(false);
  const [slide, setSlide] = useState([
    {
      url: image1,
      category: "FluoroMAT 50 advanced immunofluorescence analyzer providing precise IFA results",
      state: "active",
      class: "next",
      id: 2,
      categoryUrl: "immunoassay-analyzer",
      section: "ifa",
      slug: 'fluoromat-50',
    },
    { url: image2, category: "YHLO iFlash 1800 advanced chemiluminescence immunoassay analyzer", state: "next", class: "", id: 2, categoryUrl: "immunoassay-analyzer", slug: 'iflash-1800', section: "clia", },
    { url: image3, category: "YHLO iFlash 3000 high-performance chemiluminescence analyzer for laboratories", state: "hidden", class: "", id: 3, categoryUrl: "immunoassay-analyzer", slug: 'iflash-3000', section: "clia", },
    { url: image4, category: "Thermo Fisher Scientific BRAHMS KRYPTOR PLUS analyzer offering precise immunoassay results", state: "hidden", class: "", id: 4, categoryUrl: "immunoassay-analyzer", slug: 'kryptor-compact-plus', section: "trace", },
    { url: image7, category: "PlexMAT-4 Immunoblot Analyzer delivering high-quality western blot processing", state: "hidden", class: "", id: 7, categoryUrl: "immunoassay-analyzer", slug: 'plexmat-4', section: "immunoblot", },
    {
      url: image5,
      category: "Luminex LABScan 3D advanced multiplex immunoassay analyzer system",
      state: "hidden",
      class: "",
      id: 1,
      categoryUrl: "molecular-diagnostics",
      slug: 'labscan-3d',
      section: 'labscan',
    },
    {
      url: image6,
      category: "Luminex LABScan 100 flexible multiplexing analyzer for IVD applications",
      state: "prev",
      class: "",
      id: 2,
      categoryUrl: "molecular-diagnostics",
      slug: 'labscan-100',
      section: 'labscan',
    },
  ]);

  const nextSlide = () => {
    setSlide((prevs) => {
      return prevs.map((s, index, arr) => {
        if (s.state === "active")
          return { ...s, state: "prev", class: "fromActive" };
        if (s.state === "next")
          return { ...s, state: "active", class: "fromNext" };
        if (s.state === "prev") return { ...s, state: "hidden", class: "" };

        if (s.state === "hidden") {
          const nextIndex = arr.findIndex((item) => item.state === "next");
          if (index === (nextIndex + 1) % arr.length) {
            return { ...s, state: "next", class: "" };
          }
        }
        return s;
      });
    });
  };

  const preSlide = () => {
    setSlide((prevs) => {
      return prevs.map((s, index, arr) => {
        if (s.state === "active")
          return { ...s, state: "next", class: "fromActive" };
        if (s.state === "prev")
          return { ...s, state: "active", class: "fromPrev" };
        if (s.state === "next") return { ...s, state: "hidden", class: "" };

        if (s.state === "hidden") {
          const prevIndex = arr.findIndex((item) => item.state === "prev");
          if (index === (prevIndex - 1 + arr.length) % arr.length) {
            return { ...s, state: "prev", class: "" };
          }
        }
        return s;
      });
    });
  };
  useEffect(() => {
    preSlide();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHover) {
        preSlide();
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [slide, isHover]);
  return (
    <>
      <div className="slider-grid">
        <div className="slider-wrapper">
          {slide.map((s, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setIsHover(true);
                console.log("hover");
              }}
              onMouseLeave={() => {
                setIsHover(false);
                console.log("hover off");
              }}
              className={`slide  ${s.state} ${s.class}`}
            >
              <Link
                className="d-flex justify-content-center align-items-center w-full"
                to={`/${s.categoryUrl}/${s.section}/${s.slug}/`}
              >
                <img
                  src={s.url}
                  alt={s.category}
                  style={{
                    filter: "drop-shadow(5px 5px 10px rgba(75, 85, 99, 0.8))",
                    transform:
                      s.id == 2 && s.category == "Point%20of%20Care"
                        ? "scale(0.80)"
                        : "scale(1)",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="slider-btn prev" onClick={preSlide}></button>
          <button className="slider-btn next" onClick={nextSlide}></button>
        </div>
      </div>
    </>
  );
};

export default Slider;
