import type { ZoneImage } from "./games";
import book from "./book.png";
import img1_2 from "./1 2.png";
import img2_2 from "./2 2.png";
import img3_2 from "./3 2.png";
import img4_2 from "./4 2.png";
import clear1 from "./clear1.png";
import maturi1 from "./maturi1.png";

export type SelectImage = ZoneImage & { navigateTo?: string; clearedSrc?: string };

export type Select = {
  id: number;
  backgroundImage: string;
  overlayImages: SelectImage[];
};

export const selects: Select[] = [
  {
    id: 1,
    backgroundImage: book,
    overlayImages: [
      { src: img1_2, clearedSrc: clear1,  top: "4%", left: "13%", width: "30%", height: "50%", navigateTo: "/game/1" },
      { src: img2_2, clearedSrc: maturi1, top: "4%", left: "60%", width: "30%", height: "50%", navigateTo: "/game/2" },
    ],
  },
  {
    id: 2,
    backgroundImage: book,
    overlayImages: [
      { src: img3_2, top: "4%", left: "13%", width: "30%", height: "50%", navigateTo: "/game/1" },
      { src: img4_2, top: "4%", left: "60%", width: "30%", height: "50%", navigateTo: "/game/2" },
    ],
  },
];

export function getSelect(id: number): Select | undefined {
  return selects.find((s) => s.id === id);
}
