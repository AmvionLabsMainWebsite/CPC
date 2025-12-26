import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound404 = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | CPC Diagnostics</title>
        <meta
          name="description"
          content="The page you are looking for doesn't exist. Navigate back to the homepage or explore our products."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://cpcdiagnostics.in/404" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-2">
          Oops! Looks like this page doesn’t exist.
        </h2>

        <p className="text-gray-600 mb-6">
          You might have mistyped the URL or the page has moved.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/"
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Go to Homepage
          </Link>

          <Link
            to="/biochemistry-analyzer"
            className="px-5 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition"
          >
            View Our Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound404;
