import { Form, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Signup() {
    const { currentUser, signup } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const credentials = Object.fromEntries(formData);
        await signup(credentials);
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Form
                method="post"
                onSubmit={handleSubmit}
                className="w-5/12 h-[600px] p-20 flex flex-col items-center gap-y-4 rounded-xl bg-white border border-gray-400"
            >
                <div className="w-full mb-6 text-center">
                    <span className="text-5xl font-extralight">Sign Up</span>
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
                        Create Account
                    </button>
                </div>
                <div className="w-full text-center">
                    <Link to="/login">
                        <button className="w-full px-4 py-3 rounded-xl text-xl text-white bg-sky-400 hover:bg-sky-500">
                            Go Back
                        </button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}
