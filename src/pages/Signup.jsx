import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import eventimage from "/public/images/events.jpg";

function Signup() {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("something went wrong. please try again");
      }
    }
  };
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${eventimage})` }}
      >
        <div className=" w-full max-w-md">
          <form
            onSubmit={handleSignup}
            className="max-w-sm mx-auto bg-white/5 p-10"
          >
            <h1 className="text-center text-xl mb-5 text-gray-950 md:text-2xl">
              Create Account
            </h1>

            <div className="mb-5">
              <label
                htmlFor=""
                className="block text-white mb-2 text-sm font-medium "
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" p-3 rounded-lg w-full outline-blue-300"
              />
            </div>

            <div>
              <label className="block mb-2 text-white text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                placeholder="enter password her"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 rounded-lg w-full outline-blue-300"
              />
            </div>

            <ErrorMessage message={error} />

            <div className="flex flex-col">
              <button
                type="submit"
                className="font-medium text-sm py-5 text-white md:text-xl hover:text-violet-500"
              >
                Submit
              </button>

              <div className="flex items-center gap-2 text-gray-200">
                <p> Already have an account? </p>
                <button type="button" onClick={() => navigate("/login")}>
                  <span className="md:text-xl hover:text-violet-500">
                    Login
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
