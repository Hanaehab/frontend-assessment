import "../styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
