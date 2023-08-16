import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";

import RootRoute from "./pages/RootRoute";
import Header from "./components/layouts/Header";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import BookNow from "./pages/BookNow";
import DryCleanerDetails from "./pages/DryCleanerDetails";
import Checkout from "./pages/Checkout";
import Bookings from "./pages/Bookings";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootRoute />,
      children: [
        { index: true, element: <Header /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "edit-profile", element: <EditProfile /> },
        { path: "drycleaner-profile", element: <Profile /> },
        { path: "checkout", element: <Checkout /> },
        { path: "bookings", element: <Bookings /> },
        {
          path: "book-now",
          element: <BookNow />,
        },
        { path: "book-now/:drycleaner", element: <DryCleanerDetails /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
