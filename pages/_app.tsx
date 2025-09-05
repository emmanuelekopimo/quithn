import { AppProps } from "next/app";
import "./_index.css";
import "./index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
