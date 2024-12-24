// pages/_app.js
import "@/styles/globals.css";
import { GlobalProvider } from "@/utils/GlobalProvider";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
