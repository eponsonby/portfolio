import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";


export default function Resume() {
    return (
    <section id="resume">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          <DocumentTextIcon className="w-10 text-gray-900 inline-block mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">
            Resume
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-900">
            To see a copy of my resume, <a
              href="https://drive.google.com/file/d/1SexfemshVXR_5fFLfybJ893sJcugZv-v/view?usp=sharing"
            target="_blank"
            >click here</a>
          </p>
        </div>
       </div>
    </section>
    )
}