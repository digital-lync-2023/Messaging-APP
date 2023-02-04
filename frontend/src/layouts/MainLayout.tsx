import { AppShell } from "@mantine/core";
import { NavbarSearch } from "../components/NavbarSearch";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

function MainLayout() {
  // Redirect to signin if not logged in
  const navigate = useNavigate();

  // Establishes socket connection
  useSocket();

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/sign-in");
    return null;
  }

  return (
    <AppShell
      fixed
      padding={0}
      aside={<NavbarSearch />}
      styles={{
        main: {
          overflow: "hidden",
          height: "100vh",
        },
      }}
    >
      {isAuthenticated ? <Outlet /> : null}
    </AppShell>
  );
}

export default MainLayout;
