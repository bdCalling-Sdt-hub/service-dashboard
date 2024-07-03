import { createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./AdminRoute";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import NotFound from "../Components/NotFound";
import Notification from "../pages/Main/Notification/Notification";
import ProfileInformation from "../pages/Main/ProfileInformation/ProfileInformation";
import EditProfileInformation from "../pages/Main/EditProfileInformation/EditProfileInformation";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Earnings from "../pages/Main/Earnings/Earnings";
import AllUser from "../pages/Main/AllUser/AllUser";
import Providers from "../pages/Main/Providers/Providers";
import Categories from "../pages/Main/Categories/Categories";
import AddCategory from "../pages/Main/AddCategory/AddCategory";
import EditCategory from "../pages/Main/EditCategory/EditCategory";
import Withdraw from "../pages/Main/Withdraw/Withdraw";
import Settings from "../pages/Main/Settings/Settings";
import PrivacyPolicy from "../pages/Main/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Main/Settings/EditPrivacyPolicy";
import TermsAndConditions from "../pages/Main/Settings/TermsAndConditions";
import EditTermsAndCondition from "../pages/Main/Settings/EditTermsAndCondition";
import AboutUs from "../pages/Main/Settings/AboutUs";
import EditAboutUs from "../pages/Main/Settings/EditAboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminRoutes><Main /></AdminRoutes>,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/earning",
        element: <Earnings />,
      },
      {
        path: "/users",
        element: <AllUser />,
      },
      {
        path: "/provider",
        element: <Providers />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/add-categories",
        element: <AddCategory />,
      },
      {
        path: "/categories/edit-categories/:id",
        element: <EditCategory />,
      },
      // PROFILE INFORMATION
      {
        path: "/profile-information",
        element: <ProfileInformation />,
      },
      {
        path: "/edit-profile/:id",
        element: <EditProfileInformation />,
      },
      // WITHDRAW REQUEST
      {
        path: "/withdraw-request",
        element: <Withdraw />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "/settings/terms-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/settings/edit-terms-conditions",
        element: <EditTermsAndCondition />,
      },
      {
        path: "/settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "/settings/edit-about-us",
        element: <EditAboutUs />,
      },
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify/:email",
        element: <VerifyOtp />,
      },
      {
        path: "update-password/:email",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export default router