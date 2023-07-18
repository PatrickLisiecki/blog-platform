import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
import Root from "./routes/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Root />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
