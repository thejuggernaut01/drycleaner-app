import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import Navbar from "../components/layouts/Navbar";
import Loader from "../components/ui/Loader";
import { AuthContext } from "../store/AuthContext";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [dryCleanerData, setDryCleanerData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const dryCleanersCol = collection(db, "dryCleaners");
  const email = currentUser && currentUser.email;
  const navigate = useNavigate();

  const businessName = useRef();
  const businessEmail = useRef();
  const phoneNum = useRef();
  const acctNumber = useRef();
  const acctName = useRef();
  const bankName = useRef();

  const workingDays = useRef();
  const workingTime = useRef();
  const deliveryTime = useRef();

  const wear1 = useRef();
  const wear1Price = useRef();
  const wear2 = useRef();
  const wear2Price = useRef();
  const wear3 = useRef();
  const wear3Price = useRef();

  useState(() => {
    const fetchData = async () => {
      const dryCleanerQuery = await query(
        dryCleanersCol,
        where("emailAddress", "==", email)
      );
      const querySnapshot = await getDocs(dryCleanerQuery);

      setDryCleanerData(querySnapshot.docs[0].data());
    };

    fetchData();
  }, [dryCleanersCol, email]);

  const uploadHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const dryCleanerQuery = query(
        dryCleanersCol,
        where("emailAddress", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(dryCleanerQuery);

      const documentData = querySnapshot.docs[0].data();
      const documentId = querySnapshot.docs[0].id;

      const newData = {
        ...documentData,
        businessName: businessName.current.value.toLowerCase(),
        businessEmail: businessEmail.current.value,
        phoneNum: phoneNum.current.value,
        acctNumber: acctNumber.current.value,
        acctName: acctName.current.value,
        bankName: bankName.current.value,
        workingDays: workingDays.current.value,
        workingTime: workingTime.current.value,
        deliveryTime: deliveryTime.current.value,
        wear1: wear1.current.value,
        wear1Price: wear1Price.current.value,
        wear2: wear2.current.value,
        wear2Price: wear2Price.current.value,
        wear3: wear3.current.value,
        wear3Price: wear3Price.current.value,
      };

      const docRef = doc(dryCleanersCol, documentId);

      await setDoc(docRef, newData);
      navigate("/drycleaner-profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <section className="my-10">
          <h2 className="text-center xs:text-2xl sm:text-3xl font-semibold opacity-80">
            Edit Profile
          </h2>
          <div className="flex justify-center">
            <hr className="w-[80%]" />
          </div>

          <div className="flex justify-center mt-5">
            <form action="" onSubmit={uploadHandler}>
              <div className="flex flex-col text-left">
                <label>
                  Business Name<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="text"
                  name="bName"
                  ref={businessName}
                  defaultValue={
                    dryCleanerData && dryCleanerData.businessName
                      ? dryCleanerData.businessName
                      : ""
                  }
                  required
                />
              </div>

              <div className="flex flex-col text-left">
                <label>
                  Business Email<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="email"
                  name="email"
                  ref={businessEmail}
                  defaultValue={
                    dryCleanerData && dryCleanerData.businessEmail
                      ? dryCleanerData.businessEmail
                      : ""
                  }
                  required
                />
              </div>

              <div className="flex flex-col text-left">
                <label>
                  Phone Number<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="number"
                  name="phoneNum"
                  ref={phoneNum}
                  defaultValue={
                    dryCleanerData && dryCleanerData.phoneNum
                      ? dryCleanerData.phoneNum
                      : ""
                  }
                  required
                />
              </div>

              <div className="flex flex-col text-left">
                <label>
                  Account Number<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="number"
                  name="acctNumber"
                  ref={acctNumber}
                  defaultValue={
                    dryCleanerData && dryCleanerData.acctNumber
                      ? dryCleanerData.acctNumber
                      : ""
                  }
                  required
                />
              </div>

              <div className="flex flex-col text-left">
                <label>
                  Account Name<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="text"
                  name="acctName"
                  ref={acctName}
                  defaultValue={
                    dryCleanerData && dryCleanerData.acctName
                      ? dryCleanerData.acctName
                      : ""
                  }
                  required
                />
              </div>

              <div className="flex flex-col text-left">
                <label>
                  Bank Name<span className="text-red-500 ">*</span>
                </label>
                <input
                  className="border border-gray-500 outline-none rounded-md xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] pl-1 mb-3 pt-1 pb-1"
                  type="text"
                  name="bankName"
                  ref={bankName}
                  defaultValue={
                    dryCleanerData && dryCleanerData.bankName
                      ? dryCleanerData.bankName
                      : ""
                  }
                  required
                />
              </div>

              <div className="border border-gray-500 outline-none rounded-md px-5 mb-3 py-1 flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="workingDays">
                    Working Days<span className="text-red-500 ">*</span>
                  </label>
                  <input
                    className="border border-gray-500 outline-none rounded-md pl-1 py-1 "
                    type="text"
                    name="workingDays"
                    ref={workingDays}
                    required
                    placeholder="(Mon - Sun)"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="workingTime">
                    Working Time<span className="text-red-500 ">*</span>
                  </label>
                  <input
                    className="border border-gray-500 outline-none rounded-md pl-1 py-1 "
                    type="text"
                    name="workingTime"
                    ref={workingTime}
                    required
                    placeholder="(9:00am - 6:00pm)"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="deliveryTime">
                    Delivery Time<span className="text-red-500 ">*</span>
                  </label>
                  <input
                    className="border border-gray-500 outline-none rounded-md pl-1 py-1 "
                    type="text"
                    name="deliveryTime"
                    ref={deliveryTime}
                    required
                    placeholder="(24hrs)"
                  />
                </div>
              </div>

              {/* Wears Section */}
              <div className="flex justify-between xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] xs:gap-5">
                <select
                  name="clothes"
                  id="clothes"
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[70%]"
                  ref={wear1}
                  required
                >
                  <option value="">--- Select Wears --- </option>
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="Native">Native Wears</option>
                </select>
                <input
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[30%]"
                  type="number"
                  name="bankName"
                  required
                  ref={wear1Price}
                  placeholder="Price (N)"
                />
              </div>

              <div className="flex justify-between xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] xs:gap-5">
                <select
                  name="clothes"
                  id="clothes"
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[70%]"
                  ref={wear2}
                  required
                >
                  <option value="">--- Select Wears --- </option>
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="Native">Native Wears</option>
                </select>
                <input
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[30%]"
                  type="number"
                  name="bankName"
                  required
                  ref={wear2Price}
                  placeholder="Price (N)"
                />
              </div>

              <div className="flex justify-between xs:w-[20rem] sm:w-[30rem] lg:w-[50rem] xs:gap-5">
                <select
                  name="clothes"
                  id="clothes"
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[70%]"
                  ref={wear3}
                  required
                >
                  <option value="">--- Select Wears --- </option>
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="Native">Native Wears</option>
                </select>
                <input
                  className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1 w-[30%]"
                  type="number"
                  name="bankName"
                  required
                  ref={wear3Price}
                  placeholder="Price (N)"
                />
              </div>

              <button
                disabled={loading}
                className="mt-3 border border-purple-600 bg-purple-600 text-white rounded-md w-full mb-4 pt-2 pb-2"
                type="submit"
              >
                {loading ? <Loader /> : "Upload Information"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
