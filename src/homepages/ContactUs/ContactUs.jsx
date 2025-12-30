import React, { useState } from "react";
import "./contactUs.css";
import video from "../../Video/contact.webm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    currentPage: window.location.href,
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Stop submit if captcha is NOT done
    if (!captchaValue) {
      toast.error("Please complete reCAPTCHA.");
      return;
    }

    setMessageLoading(true);

    const { name, email, message, phone } = formData;

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      setMessageLoading(false);
      return;
    }

    const serviceId = "service_iu5gh35";
    const templateId = "template_r0gbogk";
    const publicKey = "xKnvcjJBWhEjVz7aJ";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "CPC Diagnostics",
      phone: phone,
      message: message,
      currentPage: window.location.href,
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("SUCCESS!", response.status);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        currentPage: window.location.href,
      });

      setCaptchaValue(null); // reset recaptcha
    } catch (error) {
      alert("Failed to send. Please try again.");
      console.error(error);
    } finally {
      setMessageLoading(false);
    }
  };

  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    let timer;
    if (showPopup) {
      setBannerVisible(true);
      setModalVisible(true);

      timer = setTimeout(() => setBannerVisible(false), 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [showPopup]);

  const closeModal = () => setModalVisible(false);
  const closeBanner = () => setBannerVisible(false);

  return (
    <div className="videoSection w-full flex justify-center items-center p-2 tablet:p-4 laptop:p-6 overflow-hidden">
      {messageLoading && (
        <div className="fixed top-0 left-0 h-screen w-full z-50 flex justify-center items-center text-xl text-white bg-black/70">
          <FontAwesomeIcon icon={faRocketchat} className="mr-2" /> Sending...
        </div>
      )}

      {bannerVisible && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
          <span>Message Sent Successfully ✅</span>
          <button
            onClick={closeBanner}
            aria-label="Close"
            className="text-white ml-2 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Section */}
      <div className="relative p-4 w-full h-auto min-h-[80vh] tablet:min-h-[90vh] laptop:h-[85vh] bg-light-green rounded-xl flex flex-col laptop:flex-row overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-xl"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 z-0 rounded-xl"></div>

        <div className="relative z-10 w-full laptop:w-1/2 flex flex-col justify-center p-6 text-white">
          <p className="font-bold text-3xl laptop:text-4xl">Let's Get in Touch</p>
          <p className="text-base laptop:text-lg max-w-xl mt-2">
            We're here to assist you with any questions or concerns.
          </p>
        </div>

        {/* Form Section */}
        <div className="relative z-10 w-full laptop:w-1/2 flex justify-center items-center px-6">
          <form
            onSubmit={handleSubmit}
            className="w-full tablet:w-[400px] laptop:w-[500px] flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[45px] outline-none p-3 rounded-lg text-white bg-transparent border border-white placeholder-white"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[45px] outline-none p-3 rounded-lg text-white bg-transparent border border-white placeholder-white"
              placeholder="user@gmail.com"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[45px] outline-none p-3 rounded-lg text-white bg-transparent border border-white placeholder-white"
              placeholder="Phone Number (10 digits)"
              required
              maxLength={10}
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              inputMode="numeric"
            />

            {formData.phone.length > 0 && formData.phone.length < 10 && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a 10-digit phone number.
              </p>
            )}


            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Have anything to say..."
              className="w-full h-[150px] outline-none p-3 rounded-lg text-white bg-transparent border border-white placeholder-white resize-none"
              required
            ></textarea>

            {/* SMALL reCAPTCHA */}
            <div className="flex justify-center scale-[0.75] origin-center">
              <ReCAPTCHA
                sitekey="6LcsiBIsAAAAAN3VVXXofHzZuNQIahyqQf61bo_0"
                onChange={setCaptchaValue}
              />
            </div>

            <button type="submit" className="btn-53">
              <div className="original text-lg">Send</div>
              <div className="letters text-lg">
                <span>S</span>
                <span>e</span>
                <span>n</span>
                <span>d</span>
              </div>
            </button>
          </form>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] tablet:w-[400px] text-center shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-green-700">Welcome from CPC</h2>
            <p className="text-gray-700 mt-2">
              We’ll get back to you shortly. Thank you for reaching out!
            </p>

            <Link
              to="/biochemistry-analyzer"
              className="inline-block bg-green-600 text-white px-5 py-2 mt-4 rounded-lg"
            >
              Explore our Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;
