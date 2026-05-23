import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About" }];
}

export default function About() {
  return (
    <main  className="bg-teal-50">
      <div >
      <h1>なつやすみ</h1>
      <p>This is the about page.</p>

      </div>
    </main>
  );
}
