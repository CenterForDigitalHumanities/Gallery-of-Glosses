"use client";
import { GrabGlossProperties } from "@/app/api/grab-gloss-properties/route";
import { GrabGlossList } from "@/app/api/grab-gloss-list/route";
import { FC, useEffect, useState } from "react";

interface BookProps {}

const Book: FC<BookProps> = ({}) => {
  const collectionName = "Glossing-Matthew";
  const collectionNameReq = new Request("/api/endpoint", {
    method: "POST",
    body: JSON.stringify({ collectionName }),
    headers: { "Content-Type": "application/json" },
  });
  const [collectionList, setCollectionList] = useState([]);

  GrabGlossList(collectionNameReq)
    .then((collectionNameReq) => collectionNameReq.json())
    .then((data) => setCollectionList(data.itemListElement))
    .catch((err) => console.error(err));

  collectionList.forEach((gloss) => {
    const targetId = gloss["@id"];
    const targetIdReq = new Request("/api/ByTargetId", {
      method: "POST",
      body: JSON.stringify({ targetId }),
      headers: { "Content-Type": "application/json" },
    });

    GrabGlossProperties(targetIdReq)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  });

  return <div>Book</div>;
};

export default Book;
