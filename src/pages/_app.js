// src/pages/_app.js
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Script from "next/script";
import SmoothScroll from "@/components/scroll";
import Hero from "@/components/Hero";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isHome = pathname === "/";

  return (
    <>
      {/* your main.js (court‑gay) */}
      <Script src="/assets/scripts/main.js" strategy="afterInteractive" />

      {/* wrap the whole app in Lenis smooth‑scroll */}
      <SmoothScroll>
        {/* only render Hero on the homepage */}
        {isHome && <Hero />}

        <Component {...pageProps} />
      </SmoothScroll>
    </>
  );
}
