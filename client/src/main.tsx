import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./components/pages/PageLayout.tsx";
import Index from "./components/pages/Index.tsx";
import Home from "./components/pages/Home.tsx";
import Login from "./components/pages/Login.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <PageLayout />,

    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        ),
      },

      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
