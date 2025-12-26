const express = require("express");
const path = require("path");
const app = express();

// Your React build path
const FRONTEND_PATH = "C:/inetpub/wwwroot/CPC";


// Default OG image (fallback)
const DEFAULT_IMAGE = "https://cpcdiagnostics.in/assets/logo-DM8X79DO.png";

// =============== OG DATABASE ===============
// Add special titles/descriptions/images for unique routes
const STATIC_PAGES = {
  "/": {
    title: "Laboratory Equipment supplier and Manufacturer in India",
    desc: "Everlife CPC Diagnostics is a leading laboratory equipment supplier and manufacturer in India, offering advanced medical and clinical diagnostic solutions.",
    image: "https://cpcdiagnostics.in/og/home.jpg"
  },
  "/about-us": {
    title: "About Us | Medical Equipment Manufacturer and supplier in India",
    desc: "Everlife CPC Diagnostics, a leading medical equipment manufacturer and supplier in India offering innovative diagnostic instruments & laboratory solutions.",
    image: "https://cpcdiagnostics.in/assets/about-us-CadHZoW2.png"
  },
  "/corporate-social-responsibility-csr-policy": {
    title: "CSR Policy | Everlife CPC Diagnostics Corporate Social Responsibility",
    desc: "Discover CPC Diagnostics’ CSR initiatives focusing on healthcare, education, and sustainability, reflecting our commitment to community well-being, ethics.",
    image: "https://cpcdiagnostics.in/assets/Pic2-xs_S7KuT.jpg"
  },
  "/our-brands": {
    title: "Our Brands | Trusted Global Diagnostic Equipment Partners",
    desc: "Everlife CPC Diagnostics’ global brand partners providing high-quality diagnostic & laboratory equipment trusted by healthcare professionals across India.",
    image: "https://cpcdiagnostics.in/assets/sachika-1-smdziAHL.jpeg"
  },
  "/contact-us": {
    title: "Contact Everlife CPC Diagnostics | Get in Touch with Us",
    desc: "Contact Everlife CPC Diagnostics today for inquiries about equipment, diagnostic solutions, or support. We’re here to assist you with expert guidance.",
    image: "https://cpcdiagnostics.in/assets/contact-us-banner-CR5xZqes.png"
  },
  "/our-success": {
    title: "Our Success Stories | Everlife CPC Diagnostics Achievements",
    desc: "Discover Everlife CPC Diagnostics’ milestones and success stories in delivering reliable diagnostic equipment and services to laboratories across India.",
    image: "https://cpcdiagnostics.in/og/contact-us.jpg"
  },
  "/blog": {
    title: "Everlife CPC Diagnostics Blog | Insights on Diagnostic Solutions",
    desc: "Read the latest updates, industry insights & expert articles from Everlife CPC Diagnostics on laboratory equipment, innovations, and healthcare technology.",
    image: "https://cpcdiagnostics.in/assets/Hematology-analyzer-blog-DpIh331p.png"
  }
};

