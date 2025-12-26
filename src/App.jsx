import { useContext, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Nav from "./component/Nav/Nav";
import CanonicalTag from "./component/CanonicalTag.jsx";
import DynamicSEO from "./seo/DynamicSEO";
import { CategoryContext } from "./component/Context/CategoryContext";

// CSS
import "./App.css";

// Toast (kept global)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ===========================
   LAZY LOADED ROUTES
=========================== */

const Home = lazy(() => import("./component/Home/Home"));
const About = lazy(() => import("./component/About/About"));
const Contact = lazy(() => import("./component/Contact/Contact"));
const Brand = lazy(() => import("./component/Brand/Brand"));
const Career = lazy(() => import("./component/Career/Career"));
const Success = lazy(() => import("./component/OurSuccess/Success"));
const Blog = lazy(() => import("./component/Blog/Blog"));
const SingleBlog = lazy(() => import("./component/Blog/SingleBlog"));
const Product = lazy(() => import("./component/Product/Product"));
const ProductSub = lazy(() => import("./component/Product/productsub"));
const ProductInfo = lazy(() => import("./component/ProductInfo/ProductInfo"));
const CSRPolicy = lazy(() => import("./component/CSRPolicy/CSRPolicy"));
const CookiePolicy = lazy(() =>
  import("./component/Policy/CookiePolicy/CookiePolicy")
);
const PrivacyPolicy = lazy(() =>
  import("./component/Policy/PrivacyPolicy/PrivacyPolicy")
);
const TermsAndConditions = lazy(() =>
  import(
    "./component/Policy/TermsAndConditions/TermsAndContions/TermsAndConditions"
  )
);
const Google = lazy(() => import("./component/Google/Google"));
const GoogleLanding = lazy(() => import("./component/GoogleLanding/GoogleLanding"));
const New = lazy(() => import("./homepages/Organisation/New"));
const NotFound404 = lazy(() =>
  import("./pages/ScrollParallex/NotFound404.jsx")
);

function App() {
  const location = useLocation();
  const { selectedCategory, setSelectedCategory } =
    useContext(CategoryContext);

  /* ===========================
     LAZY GSAP LOAD
  =========================== */

  useEffect(() => {
    let cleanup;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;

      gsap.set(".flair", { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(".flair", "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(".flair", "y", {
        duration: 0.8,
        ease: "power3",
      });

      const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      cleanup = () =>
        window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => cleanup && cleanup();
  }, []);

  return (
    <>
      {/* GLOBAL COMPONENTS (NOT LAZY) */}
      <Nav />
      <ToastContainer />

      {/* SEO */}
      <DynamicSEO />
      <CanonicalTag />

      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            {/* STATIC ROUTES */}
            <Route index element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/our-brands" element={<Brand />} />
            <Route path="/career" element={<Career />} />
            <Route path="/our-success" element={<Success />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<SingleBlog />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route
              path="/corporate-social-responsibility-csr-policy"
              element={<CSRPolicy />}
            />
            <Route path="/googleadd" element={<Google />} />
            <Route path="/googlelanding" element={<GoogleLanding />} />
            <Route path="/new" element={<New />} />

            {/* DYNAMIC PRODUCT ROUTES */}
            <Route path="/:category" element={<Product />} />
            <Route path="/:category/:section" element={<ProductSub />} />
            <Route path="/:category/:section/:id" element={<ProductInfo />} />
            <Route path="/:category/:id" element={<ProductInfo />} />

            {/* 404 */}
            <Route path="/404" element={<NotFound404 />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;
