"use client";

import { useCallback, useEffect, useState } from "react";
import { GlossColumns } from "../components/GlossColumns";
import { DataTable } from "@/components/DataTable";
import { Gloss } from "@/lib/Gloss";
import Sidebar from "../components/Sidebar";
import { getObjectsByCollection, getObjectsByTargetId } from "@/services";
import Box from "@/components/Box";
import LoadingBox from "@/components/LoadingBox";

export default function TagPage() {
  // Use state to handle selected tag and its corresponding glosses
  const [selectedTag, setSelectedTag] = useState("");
  const [glosses, setGlosses] = useState<Gloss[]>([]);
  const [displayGlosses, setDisplayGlosses] = useState<Gloss[]>(glosses);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch data from the "Glossing-Matthew-Named-Glosses" collection
  const fetchObjectsByCollection = useCallback(async () => {
    try {
      const objectsFromCollection = await getObjectsByCollection(
        "Glossing-Matthew-Named-Glosses"
      );
      if (objectsFromCollection.itemListElement) {
        const objectIds = objectsFromCollection.itemListElement.map(
          (item) => item["@id"]
        );

        let newGlosses: Gloss[] = [];
        let newTags: string[] = [];
        for (let i = 0; i < objectIds.length; i++) {
          await getObjectsByTargetId(objectIds[i])
            .then((obj) => {
              let glossData = obj
                .map((item) => {
                  if (item.body && typeof item.body === "object") {
                    const properties = Object.keys(item.body);

                    let glossData: any = {};

                    for (let property of properties) {
                      if (property === "tags") {
                        // Handle tags object
                        glossData["tags"] = {
                          "@type": item.body[property]["@type"],
                          items: item.body[property]["items"],
                        };
                      } else {
                        // Handle other keys
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

                // Update tags
                gloss.tags.items.forEach((tag) => {
                  if (!newTags.includes(tag)) {
                    newTags.push(tag);
                  }
                });
              }

              if (newGlosses.length % 10 === 0 || i === objectIds.length - 1) {
                setGlosses((prevGlosses) => [...prevGlosses, ...newGlosses]);
                // Calculate unique tags
                const uniqueTags = Array.from(
                  new Set([...allTags, ...newTags])
                );

                setAllTags((prevTags) =>
                  Array.from(new Set([...prevTags, ...uniqueTags]))
                );
                newGlosses = [];
                newTags = [];
              }
            })
            .catch(console.error);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [allTags]);

  // Fetch the data when component mounts
  useEffect(() => {
    fetchObjectsByCollection();
  }, [fetchObjectsByCollection]);

  const handleBrowseClick = () => {
    const filteredGlosses = glosses.filter((gloss) =>
      gloss.tags.items.includes(selectedTag)
    );
    setDisplayGlosses(filteredGlosses);
  };

  // Update the displayed glosses when glosses changes
  useEffect(() => {
    setDisplayGlosses(glosses);
  }, [glosses]);

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex gap-4 p-8">
      <Box className="h-[77vh] rounded-md p-8 overflow-auto flex gap-4">
        <div className="w-[75%] bg-gray-100 p-4 rounded-md">
          <DataTable columns={GlossColumns} data={displayGlosses} />
        </div>
        <div className="w-[25%] bg-gray-100 p-4 rounded-md">
          <Sidebar />
          <p className="py-2">
            Various glosses share certain features or terms. We have selectively
            ascribed tags to capture this information. Here you may browse
            according to term or feature tag and see all the glosses that have
            shared content in this way. Tags will show up as the glosses with
            tags get rendered in
          </p>
          <select
            className="mb-2 border-2 border-gray-200 rounded-sm w-full p-2 px-3"
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Show All Glosses</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button
            className="hover:bg-primaryHover shadow-sm bg-primary text-white px-4 rounded-md py-2 items-center gap-1"
            onClick={handleBrowseClick}
          >
            Browse by this tag
          </button>

          {isLoading && <LoadingBox label="Glosses" />}
        </div>
      </Box>
    </div>
  );
}
