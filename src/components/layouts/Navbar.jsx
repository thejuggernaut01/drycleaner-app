import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const dryCleanersCol = collection(db, "dryCleaners");
  const [authDryCleaner, setAuthDryCleaner] = useState("");

  const signInHandler = () => {
    navigate("/login");
  };

  const bookNowHandler = () => {};

  useEffect(() => {
    const fetchDryCleaners = async () => {
      try {
        const dryCleanerQuery = query(
          dryCleanersCol,
          where("emailAddress", "==", currentUser && currentUser.email)
        );
        const querySnapshot = await getDocs(dryCleanerQuery);
        const dryCleanerEmail = querySnapshot.docs[0].data().emailAddress;
        setAuthDryCleaner(dryCleanerEmail);
      } catch (error) {
        // console.log(error.message);
      }
    };

    fetchDryCleaners();
  }, [currentUser, dryCleanersCol]);

  return (
    <>
      <section>
        <div className="flex justify-between sm:w-[90%] mx-auto pt-2 items-center">
          <Link to={"/"} className="xs:w-[15%] sm:w-[10%] lg:w-[8%]">
            <img src={logo} alt="Company's logo" />
          </Link>

          <div className="space-x-3">
            {currentUser && currentUser.email === authDryCleaner && (
              <Link to={"/drycleaner-profile"}>
                <button className="border-2 px-5 py-1 rounded-md font-semibold ">
                  Profile
                </button>
              </Link>
            )}

            {currentUser && currentUser.email === authDryCleaner && (
              <Link to={"/edit-profile"}>
                <button className="border-2 px-5 py-1 rounded-md font-semibold ">
                  Edit Profile
                </button>
              </Link>
            )}

            <Link
              to={`${
                currentUser && currentUser.email === authDryCleaner
                  ? "/bookings"
                  : "/book-now"
              }`}
            >
              <button
                onClick={bookNowHandler}
                className="border-2 px-5 py-1 rounded-md font-semibold"
              >
                {currentUser && currentUser.email === authDryCleaner
                  ? "BOOKINGS"
                  : "BOOK NOW"}
              </button>
            </Link>

            {currentUser && currentUser.email ? (
              <Link to={"/"}>
                <button
                  onClick={logout}
                  className="border-2 px-5 py-1 rounded-md font-semibold bg-purple-400 text-white"
                >
                  LOGOUT
                </button>
              </Link>
            ) : (
              <button
                onClick={signInHandler}
                className="border-2 px-5 py-1 rounded-md font-semibold bg-purple-400 text-white"
              >
                SIGN IN
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
