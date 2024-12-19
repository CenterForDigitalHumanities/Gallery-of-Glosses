import { useState, useEffect } from "react";
import {
  grabProperties,
  grabProductionManuscripts,
  processManuscript,
} from "@/lib/utils";

export const useManuscriptList = () => {
  const [manuscripts, setManuscripts] = useState<ProcessedManuscript[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchManuscriptAndProcessProperties() {
      const collectionList = await grabProductionManuscripts();
      if (collectionList && collectionList.itemListElement) {
        for (let item of collectionList.itemListElement) {
          const targetId = item["@id"];
          const res = await grabProperties(targetId);
          const data = await res.json();
          let manuscript = {}
          for(const item of data){
            if(!item?.body) continue
            const key = Object.keys(item.body)[0]
            manuscript[key] = item.body[key].value ?? item.body[key]
          }
          //const manuscript = data.map((item: { body: any }) => item.body);
          const processedManuscript = processManuscript(manuscript, targetId);
          setManuscripts((prevManuscripts) => [...prevManuscripts, processedManuscript]);
        }
      }
      setLoading(false);
    }
    fetchManuscriptAndProcessProperties();
  }, []);

  return { manuscripts, loading };
};