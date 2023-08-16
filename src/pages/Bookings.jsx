import { useState, useContext, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { AuthContext } from "../store/AuthContext";
import { db } from "../firebase";
import Loader from "../components/ui/Loader";
import Navbar from "../components/layouts/Navbar";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const checkoutCollection = collection(db, "checkout");
  const currentUserEmail = currentUser && currentUser.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const checkoutCollectionQuery = query(
          checkoutCollection,
          where("dryCleanerEmail", "==", currentUserEmail)
        );
        const querySnapshot = await getDocs(checkoutCollectionQuery);

        if (!querySnapshot.empty) {
          const allData = querySnapshot.docs.map((data) => data.data());
          setData(allData);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // console.log(data);

  return (
    <section>
      <Navbar />

      <div className="text-2xl text-center border-b-2 mt-10 mb-10 ">
        LIST OF ORDERS
      </div>

      <table className="w-[90%] mx-auto mt-5">
        <thead>
          <tr className="flex justify-between it border-b-black border-b-2">
            <th className="py-2 xs:text-lg sm:text-xl font-semibold">Name</th>
            <th className="py-2 xs:text-lg sm:text-xl font-semibold">Number</th>
            <th className="py-2 xs:text-lg sm:text-xl font-semibold">
              Location
            </th>
            <th className="py-2 xs:text-lg sm:text-xl font-semibold">
              {" "}
              Payment Date
            </th>
          </tr>
        </thead>
        {loading ? (
          <div className="text-center mt-3">
            <Loader />{" "}
          </div>
        ) : (
          <tbody>
            {data.map((data) => (
              <tr
                key={data.refId}
                className="flex justify-between border-b-black border-b-2"
              >
                <td className="py-2 xs:text-base sm:text-lg">
                  {data.billingName}
                </td>
                <td className="py-2 xs:text-base sm:text-lg font-semibold">
                  {data.billingPhone}
                </td>
                <td className="py-2 xs:text-base sm:text-lg">
                  {data.location}
                </td>
                <td className="py-2 xs:text-base sm:text-lg">
                  {data.paymentDate}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
};

export default Bookings;
