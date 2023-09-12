"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Manuscript } from "@/lib/Manuscript";
import Box from "@/components/Box";
import Link from "next/link";
import {
  ExternalTexts,
  ManuscriptDetails,
  RelatedManuscripts,
  ImageSlider,
} from "./components";
import {
  getRandom,
  getObjectsByValue,
  getObjectsByTargetId,
  processObjectData,
} from "@/services";

interface ManuscriptProps {
  title?: string;
  [key: string]: any;
}

export default function ManuscriptPage() {
  const [manuscript, setManuscript] = useState<Manuscript>();
  const [relatedManuscripts, setRelatedManuscripts] = useState<Array<any>>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const router = useRouter();

  // Retrieve stored data from the session when component mounts
  useEffect(() => {
    const storedData = sessionStorage.getItem("manuscriptData");
    if (storedData) {
      const manuscriptData = JSON.parse(storedData);
      setManuscript(manuscriptData);
    }
  }, []);

  // Function to get related manuscripts asynchronously
  const getRelated = useCallback(async () => {
    if (manuscript) {
      const objects = await getObjectsByValue("city", manuscript.city);

      // Extract target ids from the objects
      const targetIds = objects.map((item) => item.target);
      const randomIds = getRandom(targetIds, 4);

      const promises = randomIds.map((id) => getObjectsByTargetId(id));
      const objectArrays = await Promise.all(promises);

      // Create new array to hold related manuscripts
      let newRelatedManuscripts = [...relatedManuscripts];
      objectArrays.forEach((array) => {
        // Merge all related objects into one
        let combinedObject: ManuscriptProps = array.reduce(
          (accumulator, obj) => {
            const processedObj = processObjectData(obj);
            if (Object.keys(processedObj).length > 0 && obj.target) {
              return { ...accumulator, ...processedObj, targetId: obj.target };
            } else {
              return accumulator;
            }
          },
          {}
        );
        // Add to array if it is a valid related manuscript and not the current manuscript
        if (
          Object.keys(combinedObject).length > 0 &&
          combinedObject.title !== manuscript.title
        ) {
          newRelatedManuscripts.push(combinedObject);
        }
      });

      // Update state with related manuscripts
      setRelatedManuscripts(newRelatedManuscripts);
      setLoadingRelated(false);
    }
  }, [manuscript, relatedManuscripts]);

  // Call getRelated whenever manuscript changes
  useEffect(() => {
    getRelated();
  }, [getRelated]);

  // Function to handle when a related manuscript is clicked
  const handleManuscriptClicked = useCallback(
    async (manuscript: ManuscriptProps) => {
      try {
        const targetId = manuscript.targetId.split("/").pop();
        sessionStorage.setItem("manuscriptData", JSON.stringify(manuscript));
        router.push(`/manuscript/${targetId}`);
      } catch (error) {
        console.error("Error getting target id:", error);
      }
    },
    [router]
  );

  // Placeholder external links for testing purposes
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
          <h1 className="text-4xl mb-4">Manuscript Details</h1>
          <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
            <div className="px-2 flex gap-2">
              <Link href="/" passHref>
                <p className="text-blue-500 font-semibold transition hover:underline">
                  Home
                </p>
              </Link>
              &gt;{" "}
              <Link href="/manuscripts" passHref>
                <p className="text-blue-500 font-semibold cursor-pointer transition hover:underline">
                  Manuscripts
                </p>
              </Link>
              &gt; <p className="font-semibold">{manuscript?.title}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            {manuscript && <ManuscriptDetails manuscript={manuscript} />}

            <RelatedManuscripts
              loading={loadingRelated}
              relatedManuscripts={relatedManuscripts}
              onManuscriptClicked={handleManuscriptClicked}
            />

            <ExternalTexts links={placeholderExternalLinks} />
          </div>
        </div>
      </Box>

      <Box className="w-[30%] p-8 overflow-auto">
        <h2 className="text-2xl mb-2">Manuscript Images:</h2>
        {manuscript && (
          <ImageSlider baseProject={manuscript["tpen://base-project"]} />
        )}

        <div className="mt-6">
          <h2 className="text-2xl mb-2">Description:</h2>
          <p className="bg-white border rounded-md p-3 shadow-md"></p>
        </div>
      </Box>
    </div>
  );
}
