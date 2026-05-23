import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings" }];
}

export default function Settings() {
  return <h1>Settings</h1>;
}
