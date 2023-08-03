import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  Outlet,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/index.tsx";
import SignIn from "./pages/SignIn/index.tsx";
import SignUp from "./pages/SignUp/index.tsx";
import Layout from "./components/Layout/index.tsx";
import AuthProvider, { useAuth } from "./context/AuthProvider.tsx";
import CreateArticle from "./pages/CreateArticle/index.tsx";
import { IAuthContext } from "./types/auth.ts";
import Article from "./pages/Article/index.tsx";
import { supabase } from "./utils/supabase.ts";

function PrivateRoute() {
  const { user } = useAuth() as IAuthContext;

  return <>{user ? <Outlet /> : <Navigate to="/signIn" />}</>;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/create",
        element: (
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<CreateArticle />} />
            </Route>
          </Routes>
        ),
      },
      {
        path: "/article/:Id",
        element: <Article />,
        loader: async ({ params }) => {
          const { data, error } = await supabase
            .from("articles")
            .select()
            .eq("id", params.Id);

          return {
            article: data && data[0],
            error: error,
          };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
