import { Container } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container maxW="100%" backgroundColor="gray.50" padding={0} display="flex">
      <Sidebar />
      <Outlet />
    </Container>
  );
}
