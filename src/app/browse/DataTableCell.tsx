"use client";

import { useState } from "react";

interface DataTableCellProps {
  textValue: string;
  rowId: string;
}

const DataTableCell: React.FC<DataTableCellProps> = ({
  textValue = "",
  rowId,
}) => {
  const [showMoreRows, setShowMoreRows] = useState(new Set<string>());
  const isShowMore = showMoreRows.has(rowId);

  const limit = 20;
  let shortText = ""
  if(Array.isArray(textValue)) {
    if (textValue.length === 0) textValue = "Not Found"
    else if (textValue.length === 1) textValue = textValue[0]
    else textValue = textValue.join(", ")
  }
  if(typeof(textValue) !== "string") textValue = "Unprocessable"
  if(textValue.length){
    shortText = textValue.substring(0, 20) + (textValue.length > limit ? "..." : "")
  }
  else{
    textValue = ""
  } 
  const displayText = isShowMore ? textValue : shortText;

  return (
    <div className="font-medium">
      {displayText === "Not Found" ? <small>Not Found</small> : displayText}
      {textValue.length > limit && (
        <button
          className="text-xs hover:underline text-muted-foreground showmore"
          onClick={() => {
            const newShowMoreRows = new Set(showMoreRows);
            if (isShowMore) {
              newShowMoreRows.delete(rowId);
            } else {
              newShowMoreRows.add(rowId);
            }
            setShowMoreRows(newShowMoreRows);
          }}
        >
          {isShowMore ? " Show Less" : " Show More"}
        </button>
      )}
    </div>
  );
};

export default DataTableCell;
