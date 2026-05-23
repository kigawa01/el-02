import type { ZoneImage } from "./games";
import book from "./book.png";
import img4_2 from "./4 2.png";
import img3_2 from "./3 2.png";

export type Result = {
  id: number;
  backgroundImage: string;
  overlayImages: ZoneImage[];
};

export const results: Result[] = [
  {
    id: 1,
    backgroundImage: book,
    overlayImages: [
      { src: img4_2, top: "4%", left: "13%", width: "30%", height: "50%" },
      { src: img3_2, top: "4%", left: "60%", width: "30%", height: "50%" },
    ],
  },
];

export function getResult(id: number): Result | undefined {
  return results.find((r) => r.id === id);
}
