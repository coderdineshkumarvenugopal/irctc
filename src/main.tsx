import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { PageLoader } from "./app/utils/SuspenseWrapper.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
