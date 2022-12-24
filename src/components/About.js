import React from "react";

export default function About() {
    return (
        <section id='About'>
            <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Hi, I'm Erin.
                        <br className="hidden lg:inline-block" /> I'm a front-end software engineer.
                    </h1>
                    <p className="mb-8 leading-relaxed text-gray-900">
                     After starting my career in the non-profit space, I discovered my love of code while working for a tech consulting firm in D.C. At work I am someone who is always looking for ways to improve team collaboration and inefficient processes. My goal is for us to be better as a team.  
                    </p>
                    <div className="flex justify-center">
                        <a
                        href="#contact"
                        className="inline-flex text-white bg-teal-700 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">
                        Work With Me
                        </a>
                        <a
                        href="#projects"
                        className="ml-4 inline-flex text-gray-900 bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-300 hover:text- rounded text-lg">
                        See My Past Work
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src="/IMG_3060_copy.JPG"
                    />
                </div>
            </div>
        </section>
    )
}