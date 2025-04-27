import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Contact Us
        </h2>

        {success && (
          <div className="bg-green-500 text-white p-4 rounded mb-6 text-center">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-400 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-400 focus:outline-none resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded hover:bg-purple-600 transition duration-200 disabled:bg-gray-500"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-400 text-2xl mb-3">📍</div>
            <h3 className="text-white font-bold mb-2">Address</h3>
            <p className="text-gray-400">Yavatmal, India</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg w-70">
            <div className="text-purple-400 text-2xl mb-3">📧</div>
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-gray-400">developer.anmol108@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
