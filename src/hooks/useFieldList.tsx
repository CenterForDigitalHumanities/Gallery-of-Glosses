import { useState, useEffect } from "react";
import { useGlossList } from "./useGlossList";

export const useFieldList = (fieldName: string) => {
    const { glosses, loading } = useGlossList();
    const [fields, setFields] = useState<ProcessedGloss[]>([]);

    useEffect(() => {
        const fieldList = glosses.map((gloss) => {
            if (gloss[fieldName]) {
                return gloss[fieldName];
            }
        });

        setFields(fieldList);
    }, [glosses, loading]);

    return { fields, loading };
};