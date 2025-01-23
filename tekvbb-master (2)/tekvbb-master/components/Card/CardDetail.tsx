import Link from "next/link";
import {useEffect, useState} from "react";
import { IoWalletOutline } from "react-icons/io5";
import Button from "../shared/Button";
import NulsConnector from "../NulsConnector.js";
import BigNumber from "bignumber.js";
import $ from 'jquery';
import {motion} from "framer-motion";

interface Props {
  id: number;
  name: string;
  contract: string;
  stakingContract: string;
  nuls: NulsConnector,
  wallet:string,
  stakedC:string,
  total:string,
  earn:string,
  earnN
}

const CardDetail: React.FC<Props> = ({ id, name, contract, stakingContract , nuls, wallet, stakedC, total, earn, earnN}) => {
  const [activeTab, setActiveTab] = useState(!name.includes("Old") ? "stake" : "unstake");

  const [balance, setBalance] = useState();

  const [allowance, setAllowance] = useState();

  const [textApproved, setTextApproved] = useState("");
  const [bApproved, setBApproved] = useState("");

  const [sUserLock, setUserLock] = useState( new BigNumber(0));
  const [stakeInput, setStakeInput] = useState("0");
  const [unstakeInput, setUnStakeInput] = useState("0");
  const [staked2C, set2StakedC] = useState("0");
  const [isMigrate, setIsMigrate] = useState(false);

  useEffect(() => {



    async function bal() {
      const _balance = await nuls.tknBalanceOf(contract);
      setBalance(_balance);
    }
    bal()


      set2StakedC(new BigNumber(stakedC).toFixed(8).toString());


    async function sallowance() {

      setAllowance(await nuls.getAllowance(contract, stakingContract));

      if(new BigNumber(0).comparedTo(allowance) <= 0){
        setBApproved("greyBtn")
        setTextApproved("d")
      }else{

        if(new BigNumber(allowance).comparedTo(0) > 0){
          setBApproved("greyBtn")
          setTextApproved("d")
        }else {
          setBApproved("")
          setTextApproved("")
        }
      }
    }

    sallowance()

    async function gUserLock() {
      const _balance3 = await nuls.getUserLockTime(stakingContract);
      setUserLock( new BigNumber(_balance3));


    }
    gUserLock()




    // Your API Endpoint goes here

  }, []);


  let myTimeout10;
  myTimeout10 = setTimeout(async () => {

    clearInterval(myTimeout10);
    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,8)).decimalPlaces(6).toString())
    setBalance(await nuls.tknBalanceOf(contract));
  }, 20000);



  let  myTimeout;
  async function approve(tkn, stk) {

    await nuls.approve(tkn, stk);

    myTimeout = setTimeout(() => {

      clearInterval(myTimeout);
      if($(".alertInfo").css('display') == 'block'){
        setTextApproved("d")
        $(".alertInfo").toggle();
      }
    }, 5000);
  }


  async function stake(cont, amount, i) {

    if( new BigNumber(stakeInput).comparedTo(0) > 0) {
    if(i != 10) {
      if(name !== "NULS/USDTN LP" && name !== "NULS/aiNULS LP" && name != "BULS") {
        await nuls.stake(cont, stakeInput, total, stakedC, balance);
      }else{

        if(name !== "NULS/USDTN LP") {
          await nuls.stakeWithCharge(cont, stakeInput, total, stakedC, balance, 0.5);

        }else{
          await nuls.stakeWithCharge(cont, stakeInput, total, stakedC, balance, 0.5);

        }
      }

      myTimeout = setTimeout(async () => {

        clearInterval(myTimeout);
        if ($(".alertInfo").css('display') == 'block') {
          $(".alertInfo").toggle();
          setBalance(await nuls.tknBalanceOf(contract));
          document.getElementById("cStaked" + cont).innerHTML = new BigNumber(total).plus(new BigNumber(stakeInput).multipliedBy(Math.pow(10, 8))).dividedBy(Math.pow(10, 8)).toFixed(5).toString() + " WTF"
          set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10, 8)).toFixed(5).toString())
        }

        if ($(".errorInfo").css('display') == 'block') {
          $(".errorInfo").toggle();
        }
      }, 9000);

    }

    }else{
      $(".errorInfo").toggle()
      $(".errorInfo").html("Amount too low!")
      myTimeout = setTimeout(() => {

        clearInterval(myTimeout);
        if($(".errorInfo").css('display') == 'block'){
          $(".errorInfo").toggle();
        }
      }, 4000);
    }
  }
  
  


