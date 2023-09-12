// Import necessary libraries and components
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Gloss } from "@/lib/Gloss";
import Box from "@/components/Box";
import Link from "next/link";
import { ExternalTexts, GlossDetails, RelatedGlosses } from "./components";
import {
  getRandom,
  getObjectsByValue,
  getObjectsByTargetId,
  processObjectData,
} from "@/services";
import Image from "next/image";

// Define the properties for the Gloss component
interface GlossProps {
  title?: string;
  [key: string]: any;
}

export default function GlossPage() {
  const [gloss, setGloss] = useState<Gloss>();
  const [relatedGlosses, setRelatedGlosses] = useState<Array<any>>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const router = useRouter();

  // On component mount, load gloss data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem("glossData");
    if (storedData) {
      const GlossData = JSON.parse(storedData);
      setGloss(GlossData);
    }
  }, []);

  // Function to fetch related glosses
  const getRelated = useCallback(async () => {
    if (gloss) {
      // Fetch objects based on the target verse of the current gloss
      const objects = await getObjectsByValue("targetVerse", gloss.targetVerse);
      // Extract target ids from the objects
      const targetIds = objects.map((item) => item.target);
      // Get 4 random ids from the target ids
      const randomIds = getRandom(targetIds, 4);

      // Fetch objects for each of the random ids
      const promises = randomIds.map((id) => getObjectsByTargetId(id));
      const objectArrays = await Promise.all(promises);

      // Process each object array and create related glosses
      let newRelatedGlosses = [...relatedGlosses];
      objectArrays.forEach((array) => {
        // Combine objects in the array into a single gloss
        let combinedObject: GlossProps = array.reduce((accumulator, obj) => {
          const processedObj = processObjectData(obj);
          // Continue only if the object has properties and a target id
          if (Object.keys(processedObj).length > 0 && obj.target) {
            // Combine the processed object with the accumulator
            return { ...accumulator, ...processedObj, targetId: obj.target };
          } else {
            return accumulator;
          }
        }, {});

        // Add the combined object to related glosses if it has properties and its title is different from the current gloss
        if (
          Object.keys(combinedObject).length > 0 &&
          combinedObject.title !== gloss.title
        ) {
          newRelatedGlosses.push(combinedObject);
        }
      });

      // Update related glosses and set loading to false
      setRelatedGlosses(newRelatedGlosses);
      setLoadingRelated(false);
    }
  }, [gloss, relatedGlosses]);

  // Call getRelated whenever gloss data changes
  useEffect(() => {
    getRelated();
  }, [getRelated]);

  // Function to handle click events on a gloss
  const handleGlossClicked = useCallback(
    async (gloss: GlossProps) => {
      try {
        // Extract the target id from the gloss
        const targetId = gloss.targetId.split("/").pop();
        // Store the gloss data in session storage
        sessionStorage.setItem("glossData", JSON.stringify(gloss));
        // Navigate to the page for the clicked gloss
        router.push(`/gloss/${targetId}`);
      } catch (error) {
        console.error("Error getting target id:", error);
      }
    },
    [router]
  );

  // Memoized placeholder data for image and external links
  const placeholderImage = useMemo(() => "https://via.placeholder.com/200", []);
  const placeholderExternalLinks = useMemo(
    () => [
      { title: "External Text 1", link: "#" },
      { title: "External Text 2", link: "#" },
    ],
    []
  );

  return (
    <div className="flex gap-4 p-8">
      <Box className="min-h-screen w-[70%] rounded-md p-8 overflow-auto">
        <div>
          <h1 className="text-4xl mb-4">Gloss Details</h1>
          <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
            <div className="px-2 flex gap-2">
              <Link href="/" passHref>
                <p className="text-blue-500 font-semibold transition hover:underline">
                  Home
                </p>
              </Link>
              &gt;{" "}
              <Link href="/glosses" passHref>
                <p className="text-blue-500 font-semibold cursor-pointer transition hover:underline">
                  Glosses
                </p>
              </Link>
              &gt; <p className="font-semibold">{gloss?.title}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            {gloss && <GlossDetails gloss={gloss} />}

            <RelatedGlosses
              loading={loadingRelated}
              relatedGlosses={relatedGlosses}
              onGlossClicked={handleGlossClicked}
            />

            <ExternalTexts links={placeholderExternalLinks} />
          </div>
        </div>
      </Box>

      <Box className="w-[30%] p-8 overflow-auto">
        <h2 className="text-2xl mb-2 text-blue-700">Gloss Images:</h2>
        <Image
          className="shadow-lg rounded-md"
          src={placeholderImage}
          width={1000}
          height={1000}
          alt="Gloss image"
        />

        <div className="mt-6">
          <h2 className="text-2xl mb-2">Description:</h2>
          <p className="bg-white border rounded-md p-3 shadow-md">
            {gloss?.description}
          </p>
        </div>
      </Box>
    </div>
  );
}
