import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <HelmetProvider> */}
      <PersistGate loading={null} persistor={persistor}>

        <Toaster />
        <RouterProvider router={router} />
        {/* </HelmetProvider> */}
      </PersistGate>
    </Provider>
  </StrictMode>
);
