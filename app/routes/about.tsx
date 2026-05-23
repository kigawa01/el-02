import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About" }];
}

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
