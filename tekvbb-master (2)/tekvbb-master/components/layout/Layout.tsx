import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import { FiArrowUpCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import NulsConnector from "../NulsConnector";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "WaterTiger Finance"}: Props) => {
  const [clientWindowHeight, setClientWindowHeight] = useState(0);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar/>
      <main>{children}</main>

      <AnimatePresence>
        {clientWindowHeight > 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toTop}
            className={"cursor-pointer"}
          >
            <a className="fixed right-5 bottom-5 rounded-xl bg-tekGreen p-4 text-2xl font-bold text-white/75">
              <FiArrowUpCircle />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
