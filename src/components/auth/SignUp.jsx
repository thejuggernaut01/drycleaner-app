import { useRef, useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Loader from "../ui/Loader";
import Navbar from "../layouts/Navbar";

export default function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef();
  const emailRef = useRef();
  const accountRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  // create collection for users
  const dryCleanersCollection = collection(db, "dryCleaners");
  const customerCollection = collection(db, "customers");

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail|yahoo|icloud|hotmail|outlook|aol|protonmail|zoho)+\.(com|net|org|edu|info|co|gov)$/;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (fullNameRef.current.value.trim() === "") {
      return setError("Name fields cannot be empty");
    }
    if (
      passwordRef.current.value.length < 6 &&
      passwordConfirmRef.current.value.length < 6
    ) {
      return setError("Password must be at least 6 characters long");
    }

    if (
      !emailRegex.test(emailRef.current.value) ||
      emailRef.current.value.trim() === ""
    ) {
      return setError("Enter a valid email address");
    }

    try {
      setError("");
      setLoading(true);
      await ctx.signUp(emailRef.current.value, passwordRef.current.value);

      if (accountRef.current.value === "Dry Cleaner") {
        await addDoc(dryCleanersCollection, {
          fullName: fullNameRef.current.value,
          emailAddress: emailRef.current.value,
        });

        navigate("/edit-profile");
      } else if (accountRef.current.value === "Customer") {
        await addDoc(customerCollection, {
          fullName: fullNameRef.current.value,
          emailAddress: emailRef.current.value,
        });
        navigate("/");
      }

      // navigate("/login");
    } catch (error) {
      setError("Failed to create an account!");
      if (error.message.includes("email-already-in-use")) {
        setError("Email already in use");
      }
      if (error.message.includes("weak-password")) {
        setError("Password should be at least 6 characters ");
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
          <h2 className="text-2xl pt-2 pb-3 font-semibold">Sign Up</h2>

          <Form className="pl-5 pr-5" onSubmit={submitHandler}>
            <div className="flex flex-col text-left">
              <label>
                Full Name<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                type="text"
                name="FName"
                ref={fullNameRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Email<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                type="email"
                name="email"
                ref={emailRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Account Type<span className="text-red-500 ">*</span>
              </label>
              <select
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1 italic text-sm"
                name="accountType"
                id="accountType"
                required
                ref={accountRef}
              >
                <option value="">--- Please select an account ---</option>
                <option value="Dry Cleaner">Dry Cleaner</option>
                <option value="Customer">Customer</option>
              </select>
            </div>

            <div className="flex flex-col text-left">
              <label>
                Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1"
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Confirm Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 pt-1 pb-1"
                type="password"
                name="confirmPassword"
                ref={passwordConfirmRef}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-3 border border-purple-600 bg-purple-600 text-white rounded-md w-full mb-4 pt-2 pb-2"
              type="submit"
            >
              {loading ? <Loader /> : "Sign up"}
            </button>
          </Form>
        </div>
        <div className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="no-underline text-purple-600">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
