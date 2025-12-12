import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            About CampusNotes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your one-stop destination for quality educational resources
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CampusNotes aims to make education more accessible by providing a
            platform where students can easily access and share high-quality
            study materials. We believe in the power of collaborative learning
            and strive to create a community where knowledge flows freely.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-400 text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Quality Content
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Carefully curated notes and study materials from top educators and
              students.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-400 text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Easy Access
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Simple and intuitive interface to find exactly what you need.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-purple-400 text-3xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Free Resources
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Access to a wide range of free educational materials.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Anmol Jadgilwar
              </h3>
              <p className="text-purple-600 dark:text-purple-400 mb-2">
                Founder & Developer
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Passionate about making education accessible to everyone.
              </p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
            <p className="text-gray-300">Study Materials</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
            <p className="text-gray-300">Active Users</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
            <p className="text-gray-300">Categories</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
