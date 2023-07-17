import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login, { action as LoginAction } from "./components/Login";
import Signup, { action as SignupAction } from "./components/Signup";
import Root, { loader as RootLoader, action as LogoutAction } from "./routes/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Root />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        loader: RootLoader,
        action: LogoutAction,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
        action: LoginAction,
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
        action: SignupAction,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
