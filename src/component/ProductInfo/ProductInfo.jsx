import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductDataContext } from "../Context/ProductData";
import bgImage from "./bgImage/23.png";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import ContactUs from "../../homepages/ContactUs/ContactUs";
import Footer from "../../homepages/Footer/Footer";
import { CategoryContext } from "../Context/CategoryContext";
import "./productInfo.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faEnvelopesBulk,
  faMessage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowForward } from "react-icons/io";
import frame1 from "../../images/products/frame1.png";

import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
import SideMenu from "../Product/SideMenu";
import Loader from "../Loader/Loader";
import { SectionCategory } from "../Context/SectionCategory";
import GetQuote from "../../homepages/ContactUs/GetQuote";
import productSchemas from "../ProductInfo/productSchemas.json"

function ProductInfo() {
  const { data } = useContext(ProductDataContext);
  const [loadedImages, setLoadedImages] = useState({}); // Tracks loading state of each image

  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => ({ ...prev, [idx]: true }));
  };
  console.log(loadedImages);
  const { category, id, section } = useParams();
  const decodedCategory = decodeURIComponent(category).replace(" ", "");
  const { selecteSectionCategory, setSelectSectionCategory } =
    useContext(SectionCategory);
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const productCategory = data.find((cat) => cat.categoryURL === category);
  const product = productCategory?.items.find((item) => item.slug === id);
  const images = product?.image || [];
  const relatedProduct = productCategory.items.filter(
    (related) => related.slug !== id
  );
  const manualSchema = productSchemas[id]; // id is the slug from useParams()

  if (!product) {
    return <div>Product not found</div>;
  }

  const [expanded, setExpanded] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [showLine, setShowLine] = useState(true);

  const toggleExpand = (section) => {
    setExpanded((prevExpanded) => (prevExpanded === section ? null : section));
  };

  const sectionData = {
    Features: [
      "TURBOCHEM MAGNA",
      "Feature 1: High precision in chemical analysis.",
      "Feature 2: User-friendly interface for easy operation.",
    ],
    Technology: [
      "Advanced sensor technology for accurate readings.",
      "Seamless integration with laboratory information systems (LIS).",
    ],
    Assay: [
      "Wide range of assays for various applications.",
      "High sensitivity and specificity in results.",
    ],

    Enquiry: [
      "For more information, contact our sales team at sales@example.com.",
      "For technical support, email support@example.com or call 123-456-7890.",
    ],
  };

  const tabs = [
    {
      name: "Product overview",
      submenu: [
        product.shortdescription && {
          menuName: "Description",
          content: product.shortdescription,
        },
        product.workPrinciple && {
          menuName: "Work Principle",
          content: product.workPrinciple,
        },
        product.advantages && {
          menuName: "Advantages",
          content: product.advantages,
        },
        product.benefits && {
          menuName: "Benefits",
          content: product.benefits,
        },
        product.mainAndCare && {
          menuName: "Maintenance And Care",
          content: product.mainAndCare,
        },
        // product.testMenu && {
        //   menuName: "Test Menu",
        //   content: product.testMenu,
        // },
      ].filter(Boolean), // ✅ removes undefined/null entries
    },
  ];

  const [showInfo, setShowInfo] = useState(null);

  const toggleInfo = (index) => {
    setShowInfo((prev) => (prev === index ? null : index));
  };

  const h1Map = {
    "biochemistry-analyzer": {
      "fully-automatic": {
        "turbochem-magna": "TURBOCHEM MAGNA Fully Automatic Biochemistry Analyzer",
        "turbochem-prime": "TURBOCHEM PRIME Fully Automatic Biochemistry Analyzer",
        "turbochem-optima": "TURBOCHEM OPTIMA Fully Automatic Biochemistry Analyzer"
      },
      "semi-automatic": {
        "turbostat-plus": "TURBOSTAT PLUS Semi Automatic Biochemistry Analyzer"
      },
      "reagents": {
        "i-chem-prime": "i-chem Prime Biochemistry Reagent",
        "i-chem-magna": "i-chem Magna Biochemistry Reagent",
        "identi-immuno-turbidimetry": "identi Immuno Turbidimetry Biochemistry Reagents",
        "identi": "identi Chemistry Reagent"
      }
    },
    "hematology-analyzer": {
      "3-part": {
        "dynacount-3d-plus": "DYNACOUNT 3D PLUS 3 Part CBC Machine",

      },
      "5-part": {
        "dynacount-5d-pro": "DYNACOUNT 5D PRO 5 Part CBC Machine",
        "dynacount-5d-elite": "DYNACOUNT 5D ELITE 5 Part CBC Machine"
      },
      "esr-analyzer": {
        "vision-pro": "VISION Pro Automated ESR Analyzer",
        "sedrate-pro": "SEDRATE PRO Automated ESR Analyzer"
      }
    },
    "electrolyte-analyzer": {
      "with-auto-loader": {
        "jokoh-ex-d": "JOKOH Ex-D Electrolyte Analyzer with Auto Loader",
      },
      "without-auto-loader": {
        "jokoh-ex-ds": "JOKOH Ex-Ds Electrolyte Analyzer without Auto Loader",
      },
    },
    "molecular-diagnostics": {
      "labscan": {
        "labscan-3d": "Luminex LABScan 3D Advanced IVD System",
        "labscan-100": "Labscan 100 Luminex Multiplexing Laboratory Equipment"
      },
    },
    "pre-analytical-automation": {
      "sample-sorter": {
        "sortpro-sample-sorter": "Fully Automated SorPro Sample Sorter Automation",
      },

    },
    "point-of-care": {
      "ichroma": {
        "ichroma-3": "Boditech ichroma™ III Advanced Compact POCT Analyzer",
        "ichroma-2": "Boditech ichroma™ II Advanced Point of Care Testing Analyzer",
      },
    },
    "immunoassay-analyzer": {
      "elisa": {
        "euroimmun-i-2p": "EUROIMMUN Analyzer I-2P Fully Automated ELISA Analyzer",
        "euroimmun-i": "EUROIMMUN Analyzer I Automated ELISA Processor"
      },
      "immunoblot": {
        "plexmat-4": "PlexMAT-4 Automated Western Blot Analyzer",
        "plexmat-8": "PlexMAT-8 Automated Western Blot Analyzer",
        "euroblotone": "EUROBlotOne Automated Immunoblot Analyzer"
      },
      "ifa": {
        "if-sprinter": "Fully Automated IF Sprinter Analyzer",
        "eutostar-iii-plus": "EUROStar III Plus Automated Immunofluorescence Analyzer",
        "europattern-microscope": "EUROPattern Microscope Automated Immunofluorescence Microscopy",
        "fluoromat-50": "FluoroMAT 50 Immunofluorescence Analyzer",
        "sprinter-xl": "Sprinter XL Fully Automated Immunoassay Analyzer",
      },
      "clia": {
        "iflash-3000": "iFlash 3000 Chemiluminescence Immunoassay Analyzer",
        "iflash-1800": "YHLO iFlash 1800 Chemiluminescence Immunoassay Analyzer",
        "iflash-1200": "YHLO iFlash 1200 Chemiluminescence Immunoassay Analyzer",
      },
      "trace": {
        "kryptor-compact-plus": "Thermo Fisher Scientific B·R·A·H·M·S KRYPTOR compact PLUS Analyzer",
      },
      "fia": {
        "afias-1": "Boditech AFIAS-1 Automated Immunoassay Analyzer",
        "afias-3": "Boditech AFIAS-3 Automated Immunoassay Analyzer",
        "afias-6": "Boditech AFIAS-6 Automated Immunoassay Analyzer",
        "afias-10": "Boditech AFIAS-10 Automated Immunoassay Analyzer",
      },
    },

  };

  const productSlug = id;
  const h1Text =
    h1Map[category]?.[section]?.[productSlug] || product.title;


  const faqs = [
    {
      question: "What is a Payment Gateway?",
      answers: [
        "A payment gateway is a technology used by merchants to accept debit or credit card purchases from customers.",
        "It securely processes payment information and ensures funds are transferred to the merchant's account.",
      ],
    },
    {
      question:
        "Do I need to pay to Instapay even when there is no transaction going on in my business?",
      answers: [
        "No, you do not need to pay if there are no transactions.",
        "You only pay for the transactions that occur.",
      ],
    },
    {
      question: "What platforms does ACME payment gateway support?",
      answers: [
        "ACME payment gateway supports multiple platforms including e-commerce websites, mobile apps, and in-store point of sale systems.",
      ],
    },
    {
      question: "Does ACME provide international payments support?",
      answers: [
        "Yes, ACME provides international payment support.",
        "You can accept payments from customers worldwide.",
      ],
    },
  ];

  // Scroll to top when component mounts
  const [load, setLoad] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);
  const [imgUrl, setImgUrl] = useState(0);
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const handleNextImage = () => {
    setImgUrl((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImgUrl((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <>
          {/* Manual Rich Schema for Selected Products */}
          {manualSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  {
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    name: manualSchema.name,
                    image: manualSchema.image,
                    description: manualSchema.description,
                    brand: {
                      "@type": "Brand",
                      name: manualSchema.brand
                    },
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: manualSchema.aggregateRating.ratingValue,
                      ratingCount: manualSchema.aggregateRating.ratingCount
                    },
                    offers: {
                      "@type": "Offer",
                      url: window.location.href,
                      availability: "https://schema.org/InStock",
                      priceCurrency: "INR"
                    }
                  },
                  null,
                  2
                )
              }}
            />
          )}
          <div
            className="product-info text-black overflow-hidden mt-2 font-poppins
        container"
          >
            <div className="hidden tablet:flex mb-3 laptop:mt-4 text-base tablet:text-base cursor-pointer  px-5 w-full md:px-5">
              <span className="">
                <Link
                  onClick={() => {
                    // setSelectSectionCategory("top");
                    setSelectedCategory("biochemistry-analyzer");
                    setSelectedCategory("electrolyte-analyzer");
                    setSelectedCategory("hematology-analyzer");
                    setSelectedCategory("immunoassay-analyzer");
                    setSelectedCategory("point-of-care");
                    setSelectedCategory("molecular-diagnostics");
                    setSelectedCategory("pre-analytical-automation");
                  }}
                  to={`/${selectedCategory}/${selecteSectionCategory}`}
                >
                  Product
                </Link>
              </span>
              <Link
                to={`/${decodedCategory}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>/ {category}/ </span>
              </Link>
              <span className="font-medium"> {product.title}</span>
            </div>
            {/* mobile */}
            <div className=" mb-3 text-sm cursor-pointer px-2 w-full sm:hidden mt-4">
              <span className="">
                <Link
                  onClick={() => {
                    // setSelectSectionCategory("top");
                    setSelectedCategory("biochemistry-analyzer");
                    setSelectedCategory("electrolyte-analyzer");
                    setSelectedCategory("hematology-analyzer");
                    setSelectedCategory("immunoassay-analyzer");
                    setSelectedCategory("point-of-care");
                    setSelectedCategory("molecular-diagnostics");
                    setSelectedCategory("pre-analytical-automation");
                  }}
                  to={`/${selectedCategory}/${selecteSectionCategory}`}
                >
                  Product
                </Link>
              </span>
              <Link
                to={`/${selectedCategory}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>/ {category}</span>
              </Link>
              <span>/ {product.title}</span>
            </div>
            {/* img for mobile */}
            <div className="laptop:w-[80%] sm:hidden px-10 w-full tablet:w-[70%]  md:h-[60%] flex justify-center">
              {images.length > 0 && images[imgUrl] && (
                <img
                  src={images[imgUrl].src}
                  alt={product?.alt?.[imgUrl] || product?.title}
                  className="rounded-md w-full h-full object-cover"
                />
              )}
            </div>
            {/* /sidemenu */}
            <div className="flex px-5 gap-5 sidebar">
              <div
                className={`sm:w-[25%] sidebar bg-white border rounded-md shadow-md  p-2 tablet:py-2 md:px-4 md:sticky top-2
                 laptop:h-[80vh] largeLaptop:h-[50vh] tablet:h-[60vh] overflow-y-auto z-10  ${open
                    ? "fixed top-16 inset-0 w-[80%] h-full overflow-y-auto z-20"
                    : "hidden sm:block"
                  }`}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl mt-2 sm:hidden"
                  onClick={() => setOpen(false)}
                />
                <div className="w-full mx-auto h-fit">
                  {data.map((dropdown, index) => (
                    <div key={index} className="rounded mb-2 list-group-item">
                      <button
                        className="flex justify-between  rounded-md  items-center px-1 tablet:px-2 py-1.5  w-full cursor-pointer"
                        onClick={() => {
                          toggleDropdown(index);
                          setSelectedCategory(dropdown.categoryURL);
                        }}
                      >
                        <p className="tablet:text-sm  laptop:text-sm largeLaptop:text-xl font-poppins text-left font-medium">
                          {dropdown.category}
                        </p>
                        {openDropdown === index ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </button>
                      {openDropdown === index && (
                        <div className="border-t border-gray-300">
                          {dropdown.items.map((item) => (
                            <Link
                              to={item.section ? `/${selectedCategory}/${item.section}/${item.slug}/` : `/${selectedCategory}/${item.slug}/`}
                              key={item.slug}
                              className="no-underline"
                            >
                              <p
                                className={`${product.title == item.title
                                  ? "bg-maincol text-white"
                                  : ""
                                  } font-poppins px- text-gray-700 py-2 laptop:text-sm tablet:text-xs capitalize hover:bg-maincol hover:text-light-green cursor-pointer px-2`}
                              >
                                {item.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[75%]">
                <div className="flex flex-col md:flex-row items-center tablet:justify-start mb-2  md:gap-4">
                  <div className="hidden md:block w-1/4 md:px-2 tablet:mt-2">
                    {images.map((img, idx, alt) => (
                      <div key={idx} className="relative">
                        {!loadedImages[idx] && (
                          <div className="mb-3 h-16 w-[100px] bg-gray-200 animate-pulse rounded-lg"></div>
                        )}
                        <img
                          key={idx}
                          className={`mb-3 h-fit w-[100px] object-contain cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105 ${!loadedImages[idx] ? "hidden" : ""
                            }`}
                          onLoad={() => handleImageLoad(idx)}
                          src={img.src}
                          onClick={() => setImgUrl(idx)}
                          alt={img.alt}
                          style={{
                            border:
                              imgUrl === idx ? "4px solid #00A786" : "none",
                            borderRadius: "10px",
                            imageRendering: "auto",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="hidden relative laptop:w-[60%] w-full tablet:w-[70%] laptop:h-[300px]  tablet:flex justify-center">
                    <IoIosArrowForward
                      onClick={handlePrevImage}
                      className=" text-xl absolute top-1/2 rotate-180 -left-10 cursor-pointer"
                    />
                    {images.length > 0 && images[imgUrl] && (
                      <img
                        src={images[imgUrl].src}
                        alt={images[imgUrl].alt}
                        className="rounded-md h-full object-cover"
                      />
                    )}

                    <IoIosArrowForward
                      onClick={handleNextImage}
                      className="text-xl absolute top-1/2 -right-10 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="hidden md:flex justify-center mt-4 tablet:mb-10 laptop:mb-[4rem]">
                  <div className="w-full flex flex-col  text-xl text-justify ">

                    <p className="font-medium text-2xl largeLaptop:text-4xl tablet:mb-4">
                      {product.title}
                    </p>
                    {product.tagline && (
                      <p
                        className={`text-lg largeLaptop:text-xl laptop:mb-4 text-start`}
                      >
                        <span className="font-medium">Tagline : </span>
                        {product.tagline}
                      </p>
                    )}

                    <p className="font-medium tablet:mb-1 largeLaptop:text-2xl largeLaptop:mb-3">
                      Overview:
                    </p>
                    <div
                      className={`text-xs tablet:text-sm largeLaptop:text-lg ${showLine ? "line-clamp-2" : "line-clamp-none"
                        }`}
                    >
                      <h2>{product.description}</h2>
                      {product.description1}
                      {product.description2}
                      {product.description3}
                      {product.descriptionnext}
                    </div>
                    <p
                      className={`text-[#00A786] text-sm cursor-pointer`}
                      onClick={() => setShowLine((prev) => !prev)}
                    >
                      {showLine ? "read more" : "read less"}
                    </p>

                    <GetQuote />

                  </div>
                </div>
              </div>
            </div>
            {/* mobile */}
            <div className="sm:hidden flex justify-center mt-4 px-2">
              <div className="w-full flex flex-col text-base ">
                <p className="font-bold mb-2">{product.title}</p>
                <p className="font-medium mb-2">Overview:</p>
                <p className="mb-2 ">{product.description}</p>
                <div className="items-center gap-2 text-lg hidden md:flex ">
                  <p>Share:</p>
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faTwitter} />
                  <FontAwesomeIcon icon={faWhatsapp} />
                </div>
              </div>
            </div>

            <h1 className="text-lg font-semibold mb-6 text-center ">
              {h1Text}
            </h1>
            <div className="productSection mb-10 laptop:mb-20">
              {/* === Tabs Header === */}
              <div
                className="
      flex flex-wrap justify-center gap-4 
      text-sm sm:text-base md:text-lg 
      border p-2
    "
              >
                {tabs.map((header, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedTab(index);
                      setSelectedMenuItem(0);
                    }}
                    className={`cursor-pointer px-2 sm:px-4 py-1 rounded-md transition-all duration-200 
          ${selectedTab === index
                        ? "font-semibold text-[#00A786] border-b-2 border-custom-green"
                        : "text-gray-600 hover:text-[#00A786]"
                      }`}
                  >
                    {header.name}
                  </p>
                ))}
              </div>

              {/* === Content Section === */}
              <div
                className="
      flex flex-col md:flex-row border-2 mt-2
      laptop:mb-[4rem] laptop:h-[auto] justify-center items-center
    "
              >

                {/* === Submenu (Left Column) === */}
                {tabs[selectedTab].submenu && (
                  <div
                    className="
          w-full md:w-72 
          p-2 sm:p-3 md:p-4 
          flex md:flex-col flex-wrap 
          justify-center md:justify-start 
          border-b md:border-b-0 md:border-r 
          text-xs sm:text-sm md:text-base
        "
                  >
                    {tabs[selectedTab].submenu.map((submenuItem, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedMenuItem(index)}
                        className={`
              cursor-pointer py-2 px-3 text-center md:text-left transition-all 
              ${selectedMenuItem === index
                            ? "font-bold text-[#00A786] bg-gray-100 rounded-md"
                            : "text-gray-600 hover:text-[#00A786]"
                          }
            `}
                      >
                        {submenuItem.menuName}
                      </div>
                    ))}
                  </div>
                )}

                {/* === Content (Right Column) === */}
                <div
                  className={`
        ${tabs[selectedTab].submenu ? "md:w-3/4" : "w-full"} 
        text-sm sm:text-base md:text-sm 
        text-start p-3 sm:p-4
      `}
                >

                  {tabs[selectedTab].submenu ? (<>
                    <p>{tabs[selectedTab].submenu[selectedMenuItem].content}</p>
                  </>

                  ) : (
                    <p>{tabs[selectedTab].content}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              {/* for mobile */}

              <div className="sm:hidden">
                <div className="w-full">
                  {Object.keys(sectionData).map((section, index) => (
                    <div key={index} className="border-b border-gray-300">
                      <div
                        className="flex text-lg justify-between px-2 py-4 cursor-pointer"
                        onClick={() => toggleExpand(section)}
                      >
                        <p>{section}</p>
                        <p>{expanded === section ? "-" : "+"}</p>
                      </div>
                      {expanded === section && (
                        <div className="py-1 px-4">
                          <table className="table-auto w-full">
                            <tbody>
                              {sectionData[section].map((item, idx) => (
                                <tr key={idx}>
                                  <td className="p-2 text-sm">{item}</td>
                                  {/* Render the extra item here */}
                                  {section === "Features" && idx === 2 ? (
                                    <td className="p-2">
                                      {sectionData[section][3]}
                                    </td>
                                  ) : null}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
            {/* related products */}
            {relatedProduct.length > 0 ? (
              <div className=" productSection  mt-4 mb-4 tablet:mb-0 max-h-[500px] ">
                <div className="tablet:flex justify-between items-center mb-4 ">
                  <p className="text-left text-lg largeLaptop:text-3xl truncate md:text-2xl mb-2 font-semibold">
                    Related Products
                  </p>
                  <Link
                    to={`/${category}/`}
                    className="no-underline"
                  >
                    <p className="text-left largeLaptop:text-3xl text-sm md:text-xl mb-2 bg-maincol text-white p-1 md:px-3 md:py-2 rounded-lg tablet:w-full w-52 text-center">
                      View Products
                    </p>
                  </Link>
                </div>
                <div className="w-full overflow-x-auto custom-scrollbar">
                  <div className="flex gap-4">
                    {relatedProduct.map((related, idx) => (
                      <Link
                        to={`/${category}/${related.section}/${related.slug}/`}
                        key={idx}
                        className="no-underline"
                      >
                        <div
                          key={idx}
                          className="relative min-w-[200px] h-60 tablet:h-60 tablet:p-0 p-3 flex flex-col items-center border-[1px] border-custom-green rounded-md mb-2"
                        >
                          <div className="absolute inset-0 animate-moveUp flex justify-center">
                            <img
                              src={bgImage}
                              className="h-full w-full object-cover -z-10 opacity-10"
                              alt=""
                            />
                          </div>
                          <img
                            src={related.image[0]?.src}  // Access the src property inside the object
                            alt={related.image[0]?.alt || related.title}  // Use the alt if available, fallback to title
                            className="rounded-md z-10 h-40 object-cover w-full"
                          />
                          <p className="text-center z-10 font-medium text-gray-700  mt-2 line-clamp-2 text-sm tablet:text-sm">
                            {related.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="w-full flex justify-center mt-4 sm:hidden">
                  <button className="text-sm md:text-xl py-2 px-4 bg-maincol text-white rounded-lg">
                    <Link
                      to={"/biochemistry-analyzer"}
                      onClick={() => setSelectedCategory("biochemistry-analyzer")}
                    >
                      View All Products
                    </Link>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            <ContactUs />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductInfo;
