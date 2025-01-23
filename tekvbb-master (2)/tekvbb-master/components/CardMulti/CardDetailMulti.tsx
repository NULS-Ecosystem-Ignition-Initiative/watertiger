import Link from "next/link";
import {useEffect, useState} from "react";
import { IoWalletOutline } from "react-icons/io5";
import Button from "../shared/Button";
import NulsConnector from "../NulsConnector.js";
import BigNumber from "bignumber.js";
import $ from 'jquery';

interface Props {
  id: number;
  name: string;
  contract: string;
  stakingContract: string;
  stakingContractRouter: string;
  decimals: number;
  nuls: NulsConnector,
  wallet:string,
  stakedC:string,
  total:string,
  earn:string
}

const CardDetailMulti: React.FC<Props> = ({ id, name, contract, stakingContract , stakingContractRouter, decimals, nuls, wallet, stakedC, total, earn}) => {
  const [activeTab, setActiveTab] = useState("stake");

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

      if(name.toString() !== "CCFI") {
        if(name.toString() !== "MMO") {
          await nuls.multiBalance(stakingContract, 9, 555, decimals);
        }else {

            await nuls.multiBalance(stakingContract, 9, 542, decimals);

        }
      }else{

          await nuls.multiBalance(stakingContract, 9, 172, decimals);

      }



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






    // Your API Endpoint goes here

  }, []);


  let myTimeout10;
  myTimeout10 = setTimeout(async () => {

    clearInterval(myTimeout10);
    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,decimals)).decimalPlaces(6).toString())
    setBalance(await nuls.tknBalanceOf(contract));
  }, 20000);

  let  myTimeout;


  async function notifyReward(){

    if(name.toString() !== "MMO" &&  name.toString() !== "CCFI") {
      await nuls.notifyReward(stakingContractRouter, 9, 555);
    }else{
      if(name.toString() !== "CCFI") {
        await nuls.notifyReward(stakingContractRouter, 9, 542);
      }else{
        await nuls.notifyReward(stakingContractRouter, 9, 172);
      }
    }
  }

  async function notify(ctjr,  c ,a ){
     await nuls.notify( ctjr, c,a)
  }

  async function stake(cont, amount, i) {

    if( new BigNumber(stakeInput).comparedTo(0) > 0) {


      if(name.toString() !== "MMO" && name.toString() !== "CCFI") {
        await nuls.stakeMulti(cont, stakeInput, 9, 555, total, stakedC, balance);
      }else{
        if(name.toString() !== "CCFI") {
          await nuls.stakeMulti(cont, stakeInput, 9, 542, total, stakedC, balance);
        }else{
          await nuls.stakeMultiBNB(cont, stakeInput, 9, 172, total, stakedC, balance);
        }
      }

      myTimeout = setTimeout(async () => {

        clearInterval(myTimeout);
        if ($(".alertInfo").css('display') == 'block') {

          $(".alertInfo").toggle();
          setBalance(await nuls.tknBalanceOf(contract));
          document.getElementById("cStaked" + cont).innerHTML = new BigNumber(total).plus(new BigNumber(stakeInput).multipliedBy(Math.pow(10, decimals))).dividedBy(Math.pow(10, decimals)).toFixed(5).toString() + " WTF"
          set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10, decimals)).toFixed(5).toString())

        }

        if ($(".errorInfo").css('display') == 'block') {
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

    await nuls.compound(stakingContractRouter);
    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,decimals)).toFixed(5).toString())

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

    if(name.toString() !== "CCFI"){
      await nuls.getRewardMulti(stakingContractRouter);
    }else{
      await nuls.getRewardMultiBNB(stakingContractRouter);
    }

    set2StakedC(new BigNumber(await nuls.staked(stakingContract)).dividedBy(Math.pow(10,decimals)).toFixed(5).toString())

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

    await nuls.exit(stakingContract);
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

     // alert(unstakeInput)
      if(name.toString() !== "CCFI") {
        await nuls.withdrawMulti(stakingContractRouter, unstakeInput.toString(), decimals);
      }else{
        await nuls.withdrawMultiBNB(stakingContractRouter, unstakeInput.toString(), decimals);
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
  }

  function setMaxStake(){

    setStakeInput( new BigNumber(balance).dividedBy(Math.pow(10, decimals)).toString())
    $("#inputToStake"+ stakingContract).val(new BigNumber(document.getElementById("balm" + stakingContract).innerHTML));
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
    if(new BigNumber(e.target.value).multipliedBy(Math.pow(10, decimals)).comparedTo(allowance) < 0){
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



  async function migrateNow() {

    await nuls.migrateNow(stakingContract);
    setIsMigrate(true)
  }


  return (
    <div className="text-sm">
      <div className="grid grid-cols-3 text-center">
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
        {activeTab === "stake" && (
          <div>
            <p className="text-justify font-semibold text-white">
              Stake {name} on WaterTiger to earn {name} tokens.  {(id === 2) ? "Deposit Fee: 0.5%. Rewards Locked for 27 days after claim." : ""}  {(id === 1 || id === 2) ? "" : "Deposit Fee: 0.5%. Rewards Locked for 9 days after claim."}
            </p>
            <div className="mt-5 flex flex-col md:flex-row md:items-end md:space-x-5">
              <div className="flex flex-col items-center justify-center md:w-1/2">
                <div className="mb-2 flex w-full items-center justify-between">
                  <p>Stake {name} </p>
                  <div className="flex items-center space-x-1">
                    <p>
                      <IoWalletOutline />
                    </p>
                    <p id={"balm"+stakingContract}>{new BigNumber(localStorage.getItem("tokenFromBalanc")).dividedBy(Math.pow(10, 18)).toFixed(5).toString()}</p>
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

                </div>
                <div className="mt-2 flex w-full items-center space-x-3">
                  <button onClick={() => stake(stakingContractRouter, "inputToStake"+ stakingContract, id)} className="w-full">
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
                  <p>  Earned</p>
                  <div className="flex items-center space-x-1">
                    <p>
                      <IoWalletOutline />
                    </p>
                    <p id={"earned"+stakingContract}>{earn}</p>

                  </div>

                </div>



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
                {(id !== 1) ?
                    <button onClick={() => getReward()}
                            disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "compound" : "claim"}</Button>
                    </button>


                    :
                    <button onClick={() => compound()}
                            disabled={(new BigNumber(stakedC).comparedTo(0) == 0) ? true : false}
                            className={`w-full ${(new BigNumber(stakedC).comparedTo(0) == 0) ? "greyBtn" : ""} `}>
                      <Button> {(id === 1) ? "compound" : "claim"}</Button>
                    </button>


                }


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
              <p onClick={() => notifyReward()} className="font-semibold text-white md:w-1/6">
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
      <div style={{padding:"10px"}}>
        Have you already migrated? Your stake is not showing up? <a onClick={() => migrateNow()} style={{textDecoration:"underline", cursor:"pointer"}}>Click Here to Migrate</a>
      </div>
    </div>
  );
};
export default CardDetailMulti;
