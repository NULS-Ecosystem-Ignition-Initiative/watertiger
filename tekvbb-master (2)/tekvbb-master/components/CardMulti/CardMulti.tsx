import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
const imageLoader = require("../../public/loader");
import analyze from "rgbaster";
import CardDetailMulti from "./CardDetailMulti";
import NulsConnector from "../NulsConnector";
import BigNumber from "bignumber.js";
import ClaimCardDetail from "../ClaimCard/ClaimCardDetail";

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
  stakingContractRouter: string;
  decimals: number;
  nuls: NulsConnector;
  wallet:string
}

const CardMulti: React.FC<Props> = ({
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
  stakingContractRouter,
    decimals,
    nuls,
    wallet
}) => {
  const [dominantColor, setDominantColor] = useState("");
  const [details, setDetails] = useState(false);
  const [earned, setEarned] = useState(0);
  const [stakedC, setStakedC] = useState(new BigNumber(0));
  const [totalSupply, setTotalSupply] = useState(0);
  const [wtfPrice, setWtfPrice] = useState("");
  const [nulsSupply, setNulsSupply] = useState("");
  const [nulsSupply2, setNulsSupply2] = useState("");
  const [lpSupply, setLpSupply] = useState("");
  const [nswapPrice, setNswapPrice] = useState("");

  const [earhartPrice, setEarhartPrice] = useState();
  const [mmoPrice, setMMOPrice] = useState();
  const [nulsPrice, setANulsPrice] = useState();
  const [boost, setBoost] = useState();
  const [isMigrate, setIsMigrate] = useState(false);

  const ip1 = "https://api.nuls.io/";


  async function getEarned() {
    setEarned(await nuls.earned(stakingContract))
  }





  useEffect(() => {

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=NULSUSDT")
        .then((res) => res.json())
        .then((data) => setANulsPrice(data.price));

    fetch("https://assets.nabox.io/api/asset/9-555")
        .then((res) => res.json())
        .then((data) => setEarhartPrice(data.price));

    fetch("https://assets.nabox.io/api/asset/9-542")
        .then((res) => res.json())
        .then((data) => setMMOPrice(data.price));

   /* fetch(ip1 +"api/contract/view", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "contractAddress" : contract,
        "methodName" : "earned",
        "methodDesc" :  "(Address account) return BigInteger",
        "args" : [wallet]
      })
    })
        .then((res) => res.json())
        .then((data) => setEarned(data.data.result));*/
    // Your API Endpoint goes here

    getEarned()

    async function getStaked() {
      setStakedC(new BigNumber(await nuls.staked(stakingContract)))
    }
    getStaked()

    async function isMigrated() {
      setIsMigrate((await nuls.isMigratedV1(stakingContract) !== "1") ? false :  true)
    }
    isMigrated()

    async function getTotalSupply() {
      setTotalSupply(await nuls.getTotalSupply(stakingContract))
    }
    getTotalSupply()

    async function nswapPrice() {
      let rl = await nuls.bothReserves("NULSd6HgnMqcZX3oRBWqDReUyD8BWCErCxawg")
      let i = rl.split(",");
      let price = new BigNumber(i[0]).dividedBy(i[1]).toString()


      setNswapPrice(price);
    }
    nswapPrice()

    async function waterTigerPrice() {
      let rl = await nuls.bothReserves("NULSd6HgnMqcZX3oRBWqDReUyD8BWCErCxawg")
      let i = rl.split(",");
      let price = new BigNumber(i[0]).dividedBy(i[1]).toString()

      setWtfPrice(price);
      setLpSupply(await nuls.getTotalSupply(contract))
      setNulsSupply(i[0])
      setNulsSupply2(i[1])
    }
    waterTigerPrice()

    async function getboosting() {
      const _boost = await nuls.getBoost("NULSd6HgseP9QQinogwVkSqM4F4X7kDSFa2pd");
      setBoost(_boost)

    }
    getboosting()

    async function n(){
      setEarned(await nuls.earned(stakingContract))
      setTotalSupply(await nuls.getTotalSupply(stakingContract))
      const _boost = await nuls.getBoost("NULSd6HgseP9QQinogwVkSqM4F4X7kDSFa2pd");
      setBoost(_boost)
      setStakedC(new BigNumber(await nuls.staked(stakingContract)))
    }

n();


  }, [logo, dominantColor, details]);






  useEffect(() => {
    async function getColor() {
      const result = await analyze("/images/" + logo);
      setDominantColor(
        result[0].color.replace(")", ", 0.5)").replace("rgb", "rgba")
      );
    }

    getColor();
  }, [logo, dominantColor]);





  return (
    <div className="flex flex-col rounded bg-tekGreen text-xs text-[#C7C7E1]">
      <div
        onClick={() => setDetails((prev) => !prev)}
        style={{
          background: `linear-gradient(90deg, ${dominantColor} 0%, rgb(1 52 71) 30%)`,
        }}
        className={`flex w-full cursor-pointer items-center justify-between transition-all ${
          details ? "rounded-t" : "rounded"
        } bg-tekGreen p-5 text-xs text-[#C7C7E1]`}
      >
        <div className="flex w-full items-center space-x-2 md:w-1/5">
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
              <p>{options.stake ? "STAKE " + name : ""}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:w-4/6">
          <div>
            <h2 className="font-semibold">APR</h2>
            <p
              className="font-bold text-green-400">
          {(name.toString() === "FlyGuyz") ? new BigNumber(1998000).multipliedBy(Math.pow(10,decimals)).dividedBy(totalSupply).multipliedBy(100).toFixed(2).toString() :
              ""
          }
              {(name.toString() === "MMO") ? new BigNumber(500000).multipliedBy(Math.pow(10,decimals)).dividedBy(totalSupply).multipliedBy(100).toFixed(2).toString() :
                 ""
              }

              {(name.toString() === "CCFI") ? new BigNumber(10000000).multipliedBy(Math.pow(10,decimals)).dividedBy(totalSupply).multipliedBy(100).toFixed(2).toString() :
                  ""
              }
          %

            </p>
          </div>
          <div className="hidden md:block">
            <h2 className="font-semibold">Staked {name}</h2>
            <p id={"cStaked"+stakingContract}
              className={`font-bold ${
                staked <= 0 ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {new BigNumber(totalSupply).dividedBy(Math.pow(10, decimals)).toFixed(5).toString() + " " + name}
            </p>
          </div>
          <div className="hidden md:block">
            <h2 className="font-semibold">TVL</h2>
            <p className="font-semibold text-white">$ {(name.toString() ===  "FlyGuyz" || name.toString() ===  "CCFI") ? "-" : new BigNumber(totalSupply).dividedBy(Math.pow(10,18)).multipliedBy(mmoPrice).toFixed(2).toString()}
            </p>
          </div>
          <div className="hidden md:block">
            <h2 className="font-semibold">Claimable</h2>
            <p id={"pClaimable"+stakingContract}
              className={`font-bold ${
                claimable <= 0 ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {new BigNumber(earned).dividedBy(Math.pow(10, decimals)).toFixed(5).toString() + " " +   name}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="hidden md:block">
              <h2 className="font-semibold">Boost</h2>
              <p>{boost}x</p>
            </div>
          </div>
        </div>
        <div
          className={`flex w-1/6 items-center justify-end text-xl text-white`}
        >
          <button
            onClick={() => setDetails((prev) => !prev)}
            className={`transition-all ${details ? "rotate-180" : "rotate-0"}`}
          >
            <HiDotsVertical />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >

                  <CardDetailMulti
                      id={id}
                      name={name}
                      contract={contract}
                      stakingContract={stakingContract}
                      stakingContractRouter={stakingContractRouter}
                      decimals={decimals}
                      nuls={nuls}
                      wallet={wallet}
                      total={totalSupply.toString()}
                      stakedC={new BigNumber(stakedC).dividedBy(Math.pow(10, 18)).toFixed(5).toString()}
                      earn={new BigNumber(earned).dividedBy(Math.pow(10, 18)).toFixed(5).toString()}
                  />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CardMulti;
