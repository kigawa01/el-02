import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function DashboardHome() {
  return <h1>Dashboard</h1>;
}
