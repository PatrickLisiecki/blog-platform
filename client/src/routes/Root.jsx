import { useEffect, useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export async function loader({ request }) {
    const response = await fetch("/api/auth/current_user");
    if (response.ok) {
        const { user } = await response.json();
        return { currentUser: user };
    } else {
        return { currentUser: null };
    }
}

export async function action({ request }) {
    const response = await fetch("/api/auth/logout", {
        method: "DELETE",
    });
    return null;
}

export default function Root() {
    const { currentUser } = useLoaderData();
    const { setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        setCurrentUser(currentUser);
    }, [currentUser]);

    <div className="w-full min-h-screen flex flex-col gap-y-10 justify-center items-center">
        <span className="text-6xl font-light text-gray-900">You are signed in!</span>
        <Form method="post">
            <button
                type="submit"
                className="w-3/12 px-4 py-3 text-2xl text-white text-center rounded-xl bg-sky-400 hover:bg-sky-500"
            >
                Logout
            </button>
        </Form>
    </div>;
}
