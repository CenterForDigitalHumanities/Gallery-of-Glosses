import { useEffect, useState } from "react";

export const getImages = (baseProject: string) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://t-pen.org/TPEN/manifest/${baseProject}`
        );
        const ms = await response.json();
        const urls = ms.sequences[0].canvases
          .slice(0, 10)
          .map((canvas: any) =>
            canvas.images[0].resource["@id"].replace("full/full", "full/,120")
          );
        setImageUrls(urls);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [baseProject]);

  return imageUrls;
};
