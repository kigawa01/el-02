import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),

  layout("routes/game/layout.tsx", [
    route("game/:id", "routes/game/detail.tsx"),
  ]),

  route("diary/:diaryId/result/:resultId", "routes/diary/result.tsx"),

  layout("routes/dashboard/layout.tsx", [
    route("dashboard", "routes/dashboard/home.tsx"),
    route("dashboard/settings", "routes/dashboard/settings.tsx"),
  ]),
] satisfies RouteConfig;