// =============== CATEGORY HANDLER ===============
function detectCategoryData(url) {
  if (url.includes("/blog/")) {
    const slug = url.split("/blog/")[1];
    return {
      title: slug.replace(/-/g, " ") + " | CPC Blog",
      desc: "Read the complete blog article on CPC Diagnostics.",
      image: `https://cpcdiagnostics.in/assets/Hematology-analyzer-blog-DpIh331p.png`
    };
  }

  if (url.includes("/blog/hematology-analyzer-working-principle-uses-price")) {
    return {
      title: "Hematology Analyzer Machine | Working Principle & Uses",
      desc: "Learn how a hematology analyzer machine works, its principle, uses, and benefits in clinical testing. A complete guide for labs & healthcare professionals.",
      image: `https://cpcdiagnostics.in/assets/Hematology-analyzer-blog-DpIh331p.png`
    };
  }
  if (url.includes("/blog/difference-between-3-part-and-5-part-hematology-analyzer")) {
    return {
      title: "3-Part vs 5-Part Hematology Analyzer | Key Differences",
      desc: "Understand the difference between 3-part and 5-part hematology analyzers, including parameters, technology, and applications for clinical diagnostics.",
      image: `https://cpcdiagnostics.in/assets/Difference-Between-3-Part-and-5-Part-Hematology-Analyzer-UGWXhv8S.png`
    };
  }
  if (url.includes("/blog/biochemistry-analyzer-working-principle-uses-price")) {
    return {
      title: "Biochemistry Analyzer | Working Principle & Uses",
      desc: "Explore how a biochemistry analyzer works, its principle, uses, and the role it plays in delivering accurate clinical chemistry test results.",
      image: `https://cpcdiagnostics.in/assets/Biochemistry-Analyzer-Its-working-principle-uses-and-price-BsoC7zEY.jpg`
    };
  }
  if (url.includes("/blog/what-a-hemo-globin-is-and-common-types-of-blood-disorder")) {
    return {
      title: "What Is Hemoglobin? Types of Blood Disorders Explained",
      desc: "Learn what hemoglobin is, its function in the body, and common blood disorders associated with abnormal hemoglobin levels.",
      image: `https://cpcdiagnostics.in/assets/blog-4-dQVJZTpG.jpg`
    };
  }
  if (url.includes("/blog/an-introduction-to-a-fully-automated-immunoassay-analyzer")) {
    return {
      title: "Fully Automated Immunoassay Analyzer | Introduction Guide",
      desc: "An introduction to fully automated immunoassay analyzers, their working process, technologies used, and benefits for clinical diagnostics.",
      image: `https://cpcdiagnostics.in/assets/blog-5-DwY4ojCq.jpg`
    };
  }
  if (url.includes("/blog/how-to-ensure-effective-result-in-haematology-analyzers")) {
    return {
      title: "How to Ensure Accurate Results in Hematology Analyzers",
      desc: "Discover essential practices to ensure effective and accurate results in hematology analyzers for reliable clinical testing.",
      image: `https://cpcdiagnostics.in/assets/blog-7.jpg`
    };
  }
  if (url.includes("/blog/basics-of-3-part-hematology-analyzer")) {
    return {
      title: "3-Part Hematology Analyzer | Basics & Key Features",
      desc: "Understand the basics of a 3-part hematology analyzer, including its working, parameters, and advantages in clinical laboratories.",
      image: `https://cpcdiagnostics.in/assets/dnynacount-BgfeSJg9.png`
    };
  }
  if (url.includes("/blog/microalbuminuria-test")) {
    return {
      title: "Microalbuminuria | Causes, Diagnosis & Clinical Importance",
      desc: "Learn what microalbuminuria is, its causes, diagnostic methods, and why early detection is crucial for kidney health.",
      image: `https://cpcdiagnostics.in/assets/Membrane_740x480-OABilDXk.png`
    };
  }
  if (url.includes("/blog/allergies-causes-symptoms")) {
    return {
      title: "Allergies Explained | Causes, Symptoms & Diagnosis",
      desc: "Explore what allergies are, their causes, symptoms, and diagnostic methods used in clinical practice.",
      image: `https://cpcdiagnostics.in/assets/hypersensive-european-man-suffers-from-allergy-has-red-swelling-eyes-inflammation-nose-sick-man-caught-cold-uses-nasal-drops-holds-handkerchief-symptoms-flu-fever-needs-treatment-768x512-Bno_BVA6.jpg`
    };
  }
  if (url.includes("/blog/novel-treatment-for-lethal-diseases")) {
    return {
      title: "Novel Treatments for Lethal Diseases | Latest Approaches",
      desc: "Discover cutting-edge treatment modalities for lethal diseases, including new technologies, therapies, and clinical advancements.",
      image: `https://cpcdiagnostics.in/assets/woman-patient-receives-thyroid-diagnostics-treatment-thyrotoxicosis-hypothyroidism-ultrasound-diagnostics-endocrine-system-thyroid-768x512-Ce0woGDQ.jpg`
    };
  }
  if (url.includes("/blog/lab-mean-explained")) {
    return {
      title: "What Is Lab Mean? Understanding Lab Mean Values",
      desc: "Learn what “lab mean” means, how it is calculated, and its importance in laboratory quality control.",
      image: `https://cpcdiagnostics.in/assets/medium-shot-woman-looking-through-microscope-768x549-CNEbtb0T.jpg`
    };
  }
  if (url.includes("/blog/rheumatoid-factor-introduction")) {
    return {
      title: "Rheumatoid Factor | Meaning, Testing & Clinical Use",
      desc: "Explore what rheumatoid factor is, how it is tested, and its significance in diagnosing autoimmune conditions.",
      image: `https://cpcdiagnostics.in/assets/blog-12-DUuu6Wx3.jpg`
    };
  }
  if (url.includes("/blog/lipid-profile-test")) {
    return {
      title: "Lipid Profile Test | Overview & Clinical Importance",
      desc: "Learn about the lipid profile test, its components, and why it is essential for assessing cardiovascular health.",
      image: `https://cpcdiagnostics.in/assets/blog-13-CYWYT4Xp.jpg`
    };
  }
  if (url.includes("/blog/cardiac-biomarkers-heart-attack")) {
    return {
      title: "Cardiac Biomarkers in Heart Attack | Complete Guide",
      desc: "Understand how cardiac biomarkers help diagnose heart attacks, their types, and clinical relevance in emergency care.",
      image: `https://cpcdiagnostics.in/assets/blog-14-CuzX09Hj.jpg`
    };
  }
  if (url.includes("/blog/blood-disorders-overview")) {
    return {
      title: "Blood Disorders Explained | Types & Symptoms",
      desc: "Explore common blood disorders, their symptoms, causes, and diagnostic approaches used in modern hematology.",
      image: `https://cpcdiagnostics.in/assets/blog-15-fK_kuVqA.jpg`
    };
  }
  if (url.includes("/blog/hyperlipidemia-atherosclerosis")) {
    return {
      title: "Hyperlipidemia & Atherosclerosis | Causes & Risks",
      desc: "Learn how hyperlipidemia contributes to atherosclerosis, its causes, risk factors, and prevention strategies.",
      image: `https://cpcdiagnostics.in/assets/blog-16-DCXo0Vx5.jpg`
    };
  }
  if (url.includes("/blog/anti-phospholipid-syndrome")) {
    return {
      title: "Anti-Phospholipid Syndrome | Symptoms & Diagnosis",
      desc: "Discover what anti-phospholipid syndrome is, its symptoms, complications, and diagnostic testing methods.",
      image: `https://cpcdiagnostics.in/assets/blog-17-RK-FvA6A.webp`
    };
  }
  if (url.includes("/blog/systemic-sclerosis-disease")) {
    return {
      title: "Systemic Sclerosis | Symptoms, Causes & Diagnosis",
      desc: "Learn about systemic sclerosis, its causes, symptoms, and diagnostic tools used to identify and manage this autoimmune disorder.",
      image: `https://cpcdiagnostics.in/assets/blog-18-DbmGfVEd.png`
    };
  }

  if (url.includes("/biochemistry-analyzer")) {
    return {
      title: "Buy Advanced Biochemistry Analyzer in India at Best Price",
      desc: "Explore advanced biochemistry analyzers in India. Get reliable, high-performance biochemistry machines at the best prices for clinical labs.",
      image: `https://cpcdiagnostics.in/assets/frame1-DLMJSD__.pngs`
    };
  }

  if (url.includes("/biochemistry-analyzer/fully-automatic")) {
    return {
      title: "Fully Automatic Biochemistry Analyzer Manufacturer from India",
      desc: "Find fully automatic biochemistry analyzers made in India. Boost lab accuracy and efficiency with our high-quality, automated analyzers.",
      image: `https://cpcdiagnostics.in/og/biochemistry.jpg`
    };
  }
  if (url.includes("/biochemistry-analyzer/fully-automatic/turbochem-magna")) {
    return {
      title: "TURBOCHEM MAGNA | Fully Autmatic Biochemisry Analyzer",
      desc: "TURBOCHEM MAGNA is an advanced fully automatic biochemistry analyzer delivering precise, reliable clinical chemistry test results for modern laboratories.",
      image: `https://cpcdiagnostics.in/assets/Turbochem%20Magna-ClU6wR4G.webp`
    };
  }
  if (url.includes("/biochemistry-analyzer/fully-automatic/turbochem-prime")) {
    return {
      title: "TURBOCHEM PRIME | Fully Automatic Biochemistry Analyzer",
      desc: "TURBOCHEM PRIME ensures fast, accurate, and high-throughput biochemical testing. A fully automatic biochemistry analyzer built for consistent performance.",
      image: `https://cpcdiagnostics.in/assets/Turbochem%20Prime-BSlUf3ZB.webp`
    };
  }
  if (url.includes("/biochemistry-analyzer/fully-automatic/turbochem-optima")) {
    return {
      title: "TURBOCHEM OPTIMA | Fully Automatic Biochemistry Analyzer",
      desc: "TURBOCHEM OPTIMA offers precision, speed, and reliability in biochemical analysis. An ideal fully automatic biochemistry analyzer for diagnostic labs.",
      image: `https://cpcdiagnostics.in/og/biochemistry.jpg`
    };
  }

  if (url.includes("/biochemistry-analyzer/semi-automatic")) {
    return {
      title: "Buy Semi Automatic Biochemistry Analyzer | Semi Auto Analyser",
      desc: "Buy reliable semi automatic biochemistry analyzers designed for precision and performance. Perfect for medium and small diagnostic labs.",
      image: `https://cpcdiagnostics.in/assets/plus1-Dpa2iBBO.png`
    };
  }
  if (url.includes("/biochemistry-analyzer/semi-automatic/turbostat-plus")) {
    return {
      title: "TURBOSTAT PLUS | High-Performance Semi Auto Analyser",
      desc: "TURBOSTAT PLUS semi automatic biochemistry analyzer delivers reliable and efficient clinical chemistry results for laboratories of all sizes.",
      image: `https://cpcdiagnostics.in/assets/plus1-Dpa2iBBO.png`
    };
  }

  if (url.includes("/biochemistry-analyzer/reagents")) {
    return {
      title: "Biochemistry Reagent at Best Price | Clinical Chemistry Reagent",
      desc: "Shop premium biochemistry reagents for accurate clinical chemistry testing. Affordable pricing and consistent quality for diagnostic labs.",
      image: `https://cpcdiagnostics.in/assets/reagent-bLfoxoIk.png`
    };
  }
  if (url.includes("/biochemistry-analyzer/reagents/i-chem-prime")) {
    return {
      title: "i-chem Prime | Biochemistry Reagent for Clinical Chemistry",
      desc: "i-chem Prime reagents offer consistent quality and accuracy for biochemistry analyzers. Designed for reliable clinical chemistry testing performance.",
      image: `https://cpcdiagnostics.in/assets/reagent-bLfoxoIk.png`
    };
  }

  if (url.includes("/biochemistry-analyzer/reagents/i-chem-magna")) {
    return {
      title: "i-chem Magna | High-Quality Biochemistry Reagent",
      desc: "i-chem Magna reagents ensure precision and stability in clinical chemistry testing, supporting accurate biochemistry analyzer performance.",
      image: `https://cpcdiagnostics.in/assets/reagent-bLfoxoIk.png`
    };
  }
  if (url.includes("/biochemistry-analyzer/reagents/identi-immuno-turbidimetry")) {
    return {
      title: "identi Immunoturbidimetric Reagents for Biochemistry Analyzer",
      desc: "identi Immuno Turbidimetry reagents deliver high-sensitivity protein analysis for biochemistry systems. Reliable, accurate, and efficient.",
      image: `https://cpcdiagnostics.in/assets/reagent-bLfoxoIk.png`
    };
  }

  if (url.includes("/biochemistry-analyzer/reagents/identi")) {
    return {
      title: "identi Reagent for Clinical Chemistry Analyzer",
      desc: "identi reagents offer consistent quality and accuracy for clinical chemistry analyzers. Designed for reliable clinical chemistry testing performance.",
      image: `https://cpcdiagnostics.in/assets/reagent-bLfoxoIk.png`
    };
  }
  if (url.includes("/electrolyte-analyzer")) {
    return {
      title: "Best electrolyte analyzer in india at Affordable Price",
      desc: "Discover the best electrolyte analyzers in India at affordable prices. Designed for accurate ion analysis in clinical laboratories.",
      image: `https://cpcdiagnostics.in/assets/Jokoh%20Ex-D-CsuSpaHX.webp`
    };
  }
  if (url.includes("/electrolyte-analyzer/with-auto-loader")) {
    return {
      title: "Buy Portable Electrolyte Analyzer | With Auto Loader",
      desc: "Buy portable electrolyte analyzers with auto loader for automated and precise testing. Compact, efficient, and lab-ready solutions.",
      image: `https://cpcdiagnostics.in/assets/Jokoh%20Ex-D-CsuSpaHX.webp`
    };
  }
  if (url.includes("/electrolyte-analyzer/with-auto-loader/jokoh-ex-d")) {
    return {
      title: "JOKOH Ex-D Electrolyte Analyzer With Auto Loader",
      desc: "JOKOH Ex-D Electrolyte Analyzer with Auto Loader delivers rapid and accurate electrolyte testing with smart automation for laboratories.",
      image: `https://cpcdiagnostics.in/assets/Jokoh%20Ex-D-CsuSpaHX.webp`
    };
  }
  if (url.includes("/electrolyte-analyzer/without-auto-loader")) {
    return {
      title: "Buy Portable Electrolyte Analyzer | Without Auto Loader",
      desc: "Get cost-effective portable electrolyte analyzers without auto loader. Accurate, easy-to-use equipment for modern labs.",
      image: `https://cpcdiagnostics.in/assets/Jokoh%20Ex-Ds-BOv2i3iL.webp`
    };
  }
  if (url.includes("/electrolyte-analyzer/without-auto-loader/jokoh-ex-ds")) {
    return {
      title: "JOKOH Ex-Ds Electrolyte Analyzer Without Auto Loader",
      desc: "JOKOH Ex-Ds Electrolyte Analyzer without Auto Loader delivers rapid and accurate electrolyte testing with smart automation for laboratories.",
      image: `https://cpcdiagnostics.in/assets/Jokoh%20Ex-Ds-BOv2i3iL.webp`
    };
  }

  if (url.includes("/hematology-analyzer")) {
    return {
      title: "Buy Automated Hematology Analyzer in india | CBC Machine",
      desc: "Buy automated hematology analyzers in India. Ensure precise blood testing with advanced CBC machine systems.",
      image: `https://cpcdiagnostics.in/og/hematology.jpg`
    };
  }

  if (url.includes("/hematology-analyzer/3-part")) {
    return {
      title: "3 Part hematology Analyzer at Best Price | 3 Part CBC Machine",
      desc: "Get affordable 3-part hematology analyzers built for accurate and fast blood testing in diagnostic laboratories.Get affordable 3-part hematology analyzers built for accurate and fast blood testing in diagnostic laboratories.",
      image: `https://cpcdiagnostics.in/assets/Dynacount%203D%20Plus-BFuhHW6u.webp`
    };
  }
  if (url.includes("/hematology-analyzer/3-part/dynacount-3d-plus")) {
    return {
      title: "Explore DYNACOUNT 3D PLUS | 3 Part CBC Machine",
      desc: "Explore DYNACOUNT 3D PLUS, a 3-part CBC machine offering precise hematology analysis with advanced technology for reliable diagnostic performance.",
      image: `https://cpcdiagnostics.in/assets/Dynacount%203D%20Plus-BFuhHW6u.webp`
    };
  }
  if (url.includes("hematology-analyzer/5-part")) {
    return {
      title: "Buy High Quality 5 Part Hematology Analyzer at Reasonable Price",
      desc: "Buy high-quality 5-part hematology analyzers for advanced blood diagnostics. Get accurate CBC results with trusted performance.",
      image: `https://cpcdiagnostics.in/assets/Dynacount%205D%20PRO-DNHkiv-4.png`
    };
  }
  if (url.includes("/hematology-analyzer/5-part/dynacount-5d-pro")) {
    return {
      title: "Buy DYNACOUNT 5D PRO at Affordable Price | 5 Part CBC Machine",
      desc: "DYNACOUNT 5D PRO is a 5-part CBC analyzer engineered for speed, accuracy, and efficiency in hematology diagnostics for clinical laboratories.",
      image: `https://cpcdiagnostics.in/assets/Dynacount%205D%20PRO-DNHkiv-4.png`
    };
  }
  if (url.includes("/hematology-analyzer/5-part/dynacount-5d-elite")) {
    return {
      title: "Get DYNACOUNT 5D ELITE at Best Price | 5 Part CBC Machine",
      desc: "DYNACOUNT 5D ELITE provides advanced hematology testing with 5-part differential results, ensuring reliable and high-throughput lab performance.",
      image: `https://cpcdiagnostics.in/assets/Dynacount%205D%20Elite-Uq3VAvzy.png`
    };
  }
  if (url.includes("/hematology-analyzer/esr-analyzer")) {
    return {
      title: "ESR Analyzer at Affordable Price | Automatic ESR Analyzer",
      desc: "Shop automatic ESR analyzers for reliable erythrocyte sedimentation rate testing. Ensure precision and efficiency in every test.",
      image: `https://cpcdiagnostics.in/assets/vision-C5FrrQW9.webp`
    };
  }
  if (url.includes("/hematology-analyzer/esr-analyzer/vision-pro")) {
    return {
      title: "VISION Pro Automated ESR Analyzer",
      desc: "VISION Pro Automated ESR Analyzer ensures fast, accurate erythrocyte sedimentation rate testing for modern laboratories and diagnostic centers.",
      image: `https://cpcdiagnostics.in/assets/vision-C5FrrQW9.webp`
    };
  }
  if (url.includes("/hematology-analyzer/esr-analyzer/sedrate-pro")) {
    return {
      title: "SEDRATE PRO Automated ESR Analyzer",
      desc: "SEDRATE PRO Automated ESR Analyzer delivers precision and consistency in ESR testing, ideal for routine clinical laboratory diagnostics.",
      image: `https://cpcdiagnostics.in/assets/product1-DeBTS6Yz.png`
    };
  }
  if (url.includes("/immunoassay-analyzer")) {
    return {
      title: "Buy Immunoassay Analyzer and Assays at Best Price | Immunology",
      desc: "Buy immunoassay analyzers and assays at the best price. Trusted immunology testing solutions for labs and hospitals in India.",
      image: `https://cpcdiagnostics.in/og/immunoassay.jpg`
    };
  }

  if (url.includes("/immunoassay-analyzer/elisa")) {
    return {
      title: "ELISA immunoassay Analyzer |  Fully Automated ELISA Analyzer",
      desc: "Get fully automated ELISA analyzers for accurate immunoassay testing. Reliable, fast, and suitable for high-throughput laboratories.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/immunoassay-analyzer/elisa/euroimmun-i-2p")) {
    return {
      title: "EUROIMMUN Analyzer I-2P Fully Automated ELISA Processing Analyzer",
      desc: "EUROIMMUN Analyzer I-2P Fully Automated ELISA Analyzer enhances testing accuracy and throughput with intelligent automation for clinical immunoassays.",
      image: `https://cpcdiagnostics.in/assets/product1-BOP0qeDg.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/elisa/euroimmun-i")) {
    return {
      title: "EUROIMMUN Analyzer I-2P Fully Automated ELISA Processing Analyzer",
      desc: "EUROIMMUN Analyzer I-2P Fully Automated ELISA Analyzer enhances testing accuracy and throughput with intelligent automation for clinical immunoassays.",
      image: `https://cpcdiagnostics.in/assets/product1-CfTxTf-a.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/immunoblot")) {
    return {
      title: "Buy Immunoblot Test Machine | Immunoblot Analyzer at Best Price",
      desc: "Buy immunoblot analyzers and test machines for efficient immunoblot assays. Affordable and precise diagnostic instruments.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/immunoassay-analyzer/immunoblot/plexmat-4")) {
    return {
      title: "PlexMAT-4 Immunoblot Analyzer | Automated Western Blot Processor",
      desc: "PlexMAT-4 Immunoblot Analyzer offers high-quality automated western blot processing for consistent and efficient immunoblot testing.",
      image: `https://cpcdiagnostics.in/assets/product1-CKoOuM7g.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/immunoblot/plexmat-8")) {
    return {
      title: "PlexMAT-8 Immunoblot Analyzer | Automated Western Blot Processor",
      desc: "PlexMAT-8 Immunoblot Analyzer offers high-quality automated western blot processing for consistent and efficient immunoblot testing.",
      image: `https://cpcdiagnostics.in/assets/PlexMAT8-QZJ14goH.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/immunoblot/euroblotone")) {
    return {
      title: "EUROBlotOne |  Fully Automated Immunoblot Analyzer",
      desc: "EUROBlotOne Fully Automated immunoassay analyzer streamlines blotting workflows, providing fast and reliable immunoassay analysis.",
      image: `https://cpcdiagnostics.in/assets/product1-C0RQ820i.webp`
    };
  }

  if (url.includes("/immunoassay-analyzer/ifa")) {
    return {
      title: "Best immunofluorescence assay analyzer | Automated IFA Analyzer",
      desc: "Shop automated IFA analyzers for immunofluorescence testing. Designed for accuracy and reliability in diagnostic applications.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/immunoassay-analyzer/ifa/if-sprinter")) {
    return {
      title: "Fully Automatic IF Sprinter EUROIMMUN Analyzer | IFT/ELISA tests",
      desc: "Fully automated IF Sprinter Analyzer performs precise immunofluorescence testing and IFT/ELISA tests in one instrument.",
      image: `https://cpcdiagnostics.in/assets/product1-D8roKGHo.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/ifa/eutostar-iii-plus")) {
    return {
      title: "EUROStar III Plus Immunofluorescence Assay Analyzer",
      desc: "EUROStar III Plus Automated IFA Analyzer offers high-accuracy immunofluorescence testing with easy operation and fast result processing.",
      image: `https://cpcdiagnostics.in/assets/product1-CRfcdK3E.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/ifa/europattern-microscope")) {
    return {
      title: "EUROPattern Microscope Automated Immunofluorescence Microscopy",
      desc: "EUROPattern Microscope enables automated immunofluorescence microscopy with advanced image capture and supported pattern recognition.",
      image: `https://cpcdiagnostics.in/assets/product1-Bvzq45Bt.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/ifa/fluoromat-50")) {
    return {
      title: "FluoroMAT 50 Immunofluorescence Assay Analyzer",
      desc: "FluoroMAT 50 is an advanced immunofluorescence analyzer providing precise IFA results with automation and consistent performance.",
      image: `https://cpcdiagnostics.in/assets/product1-ZL61LgQF.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/ifa/sprinter-xl")) {
    return {
      title: "Sprinter XL | Fully Automated Immunoassay Analyzer",
      desc: "Sprinter XL Fully Automated Immunoassay Analyzer combines high speed, precision, and reliability for advanced immunodiagnostic workflows",
      image: `https://cpcdiagnostics.in/assets/Sprinter%20XL-DWwCqTzm.webp`
    };
  }

  if (url.includes("/immunoassay-analyzer/clia")) {
    return {
      title: "Chemiluminescence Immunoassay Analyzer (CLIA Analyzer) Products",
      desc: "Explore chemiluminescence immunoassay (CLIA) analyzers for precise diagnostics. Get advanced testing accuracy for clinical labs.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/immunoassay-analyzer/clia/iflash-3000")) {
    return {
      title: "YHLO iFlash 3000 Chemiluminescence Immunoassay Analyzer",
      desc: "iFlash 3000 Chemiluminescence Immunoassay Analyzer ensures accurate, high-throughput testing with advanced automation for reliable diagnostics.",
      image: `https://cpcdiagnostics.in/assets/PlexMAT8-QZJ14goH.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/clia/iflash-1800")) {
    return {
      title: "YHLO iFlash 1800 Chemiluminescence Immunoassay Analyzer",
      desc: "YHLO iFlash 1800 is an advanced chemiluminescence immunoassay analyzer offering precision, speed, and consistency for clinical laboratories.",
      image: `https://cpcdiagnostics.in/assets/product1-Cwvy2ut4.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/clia/iflash-1200")) {
    return {
      title: "YHLO iFlash 1200 Chemiluminescence Immunoassay Analyzer",
      desc: "YHLO iFlash 1200 Chemiluminescence Immunoassay Analyzer delivers compact, efficient, and reliable testing for routine diagnostic applications.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }

  if (url.includes("/immunoassay-analyzer/trace")) {
    return {
      title: "Buy Trace Immunoassay Prenatal Analyzer machie at Best Price",
      desc: "Buy Trace Immunoassay Prenatal Analyzers at best price. High sensitivity, accurate results, and efficient performance for labs.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/immunoassay-analyzer/trace/kryptor-compact-plus")) {
    return {
      title: "Thermo Fisher Scientific B·R·A·H·M·S KRYPTOR compact PLUS",
      desc: "Thermo Fisher Scientific B·R·A·H·M·S KRYPTOR compact PLUS Analyzer offers fast and precise immunoassay results using advanced TRACE technology.",
      image: `https://cpcdiagnostics.in/assets/product1-BdYVsIlr.webp`
    };
  }
  if (url.includes("/immunoassay-analyzer/fia")) {
    return {
      title: "Advanced Automated Fluorescence Immunoassay Analyzer | FIA Analyzer",
      desc: "Advanced fluorescence immunoassay (FIA) analyzers for accurate and rapid testing. Ideal for point-of-care diagnostics.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%202-upsC3EVV.png`
    };
  }
  if (url.includes("/immunoassay-analyzer/fia/afias-1")) {
    return {
      title: "Boditech AFIAS -1 Analyzer | Automated Immunoassay Analyzer",
      desc: "Boditech AFIAS-1 Analyzer is a compact automated immunoassay system providing quick and accurate point-of-care diagnostics.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%202-upsC3EVV.png`
    };
  }
  if (url.includes("/immunoassay-analyzer/fia/afias-3")) {
    return {
      title: "Boditech AFIAS -3 Analyzer | Automated Immunoassay Analyzer",
      desc: "Boditech AFIAS-3 Analyzer performs rapid and precise immunoassay testing with high efficiency and automation for diagnostic labs.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%203-2-CAAfL3lf.png`
    };
  }
  if (url.includes("/immunoassay-analyzer/fia/afias-6")) {
    return {
      title: "Boditech AFIAS -6 Analyzer | Automated Immunoassay Analyzer",
      desc: "Boditech AFIAS-6 Analyzer offers enhanced throughput and automation for simultaneous immunoassay testing with proven reliability.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%206-2-ByhePOJk.png`
    };
  }
  if (url.includes("/immunoassay-analyzer/fia/afias-10")) {
    return {
      title: "Boditech AFIAS -10 Analyzer | Automated Immunoassay Analyzer",
      desc: "Boditech AFIAS-10 Analyzer delivers high-volume, fully automated immunoassay testing with accuracy and efficiency for modern labs.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%2010-1-D2Zfu7Em.png`
    };
  }
  if (url.includes("/point-of-care")) {
    return {
      title: "Buy POCT Testing Equipment | Popular Point of Care Analyzer",
      desc: "Buy point-of-care analyzers a POCT testing equipment. Get accurate, portable solutions for quick diagnostic decisions.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/point-of-care/ichroma/ichroma-3")) {
    return {
      title: "Buy Boditech ichroma™ III Advanced Compact POCT Analyzer",
      desc: "Boditech ichroma™ III is a compact POCT analyzer offering rapid and accurate testing across various clinical parameters for healthcare professionals.",
      image: `https://cpcdiagnostics.in/assets/AFIAS%2010-1-D2Zfu7Em.png`
    };
  }
  if (url.includes("/point-of-care/ichroma/ichroma-2")) {
    return {
      title: "Buy Boditech ichroma™ II Advanced Point of Care Testing",
      desc: "Boditech ichroma™ II is an advanced point-of-care testing analyzer designed for quick, precise, and reliable diagnostic results in clinical settings.",
      image: `https://cpcdiagnostics.in/assets/product1-BC3nZAnh.webp`
    };
  }
  if (url.includes("/molecular-diagnostics")) {
    return {
      title: "Buy Medical Equipment for Molecular Diagnostics Lab Systems",
      desc: "Shop molecular diagnostics analyzers and machines for advanced lab systems. Reliable performance for precision testing.",
      image: `https://cpcdiagnostics.in/assets/product1-BC3nZAnh.webp`
    };
  }
  if (url.includes("/molecular-diagnostics/labscan/labscan-3d")) {
    return {
      title: "Luminex LABScan 3D Advanced IVD System | FLEXMAP 3D",
      desc: "Luminex LABScan 3D is an advanced IVD system offering flexible multiplexing and precise diagnostic performance for molecular laboratories.",
      image: `https://cpcdiagnostics.in/assets/product1-BC3nZAnh.webp`
    };
  }
  if (url.includes("/molecular-diagnostics/labscan/labscan-100")) {
    return {
      title: "One Lamda Luminex LABScan 100 Flexible Multiplexing Analyzer",
      desc: "One Lambda LABScan 100 delivers accurate and flexible multiplexing analysis with high sensitivity, ideal for clinical and research diagnostics.",
      image: `https://cpcdiagnostics.in/assets/product1-BC3nZAnh.webp`
    };
  }
  if (url.includes("/pre-analytical-automation")) {
    return {
      title: "Buy Pre Analytical Automation Products for Clinical Labs",
      desc: "Buy pre-analytical automation systems to streamline lab workflows. Boost accuracy, efficiency, and sample traceability.",
      image: `https://cpcdiagnostics.in/og/electrolyte.jpg`
    };
  }
  if (url.includes("/pre-analytical-automation/sample-sorter/sortpro-sample-sorter")) {
    return {
      title: "Fully Automated SortPro Sample Sorter Automation",
      desc: "SorPro Fully Automated Sample Sorter provides efficient tube sorting and labeling automation for enhanced workflow in clinical laboratories.",
      image: `https://cpcdiagnostics.in/assets/product1-vLhbqqfB.webp`
    };
  }

  return null;
}

// =============== MAIN OG ROUTER ===============
app.get("*", (req, res) => {
  const url = req.originalUrl.split("?")[0];

  const ua = req.headers["user-agent"] || "";
  const isBot = /facebookexternalhit|twitterbot|whatsapp|linkedinbot|telegram|googlebot/i.test(ua);

  let ogData = STATIC_PAGES[url] || detectCategoryData(url);

  if (!ogData) {
    ogData = {
      title: "CPC Diagnostics",
      desc: "Advanced diagnostic laboratory solutions.",
      image: DEFAULT_IMAGE
    };
  }

  // 👇 Redirect ONLY real users
  if (!isBot) {
    return res.redirect(`/CPC${url}`);
  }

  // 👇 Bots get OG HTML (NO redirect)
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <title>${ogData.title}</title>

  <meta property="og:title" content="${ogData.title}" />
  <meta property="og:description" content="${ogData.desc}" />
  <meta property="og:image" content="${ogData.image}" />
  <meta property="og:url" content="https://cpcdiagnostics.in${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="CPC Diagnostics">

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogData.title}" />
  <meta name="twitter:description" content="${ogData.desc}" />
  <meta name="twitter:image" content="${ogData.image}" />
</head>
<body></body>
</html>
  `);
});



// Serve frontend build
app.use("/CPC", express.static(FRONTEND_PATH));

// Start server
app.listen(8080, () => console.log("CPC OG Backend running on port 8080"));