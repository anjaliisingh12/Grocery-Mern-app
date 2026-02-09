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

    try {
      const endpoint =
        state === "login"
          ? "/api/user/login"
          : "/api/user/register";

      const requestData = { email, password };
      if (state === "register") requestData.name = name;

      const { data } = await axios.post(endpoint, requestData);

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(
          state === "login"
            ? "Login successful!"
            : "Account created successfully!"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("AUTH ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
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
          onClick={() => setShowUserLogin(false)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
          rounded-full text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>

        <p className="text-2xl font-medium m-auto">
          <span className="text-orange-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div>
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <p>
          {state === "login" ? "Create an account?" : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "login" ? "register" : "login")
            }
            className="text-orange-500 cursor-pointer"
          >
            click here
          </span>
        </p>

        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 text-white py-2 rounded"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;