import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
const imageLoader = require("../../public/loader");
import analyze from "rgbaster";
import CardDetail from "./ClaimCardDetail";
import NulsConnector from "../NulsConnector";
import BigNumber from "bignumber.js";
import ClaimCardDetail from "./ClaimCardDetail";

interface Props {
    id?: number;
    name: string;
    options: any;
    apr: number;
    staked: number;
    tvl: number;
    claimable: number;
    logo: string;
    contract: string;
    stakingContract: string;
    nuls: NulsConnector;
    wallet:string
}

const ClaimCard: React.FC<Props> = ({
                                   name,
                                   options,
                                   apr,
                                   staked,
                                   tvl,
                                   claimable,
                                   logo,
                                   id,
                                   contract,
                                   stakingContract,
                                   nuls,
                                   wallet
                               }) => {
    const [dominantColor, setDominantColor] = useState("");
    const [details, setDetails] = useState(false);
    const [earned, setEarned] = useState(0);
    const [stakedC, setStakedC] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [wtfPrice, setWtfPrice] = useState("");
    const [valid0, setValid0] = useState( new BigNumber(0));


    const ip1 = "https://api.nuls.io/";






   /* useEffect(() => {

      /*   fetch(ip1 +"api/contract/view", {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "contractAddress" : stakingContract,
             "methodName" : "getEarned",
             "methodDesc" :  "(Address earner) return BigInteger",
             "args" : [wallet]
           })
         })
             .then((res) => res.json())
             .then((data) => setValid0(data.data.result));
        // Your API Endpoint goes here






    }, []);*/






    useEffect(() => {
        async function getColor() {
            const result = await analyze("/images/" + logo);
            setDominantColor(
                result[0].color.replace(")", ", 0.5)").replace("rgb", "rgba")
            );
        }

        getColor();

        async function validWhitelist0(){
            let r = await nuls.saleValid(stakingContract, wallet.toString())


            setValid0(new BigNumber(r));


        }

        validWhitelist0()


    }, [logo, dominantColor]);




    return (

    <div className={`flex flex-col rounded bg-tekGreen text-xs text-[#C7C7E1]`} >
        <div
            onClick={() => setDetails((prev) => !prev)}
            style={{
                background: `linear-gradient(90deg, ${dominantColor} 0%, rgb(1 52 71) 30%)`,
            }}
            className={`flex w-full cursor-pointer items-center justify-between transition-all ${
                details ? "rounded-t" : "rounded"
            } bg-tekGreen p-5 text-xs text-[#C7C7E1]`}
        >
            <div className="flex w-full items-center space-x-2 md:w-2/6">
                <div className="relative h-[40px] w-[40px]">
                    <Image
                        loader={imageLoader}
                        src={logo}
                        alt={"Logo of " + name}
                        layout={"fill"}
                        priority
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-base font-bold text-white">{name}</h2>
                    <div className="flex w-full items-center text-xs">
                        <p>{options.stake ? "Claim WaterTiger" : ""}</p>
                    </div>
                </div>
            </div>
            <div>
               Total:  { new BigNumber(valid0).dividedBy(Math.pow(10, 8)).multipliedBy(2).toString()} WTF
            </div>

            <div
                className={`flex w-1/6 items-center justify-end text-xl text-white`}
            >
                <button
                    onClick={() => setDetails((prev) => !prev)}
                    className={`transition-all ${details ? "rotate-180" : "rotate-0"}`}
                >
                    <HiDotsVertical/>
                </button>
            </div>
        </div>
        <AnimatePresence>
            {details && (
                <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.1}}
                >
                    <ClaimCardDetail

                        name={name}
                        contract={contract}
                        stakingContract={stakingContract}
                        nuls={nuls}
                        wallet={wallet}
                        stakedC={new BigNumber(stakedC).dividedBy(Math.pow(10, 8)).toFixed(2).toString()}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    </div>


    );
};
export default ClaimCard;
