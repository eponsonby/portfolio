import React from "react";
import { CommandLineIcon, UsersIcon } from "@heroicons/react/24/solid";
import { recommendations } from "../data";

export default function Recommendations() {
  return (
    <section id="recommendations">
      <div className="container px-5 py-10 mx-auto text-center">
        <UsersIcon className="w-10 text-gray-900 inline-block mb-4" />
        <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-12">
          Recommendations
        </h1>
        <div className="flex flex-wrap m-4">
          {recommendations.map((recommendation) => (
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-teal-800 bg-opacity-80 p-8 rounded">
                <CommandLineIcon className="block w-8 text-white mb-4" />
                <p className="leading-relaxed text-white mb-6">{recommendation.quote}</p>
                <div className="inline-flex items-center">
                  <img
                    alt="recommendation"
                    src={recommendation.image}
                    className="w-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">
                      {recommendation.name}
                    </span>
                    <span className="text-white font-medium text-sm uppercase">
                      {recommendation.company}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}