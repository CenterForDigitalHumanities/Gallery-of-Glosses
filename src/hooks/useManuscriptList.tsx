import { useState, useEffect } from "react";
import {
  grabProperties,
  GrabProductionManuscripts,
  processManuscript,
} from "@/lib/utils";

export const useManuscriptList = () => {
  const [manuscripts, setManuscripts] = useState<ProcessedManuscript[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  async function fetchManuscriptAndProcessProperties() {
    const collectionList = await GrabProductionManuscripts();
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

  useEffect(() => {
    fetchManuscriptAndProcessProperties();
  }, []);

  return { manuscripts, loading };
};