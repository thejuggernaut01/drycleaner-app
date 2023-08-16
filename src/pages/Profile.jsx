import { useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import Navbar from "../components/layouts/Navbar";

import { AuthContext } from "../store/AuthContext";

const Profile = () => {
  const [dryCleanerData, setDryCleanerData] = useState([]);
  const [avatar, setAvatar] = useState("");

  const { currentUser } = useContext(AuthContext);
  const dryCleanerCol = collection(db, "dryCleaners");
  const email = currentUser && currentUser.email;

  useState(() => {
    const fetchData = async () => {
      const dryCleanerQuery = query(
        dryCleanerCol,
        where("emailAddress", "==", email)
      );
      const querySnapshot = await getDocs(dryCleanerQuery);

      setDryCleanerData(querySnapshot.docs[0].data());
      setAvatar(querySnapshot.docs[0].data().fullName[0]);
    };

    fetchData();
  }, [dryCleanerCol, email]);

  return (
    <>
      <Navbar />
      <h2 className="font-semibold xs:text-2xl sm:text-3xl text-center mt-7 mb-2">
        My profile
      </h2>
      <hr className="w-[90%] mx-auto " />
      <section className="my-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <article className="inline-block text-white border border-blue-600 p-14 rounded-[50%] bg-blue-600 relative">
            <h2
              className="absolute text-6xl top-[50%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {dryCleanerData && avatar}
            </h2>
          </article>
          <p className="text-2xl font-bold">
            {dryCleanerData && dryCleanerData.fullName}
          </p>

          {/* Business Details */}
          <article className="text-left mt-5">
            <h4 className="text-xl font-semibold">Business Details</h4>
            <p>
              Business Name: {dryCleanerData && dryCleanerData.businessName}
            </p>
            <p>
              Business Email: {dryCleanerData && dryCleanerData.businessEmail}
            </p>
            <p>Phone Number: {dryCleanerData && dryCleanerData.phoneNum}</p>
          </article>

          {/* Account Details */}
          <article className="text-left mt-5">
            <h4 className="text-xl font-semibold">Business Details</h4>
            <p>Account Name: {dryCleanerData && dryCleanerData.acctName}</p>
            <p>Account Number: {dryCleanerData && dryCleanerData.acctNumber}</p>
            <p>Bank Nam: {dryCleanerData && dryCleanerData.bankName}</p>
          </article>

          {/* Wears and Price */}
          <article className="text-left mt-5">
            <h4 className="text-xl font-semibold">Wears and Price</h4>
            <div className="flex space-x-5 items-center">
              <p>{dryCleanerData && `${dryCleanerData.wear1}:`}</p>
              <p>{dryCleanerData && `#${dryCleanerData.wear1Price}`}</p>
            </div>

            <div className="flex space-x-5 items-center">
              <p>{dryCleanerData && `${dryCleanerData.wear2}:`}</p>
              <p>{dryCleanerData && `#${dryCleanerData.wear1Price}`}</p>
            </div>

            <div className="flex space-x-5 items-center">
              <p>{dryCleanerData && `${dryCleanerData.wear3}:`}</p>
              <p>{dryCleanerData && `#${dryCleanerData.wear1Price}`}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Profile;
