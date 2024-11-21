"use client";

import { RERUM } from "@/configs/rerum-links"
import * as NAV from "@/configs/navigation"
import { usePathname } from "next/navigation"
import { use } from "react"
import { useFragmentContext } from "@/contexts/FragmentContext"
import Image from "next/image";


const ManuscriptFragment = (props : {  slug: string } ) => {
  const targetId = props.slug
  let fragmentPromise = useFragmentContext()
  let fragment = use(fragmentPromise)
  fragment.depiction = "https://image-api.iiif.io/api/image/3.0/example/reference/9ee11092dfd2782634f5e8e2c87c16d5-uclamss_1841_diary_07_02/90,100,1750,100/max/0/default.jpg"
  
  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h4 className="text-xl font-bold mb-4">
          &lsquo; &nbsp;
          {fragment?.text?.textValue ?? "ERROR - NO TEXT FOUND"}
          &nbsp; &rsquo;
        </h4>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Shelfmark</span>{" "}
            <span>
              {fragment?.identifier ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Folio or Page:</span>{" "}
            <span>
              {fragment?._folio ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            <span>
              {fragment?._glossLocation ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Format:</span>{" "}
            <span>
              { fragment?._glossFormat ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Glossator Hand:</span>{" "}
            <span>
              { fragment?._glossatorHand ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            <span>
              {fragment.tags
                ? fragment.tags.items.map((tag, tagIndex, tagArray) => (
                    <a
                      key={tagIndex}
                      href={`${NAV.BASEPATH}/browse/witnesses/tag?q=${tag}`}
                      className="text-blue-500 hover:underline"
                    >
                      {tag}
                      {tagIndex < tagArray.length - 1 ? ", " : ""}
                    </a>
                  ))
                : "Not found"}
            </span>
          </p>
        </div>
        <div className="lineSnippet">
        {fragment?.depiction ? 
          <Image
              alt="Witness Image"
              src={`${fragment?.depiction}`}
              fill
              sizes="(max-width: 80vw)"
              style={{
                objectFit: 'contain', // cover, contain, none
              }}
            />
          : "Image Not Found"
        }
        </div>
      </div>
    </div>
  );
};

export default ManuscriptFragment;