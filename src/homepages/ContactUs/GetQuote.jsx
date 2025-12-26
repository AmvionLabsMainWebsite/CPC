import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";   // <-- recaptcha
import { toast } from 'react-toastify';
const GetQuote = () => {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null); // <-- store captcha result

    // ---- EmailJS init ----
    useEffect(() => {
        emailjs.init("F4jKSTj1C8YiHU0rK");
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate reCAPTCHA
        if (!captchaValue) {
    toast.error("Please complete reCAPTCHA.");
    return;
}

        setLoading(true);

        const serviceId = "service_pprcuse";
        const templateId = "template_97vm7b7";
        const publicKey = "F4jKSTj1C8YiHU0rK";

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            currentPage: window.location.href,
            to_name: "CPC Diagnostics",
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            setTimeout(() => {
                setSubmitted(false);
                setShowForm(false);
            }, 3000);

        } catch (error) {
            console.error("EmailJS error:", error);
            alert("Error sending message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-start">
            <button
                onClick={() => setShowForm(true)}
                className="bg-[#00A786] px-2 py-2 text-[#ffffff] rounded-xl text-sm font-semibold transition-all mt-4 w-[20%]"
            >
                Get a Quote
            </button>

           {showForm && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-xl shadow-lg w-[90%] max-w-sm relative animate-popup">
            <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
                &times;
            </button>

            <h2 className="text-lg font-bold text-[#00A786] mb-2 text-center">
                Get a Quote
            </h2>

            {submitted ? (
                <div className="text-center text-[#00A786] font-medium py-3 text-sm">
                    Thank you for reaching out! <br />
                    We’ll contact you shortly.
                </div>  
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">

                    {/* Name */}
                    <label className="text-xs font-medium">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        placeholder=" Your Name"
                        onChange={handleChange}
                        className="border rounded-md px-3 py-1.5 text-sm"
                        required
                    />

                    {/* Email */}
                    <label className="text-xs font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="user@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-1.5 text-sm"
                        required
                    />

                    {/* Phone */}
                    <label className="text-xs font-medium">Phone</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-1.5 text-sm"
                        required
                        placeholder="Phone Number(10 digits)"
                        maxLength={10}
                    
                    />
                    {/* Subject */}
                    <label className="text-xs font-medium">Subject</label>
                    <input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-1.5 text-sm"
                        required
                    />

                    {/* Message */}
                    <label className="text-xs font-medium">Message</label>
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="border rounded-md px-3 py-1.5 text-sm"
                    />

                    {/* reCAPTCHA */}
                    <div className="mt-1 flex justify-center scale-75 origin-center">
                        <ReCAPTCHA
                            sitekey="6LcsiBIsAAAAAN3VVXXofHzZuNQIahyqQf61bo_0"
                            onChange={(value) => setCaptchaValue(value)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00A786] text-white py-1.5 rounded-md mt-3 font-medium text-sm disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send Quote"}
                    </button>
                </form>
            )}
        </div>
    </div>
)}
        </div>
    );
};

export default GetQuote;
