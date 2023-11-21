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
import Error from "./components/Error/index.tsx";
import SignIn from "./pages/SignIn/index.tsx";
import SignUp from "./pages/SignUp/index.tsx";
import Layout from "./components/Layout/index.tsx";
import AuthProvider, { useAuth } from "./context/AuthProvider.tsx";
import CreateArticle from "./pages/CreateArticle/index.tsx";
import { IAuthContext } from "./types/auth.ts";
import Article from "./pages/Article/index.tsx";
import EditArticle from "./pages/EditArticle/index.tsx";
import {
  getArticleById,
  getArticlesByAuthorId,
  getEventById,
} from "./utils/databaseOperations.ts";
import Profile from "./pages/Profile/index.tsx";
import { supabase } from "./utils/supabase.ts";
import Tag from "./pages/Tag/index.tsx";
import EditProfile from "./pages/EditProfile/index.tsx";
import Tags from "./pages/Tags/index.tsx";
import Chat from "./pages/Chat/index.tsx";
import FAQ from "./pages/FAQ/index.tsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CreateEvent from "./pages/CreateEvent/index.tsx";
import Events from "./pages/Events/index.tsx";
import Event from "./pages/Event/index.tsx";

function PrivateRoute() {
  const { user } = useAuth() as IAuthContext;

  return <>{user ? <Outlet /> : <Navigate to="/signIn" />}</>;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
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
        path: "/edit/:Id",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <EditArticle />,
            loader: async ({ params }) => {
              const data = await getArticleById(params.Id);
              return data;
            },
          },
        ],
      },
      {
        path: "/article/:Id",
        element: <Article />,
        loader: async ({ params }) => {
          const data = await getArticleById(params.Id);
          return data;
        },
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profile />,
            loader: async () => {
              const {
                data: { user },
              } = await supabase.auth.getUser();

              if (user) {
                const { articles, error } = await getArticlesByAuthorId(
                  user.id
                );

                return { articles, error };
              } else {
                return null;
              }
            },
          },
          {
            path: "edit",
            element: <EditProfile />,
            loader: async () => {
              const {
                data: { user },
                error,
              } = await supabase.auth.getUser();

              return {
                user,
                error,
              };
            },
          },
        ],
      },
      {
        path: "/tags",
        element: <Tags />,
        loader: async () => {
          const { data, error } = await supabase
            .from("articles")
            .select("tags");

          const tagList = new Set();
          data?.forEach((element) =>
            element.tags.map((tag: string) => tagList.add(tag))
          );

          return {
            tags: Array.from(tagList),
            error,
          };
        },
      },
      {
        path: "/tag/:tag",
        element: <Tag />,
        loader: async ({ params }) => {
          const { data, error } = await supabase
            .from("articles")
            .select()
            .contains("tags", [params.tag]);

          return { articles: data, error: error };
        },
      },
      {
        path: "/chat",
        element: <Chat />,
        loader: async () => {
          const { data, error } = await supabase.from("chats").select();
          return { chatCollection: data, erorr: error };
        },
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/events",
        children: [
          {
            index: true,
            element: <Events />,
            loader: async () => {
              const { data, error } = await supabase.from("events").select();

              return {
                events: data,
                error: error,
              };
            },
          },
          {
            path: ":Id",
            element: <Event />,
            loader: async ({ params }) => {
              const data = await getEventById(params.Id);
              return data;
            },
          },
          {
            path: "create",
            element: <PrivateRoute />,
            children: [
              {
                index: true,
                element: <CreateEvent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <HelmetProvider>
          <Helmet>
            <meta
              name="description"
              content="Discover a wealth of self-development resources with our library of articles. Enhance your productivity, motivation, and relationships today."
            />
          </Helmet>
        </HelmetProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
