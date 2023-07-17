import { useContext } from "react";
import { Form, Link, redirect, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export async function action({ request }) {
    const formData = await request.formData();

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
        return null;
    }

    return redirect("/");
}

export default function Login() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Form
                method="post"
                className="w-5/12 h-[600px] p-20 flex flex-col items-center gap-y-4 rounded-xl bg-white border border-gray-400"
            >
                <div className="w-full mb-6 text-center">
                    <span className="text-5xl font-extralight">Welcome Back!</span>
                </div>
                <div className="w-full">
                    <label htmlFor="name" className="text-xl font-normal">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="w-full h-16 p-3 bg-gray-100 border border-gray-200 focus:outline-none"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className="text-xl font-normal">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="w-full h-16 p-3 bg-gray-100 border border-gray-200 focus:outline-none"
                    />
                </div>
                <div className="w-full mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-3 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500"
                    >
                        Login
                    </button>
                </div>
                <div className="w-full text-center">
                    <Link to="/signup">
                        <button className="w-full px-4 py-3 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}
