import { createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./AdminRoute";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminRoutes><Main /></AdminRoutes>,
        children: [
        //     {
        //         path: "/",
        //         element: <DashboardHome />,
        //       },
        //       {
        //         path: "/earning",
        //         element: <Earnings />,
        //       },
        //       {
        //         path: "/users",
        //         element: <AllUser/>,
        //       },
        //       {
        //         path: "/profile-information",
        //         element: <ProfileInformation/>,
        //       },
        //       {
        //         path: "/edit-profile/:id",
        //         element: <EditProfileInformation/>,
        //       },
        //       {
        //         path: "/notification",
        //         element: <Notification/>,
        //       },
        //       {
        //         path: "/settings",
        //         element: <Settings/>,
        //       },
        //       {
        //         path: "/settings/privacy-policy",
        //         element: <PrivacyPolicy/>,
        //       },
        //       {
        //         path: "/settings/edit-privacy-policy",
        //         element: <EditPrivacyPolicy />,
        //       },
        //       {
        //         path: "/settings/terms-conditions",
        //         element: <TermsAndConditions/>,
        //       },
        //       {
        //         path: "/settings/edit-terms-conditions",
        //         element: <EditTermsAndCondition/>,
        //       },
        //       {
        //         path: "/settings/about-us",
        //         element: <AboutUs/>,
        //       },
        //       {
        //         path: "/settings/edit-about-us",
        //         element: <EditAboutUs/>,
        //       },
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth",
            element: <Login/>,
          },
        //   // {
        //   //   path: "login",
        //   //   element: <Login />,
        //   // },
        //   {
        //     path: "forgot-password",
        //     element: <ForgotPAssword/>,
        //   },
        //   {
        //     path: "verify/:email",
        //     element: <VerifyOtp />,
        //   },
        //   {
        //     path: "update-password/:email",
        //     element: <UpdatePassword/>,
        //   },
        ],
      },
      {
         path: "*",
    //   element: <NotFound />,
    },
])

export default router