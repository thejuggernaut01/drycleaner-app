import Navbar from "./Navbar";
import classes from "./Header.module.css";

const Homepage = () => {
  return (
    <>
      <header className={`${classes.header}`}>
        <Navbar />
        <main className="text-white ">
          <div
            className="absolute top-[50%] left-[50%]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <h2 className="text-2xl sm:text-3xl">
              <span className="text-4xl sm:text-5xl text-purple-400">GET</span>{" "}
              your laundry & dry cleaning within 24 hours
            </h2>
            <p className="mt-6 text-xl italic">
              A convenient laundry solution that helps protect the enivronment.
            </p>
          </div>
        </main>
      </header>
    </>
  );
};

export default Homepage;
