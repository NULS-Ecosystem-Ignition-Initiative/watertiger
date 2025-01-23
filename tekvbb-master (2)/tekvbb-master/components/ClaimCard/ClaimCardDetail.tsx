import Link from "next/link";
import {useEffect, useState} from "react";
import { IoWalletOutline } from "react-icons/io5";
import Button from "../shared/Button";
import NulsConnector from "../NulsConnector.js";
import BigNumber from "bignumber.js";
import $ from 'jquery';

interface Props {
    name: string;
    contract: string;
    stakingContract: string;
    nuls: NulsConnector,
    wallet:string,
    stakedC:string
}

const ClaimCardDetail: React.FC<Props> = ({ name, contract, stakingContract , nuls, wallet, stakedC}) => {
    const [activeTab, setActiveTab] = useState("stake");

    const [balance, setBalance] = useState();
    const [sUserClaim, setUserClaim] = useState( new BigNumber(0));
    const [isClaim0, setIsClaim0] = useState(false);
    const [isClaim1, setIsClaim1] = useState(false);
    const [isClaim2, setIsClaim2] = useState(false);
    const [isClaim3, setIsClaim3] = useState(false);
    const [isClaim4, setIsClaim4] = useState(false);
    const [isClaim5, setIsClaim5] = useState(false);
    const [isClaim6, setIsClaim6] = useState(false);
    const [isClaim7, setIsClaim7] = useState(false);
    const [isClaim8, setIsClaim8] = useState(false);
    const [isClaim9, setIsClaim9] = useState(false);
    const [timeUnlockClaim0, setTimeUnlockClaim0] = useState(new BigNumber(0));
    const [timeUnlockClaim1, setTimeUnlockClaim1] = useState(new BigNumber(0));
    const [timeUnlockClaim2, setTimeUnlockClaim2] = useState(new BigNumber(0));
    const [timeUnlockClaim3, setTimeUnlockClaim3] = useState(new BigNumber(0));
    const [timeUnlockClaim4, setTimeUnlockClaim4] = useState(new BigNumber(0));
    const [timeUnlockClaim5, setTimeUnlockClaim5] = useState(new BigNumber(0));
    const [timeUnlockClaim6, setTimeUnlockClaim6] = useState(new BigNumber(0));
    const [timeUnlockClaim7, setTimeUnlockClaim7] = useState(new BigNumber(0));
    const [timeUnlockClaim8, setTimeUnlockClaim8] = useState(new BigNumber(0));
    const [timeUnlockClaim9, setTimeUnlockClaim9] = useState(new BigNumber(0));
    const [checkClaim, setCheckClaim] = useState(false);
    const [valid01, setValid01] = useState(new BigNumber(0).toString());

    let v = new BigNumber(0);





    useEffect(() => {


        async function bal() {
            const _balance = await nuls.tknBalanceOf(contract);
            setBalance(_balance);
        }
        bal()

        async function gTBal() {
            const _balance2 = await nuls.getUserClaimed(contract);
            setUserClaim( new BigNumber(_balance2));
        }
        gTBal()




        async function isClaimed0(cont) {

            setIsClaim0(await nuls.isClaimed(cont, 0));
            setTimeUnlockClaim0(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 0)));
            setIsClaim1(await nuls.isClaimed(cont, 1));
            setTimeUnlockClaim1( new BigNumber(await nuls.getTimestampClaimUnlock(cont, 1)));
            setIsClaim2(await nuls.isClaimed(cont, 2));
            setTimeUnlockClaim2( new BigNumber(await nuls.getTimestampClaimUnlock(cont, 2)));
            setIsClaim3(await nuls.isClaimed(cont, 3));
            setTimeUnlockClaim3( new BigNumber(await nuls.getTimestampClaimUnlock(cont, 3)));
            setIsClaim4(await nuls.isClaimed(cont, 4));
            setTimeUnlockClaim4( new BigNumber(await nuls.getTimestampClaimUnlock(cont, 4)));
            setIsClaim5(await nuls.isClaimed(cont, 5));
            setTimeUnlockClaim5(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 5)));
            setIsClaim6(await nuls.isClaimed(cont, 6));
            setTimeUnlockClaim6(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 6)));
            setIsClaim7(await nuls.isClaimed(cont, 7));
            setTimeUnlockClaim7(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 7)));
            setIsClaim8(await nuls.isClaimed(cont, 8));
            setTimeUnlockClaim8(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 8)));
            setIsClaim9(await nuls.isClaimed(cont, 9));
            setTimeUnlockClaim9(new BigNumber(await nuls.getTimestampClaimUnlock(cont, 9)));


        }

        isClaimed0(stakingContract)



        // Your API Endpoint goes here

    }, []);

    async function checkClaims(cont) {

        setIsClaim0(await nuls.isClaimed(cont, 0));
        setIsClaim1(await nuls.isClaimed(cont, 1));
        setIsClaim2(await nuls.isClaimed(cont, 2));
        setIsClaim3(await nuls.isClaimed(cont, 3));
        setIsClaim4(await nuls.isClaimed(cont, 4));
        setIsClaim5(await nuls.isClaimed(cont, 5));
        setIsClaim6(await nuls.isClaimed(cont, 6));
        setIsClaim7(await nuls.isClaimed(cont, 7));
        setIsClaim8(await nuls.isClaimed(cont, 8));
        setIsClaim9(await nuls.isClaimed(cont, 9));


    }


    let timer;
    async function verifyTransaction(){
        if(checkClaim) {
            let transactionToBeVerified = localStorage.getItem("txHash")
            if (transactionToBeVerified !== null && transactionToBeVerified.toString() !== "undefined" && transactionToBeVerified !== "") {
                await nuls.queryTransaction(transactionToBeVerified)
                let c = 0;
                let jk = 0;
                const sTransaction = setInterval(async function () {

                    if (localStorage.getItem("txHash") === "" || c > 2 && jk == 0) {
                        clearInterval(sTransaction)
                        checkClaims(stakingContract)
                        setCheckClaim(false)

                    }
                    c++;
                }, 2500);

            }
        }
    }

    function startTimer() {
        timer = setInterval( verifyTransaction , 3000);
    }
    startTimer()

    async function approve(tkn) {

        await nuls.approve(tkn);
    }

    let myTimeout;
    let myTimeout2;
    async function claim(cont, batch) {
        setCheckClaim(false)

        await nuls.claimBatch(cont, batch);

        myTimeout = setTimeout(() => {

            clearInterval(myTimeout);
            if($(".alertInfo").css('display') == 'block'){
                $(".alertInfo").css('display', 'none');
            }
        }, 5000);

        myTimeout2 = setTimeout(() => {

            clearInterval(myTimeout);
            if($(".errorInfo").css('display') == 'block'){
                $(".errorInfo").css('display', 'none');
            }
        }, 5000);


    }



    async function compound() {

        await nuls.compound();
    }

    function setMaxStake(){

    }


    return (

        <div className="text-sm">

            <div className="p-8">
                {activeTab === "stake" && (
                    <div>
                        <p className="text-justify font-semibold text-white">
                            Claim $WTF to be able to earn rewards over your LPs.
                        </p>
                        <div className={`mt-5 flex flex-col ${(v.comparedTo(0) > 0 ? "displayOut" : "")}`}>

                            <div className="mt-3 flex flex-col items-center justify-center">

                                <div className="mt-2  w-full ">

                                    <button id={"m0"+ stakingContract} disabled={(isClaim0.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim0.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 0)}  className={`w-1/2 mt-2 claimBtnShare ${(isClaim0.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim0.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>

                                        <span style={{fontSize:"16px"}}>13/11/22</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>5%</span>
                                    </button>

                                    <button id={"m1"+ stakingContract} disabled={(isClaim1.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim1.comparedTo(Date.now() / 1000) >= 0 ? true : false}  onClick={() => claim(stakingContract, 1)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim1.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim1.comparedTo(Date.now() / 1000) >= 0? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/02/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <br/>
                                    <button id={"m2"+ stakingContract} disabled={(isClaim2.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim2.comparedTo(Date.now() / 1000) >= 0 ? true : false}  onClick={() => claim(stakingContract, 2)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim2.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim2.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/03/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m3"+ stakingContract} disabled={(isClaim3.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim3.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract,3)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim3.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim3.comparedTo(Date.now() / 1000) >= 0 ?  "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/04/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m4"+ stakingContract} disabled={(isClaim4.toString() === "true"|| sUserClaim.comparedTo(0) == 0)  || timeUnlockClaim4.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 4)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim4.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim4.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/05/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m5"+ stakingContract} disabled={(isClaim5.toString() === "true"|| sUserClaim.comparedTo(0) == 0) || timeUnlockClaim5.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 5)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim5.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim5.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/06/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m6"+ stakingContract} disabled={(isClaim6.toString() === "true"|| sUserClaim.comparedTo(0) == 0) || timeUnlockClaim6.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 6)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim6.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim6.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/07/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m7"+ stakingContract} disabled={(isClaim7.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim7.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 7)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim7.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim7.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/08/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m8"+ stakingContract} disabled={(isClaim8.toString() === "true"|| sUserClaim.comparedTo(0) == 0)  || timeUnlockClaim8.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 8)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim8.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim8.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/09/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>10%</span>
                                    </button>
                                    <button id={"m9"+ stakingContract} disabled={(isClaim9.toString() === "true"|| sUserClaim.comparedTo(0) == 0) || timeUnlockClaim9.comparedTo(Date.now() / 1000) >= 0 ? true : false} onClick={() => claim(stakingContract, 9)} className={`w-1/2 mt-2 claimBtnShare ${(isClaim9.toString() === "true" || sUserClaim.comparedTo(0) == 0) || timeUnlockClaim9.comparedTo(Date.now() / 1000) >= 0 ? "alreadyClaimed" : ""}`}>
                                        <span style={{fontSize:"16px"}}>13/10/23</span><br/>
                                        <span style={{fontSize:"14px"}}>Claim</span><br/>
                                        <span style={{fontSize:"14px"}}>15%</span>
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
                                    <p>Unstake {name}</p>
                                    <div className="flex items-center space-x-1">
                                        <p>
                                            <IoWalletOutline />
                                        </p>
                                        <p>{stakedC}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center space-x-2">
                                    <input
                                        className="w-full rounded bg-gray-900 p-2 text-white outline-none"
                                        type="number"
                                    />
                                    <button className="h-full rounded bg-gray-900 p-2">
                                        MAX
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center space-x-3 md:w-1/2">
                                <button onClick={() => compound()} className="w-full">
                                    <Button>compound</Button>
                                </button>
                                <button className="w-full">
                                    <Button>unstake</Button>
                                </button>
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
        </div>
    );
};
export default ClaimCardDetail;
