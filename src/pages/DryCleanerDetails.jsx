import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";

import Navbar from "../components/layouts/Navbar";
import ServiceCard from "../components/layouts/ServiceCard";

const DryCleanerDetails = () => {
  const { drycleaner } = useParams();
  const [data, setData] = useState([]);

  const dryCleanersCol = collection(db, "dryCleaners");

  useEffect(() => {
    const fetchData = async () => {
      const dryCleanerQuery = query(
        dryCleanersCol,
        where("businessName", "==", drycleaner.split("-").join(" "))
      );

      const querySnapshot = await getDocs(dryCleanerQuery);
      if (!querySnapshot.empty) {
        setData(querySnapshot.docs[0].data());
      }
    };

    fetchData();
  }, [dryCleanersCol, drycleaner]);

  return (
    <>
      <Navbar />
      <section className="mt-3">
        <h1 className="text-center xs:text-2xl sm:text-3xl sm:font-semibold mb-3">
          Dry Cleaner Details - Order Now
        </h1>

        <div className="text-center bg-white border-2 rounded-2xl py-3 w-[90%] sm:w-[70%] mx-auto">
          <div className="inline-block text-white border border-blue-600 p-10 rounded-[50%] bg-blue-600 relative">
            <h2
              className="absolute text-6xl top-[50%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {data.fullName && data.fullName[0]}
            </h2>
          </div>
          <p className="text-2xl font-bold">{data.fullName}</p>
          <p className="italic">Phone Number: {data.phoneNum}</p>
          <p className="italic">Business Name: {data.businessName}</p>
          <p className="italic">Business Email: {data.businessEmail}</p>
          <p className="italic">Working Time: {data.workingTime}</p>
          <p className="italic">Working Days: {data.workingDays}</p>
          <p className="italic">Delivery Time: {data.deliveryTime}</p>

          <ServiceCard
            wear1={data.wear1}
            wear1Price={data.wear1Price}
            wear2={data.wear2}
            wear2Price={data.wear2Price}
            wear3={data.wear3}
            wear3Price={data.wear3Price}
            dryCleanerEmail={data.emailAddress}
            dryCleanerNumber={data.phoneNum}
            deliveryTime={data.deliveryTime}
            dryCleanerBizName={data.businessName}
          />
        </div>
      </section>
    </>
  );
};

export default DryCleanerDetails;
