import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-teal-700 md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="title-font font-medium text-white mb-4 md:mb-0">
          <a href="#about" className="ml-3 text-xl">
            Erin Ponsonby
          </a>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <a href="#projects" className="mr-5 text-white hover:font-medium">
            Past Work
          </a>
          <a href="#skills" className="mr-5 text-white hover:font-medium">
            Skills
          </a>
          <a href="#testimonials" className="mr-5 text-white hover:font-medium">
            Recommendations
          </a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center bg-teal-700 text-white border-0 py-1 px-3 focus:outline-none hover:bg-yellow-400 hover:text-gray-900 rounded text-base mt-4 md:mt-0">
          Work with Me
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </a>
      </div>
    </header>
  );
}