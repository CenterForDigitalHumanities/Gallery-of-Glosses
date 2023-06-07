import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

const CompareGlosses = () => {
  // Initial placeholder data
  const [glosses, setGlosses] = useState([
    {
      city: "Rome",
      date: "13th century",
      origin: "Italy",
      description: "This manuscript contains religious texts and illustrations.",
      property1: "Decorated initials",
      property2: "Gold leaf embellishments",
    },
    {
      city: "Oxford",
      date: "14th century",
      origin: "England",
      description: "A collection of poetry and literary works from the Middle Ages.",
      property1: "Written in Middle English",
      property2: "Illuminated borders",
    },
    {
      city: "Toledo",
      date: "15th century",
      origin: "Spain",
      description: "An illuminated manuscript showcasing Arabic calligraphy and geometric patterns.",
      property1: "Arabic translation of Greek philosophical texts",
      property2: "Intricate geometric illuminations",
    },
    {
      city: "Vienna",
      date: "12th century",
      origin: "Austria",
      description: "A manuscript containing legal codes and statutes from the Holy Roman Empire.",
      property1: "Written in Latin",
      property2: "Historiated initials",
    },
  ]);
  

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Compare Glosses</h1>
      <div className="grid grid-cols-4 gap-4">
        {glosses.map((gloss, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <div className="flex">
              <h2 className="text-xl mb-2">Gloss {index + 1}</h2>
              <h className="ml-auto text-red-600">X</h>
            </div>
            <div className="flex flex-col">
              <h>{gloss.city}</h>
              <h>{gloss.date}</h>
              <h>{gloss.origin}</h>
              <h>{gloss.description}</h>
              <h>{gloss.property1}</h>
              <h>{gloss.property2}</h>
              <h>{gloss.city}</h>
            </div>
          </div>
        ))}
        
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">City</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.city}
              </h>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">Date</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.date}
              </h>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">Origin</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.origin}
              </h>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">Description</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.description}
              </h>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">Property1</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.property1}
              </h>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl mb-2">Property2</h2>
          <div className="flex flex-col">
            {glosses.map((gloss, index) => (
              <h key={index}>
                <strong>Gloss Name:</strong> {gloss.property2}
              </h>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          <FiDownload className="mr-2"/>
          Save .csv
        </button>
      </div>
    </div>
  );
};

export default CompareGlosses;
