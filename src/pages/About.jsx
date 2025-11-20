import React from "react";

function About() {
  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center bg-gray-100 dark:bg-[#0d0d0d] transition-colors duration-300">
      <div className="max-w-3xl w-full p-8 rounded-2xl shadow-xl 
                      bg-white/70 dark:bg-white/5 backdrop-blur-md 
                      border border-white/40 dark:border-white/10
                      animate-fadeIn">
        
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About
        </h1>

        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          Hi, I’m <span className="font-semibold text-indigo-600 dark:text-indigo-400">Harsh</span> —
          a full-stack mobile and web developer with <b>2.6 years of experience</b> 
          building modern, scalable applications. I work with technologies like 
          <b> Flutter, React, Node.js, Express</b> and more.
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          I created this website as a <b>one-stop solution</b> for multiple
          development tasks — generating models, comparing strings, and soon
          many more utilities that make day-to-day development easier and faster.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          My goal is to keep expanding this platform with helpful tools that 
          save developers time and boost productivity.
        </p>
      </div>
    </div>
  );
}

export default About;
