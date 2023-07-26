import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar/index.tsx";
import ErrorPage from "./components/ErrorPage/index.tsx";
import SignUp from "./components/SignUp/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Container
        maxW="100%"
        backgroundColor="gray.50"
        padding={0}
        display="flex"
      >
        <Sidebar />
        <Container
          maxW={{ base: "calc(100% - 52px)", md: "calc(100% - 200px)" }}
        >
          <RouterProvider router={router} />
        </Container>
      </Container>
    </ChakraProvider>
  </React.StrictMode>
);
