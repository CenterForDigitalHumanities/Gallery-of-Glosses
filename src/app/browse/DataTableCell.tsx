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
  const shortText =
    textValue.substring(0, 20) + (textValue.length > limit ? "..." : "");
  const displayText = isShowMore ? textValue : shortText;

  return (
    <div className="font-medium">
      {displayText}
      {textValue.length > limit && (
        <button
          className="text-xs hover:underline text-muted-foreground"
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
