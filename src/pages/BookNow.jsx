import { useState, useEffect } from "react";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../components/layouts/Navbar";
import DryCleanersList from "../components/layouts/DryCleanersList";
import Loader from "../components/ui/Loader";

const BookNow = () => {
  const [dryCleanerDetails, setDryCleanerDetails] = useState([]);

  const dryCleanersCol = collection(db, "dryCleaners");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(dryCleanersCol);
      setDryCleanerDetails(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchData();
  }, [dryCleanersCol]);

  return (
    <>
      <Navbar />
      <section>
        <h2 className="my-5 text-center font-semibold xs:text-2xl sm:text-3xl">
          Available Dry Cleaners
        </h2>

        {dryCleanerDetails.length === 0 ? (
          <div className="mb-10 text-center">
            <Loader />
          </div>
        ) : (
          <DryCleanersList dryCleanerDetails={dryCleanerDetails} />
        )}
      </section>
    </>
  );
};

export default BookNow;
