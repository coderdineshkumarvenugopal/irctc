import { lazy } from "react";
import { SuspenseWrapper } from "../utils/SuspenseWrapper";

export const Home = SuspenseWrapper(lazy(() => import("../pages/Home")));
export const Login = SuspenseWrapper(
  lazy(() => import("../pages/login/Login"))
);
export const SignIn = SuspenseWrapper(
  lazy(() => import("../pages/login/sign-in/SignIn"))
);
export const BookingForm = SuspenseWrapper(
  lazy(() => import("../pages/booking-form"))
);
export const CoachLayout = SuspenseWrapper(
    lazy(() => import("../pages/coach-layout"))
  );
  export const AccountSettings = SuspenseWrapper(
    lazy(() => import("../pages/account-settings"))
  );

