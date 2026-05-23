import type { ZoneImage } from "./games";
import book from "./book.png";
import img3_2 from "./3 2.png";
import img4_2 from "./4 2.png";

export type Select = {
  id: number;
  backgroundImage: string;
  overlayImages: ZoneImage[];
};

export const selects: Select[] = [
  {
    id: 1,
    backgroundImage: book,
    overlayImages: [
      { src: img3_2, top: "4%", left: "13%", width: "30%", height: "50%" },
      { src: img4_2, top: "4%", left: "60%", width: "30%", height: "50%" },
    ],
  },
];

export function getSelect(id: number): Select | undefined {
  return selects.find((s) => s.id === id);
}
