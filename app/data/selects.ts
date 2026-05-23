import type { ZoneImage } from "./games";
import book from "./book.png";
import img1_2 from "./1 2.png";
import img2_2 from "./maturi_select.png";

export type SelectImage = ZoneImage & { navigateTo?: string };

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
      { src: img1_2, top: "5%", left: "17%", width: "30%", height: "39%", navigateTo: "/game/1" },
      { src: img2_2, top: "0%", left: "53%", width: "30%", height: "50%", navigateTo: "/game/2" },
    ],
  },
];

export function getSelect(id: number): Select | undefined {
  return selects.find((s) => s.id === id);
}
