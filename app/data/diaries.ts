import back1 from "./1-back.png";

export type Diary = {
  id: number;
  title: string;
  image: string;
};

export const diaries: Diary[] = [
  {id: 1, title: "Diary 1: Reflection", image: back1},
  {id: 2, title: "Diary 2: The Journey", image: back1},
];

export function getDiary(id: number): Diary | undefined {
  return diaries.find((d) => d.id === id);
}
