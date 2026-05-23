export type Diary = {
  id: number;
  title: string;
  image: string;
};

export const diaries: Diary[] = [
  { id: 1, title: "Diary 1: Reflection", image: "https://placehold.co/1280x720/0f3460/white?text=Diary+1" },
  { id: 2, title: "Diary 2: The Journey", image: "https://placehold.co/1280x720/533483/white?text=Diary+2" },
];

export function getDiary(id: number): Diary | undefined {
  return diaries.find((d) => d.id === id);
}
