import { Outlet, NavLink } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/dashboard">Home</NavLink>
        {" | "}
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
