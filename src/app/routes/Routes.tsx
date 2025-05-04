import { Suspense } from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import App from "../../App";
import { PageLoader } from "../utils/SuspenseWrapper";
import { ROUTES } from "./constant";
import { AccountSettings, BookingForm, CoachLayout, Home, Login, SignIn } from "./lazyLoad";

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
          <App />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        children: [
          
        ]
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
        children: [
          
        ]
      },
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
        children: [
          
        ]
      },
      {
        path: ROUTES.COACH_SELECTION,
        element: <CoachLayout />,
        children: [
         
        ]
      },
      {
        path: ROUTES.ACCOUNT_SETTINGS,
        element: <AccountSettings />,
        children: [
         
        ]
      },
      {
        path: ROUTES.BOOKING,
        children: [
          {
            path: "",
            element: (
                <BookingForm/>
            )
          },
         
        ]
      },
    
    ]
  },{
    path: "/",
    index:true,
    element: <Navigate to={`${ROUTES.LOGIN}`} replace></Navigate>
  }
]);
