import React from "react";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";

const Login = () => {
    const { setShowUserLogin, setUser, axios } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("Form submitted!");

        try {
            const endpoint = state === "login" ? "/api/user/login" : "/api/user/register";
            
            const requestData = {
                email: email,
                password: password,
            };

            if (state === "register") {
                requestData.name = name;
            }

            const { data } = await axios.post(endpoint, requestData, { withCredentials: true });

            if (data.success) {
                // FIX: This line correctly updates the user state in AppContext
                setUser(data.user); 
                setShowUserLogin(false);
                toast.success(state === "login" ? "Login successful!" : "Account created successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Authentication Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setShowUserLogin(false)}
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px]
                   text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <button
                    type="button"
                    onClick={() => {
                        setShowUserLogin(false);
                        toast.success("Login dismissed.");
                    }}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
                   rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100
                   focus:outline-none"
                    aria-label="Close"
                >
                    ✕
                </button>

                <p className="text-2xl font-medium m-auto">
                    <span className="text-orange-500">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                            type="text"
                            required
                        />
                    </div>
                )}

                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                        type="password"
                        required
                    />
                </div>

                {state === "register" ? (
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => setState("login")}
                            className="text-orange-500 cursor-pointer"
                        >
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span
                            onClick={() => setState("register")}
                            className="text-orange-500 cursor-pointer"
                        >
                            click here
                        </span>
                    </p>
                )}

                <button type="submit" className="bg-orange-300 hover:bg-orange-500 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;