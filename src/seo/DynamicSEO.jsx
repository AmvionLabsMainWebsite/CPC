import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seoData from "./seoData.json";

const DynamicSEO = () => {
  const location = useLocation();
  const rawPath = location.pathname.toLowerCase();

  // Normalize path (remove trailing slash)
  const path = rawPath !== "/" ? rawPath.replace(/\/$/, "") : "/";

  // Exact match or fallback to homepage
  const meta = seoData[path] || seoData[rawPath] || seoData["/"];

  // ----------------------------------------------------------------
  // 🔥 AUTO-INJECT VISUALLY HIDDEN <H1> (SEO DETECTS, USERS DON'T)
  // ----------------------------------------------------------------
  useEffect(() => {
    let h1 = meta?.h1 || "Everlife CPC Diagnostics";

    // dynamic blog details
    if (path.startsWith("/blog/") && !meta?.h1) {
      h1 = "Blog Details";
    }

    // dynamic product pages (/category, /category/sub, /id)
    const segments = path.split("/").filter(Boolean);
    if (segments.length >= 1 && !meta?.h1) {
      h1 = "Product Details";
    }

    // remove old h1 if exists
    // const oldH1 = document.querySelector("h1.dynamic-h1");
    // if (oldH1) oldH1.remove();

    // create invisible SEO-friendly h1
    // const h1Tag = document.createElement("h1");
    // h1Tag.className = "dynamic-h1 seo-hidden-h1";
    // h1Tag.innerText = h1;

    // prepend to body (SEO-readable, user-hidden)
    // document.body.prepend(h1Tag);
  }, [path, meta]);

  useEffect(() => {
    if (!meta) return;

    document.title = meta.title || "Everlife CPC Diagnostics";

    // Remove old meta tags
    const tagsToRemove = [
      "meta[name='description']",
      "meta[name='keywords']",
      "meta[property='og:title']",
      "meta[property='og:description']",
      "meta[property='og:image']",
      "meta[property='og:type']",
      "meta[property='og:url']",
      "meta[name='twitter:card']",
      "meta[name='twitter:title']",
      "meta[name='twitter:description']",
      "meta[name='twitter:image']",
    ];

    tagsToRemove.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    });

    // Add meta tag helper
    const addMeta = (attr, name, content) => {
      if (!content) return;
      const tag = document.createElement("meta");
      tag.setAttribute(attr, name);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    };

    // Keywords merge
    const keywords = [
      ...(meta.primaryKeywords || []),
      ...(meta.secondaryKeywords || []),
    ].join(", ");

    const ogImage = meta.image || "/default-og-image.jpg";

    // BASIC
    addMeta("name", "description", meta.description);
    addMeta("name", "keywords", keywords);

    // OPEN GRAPH
    addMeta("property", "og:title", meta.title);
    addMeta("property", "og:description", meta.description);
    addMeta("property", "og:image", ogImage);
    addMeta("property", "og:type", "website");
    addMeta("property", "og:url", window.location.href);

    // TWITTER
    addMeta("name", "twitter:card", "summary_large_image");
    addMeta("name", "twitter:title", meta.title);
    addMeta("name", "twitter:description", meta.description);
    addMeta("name", "twitter:image", ogImage);
  }, [path, meta]);

  return null;
};

export default DynamicSEO;
