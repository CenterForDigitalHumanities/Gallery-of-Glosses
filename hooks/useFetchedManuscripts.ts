"use client";

import { useState, useEffect } from "react";
import { Manuscript } from "@/lib/Manuscript";
import { getObjectsByCollection, getObjectsByTargetId } from "@/services";

export const useFetchedManuscripts = (collectionName: string) => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchObjectsByCollection = async () => {
      setManuscripts([]);
      setIsLoading(true);
      try {
        const objectsFromCollection = await getObjectsByCollection(
          collectionName
        );

        if (objectsFromCollection.itemListElement) {
          const objectIds = objectsFromCollection.itemListElement.map(
            (item) => item["@id"]
          ); // extract all ids

          // Define the chunk size
          const chunkSize = 50;
          for (let i = 0; i < objectIds.length; i += chunkSize) {
            const currentChunk = objectIds.slice(i, i + chunkSize);

            // Create a promise for each id in the current chunk to fetch its data
            const fetchPromises = currentChunk.map((id) =>
              getObjectsByTargetId(id)
            );

            // Wait for all promises to resolve
            const fetchedObjects = await Promise.all(fetchPromises);

            const newManuscripts: Manuscript[] = [];

            // Process each fetched object
            for (let j = 0; j < fetchedObjects.length; j++) {
              const obj = fetchedObjects[j];

              let ManuscriptData = obj
                .map((item) => {
                  if (item.body && typeof item.body === "object") {
                    // Check that item.body exists and is an object
                    const property = Object.keys(item.body)[0]; // gets the first property of the body object
                    return {
                      [property]: item.body[property].value,
                    };
                  } else {
                    return {}; // Return an empty object if item.body is undefined or not an object
                  }
                })
                .reduce((result, current) => {
                  return { ...result, ...current };
                }, {});

              newManuscripts.push(new Manuscript(ManuscriptData));
            }

            // Add new Manuscripts to the state
            setManuscripts((prevManuscripts) => [
              ...prevManuscripts,
              ...newManuscripts,
            ]);
          }
        }

        setIsLoading(false); // Data fetching completed
      } catch (error) {
        console.error(error);
      }
    };

    fetchObjectsByCollection();
  }, [collectionName]);

  return { manuscripts, isLoading };
};
