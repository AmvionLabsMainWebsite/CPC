import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CanonicalTag = () => {
    const location = useLocation();
    const baseUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || "http://localhost:5173/"; // remove trailing slash
    const cleanPath = location.pathname; // ignores ?query and #hash
    const canonicalUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`; // avoid double slash on home

    return (
        <Helmet>
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};

export default CanonicalTag;
