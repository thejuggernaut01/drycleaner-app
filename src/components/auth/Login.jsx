import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { AuthContext } from "../../store/AuthContext";
import Loader from "../ui/Loader";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      if (error.message.includes("user-not-found")) {
        setError("User Not Found");
      } else if (error.message.includes("wrong-password")) {
        setError("Wrong Password");
      } else if (error.message.includes("network-request-failed")) {
        setError("Network Request Failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="text-center w-100 mt-20 mb-20">
        <div className="inline-block border border-gray-600 rounded-md mb-2">
          {error && (
            <p className="bg-red-400 pt-1 pb-1 rounded-t-md">{error}</p>
          )}

          <h2 className="text-2xl pt-4 pb-3 font-semibold">Log In</h2>
          <form className="pl-5 pr-5" onSubmit={submitHandler}>
            <div className="flex flex-col text-left">
              <label>
                Email<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-2 pt-1 pb-1"
                name="email"
                type="email"
                ref={emailRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 pt-1 pb-1"
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-3 border border-purple-600 bg-purple-600 text-white rounded-md w-full mb-5 pt-2 pb-2"
              type="submit"
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
        </div>

        <div className="text-center">
          Need an account?{" "}
          <Link to={"/signup"} className="no-underline text-purple-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
