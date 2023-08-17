import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import logo from "../../assets/logo.jpeg";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { currentUser, logout } = useContext(AuthContext);
//   const dryCleanersCol = collection(db, "dryCleaners");
//   const [authDryCleaner, setAuthDryCleaner] = useState("");

//   const signInHandler = () => {
//     navigate("/login");
//   };

//   useEffect(() => {
//     const fetchDryCleaners = async () => {
//       try {
//         const dryCleanerQuery = query(
//           dryCleanersCol,
//           where("emailAddress", "==", currentUser && currentUser.email)
//         );
//         const querySnapshot = await getDocs(dryCleanerQuery);
//         const dryCleanerEmail = querySnapshot.docs[0].data().emailAddress;
//         setAuthDryCleaner(dryCleanerEmail);
//       } catch (error) {
//         // console.log(error.message);
//       }
//     };

//     fetchDryCleaners();
//   }, [currentUser, dryCleanersCol]);

//   return (
//     <>
//       <section>
//         <div className="flex justify-between sm:w-[90%] mx-auto pt-2 items-center">
// <Link to={"/"} className="xs:w-[15%] sm:w-[10%] lg:w-[8%]">
//   <img src={logo} alt="Company's logo" />
// </Link>

//           <div className="space-x-3">
//             {currentUser && currentUser.email === authDryCleaner && (
//               <Link to={"/drycleaner-profile"}>
//                 <button className="border-2 px-5 py-1 rounded-md font-semibold ">
//                   Profile
//                 </button>
//               </Link>
//             )}

//             {currentUser && currentUser.email === authDryCleaner && (
//               <Link to={"/edit-profile"}>
//                 <button className="border-2 px-5 py-1 rounded-md font-semibold ">
//                   Edit Profile
//                 </button>
//               </Link>
//             )}

//             <Link
//               to={`${
//                 currentUser && currentUser.email === authDryCleaner
//                   ? "/bookings"
//                   : "/book-now"
//               }`}
//             >
//               <button
//                 onClick={bookNowHandler}
//                 className="border-2 px-5 py-1 rounded-md font-semibold"
//               >
//                 {currentUser && currentUser.email === authDryCleaner
//                   ? "BOOKINGS"
//                   : "BOOK NOW"}
//               </button>
//             </Link>

//             {currentUser && currentUser.email ? (
//               <Link to={"/"}>
//                 <button
//                   onClick={logout}
//                   className="border-2 px-5 py-1 rounded-md font-semibold bg-purple-400 text-white"
//                 >
//                   LOGOUT
//                 </button>
//               </Link>
//             ) : (
//               <button
//                 onClick={signInHandler}
//                 className="border-2 px-5 py-1 rounded-md font-semibold bg-purple-400 text-white"
//               >
//                 SIGN IN
//               </button>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const dryCleanersCol = collection(db, "dryCleaners");
  const [authDryCleaner, setAuthDryCleaner] = useState("");
  const [nav, setNav] = useState(false);

  const signInHandler = () => {
    setNav(!nav);
    navigate("/login");
  };

  const handleNav = () => {
    setNav(!nav);
  };

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
    <div className="flex justify-around items-center py-4 text-white">
      <div className="flex justify-between sm:w-[90%] mx-auto pt-2 items-center ">
        <Link to={"/"} className="xs:w-[15%] sm:w-[10%] lg:w-[8%]">
          <img src={logo} alt="Company's logo" />
        </Link>

        <div className="space-x-3 hidden sm:block">
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
            <button className="border-2 px-5 py-1 rounded-md font-semibold">
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

      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose
            className="cursor-pointer text-purple-400"
            size={30}
          />
        ) : (
          <AiOutlineMenu className="cursor-pointer text-purple-400" size={30} />
        )}
      </div>

      <ul
        className={
          nav
            ? ` fixed left-0 top-0 w-[60%] h-[50%] bg-[#8750a7] ease-in-out duration-500 z-10 `
            : "ease-in-out duration-500 fixed left-[-100%] w-[60%]"
        }
      >
        <Link to={"/"} className="">
          <img
            src={logo}
            alt="Company's logo"
            className="xs:w-[25%] pt-3 pl-3"
          />
        </Link>

        <div className="space-x-3 sm:hidden pt-10 flex flex-col">
          {currentUser && currentUser.email === authDryCleaner && (
            <Link to={"/drycleaner-profile"} className="text-center">
              <button className="border-0">Profile</button>
            </Link>
          )}

          {currentUser && currentUser.email === authDryCleaner && (
            <Link to={"/edit-profile"} className="text-center">
              <button className="border-0">Edit Profile</button>
            </Link>
          )}

          <Link
            to={`${
              currentUser && currentUser.email === authDryCleaner
                ? "/bookings"
                : "/book-now"
            }`}
          >
            <div className="text-center">
              <button className="border-0">
                {currentUser && currentUser.email === authDryCleaner
                  ? "BOOKINGS"
                  : "BOOK NOW"}
              </button>
            </div>
          </Link>

          {currentUser && currentUser.email ? (
            <Link to={"/"} className="text-center">
              <button onClick={logout} className="border-0">
                LOGOUT
              </button>
            </Link>
          ) : (
            <button onClick={signInHandler} className="border-0 ">
              SIGN IN
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
