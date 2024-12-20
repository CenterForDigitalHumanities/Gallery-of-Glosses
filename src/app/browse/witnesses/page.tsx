import { FC } from "react";

interface SoonProps {}

const Soon: FC<SoonProps> = ({}) => {
  return (
    <>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Soon</h1>
      </div>
    </>
  );
};

export default Soon;






// "use client";

// import { FC } from "react";
// import { make_columns } from "../Columns";
// import { DataTable } from "../DataTable";
// import { useWitnessFragmentsList } from "@/hooks/useWitnessFragmentsList";

// interface BrowseAllWitnessFragmentsProps {}

// let filterColumn = {
//   header: "Shelfmark",
//   accessorKey: "identifier",
//   expandable: false,
// };
// let columns = make_columns([
//   filterColumn,
//   { header: "Text", accessorKey: "textValue", expandable: true },
// ]);

// const BrowseAllWitnessFragments: FC<BrowseAllWitnessFragmentsProps> = ({}) => {
//   const { fragments, loading } = useWitnessFragmentsList();
//   return (
//     <div>
//       <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Manuscript Text Fragments</h1>
//       <div className="pt-8"></div>
//       {
//         <DataTable
//           columns={columns}
//           data={fragments}
//           loading={loading}
//           filterColumn={filterColumn}
//         />
//       }
//     </div>
//   );
// };

// export default BrowseAllWitnessFragments;