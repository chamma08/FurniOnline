import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <div className="max-padd-container p-12 flex justify-center items-center min-h-screen">
        <div className="bg-white p-12 rounded-md shadow-lg max-w-6xl w-full border-2 border-teal-400">
          <div className="flex flex-col md:flex-row justify-between mb-16">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">About Us</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Experience the future of furniture shopping with our AR and AI-powered solutions.
              </p>
            </div>
            <div>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-600 transition">
                Contact Us
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h2 className="text-4xl font-bold text-teal-600 mb-4">1.</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Who We Are</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We redefine interior design with cutting-edge technology, making your vision a reality.
              </p>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-bold text-teal-600 mb-4">2.</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">What We Do</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our AI-driven recommendations and AR visualization bring your dream furniture to life.
              </p>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-bold text-teal-600 mb-4">3.</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">How We Help</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Explore and customize furniture in real-time using AR, ensuring a perfect fit for your space.
              </p>
            </div>

            <div className="col-span-1">
              <h2 className="text-4xl font-bold text-teal-600 mb-4">4.</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your Success Story</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Elevate your home with smart furniture choices guided by AI-powered insights.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="col-span-1">
              <img
                src="/1.png"
                alt="Interior design"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="col-span-1">
              <img
                src="/b4.png"
                alt="Modern furniture"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4">
              <img
                src="/bg.jpg"
                alt="Chair design"
                className="w-full h-full object-cover rounded-md"
              />
              <img
                src="/b3.png"
                alt="Living room"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;