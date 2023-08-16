import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { PaystackButton } from "react-paystack";

import Navbar from "../components/layouts/Navbar";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";
import Loader from "../components/ui/Loader";
import { Email } from "../components/Email";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cart = collection(db, "cart");
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser && currentUser.email;
  const navigate = useNavigate();
  const checkoutCollection = collection(db, "checkout");

  const currentDate = new Date();

  const [billingName, setBillingName] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [location, setLocation] = useState("");

  // Get date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cartQuery = query(
          cart,
          where("emailAddress", "==", currentUserEmail)
        );
        const querySnapshot = await getDocs(cartQuery);
        if (!querySnapshot.empty) {
          setData(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // paystack configuration option
  const config = {
    reference: new Date().getTime().toString(),
    email: billingEmail,
    amount: 100 * data.totalPrice, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bb1ac48e140e3a19ef74d0af8e693fe04500f2a5",
  };

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (currentUser && reference.status === "success") {
      try {
        // add checkout detail to database
        await addDoc(checkoutCollection, {
          userEmail: currentUser.email,
          billingName,
          billingPhone,
          billingEmail,
          dryCleanerEmail: data.dryCleanerEmail,
          location,
          transNum: reference.trans,
          refId: reference.reference,
          status: reference.status,
          paymentDate: `${year}-${month}-${day}`,
        });

        // Send Email
        const smtpConfig = {
          Host: "smtp.elasticemail.com",
          Username: "oadewusi89@gmail.com",
          Password: "CAEBB7B86083DA22F6CB2C683AEE2B6A226D",
          To: `${billingEmail}`,
          From: "oadewusi89@gmail.com",
          Subject: `Your Order Confirmation for ${year}-${month}-${day} Dry Cleaning Service`,
          Body: `<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F5F6F8;">
  <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #F5F6F8;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F5F6F8;">
    <tr>
    <td>
    <![endif]-->
    <!-- Email Body -->
    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="margin: auto;" class="email-container">
      <!-- Section: email title -->
      <tr>
        <td style="padding: 48px 32px 20px; text-align: center; background-color: #ffffff;">
          <p class="header-text" style="height: auto; margin: 15px 0; background: #ffffff; font-family: Open Sans; text-align: center; font-size: 32px; line-height: 34px; color: #000000; background-color: #ffffff;">
            Order Details
          </p>
          <p style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">Dear ${billingName},</p>
          <p style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">Thank you for choosing Opzzy Clean for your dry cleaning needs. We're excited to serve you!</p>
          <p
            style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">
            Date: ${year}-${month}-${day} <br />
            Total Amount: ${data.totalPrice} <br />
            Dry Cleaner: ${data.dryCleanerBizName} <br />
            Dry Cleaner Email: ${data.dryCleanerEmail} <br />
            Dry Cleaner Number: ${data.dryCleanerNumber} <br />
</p>
          <p class="header-text"
            style="height: auto; margin: 15px 0; background: #ffffff; font-family: Open Sans; text-align: center; font-size: 28px; line-height: 34px; color: #000000; background-color: #ffffff;">
            Order Type
          </p>
          ${
            data.order &&
            data.order.map((data) => (
              <p
                key={data.price}
                style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;"
              >
                ${data.wear}: ${data.qty} <br />
              </p>
            ))
          }
<p
            style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">
We've received your booking and payment successfully. Our team is now working diligently to ensure your garments receive
the best care and attention. You can expect your order to be ready in ${
            data.deliveryTime
          }.</p>
          <p
            style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">Thank you again for trusting us with your clothing care. We look forward to providing you with a top-notch dry cleaning experience.</p>
          <p
            style="height: auto; margin: 28px 0 15px; background: #ffffff; text-align: left; font-family: Open Sans; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">Best regards,<br />
            Opzzy Clean</p>
        </td>
      </tr>
      <td style="padding: 20px 32px 64px; text-align: center; background-color: #ffffff;">
      <!-- Unsubscribe -->
      <tr>
        <td style="padding: 20px 32px 0px; text-align: center; background: #F5F6F8; background-color: #F5F6F8;" bgcolor="#F5F6F8">
          <p class="text-center small" style="height: auto; background: #F5F6F8; margin: 15px 0; font-family: Open Sans; font-size: 11px; line-height: 15px; color: #555555; background-color: #F5F6F8;">
            If you no longer wish to receive mail from us, you can <a href="{unsubscribe}" class="link-btn">unsubscribe</a>
          </p>
        </td>
      </tr>

      <!-- Account Address -->
      <tr>
        <td style="padding: 5px 32px 64px; text-align: center; background: #F5F6F8; background-color: #F5F6F8;" bgcolor="#F5F6F8">
          <p style="height: auto; margin: 0px; background: #F5F6F8; font-family: Open Sans; font-size: 11px; line-height: 15px; color: #555555; background-color: #F5F6F8;">
            {accountaddress}
          </p>
        </td>
      </tr>

    </table>

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>`,
        };

        Email.send(smtpConfig);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  // component props for paystack
  const componentProps = {
    ...config,
    text: "Pay With Paystack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <>
      <section>
        <Navbar />

        <div className="w-[90%] mx-auto text-center mt-10 ">
          <div>
            <h2 className="text-2xl mb-3">Billing Details</h2>
            <aside className="flex flex-col space-y-4 items-center">
              <input
                type="text"
                className="border rounded-lg py-2 text-lg pl-2 text-black outline-gray-400 w-[80%] sm:w-[50%]"
                placeholder="Enter Fullname"
                required
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
              />

              <input
                type="number"
                className="border rounded-lg py-2 text-lg pl-2 text-black outline-gray-400 w-[80%] sm:w-[50%]"
                placeholder="Enter Phone Number"
                required
                value={billingPhone}
                onChange={(e) => setBillingPhone(e.target.value)}
              />
              <input
                type="email"
                className="border rounded-lg py-2 text-lg pl-2 text-black outline-gray-400 w-[80%] sm:w-[50%]"
                placeholder="Enter Email Address"
                required
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
              />
            </aside>
          </div>
          <h2 className="text-2xl mt-7 mb-3">Pick & Drop Location</h2>
          <div>
            <select
              name="location"
              id="location"
              className="border px-3 py-2 rounded-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">--- Please select a location ---</option>
              <option value="Oyetade Hostel">Oyetade Hostel</option>
              <option value="Maye Hostel">Maye Hostel</option>
              <option value="Moremi Hostel">Moremi Hostel</option>
              <option value="Adeline Hostel">Adeline Hostel</option>
              <option value="IOA Hostel">IOA Hostel</option>
            </select>
          </div>
        </div>

        <hr className="w-full mt-10" />
        <h3 className="text-3xl text-center my-2">Order Summary</h3>
        <hr className="w-full" />

        <div className="px-4 mb-10">
          <table className="w-[90%] mx-auto">
            <thead>
              <tr className="flex justify-between border-b-black border-b-2">
                <th className="text-xl font-semibold">Product</th>
                <th className="py-2 text-xl font-semibold">Price</th>
              </tr>
            </thead>
            {loading ? (
              <div className="text-center mt-3">
                <Loader />
              </div>
            ) : (
              <tbody>
                {data &&
                  data.order &&
                  data.order.map((data) => (
                    <tr
                      key={data.emailAddress}
                      className="flex justify-between border-b-black border-b-2"
                    >
                      <td className="py-2 text-lg">
                        {data.wear} (x{data.qty})
                      </td>
                      <td className="py-2 text-lg font-semibold">
                        N{data.price * data.qty}
                      </td>
                    </tr>
                  ))}

                <tr className="flex justify-between border-b-black border-b-2">
                  <td className="py-2 text-xl font-semibold">Total</td>
                  <td className="py-2 text-lg font-semibold">
                    N{data.totalPrice}
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <div className="w-[90%] mx-auto">
            <PaystackButton
              className={`${classes.btn}  my-4`}
              {...componentProps}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
