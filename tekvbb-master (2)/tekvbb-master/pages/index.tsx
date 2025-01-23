import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import MainPool from "../components/MainPool/MainPool";
import Farm from "../components/Farm/Farm";
import React, {useEffect, useState} from "react";
import NulsConnector from "../components/NulsConnector";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Pocm from "../components/Pocm/pocm";
import Multi from "../components/Multi/multi";
const imageLoader = require("../public/loader.js");

const Home: NextPage = () => {

  const [nuls, setNuls] = useState(new NulsConnector());

  const [wallet, setWallet] = useState("");




  useEffect(() => {


      if (typeof window.nabox !== "undefined") {
          window.nabox.on('accountsChanged', onAccountsChange);
          window.nabox.on('chainChanged', onChainChange);

          window.nabox.on("disconnect", onDisconnect);

      }

    const func = async () => {

      setNuls(await nuls.initialize())
    }

    func();

    setWallet(nuls.getAccount);

      if (typeof window !== 'undefined') {
          const loader = document.getElementById('preloader');
          if (loader)
              loader.remove();
      }
    // Your API Endpoint goes here

  }, []);

    const onChainChange = chainId => {

      //  localStorage.setItem('chain', chainId);

        if (parseInt(chainId, 16) !== 0x0 && chainId !== "0x-1") {
         //   document.getElementById("errorOnConnect").innerText = "You are Connected to the Wrong Chain";

            console.error('You\'re not on Nuls Network!');

        }else {
          //  document.getElementById("errorOnConnect").innerText = "";
        }
    }
    /*  async function naboxActions(action) {
        $(".connectWalletBlock").toggle();
        if (action === "switch" || action === "logout") {

            if (typeof window.nabox !== "undefined") {
                var naboxInfo = await window.nabox.createSession({chain: "NULS"});
                try {
                    window.nabox.offLink({address: naboxInfo[0], chain: "NULS"});
                } catch (e) {

                }

            }

        }
    }*/

    const onAccountsChange = accounts => {

        window.location.reload();

     /*   //alert("happy birthday")
        localStorage.setItem("allowanceLiqiuidtyTkn1", 0)
        localStorage.setItem("allowanceLiqiuidtyTkn0", 0)
        setAccount(accounts[0]);
        console.log(`Address changed to ${accounts[0]}`);
        nuls.setAccount(accounts[0]);
        localStorage.setItem('wallet', accounts[0]);
        if(accounts[0] !== undefined && localStorage.getItem('chain').toString() === "0x-1"){
            document.getElementById("cnWallet").innerHTML = accounts[0].substring(0,8) + "..." + accounts[0].substring(accounts[0].length - 5);
            document.getElementById("infoAddress").innerHTML = accounts[0];


        }else{
            document.getElementById("connectWalletBlock").style.display = "block";

        }       //bsc.getNulswapBalance();
*/
    }

    const onDisconnect = accounts => {


        //nuls.setAccount("");
      //  localStorage.setItem('wallet', null);
        //  document.getElementById("cnWallet").innerHTML = "Connect Wallet";
        //  document.getElementById("spBalanceTokenA").innerHTML = "0.00";
        // document.getElementById("spBalanceTokenB").innerHTML = "0.00";

    }

  return (

    <Layout >
      <div className="fixed top-0 -z-10 h-full min-h-screen w-full bg-gradient-to-b from-tekBgFrom to-tekBgTo">
        <Image
          loader={imageLoader}
          src={"/background/WavesMeshWT.png"}
          layout={"fill"}
          alt={"Background Mesh"}
          priority
          className="object-cover opacity-20"
        />
      </div>
      <div className="min-h-screen">
        <div className="mx-auto max-w-[70rem] p-3 pt-10">
          <div className="mb-3 flex w-full items-center justify-between text-lg font-bold uppercase text-white">
            <h2 className="w-fit">Stake</h2>
            <span className="h-0.5 w-2/3 md:w-[80%] rounded border border-tekGreen" />
          </div>
          <MainPool nuls={nuls} wallet={wallet}/>
          <div className="mb-3 flex w-full mt-5 items-center justify-between text-lg font-bold uppercase text-white">
            <h2 className="w-fit">Farm</h2>
            <span className="h-0.5 w-2/3 md:w-[80%] rounded border border-tekGreen" />
          </div>
          <Farm nuls={nuls} wallet={wallet}/>
            <div className="mb-3 flex w-full mt-5 items-center justify-between text-lg font-bold uppercase text-white">
                <h2 className="w-fit">POCM Stake</h2>
                <span className="h-0.5 w-2/3 md:w-[80%] rounded border border-tekGreen" />
            </div>
            <Pocm nuls={nuls} wallet={wallet}/>
            <br/>
            <Multi nuls={nuls} wallet={wallet} />
        </div>
          <div style={{textAlign:"center", color:"white", marginTop:"20px"}}>
              <p><a  href="https://twitter.com/WatertigerF" target="_blank"><span>Twitter</span></a> | <a href="https://t.me/WaterTigerF" target="_blank"><span> Telegram </span></a> | <a href="https://watertiger-finance.gitbook.io/" target="_blank"><span>Docs</span></a></p>
              <p>© Copyright 2022. | WaterTiger.Finance | All Rights Reserved.</p>

          </div>
      </div>

        <div className="preloaderBg" id="preloader" >
            <div className="preloader"></div>
            <div className="preloader2"></div>
        </div>
      <div className="alertInfo">
         Transaction Succeded
      </div>

        <div className="errorInfo">
            Transaction Failed
        </div>
    </Layout>

  );
};

export default Home;
