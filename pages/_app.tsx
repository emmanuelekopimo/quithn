import React from 'react';
import { AppProps } from 'next/app';
import './_index.css';
import "./index.css";
import { GoogleAnalytics } from 'nextjs-google-analytics';

function MyApp({ Component, pageProps }: AppProps) {
    <GoogleAnalytics trackPageViews />
    return <Component {...pageProps} />;
}

export default MyApp;
