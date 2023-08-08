"use client";
import { useEffect, useState } from "react";
import { GlossColumns } from "../components/GlossColumns";
import { DataTable } from "@/components/DataTable";
import Sidebar from "../components/Sidebar";
import Box from "@/components/Box";
import { Gloss } from "@/lib/Gloss";
import { getObjectsByCollection, getObjectsByTargetId } from "@/services";
import LoadingBox from "@/components/LoadingBox";

export default function Book() {
  const [selectedBook, setSelectedBook] = useState("");
  const [glosses, setGlosses] = useState<Gloss[]>([]);
  const [displayGlosses, setDisplayGlosses] = useState<Gloss[]>(glosses);
  const [isLoading, setIsLoading] = useState(true);

  // disables scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // This function fetches glosses objects by collection
  const fetchObjectsByCollection = async () => {
    try {
      // Fetch glosses
      const objectsFromCollection = await getObjectsByCollection(
        "Glossing-Matthew-Named-Glosses"
      );

      // Process fetched glosses
      if (objectsFromCollection.itemListElement) {
        const objectIds = objectsFromCollection.itemListElement.map(
          (item) => item["@id"]
        );

        // Initialize new glosses array
        let newGlosses: Gloss[] = [];

        // Loop through objectIds to fetch each gloss by id
        for (let i = 0; i < objectIds.length; i++) {
          await getObjectsByTargetId(objectIds[i])
            .then((obj) => {
              // Process each gloss object and create a new Gloss instance
              let glossData = obj
                .map((item) => {
                  if (item.body && typeof item.body === "object") {
                    const properties = Object.keys(item.body);

                    let glossData: any = {};

                    for (let property of properties) {
                      if (property === "tags") {
                        glossData["tags"] = {
                          "@type": item.body[property]["@type"],
                          items: item.body[property]["items"],
                        };
                      } else {
                        glossData[property] = item.body[property].value;
                      }
                    }

                    return glossData;
                  }
                })
                .reduce((result, current) => {
                  return { ...result, ...current };
                }, {});

              if (glossData) {
                const gloss = new Gloss(glossData);
                newGlosses.push(gloss);
              }

              // Update the state every 10 glosses or when done
              if (newGlosses.length % 10 === 0 || i === objectIds.length - 1) {
                setGlosses((prevGlosses) => [...prevGlosses, ...newGlosses]);
                newGlosses = [];
              }
            })
            .catch(console.error);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch glosses on mount
  useEffect(() => {
    fetchObjectsByCollection();
  }, []);

  // This function filters the glosses based on the selected book
  const handleBrowseClick = () => {
    const filteredGlosses = glosses.filter((gloss) =>
      gloss.tags.items.includes(selectedBook)
    );
    setDisplayGlosses(filteredGlosses);
  };

  // Update displayed glosses when glosses change
  useEffect(() => {
    setDisplayGlosses(glosses);
  }, [glosses]);

  return (
    <div className="flex gap-4 p-8">
      <Box className="h-[77vh] rounded-md p-8 overflow-auto flex gap-4">
        <div className="w-[75%] bg-gray-100 p-4 rounded-md">
          {/* Display the glosses in a DataTable */}
          <DataTable columns={GlossColumns} data={displayGlosses} />
          {/* Show the loading box when isLoading is true */}
          {isLoading && <LoadingBox label="Glosses" />}
        </div>
        <div className="w-[25%] bg-gray-100 p-4 rounded-md">
          <Sidebar />
          {/* Show a selection option for the user to browse glosses by book */}
          <p className="py-2">
            Medieval scholars and scribes glossed over authoritative texts that
            were important to their culture. Here you can browse glosses on
            those authoritative books
          </p>
          <select
            className="mb-2 border-2 border-gray-200 rounded-sm w-full p-2 px-3"
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Show All Glosses</option>
            <option value="Glossing-Matthew-Named-Glosses">
              Book of Matthew
            </option>
            {/* Add more options as needed */}
          </select>
          {/* Trigger handleBrowseClick when the button is clicked */}
          <button
            className="hover:bg-primaryHover shadow-sm bg-primary text-white px-4 rounded-md py-2 items-center gap-1"
            onClick={handleBrowseClick}
          >
            Browse by this Book
          </button>
        </div>
      </Box>
    </div>
  );
}
