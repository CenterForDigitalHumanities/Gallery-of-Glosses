"use client";

import Modal from "@/components/Modal";
import useCompareModal from "@/hooks/useCompareModal";
import { unparse } from "papaparse";

const CompareModal = () => {
  const compareModal = useCompareModal();

  const onChange = (open: boolean) => {
    if (!open) {
      compareModal.onClose();
    }
  };

  const handleDownload = () => {
    // Get the selected rows
    const rows = (compareModal.selectedRows as any)?.rows;

    // Extract the table headers from the first row
    const headers = Object.keys(rows[0].original);

    // Map the rows to an array of data arrays
    const data = rows.map((row: any) => {
      const rowData = Object.values(row.original);
      // Extract the 'items' array from the 'tags' object and join it with a comma separator
      rowData[rowData.length - 1] = row.original.tags.items.join(", ");
      return rowData;
    });

    // Prepend the headers as the first row in the data array
    data.unshift(headers);

    // Use PapaParse to convert the data array to a CSV string
    const csv = unparse(data);

    // Create a blob from the CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element and click it programmatically to start the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "glosses.csv";
    link.click();
  };

  return (
    <Modal
      title="Glosses Information"
      description="View and download glosses data"
      isOpen={compareModal.isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="basic m-2 max-w-[1650px]">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Target Chapter</th>
                <th>Target Verse</th>
                <th>Targeted Text</th>
                <th>Transcribed Gloss</th>
                <th>Notes</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {(compareModal.selectedRows as any)?.rows?.map((gloss: any) => (
                <tr key={gloss.id}>
                  <td>{gloss.original.title}</td>
                  <td>{gloss.original.description}</td>
                  <td>{gloss.original.targetChapter}</td>
                  <td>{gloss.original.targetVerse}</td>
                  <td>{gloss.original.targetedText}</td>
                  <td>{gloss.original.transcribedGloss}</td>
                  <td>{gloss.original.notes}</td>
                  <td>{gloss.original.tags.items.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="shadow-sm bg-primary text-white px-4 rounded-md py-1 items-center gap-1 ml-auto mt-4"
          onClick={handleDownload}
        >
          Download as CSV
        </button>
      </div>
    </Modal>
  );
};

export default CompareModal;
