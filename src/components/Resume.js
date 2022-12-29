import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";


export default function Resume() {
    const ResumeLink = ({className = '', children}) => (
    <a
        href="https://drive.google.com/file/d/1SexfemshVXR_5fFLfybJ893sJcugZv-v/view?usp=share_link"
        target="_blank"
      rel="noreferrer"
      className={'font-medium ' + className}
    >{children}</a>)

    return (
    <section id="resume">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          <ResumeLink><DocumentTextIcon className="w-10 text-gray-900 inline-block mb-4" /></ResumeLink>
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">
            <ResumeLink>Resume</ResumeLink>
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-900">
            A copy of my resume can be found <ResumeLink
            className="font-medium"
            >here</ResumeLink>
          </p>
        </div>
       </div>
    </section>
    )
}