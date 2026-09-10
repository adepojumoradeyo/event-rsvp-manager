import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import eventimage from "/public/images/events.jpg";

function Login() {
  const { login, authLoading } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("invalid email or password");
      } else {
        setError("something went wrong. please try again");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${eventimage})` }}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="max-w-sm mx-auto bg-white/5 p-10"
        >
          <h1 className="text-center text-xl mb-5 text-gray-950 md:text-2xl">
            Welcome
          </h1>

          <div className="mb-5">
            <label className="block text-white mb-2 text-sm font-medium ">
              Email:
            </label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-3 rounded-lg w-full outline-blue-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg w-full outline-blue-300"
            />
          </div>

          <ErrorMessage message={error} />

          <div className="flex flex-col">
            <button
              type="submit"
              disabled={authLoading}
              className="font-medium text-sm py-5 text-white md:text-xl hover:text-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-gray-200 hover:text-violet-500"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