function convertDate(timestamp){
  var a = new Date(timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

  async function compound() {

    await nuls.compound(stakingContract);
    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,8)).toFixed(5).toString())

    myTimeout = setTimeout(async () => {

      clearInterval(myTimeout);
      if($(".alertInfo").css('display') == 'block'){
        $(".alertInfo").toggle();
      }
      if($(".errorInfo").css('display') == 'block'){
        $(".errorInfo").toggle();
      }
    }, 9000);
  }

  async function getReward() {

    if(!name.includes("Old")){
      if(name !== "NULS/USDTN LP" && name !== "NULS/aiNULS LP"&& name != "BULS") {
        await nuls.getReward(stakingContract);
      }else{
        if(name !== "NULS/USDTN LP") {
          await nuls.getRewardWithCharge(stakingContract, 0.5);
        }else{
          await nuls.getRewardWithCharge(stakingContract, 0.5);
        }

      }
    }else{
      if(name !== "NULS/USDTN LP Old" && name !== "NULS/aiNULS LP Old"){
        await nuls.getRewardSpecial(stakingContract);
      }else{
        await nuls.getReward(stakingContract);
      }

    }


    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,8)).toFixed(5).toString())

    myTimeout = setTimeout(async () => {

      clearInterval(myTimeout);
      if($(".alertInfo").css('display') == 'block'){
        $(".alertInfo").toggle();
           }
      if($(".errorInfo").css('display') == 'block'){
        $(".errorInfo").toggle();
      }
    }, 9000);
  }

  async function getRewardOnly() {


      await nuls.getRewardWithChargeOnly(stakingContract);

    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,8)).toFixed(5).toString())

    myTimeout = setTimeout(async () => {

      clearInterval(myTimeout);
      if($(".alertInfo").css('display') == 'block'){
        $(".alertInfo").toggle();
      }
      if($(".errorInfo").css('display') == 'block'){
        $(".errorInfo").toggle();
      }
    }, 9000);
  }

  async function exit() {

    if(!name.includes("Old")){
      await nuls.exit(stakingContract);
    }else{
      await nuls.exitSpecial(stakingContract);
    }

    myTimeout = setTimeout(async () => {

      clearInterval(myTimeout);
      if($(".alertInfo").css('display') == 'block'){
        $(".alertInfo").toggle();
      }

      if($(".errorInfo").css('display') == 'block'){
        $(".errorInfo").toggle();
      }
    }, 9000);
  }

  async function withdraw(){
    if( new BigNumber(unstakeInput).comparedTo(0) > 0) {

      if(!name.includes("Old")) {

     // alert(unstakeInput)
      if(name !== "NULS/USDTN LP" && name !== "NULS/aiNULS LP" && name != "BULS") {
        await nuls.withdraw(stakingContract, new BigNumber(unstakeInput).multipliedBy(Math.pow(10, 8)));
      }else {
        if (name !== "NULS/USDTN LP" && name !== "NULS/aiNULS LP") {
          await nuls.withdrawWithCharge(stakingContract, new BigNumber(unstakeInput).multipliedBy(Math.pow(10, 8)), 0.5);

        } else {
          await nuls.withdrawWithCharge(stakingContract, new BigNumber(unstakeInput).multipliedBy(Math.pow(10, 8)), 0.5);

        }
      }
       }else{
        if(name !== "NULS/USDTN LP Old" && name !== "NULS/aiNULS LP Old"){
          await nuls.withdrawSpecial(stakingContract, new BigNumber(unstakeInput).multipliedBy(Math.pow(10, 8)));
        }else{
          await nuls.withdraw(stakingContract, new BigNumber(unstakeInput).multipliedBy(Math.pow(10, 8)));
        }

      }
      myTimeout = setTimeout(async () => {

        clearInterval(myTimeout);
        if($(".alertInfo").css('display') == 'block'){
          $(".alertInfo").toggle();
        }

        if($(".errorInfo").css('display') == 'block'){
          $(".errorInfo").toggle();
        }
      }, 9000);



    }else{
      $(".errorInfo").toggle()
      $(".errorInfo").html("Amount too low!")
      myTimeout = setTimeout(() => {

        clearInterval(myTimeout);
        if($(".errorInfo").css('display') == 'block'){
          $(".errorInfo").toggle();
        }
      }, 4000);
    }

    await nuls.createAndUpdatePair();
  }



  function setMaxStake(){

    setStakeInput( new BigNumber(balance).dividedBy(Math.pow(10, 8)).toString())
    $("#inputToStake"+ stakingContract).val(((new BigNumber(balance).dividedBy(Math.pow(10,8)).comparedTo(0.01) > 0 ) ? new BigNumber(balance).dividedBy(Math.pow(10,8)).minus(0.01) : new BigNumber(balance).dividedBy(Math.pow(10,8) )));
    if(new BigNumber(balance).comparedTo(allowance) < 0){
      setBApproved("greyBtn")
      setTextApproved("d")
    }else{
      setBApproved("")
      setTextApproved("")

    }
  }

  function setMaxUnStake(){

    setUnStakeInput( new BigNumber(staked2C).toString())
    $("#inputToUnStake"+ stakingContract).val(new BigNumber(staked2C));

  }

  function setInputStake(e){
    setStakeInput(e.target.value);
    if(new BigNumber(e.target.value).multipliedBy(Math.pow(10, 8)).comparedTo(allowance) < 0){
      setBApproved("greyBtn")
      setTextApproved("d")
    }else{

      if(new BigNumber(allowance).comparedTo(0) > 0){
        setBApproved("greyBtn")
        setTextApproved("d")
      }else {
        setBApproved("")
        setTextApproved("")
      }

    }
  }

  function setInputUnStake(e){
    setUnStakeInput(e.target.value);
  }


  async function isMigrated() {
    setIsMigrate((await nuls.isMigratedV1(stakingContract) !== "1") ? false :  true)
  }
  isMigrated()


  async function migrateNow() {

    await nuls.migrateNow(stakingContract);
    setIsMigrate(true)
  }




  return (

    <div className="text-sm">
      <div  className={ !name.includes("Old") ? "grid grid-cols-3 text-center" : "grid grid-cols-2 text-center"}>
        { !name.includes("Old") ?
        <button
          className={`p-1 uppercase text-white ${
            activeTab === "stake"
              ? "border-t-8 border-white bg-tekGreen"
              : "border-t-8 border-tekDark bg-gray-900"
          }`}
          onClick={() => setActiveTab("stake")}
        >
          stake
        </button>

            : <></>}
        <button
          className={`p-1 uppercase text-white ${
            activeTab === "unstake"
              ? "border-t-8 border-white bg-tekGreen"
              : "border-t-8 border-tekDark bg-gray-900"
          }`}
          onClick={() => setActiveTab("unstake")}
        >
          {(id === 1) ? "compound & unstake" : "claim & unstake"}
        </button>
        <button
          className={`p-1 uppercase text-white ${
            activeTab === "info"
              ? "border-t-8 border-white bg-tekGreen"
              : "border-t-8 border-tekDark bg-gray-900"
          }`}
          onClick={() => setActiveTab("info")}
        >
          info
        </button>
      </div>
      <div className="p-8">
        {activeTab === "stake" && !name.includes("Old") && (
          <div>
            <p className="text-justify font-semibold text-white">
              Stake {name} on WaterTiger to earn {(name !== "NULS/USDTN LP" && name !== "NULS/aiNULS LP") ? "" : "Nuls and "} {(name !== "EHT") ? "" : "EHT"} {(name !== "iSynthetic") ? "" : "iSynthetic"} {(name !== "FUSE") ? "" : "FUSE"} {(name !== "EHT" && name !== "iSynthetic" && name !== "FUSE" && name !== "BULS") ? "WTF" : ""} {(name !== "BULS") ? "" : "Nuls"} tokens.  {(id === 2) ? "Deposit Fee: 0.5%. Rewards Locked for 27 days after claim." : ""}  {(id === 1 || id === 2) ? "" : "Deposit Fee: 0.5%. Rewards Locked for 9 days after claim."}
              {(name === "aNSWAP") ? "Don't Stake or compound on Nulswap while staked here! You will loose rewards.": ""}
            </p>
            <div className="mt-5 flex flex-col md:flex-row md:items-end md:space-x-5">
              <div className="flex flex-col items-center justify-center md:w-1/2">
                <div className="mb-2 flex w-full items-center justify-between">
                  <p>Stake {name} </p>
                  <div className="flex items-center space-x-1">
                    <p>
                      <IoWalletOutline />
                    </p>
                    <p id={"balm"+stakingContract}>{new BigNumber(balance).dividedBy(Math.pow(10, 8)).toFixed(5).toString()}</p>
                  </div>
                </div>
                <div className="flex w-full items-center space-x-2">
                  <input id={"inputToStake"+ stakingContract}
                    className="w-full rounded bg-gray-900 p-2 text-white outline-none"
                    type="number" onChange={(event) => setInputStake(event)}
                  />
                  <button onClick={() => setMaxStake()} className="h-full rounded bg-gray-900 p-2">
                    MAX
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-col items-center justify-center md:mt-0 md:w-1/2">
                <div className="flex w-1/2 items-center justify-between">
                  <span className="flex h-[20px] w-[22px] items-center justify-center rounded-full bg-tekDark text-white">
                    1
                  </span>
                  <span className="h-1.5 w-full bg-tekDark"></span>
                  <span className="flex h-[20px] w-[22px] items-center justify-center rounded-full bg-tekDark text-white">
                    2
                  </span>
                </div>
                <div className="mt-2 flex w-full items-center space-x-3">
                  <button id={"appro"+ stakingContract} disabled={(new BigNumber(allowance).comparedTo(0) == 0) || (new BigNumber(allowance).comparedTo(new BigNumber(stakeInput).multipliedBy(Math.pow(10,8))) < 0) ?  false : true}  onClick={() => approve(contract, stakingContract)}  className={`w-full ${(new BigNumber(allowance).comparedTo(0) == 0) || (new BigNumber(allowance).comparedTo(new BigNumber(stakeInput).multipliedBy(Math.pow(10,8))) < 0) ?  "" : "greyBtn"}`}>
                    <Button >approve{(new BigNumber(allowance).comparedTo(0) == 0) || (new BigNumber(allowance).comparedTo(new BigNumber(stakeInput).multipliedBy(Math.pow(10,8))) < 0) ?  "" : "d"}</Button>
                  </button>
                  <button onClick={() => stake(stakingContract, "inputToStake"+ stakingContract, id)} className="w-full">
                    <Button>stake</Button>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "unstake" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-end md:space-x-5">
              <div className="flex flex-col items-center justify-center md:w-1/2">
                <div className="mb-2 flex w-full items-center justify-between">
                  <p>  {(id !== 1) ? "Staked " + name  : "Staked " + name}</p>
                  <div className="flex items-center space-x-1">
                    <p>
                      <IoWalletOutline />
                    </p>
                    <p id={"userStaked"+stakingContract}>{staked2C}</p>

                  </div>

                </div>

                <div className="mb-2 flex w-full items-center justify-between">
                  <p>  Earned {(name === "NULS/USDTN LP" || name === "NULS/aiNULS LP" || name === "NULS/USDTN LP Old" || name === "NULS/aiNULS LP Old")? "WTF" : ""} {(name === "BULS")? "NULS" : ""}</p>
                  <div className="flex items-center space-x-1">
                    <p>
                      <IoWalletOutline />
                    </p>
                    <p id={"earned"+stakingContract}>{earn}</p>

                  </div>

                </div>
                { (name === "NULS/USDTN LP Old" || name === "NULS/aiNULS LP Old" || name === "NULS/aiNULS LP" || name === "NULS/USDTN LP")?
                  <div className="mb-2 flex w-full items-center justify-between">
                    <p> Earned NULS</p>
                    <div className="flex items-center space-x-1">
                      <p>
                        <IoWalletOutline/>
                      </p>
                      <p id={"earned" + stakingContract}>{earnN}</p>

                    </div>

                  </div>
                    :<></>
                }



                {(id !== 1) ?
                <div className="flex w-full items-center space-x-2">
                  <input id={"inputToUnStake"+ stakingContract}
                    className="w-full rounded bg-gray-900 p-2 text-white outline-none"
                         onChange={(event) => setInputUnStake(event)}
                    type="number"
                  />
                  <button onClick={() => setMaxUnStake()} className="h-full rounded bg-gray-900 p-2">
                    MAX
                  </button>
                </div>
                    : <></>}
              </div>
              <div className="mt-2 flex items-center space-x-3 md:w-1/2">
                {(id !== 1) ? (!name.includes("Old")) ?
                    <button onClick={() => getReward()}
                            disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "compound" : "claim"} {(name ==="NULS/USDTN LP" || name === "NULS/aiNULS LP") ? "All" : ""}</Button>
                    </button>:<></>


                    :
                    <button onClick={() => compound()}
                            disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "compound" : "claim"}</Button>
                    </button>


                }
                {(name === "NULS/USDTN LP" || name === "NULS/aiNULS LP" || name === "NULS/USDTN LP Old" || name === "NULS/aiNULS LP Old") ?  (!name.includes("Old"))  ? <button onClick={() => getRewardOnly() }
                                                      disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                                                      className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `} >
                  <Button >Claim WTF</Button>
                </button> : <></> : <></>}

                {(id !== 1) ?
                    <button onClick={() => withdraw()} disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "unstake all" : "unstake"}<br/><span>{(sUserLock.comparedTo(0) > 0) ? "After: " + convertDate(sUserLock) : ""}</span></Button>
                    </button>
                    :
                    <button onClick={() => exit()} disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "unstake all" : "unstake"}<br/><span>{(sUserLock.comparedTo(0) > 0) ? "After: " + convertDate(sUserLock) : ""}</span></Button>
                    </button>
                }

              </div>
            </div>
          </div>
        )}
        {activeTab === "info" && (
          <div>
            <div className="flex flex-col items-center md:flex-row">
              <p className="font-semibold text-white md:w-1/6">
                {name} Contract:
              </p>
              <Link href={"https://nulscan.io/contracts/info?contractAddress=" + contract}>
                <a
                  className="transition-all hover:text-[#5e5ed4]"
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  {contract}
                </a>
              </Link>
            </div>
            <div className="mt-3 flex flex-col items-center md:mt-0 md:flex-row">
              <p className="font-semibold text-white md:w-1/6">
                {name} Staking Contract:
              </p>
              <Link href={"https://nulscan.io/contracts/info?contractAddress=" + stakingContract}>
                <a
                  className="transition-all hover:text-[#5e5ed4]"
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  {stakingContract}
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>

      {
        (!isMigrate && (id !== 230) && (id !== 2) && (id !== 21009) && (name !== "NULS/NSWAP LP") && (!name.includes("Old")) && (name !== "NSWAP/WTF LP") && (name !== "NULS/USDTN LP") && (name !== "NULS/aiNULS LP")) ?

        <div style={{padding:"10px"}}>
        Have you already migrated? Your stake is not showing up? <a onClick={() => migrateNow()} style={{textDecoration:"underline", cursor:"pointer"}}>Click Here to Migrate</a>
      </div>

        : <></>}
    </div>
  );
};
export default CardDetail;
