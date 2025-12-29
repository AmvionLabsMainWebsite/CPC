import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelopesBulk,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryContext } from "../Context/CategoryContext";
import { ProductDataContext } from "../Context/ProductData";
import SideMenu from "./SideMenu";
import Footer from "../../homepages/Footer/Footer";
import frame1 from "../../images/products/frame1.png";
import "./product.css";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
import Loader from "../Loader/Loader";
import { SectionCategory } from "../Context/SectionCategory";
import productAdditionalData from "./productAdditional";

function Product() {
  const { data } = useContext(ProductDataContext);
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const images = [frame1, frame1, frame1, frame1];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const additionalContent = productAdditionalData[category] || null;


  const h1Map = {
    "biochemistry-analyzer": "Advanced Biochemistry Analyzer in India",
    "electrolyte-analyzer": "High-Performance Electrolyte Analyzer",
    "hematology-analyzer": "Automated Hematology Analyzer",
    "immunoassay-analyzer": "Immunoassay Analyzer and Assay Systems",
    "molecular-diagnostics": "Molecular Diagnostics Lab Systems",
    "point-of-care": "POCT Analyzer (Point of Care Testing Equipment)",
    "pre-analytical-automation": "Pre Analytical Automation for Laboratories",
  };



  const { selecteSectionCategory, setSelectSectionCategory } =
    useContext(SectionCategory);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  //  CATEGORY WHITELIST — prevents invalid URLs from breaking app

  const categories = [
    { category: "Biochemistry", categoryURL: "biochemistry-analyzer" },
    { category: "Electrolyte Analyzer", categoryURL: "electrolyte-analyzer" },
    { category: "Hematology", categoryURL: "hematology-analyzer" },
    { category: "Immunology", categoryURL: "immunoassay-analyzer" },
    { category: "Point of Care", categoryURL: "point-of-care" },
    { category: "Molecular Diagnostics", categoryURL: "molecular-diagnostics" },
    { category: "Pre-Analytical Automation", categoryURL: "pre-analytical-automation" },
  ];

  const validCategory = categories.some(cat => cat.categoryURL === category);

  if (!validCategory) {
    // ❗ INVALID CATEGORY → Redirect to 404
    return <Navigate to="/404" replace />;
  }


  // After category is validated, update selectedCategory context

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  // SECTION RESET
  setSelectSectionCategory("");

  // Get category data
  const selectedCategoryData = data
    ? data.find((c) => c.categoryURL === category)
    : null;

  // If category exists but data missing / loading → show 404
  if (!selectedCategoryData) {
    return <Navigate to="/404" replace />;
  }

  const selectedCategoryItems = selectedCategoryData.items || [];
  console.log("selectedCategoryItems", selectedCategoryItems);
  const headingSection = selectedCategoryData.subsection || [];
  console.log("headingSection", headingSection);

  const sectionCategoryItems = selectedCategoryItems.filter(
    (sectionItems) =>
      sectionItems.section &&
      sectionItems.section.split(" ").join("-").toLowerCase() ===
      selecteSectionCategory
  );

  const final = selectedCategoryItems;
  console.log("final", final);

  // Slider auto-loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Navigation function
  const handleNavigation = (categoryURL, section) => {
    const formattedSection = section
      ? encodeURIComponent(section.split(" ").join("-").toLowerCase())
      : "all";
    setSelectSectionCategory(formattedSection);

    navigate(`/${categoryURL}/${formattedSection}/`, { replace: true });
  };

  // Select category title for breadcrumb
  const [categoryToShow, setCategoryToShow] = useState("");
  const h1Text = h1Map[category] || categoryToShow;
  useEffect(() => {
    const matched = categories.find(
      (cat) => cat.categoryURL === category
    );
    setCategoryToShow(matched ? matched.category : "");
  }, [category]);

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <>
          <div className="font-poppins">
            {/* ---------- HERO SLIDER ---------- */}
            <header className="sm:block mb-2 tablet:mb-4">
              <div className="relative w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-1000"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index}`}
                      className="slider-slide"
                    />
                  ))}
                </div>

                {/* Slider navigation */}
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white px-3 py-1"
                  onClick={() =>
                    setCurrentIndex(
                      (prevIndex) =>
                        (prevIndex - 1 + images.length) % images.length
                    )
                  }
                >
                  &#10094;
                </button>

                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white px-3 py-1"
                  onClick={() =>
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
                  }
                >
                  &#10095;
                </button>
              </div>
            </header>

            {/* ---------- CATEGORY LISTING ---------- */}
            <section className="productSection py-2 text-base text-gray-700">
              <div className="mb-3">
                <p>
                  <Link to="/" className="no-underline">Home</Link>
                  <span> / </span>
                  <span className="font-semibold">{categoryToShow}</span>
                </p>
              </div>

              <div
                className="flex items-center gap-2 tablet:text-xl sm:hidden mb-4 mt-4"
                onClick={() => setOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faBars} />
                <p>Select Equipment</p>
              </div>

              <div className="flex flex-col tablet:flex-row tablet:gap-7">
                <SideMenu
                  open={open}
                  setOpen={setOpen}
                  toggleDropdown={toggleDropdown}
                  openDropdown={openDropdown}
                />

                {/* ---------- CONTENT RIGHT PANEL ---------- */}
                <div className="tablet:w-[75vw] bg-white p-1 tablet:p-4 text-center flex flex-col gap-2">
                  <h1 className="text-xl  font-bold mb-3">{h1Text}</h1>
                  {/* <p className="text-2xl font-semibold mb-3 text-left text-black">
                    {categoryToShow}
                  </p> */}

                  <div className="grid w-full justify-start  items-center tablet:grid-cols-3 tablet:gap-2 grid-cols-2 laptop:flex laptop:space-x-8 tablet:mb-4">
                    {headingSection.map((sectionCategoryItem, i) => (
                      <p
                        key={i}
                        onClick={() =>
                          handleNavigation(
                            category,
                            sectionCategoryItem
                          )
                        }
                        className={`${selecteSectionCategory ===
                          sectionCategoryItem.split(" ").join("-").toLowerCase()
                          ? "font-bold text-[#00A786]"
                          : "font-medium"
                          } text-xs tablet:text-sm cursor-pointer`}
                      >
                        {sectionCategoryItem}
                      </p>
                    ))}
                  </div>

                  {/* ---------- PRODUCT GRID ---------- */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 laptop:grid-cols-3 gap-4 mb-4">
                    {final?.length > 0 ? (
                      final.map((item) => (
                        <>
                          <Link
                            to={`/${category}/${item.section}/${item.slug}/`}
                            key={item.slug}
                            className="no-underline"
                          >
                            <div className="bg-white border-b-2 shadow-gray-300 border-green-800 shadow-xl rounded-lg overflow-hidden relative group h-[220px] tablet:h-[320px] transition duration-300 ease-in-out transform hover:scale-105 tablet:px-3
                        tablet:py-3 ">
                              <img
                                src={item.coverImg}
                                alt={item.title}
                                className="w-full h-32 tablet:h-52 object-cover"
                              />
                              <div className="px-2 py-2 text-gray-600">
                                <h2 className="text-xs tablet:mt-2 tablet:mb-2 tablet:text-xs font-medium text-gray-900 text-left">
                                  {item.title}
                                </h2>
                                <p className="text-xs text-gray-600 text-left line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                              <div className="hidden absolute inset-0 bg-green-600/40 justify-center items-center text-white text-xl group-hover:flex">
                                View Product
                              </div>
                            </div>
                          </Link>

                        </>
                      ))
                    ) : (
                      <div className="">
                        <span className="text-red-600">*</span> Product Not Available
                      </div>

                    )}
                  </div >
                  {/* {additionalContent && (
                    <div className="mt-8 text-left">
                      {additionalContent.map((section, index) => {
                        const HeadingTag = section.level;

                        return (
                          <div key={index} className="mb-6">
                            <HeadingTag className="font-bold text-gray-800 mb-2">
                              {section.title}
                            </HeadingTag>

                            {section.content?.map((para, i) => (
                              <p key={i} className="text-gray-600 mb-3 text-sm leading-7">
                                {para}
                              </p>
                            ))}

                            {section.list && (
                              <ul className="list-disc ml-6 text-gray-700">
                                {section.list.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            )}
                            {section.cta && (
                              <a
                                href={section.cta.url}
                                className="text-green-700 font-semibold underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {section.cta.text}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )} */}


                </div>
              </div>

            </section>


            {/* ---------- CTA CARDS ---------- */}
            <div className="grid tablet:h-[100px] h-fit grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 gap-2 tablet:px-5 py-5 px-2">
              <Link to="/contact-us">
                <div className="p-[10px] pl-8 bg-[#00735D] text-white rounded-md">
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon={faMessage} className="text-2xl" />
                    <div className="text-lg">Need Help?</div>
                  </div>
                  <div>Get concise assistance here</div>
                </div>
              </Link>

              <a href="mailto:info@cpcdiagnostics.in">
                <div className="p-[10px] pl-8 bg-gradient-to-r from-[#00735D] to-[#01A786] text-white rounded-md">
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon={faEnvelopesBulk} className="text-2xl" />
                    <div className="text-lg">Enquiry mail us?</div>
                  </div>
                  <div>Mail us today for Enquiries</div>
                </div>
              </a>

              <Link to="/blog">
                <div className="p-[10px] pl-8 bg-[#01A786] text-white rounded-md">
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon={faBloggerB} className="text-2xl" />
                    <div className="text-lg">Our blogs</div>
                  </div>
                  <div>Get our latest blogs</div>
                </div>
              </Link>
            </div>

          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default Product;
