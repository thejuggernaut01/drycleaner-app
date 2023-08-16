import { useEffect, useState, useContext } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import Loader from "../ui/Loader";

const ServiceCard = ({
  wear1,
  wear1Price,
  wear2,
  wear2Price,
  wear3,
  wear3Price,
  dryCleanerEmail,
  dryCleanerNumber,
  deliveryTime,
  dryCleanerBizName,
}) => {
  const navigate = useNavigate();

  const [wear1Input, setWear1Input] = useState(0);
  const [wear2Input, setWear2Input] = useState(0);
  const [wear3Input, setWear3Input] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const cart = collection(db, "cart");
  const customers = collection(db, "customers");

  const currentUserEmail = currentUser && currentUser.email;

  // Get Customer Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerQuery = query(
          customers,
          where("emailAddress", "==", currentUserEmail)
        );

        const querySnapshot = await getDocs(customerQuery);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [customers, currentUserEmail]);

  // Update Total Price
  useEffect(() => {
    const price =
      wear1Price * wear1Input +
      wear2Price * wear2Input +
      wear3Price * wear3Input;

    setTotalPrice(price);
  }, [wear1Input, wear2Input, wear3Input, wear1Price, wear2Price, wear3Price]);

  const addToCartHandler = async () => {
    if (currentUser) {
      try {
        setLoading(true);
        await addDoc(cart, {
          emailAddress: userData.emailAddress,
          fullName: userData.fullName,
          dryCleanerEmail,
          dryCleanerNumber,
          deliveryTime,
          dryCleanerBizName,
          order: [
            { wear: wear1, price: wear1Price, qty: wear1Input },
            { wear: wear2, price: wear2Price, qty: wear2Input },
            { wear: wear3, price: wear3Price, qty: wear3Input },
          ],
          totalPrice,
        });
        navigate("/checkout");
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="text-center bg-white border-2 rounded-2xl py-4 w-[90%] sm:w-[70%] mx-auto mt-3">
        <p className="text-2xl font-bold">Services</p>

        <div className="space-y-6">
          <div className="flex justify-around">
            <p>
              {wear1} (N{wear1Price})
            </p>

            <div className="flex">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setWear1Input((prev) => prev + 1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>

              <div>
                <input
                  type="number"
                  className="border w-10 text-center"
                  value={wear1Input}
                  onChange={(e) => setWear1Input(e.target.value)}
                  min={0}
                  step={1}
                />
              </div>

              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    if (wear1Input > 0) setWear1Input((prev) => prev - 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-around">
            <p>
              {wear2} (N{wear2Price})
            </p>

            <div className="flex">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setWear2Input((prev) => prev + 1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>

              <div>
                <input
                  type="number"
                  className="border w-10 text-center"
                  value={wear2Input}
                  onChange={(e) => setWear2Input(e.target.value)}
                  min={0}
                  step={1}
                />
              </div>

              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    if (wear2Input > 0) setWear2Input((prev) => prev - 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-around">
            <p>
              {wear3} (N{wear3Price})
            </p>

            <div className="flex">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setWear3Input((prev) => prev + 1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>

              <div>
                <input
                  type="number"
                  className="border w-10 text-center"
                  value={wear3Input}
                  min={0}
                  step={1}
                  onChange={(e) => setWear3Input(e.target.value)}
                />
              </div>

              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    if (wear3Input > 0) setWear3Input((prev) => prev - 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-7 justify-center items-center space-x-4">
          <h3 className="text-2xl">Total Price: </h3>
          <p className="text-xl">N {totalPrice}</p>
        </div>

        <button
          onClick={addToCartHandler}
          className="mt-7 border px-5 py-[0.3rem] bg-purple-400 text-white rounded-lg hover:scale-[1.03]"
        >
          {loading ? <Loader /> : "Add to cart"}
        </button>
      </div>
    </>
  );
};

export default ServiceCard;
