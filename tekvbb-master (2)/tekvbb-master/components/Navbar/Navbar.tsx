import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import Button from "../shared/Button";
import NulsConnector from "../NulsConnector";
import BigNumber from "bignumber.js";
import { HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "../../pages";
import Claim from "../../pages/claim";
import {render} from "react-dom";

const itemVariants = {
  closed: {
    transition: {
      duration: 0.2,
    },
    opacity: 0,
  },
  open: {
    transition: {
      duration: 0.3,
    },
    opacity: 1,
  },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: 1,
    },
  },
};

const Navbar: React.FC = () => {
  const [more, setMore] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [nulsPrice, setANulsPrice] = useState();
  const [wtfPrice, setWtfPrice] = useState("");
  const [nswapPrice, setNswapPrice] = useState("");
  const [walletInfo, setWalletInfo] = useState("");
  const [nuls, setNuls] = useState(new NulsConnector());
  const [wallet, setWallet] = useState("");
  const [ saleValid0, setSaleValid0] = useState(true);
  const [ saleValid1, setSaleValid1] = useState(true);
  const [ saleValid2, setSaleValid2] = useState(true);
  const [ saleValid3, setSaleValid3] = useState(true);
  const [ currentSale, setCurrentSale ] = useState(0);
  const [ showAirdrop, setAirdrop ] = useState(0);

  const func = async () => {

    setNuls(await nuls.initialize());
    // @ts-ignore
    let _wallet = nuls.getAccount();
    setWallet(_wallet)
    _wallet = (_wallet !== null) ? _wallet : "Wrong Address";
    setWalletInfo(_wallet?.substring(0,8)+ "..."+ _wallet?.substring(_wallet.length - 5) );

  }



  func();

  useEffect(() => {


    // Your API Endpoint goes here
    fetch("https://api.binance.com/api/v3/ticker/price?symbol=NULSUSDT")
        .then((res) => res.json())
        .then((data) => setANulsPrice(data.price));

    async function nswapPrice() {
      let rl = await nuls.bothReserves("NULSd6HgnMqcZX3oRBWqDReUyD8BWCErCxawg")
      let i = rl.split(",");
      let price = new BigNumber(i[0]).dividedBy(i[1]).toString()

      setNswapPrice(price);
    }
    nswapPrice()

    async function waterTigerPrice() {
      let rl = await nuls.bothReserves("NULSd6Hgts1DifVoftWah8jvhf9qizektZVN5")
      let i = rl.split(",");
      let price = new BigNumber(i[1]).dividedBy(i[0]).toString()

      setWtfPrice(price);
    }
    waterTigerPrice()

    async function getValid() {
      let v = await nuls.saleValid("NULSd6HgrYbnW4EtD3ojDwxog5AMyez6v7jET")
      setSaleValid0((v > 0) ? true : false );
    }
    getValid()

    async function getValid1() {
      let v = await nuls.saleValid("NULSd6Hgp8g3jiyK6xrAxFU3PPnabRD9as6vK")
      setSaleValid1((v > 0) ? true : false );
    }
    getValid1()

    async function getValid2() {
      let v = await nuls.saleValid("NULSd6HgoQSqtRnun8Qdoh9bkE3T9v2NiWAeB")
      setSaleValid2((v > 0) ? true : false );
    }
    getValid2()

    async function getValid3() {
      let v = await nuls.saleValid("NULSd6HgoQSqtRnun8Qdoh9bkE3T9v2NiWAeB")
      setSaleValid3((v > 0) ? true : false );
    }
    getValid3()


    async function validWhitelist0(){
      setAirdrop(await nuls.saleValid("NULSd6HgyCB78LugX88yUrCrMNZt99FVrKj4H", wallet.toString()))

    }

    validWhitelist0()
  }, []);

  function openMobileMenu() {
    setMobileMenu((setMobileMenu) => !setMobileMenu);
  }

  function changeSale(sale){
    document.getElementById("saleSelected" + sale).style.background = "#32e08d";
    setCurrentSale(sale);
  }



 /* async function claim(batch){
    await nuls.claimBatch("NULSd6HgrYbnW4EtD3ojDwxog5AMyez6v7jET", "NULSd6HgpTQVSzYXyAKhaHnZbguSb557HC5Cu", batch)
  }*/



  return (
    <nav className="flex w-full items-center justify-between bg-tekGreen py-3 px-10 font-semibold text-white">
      <div className="flex items-center space-x-1">
        <div> <img src="/images/logos/WT.png" className="imgMainLogo"/></div>
        <div className="hidden items-center space-x-5 pl-20 md:flex">
          <Link href="/">
            <button  className="font-semibold">Stake</button>
          </Link>
          <Link href="/claim">
            <button  className={`font-semibold `}>Airdrop</button>
          </Link>

          { /*  <button
            onClick={() => setMore((prev) => !prev)}
            className="relative z-50 flex items-center space-x-1 font-semibold"
          >
            <span>ClaimPool</span>
            <p
              className={`${
                more ? "rotate-180" : "rotate-0"
              } text-xl font-bold transition-all`}
            >
              <TiArrowSortedDown />
            </p>
            <AnimatePresence>
              {more && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 -left-3 flex w-[200px] rounded bg-tekGreen p-5"
                >
                  <ul>
                    Select Sale
                    { (saleValid0) ? <>
                      <button id={"saleSelected" + 0} onClick={() => changeSale(0)} className={`saleBtn ${
                          currentSale == 0 ? "saleBtnActive" : ""
                      }`}  >whitelist</button>
                      <br/></> :  <></>
                    }

                  <button id={"saleSelected" + 1} onClick={() => changeSale(1)} className={`saleBtn ${
                      currentSale == 1 ? "saleBtnActive" : ""
                  }`}>Sale 1</button><br/>
                  <button id={"saleSelected" + 2} onClick={() => changeSale(2)} className={`saleBtn ${
                      currentSale == 2 ? "saleBtnActive" : ""
                  }`}>Sale 2</button><br/>
                  <button id={"saleSelected" + 3} onClick={() => changeSale(3)} className={`saleBtn ${
                      currentSale == 3 ? "saleBtnActive" : ""
                  }`}>Sale 3</button>
                  </ul>
                  <ul>
                    <li>
                      <Link href={"./claim"}>
                        <a>22/09/22</a>
                      </Link>

                      <button onClick={() => claim(1)}className="claimVestBtn"> 1st ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#2"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn">2nd ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#3"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 3rd ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 4th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 5th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 6th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 7th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>22/12/22</a>
                      </Link>
                      <button className="claimVestBtn"> 8th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>Item 5</a>
                      </Link>
                      <button className="claimVestBtn"> 9th ClaimPool</button>
                    </li>
                    <li>
                      <Link href={"#5"}>
                        <a>Item 5</a>
                      </Link>
                      <button className="claimVestBtn"> 10th ClaimPool</button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </button> */}
        </div>
      </div>
      <div className="hidden items-center space-x-14 md:flex">
        <div className="flex items-center space-x-1"  style={{}}>
          <img src="/images/logos/nuls.png" className="imgLogo"/>
          <p>${parseFloat(nulsPrice).toFixed(3)}</p>
        </div>
        <div className="flex items-center space-x-1" >
          <img src="/images/logos/nswap-circ.svg" className="imgLogo"/>
          <p>${new BigNumber(nswapPrice).multipliedBy(nulsPrice).toFixed(4).toString()}</p>
        </div>
        <div className="flex items-center space-x-1" >
          <img src="/images/logos/Water_T-02.png" className="imgLogo"/>
          <p id="wtfPrice">${new BigNumber(wtfPrice).multipliedBy(nswapPrice).multipliedBy(nulsPrice).toFixed(5).toString()}</p>
        </div>
        <Button>
          <button className="font-semibold">{ walletInfo}</button>
        </Button>
      </div>
      <div
        onClick={openMobileMenu}
        className="flex items-center justify-center text-4xl md:hidden"
      >
        <motion.button whileTap={{ scale: 0.3 }}>
          {mobileMenu ? <MdOutlineClose /> : <AiOutlineMenu />}
        </motion.button>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="absolute left-0 top-0 bg-white/50"
            onClick={openMobileMenu}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: "100%",
              transition: {
                duration: 0,
                damping: 100,
              },
            }}
            exit={{
              width: 1,
              transition: { duration: 0 },
            }}
          >
            <motion.div
              className="relative left-0 top-0 z-50"
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 1,
                transition: { duration: 0.3 },
              }}
              onClick={openMobileMenu}
            >
              <motion.div
                className="h-screen bg-tekGreen text-white"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
                onClick={openMobileMenu}
              >
                <motion.div
                  className="flex flex-col items-center space-y-5 py-10"
                  variants={itemVariants}
                >

                  <ul className="flex flex-col space-y-3">
                    <li>
                      <Link href={"/"}>
                        <a>Stake</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/claim"}>
                        <a>Airdrop</a>
                      </Link>
                    </li>

                  </ul>

                  <Button>
                    <Link href={"https://app.nulswap.com/"}>
                     <button className="font-semibold">Buy $WTF</button>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>

  );
};

export default Navbar;
