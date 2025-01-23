import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./index";
import Claim from "./claim";
import {render} from "react-dom";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
