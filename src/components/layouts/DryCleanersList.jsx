import { Link } from "react-router-dom";

const DryCleanersList = ({ dryCleanerDetails }) => {
  return (
    <>
      <section className="mt-10 rounded-2xl py-6 w-[90%] sm:w-[90%] mx-auto xs:space-y-8 sm:space-y-0 sm:flex justify-center gap-16">
        {dryCleanerDetails &&
          dryCleanerDetails.map((details) => (
            <div
              key={details.emailAddress}
              className="text-center border-2 py-7 px-10 rounded-2xl"
            >
              <div className="inline-block text-white border border-blue-600 p-10 rounded-[50%] bg-blue-600 relative">
                <h2
                  className="absolute text-6xl top-[50%] left-[50%]"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  {details.fullName[0]}
                </h2>
              </div>
              <p className="text-2xl font-bold">{details.fullName}</p>
              <p className="italic">Business Name: {details.businessName}</p>
              <p className="italic">Working Time: {details.workingTime}</p>
              <p className="italic">Working Days: {details.workingDays}</p>
              <p className="italic">Delivery Time: {details.deliveryTime}</p>

              <Link
                to={`/book-now/${details.businessName.split(" ").join("-")}`}
              >
                <button className="mt-7 border px-5 py-[0.3rem] bg-purple-400 text-white rounded-lg hover:scale-[1.03]">
                  Order Now
                </button>
              </Link>
            </div>
          ))}
      </section>
    </>
  );
};

export default DryCleanersList;
