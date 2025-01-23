import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import MainPool from "../components/MainPool/MainPool";
import Farm from "../components/Farm/Farm";
import React, {useEffect, useState} from "react";
import NulsConnector from "../components/NulsConnector";
import ClaimPool from "../components/ClaimPool/ClaimPool";
const imageLoader = require("../public/loader.js");

const Claim: NextPage = () => {

    const [nuls, setNuls] = useState(new NulsConnector());

    const [wallet, setWallet] = useState("");

    useEffect(() => {

        if (typeof window.nabox !== "undefined") {
            window.nabox.on('accountsChanged', onAccountsChange);


        }

        const func = async () => {

            setNuls(await nuls.initialize())
        }

        func();

        setWallet(nuls.getAccount);



        // Your API Endpoint goes here


    }, []);

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
                        <h2 className="w-fit">Claim</h2>
                        <span className="h-0.5 w-2/3 md:w-[80%] rounded border border-tekGreen" />
                    </div>
                    <ClaimPool nuls={nuls} wallet={wallet}/>



                </div>
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

export default Claim;
