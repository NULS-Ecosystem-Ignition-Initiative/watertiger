import $ from 'jquery';
import BigNumber from "bignumber.js";
//import { ethers } from "ethers";

const ROUTER_CONTRACT = "NULSd6HgyBv1A2NdqizZnkXcTkq9rrFoWS4ZE";
const STAKE_CONTRACT = "NULSd6Hgy7s4vmZNvB7QCHvhVreFmw7ctrNfs";
const NULSWAP_TOKEN = "NULSd6HgrzcXdTuGvRF9DmkxoXM8XNmXZs95d";
const wAssets = ["NULSd6HgqbD7DX9uYsjGA5pfRx7SKKy34VjGF", "NULSd6HgsNuWaUJaLbUx4PbM5B65vRX1RP85v"];

const CONFIRM_MESSAGE = "Confirm";
const NSWAP_STAKE_REWARD = 5000000 * Math.pow(10, 8)

//const ip1 = "http://65.108.46.135:8004/";
const ip1 = "https://api.nuls.io/";
//const ip1 = "https://bestdevteam.xyz/";
//const ip1 = "http://westteam.nulstar.com:18024/";
const apiIp = "https://api.bestdevteam.xyz";
//const apiIp = "https://bestdevteam.wf";
export default class NulsConnector {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        this.init = false;

    }

    async initialize() {
        try {

            //this.web3 = await this.getWeb3();
            if (typeof window !== "undefined") {
                // Client-side-only code
                this.account = await window.nabox.createSession();
            }


           // localStorage.setItem("address", this.account)
            this.init = true;
            return this;
        } catch (error) {
            throw error;
        }
    }

    getAccount() {
        if( this !== undefined && this.init === true)
            return this.account?.toString();
        else
            return ""

    }

    async approve(tkn, stake){
        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        let i = new BigNumber("99999999999999999999999999999999999999999999999999999999999999999999999")

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: tkn.toString(),
            methodName: "approve",
            methodDesc: "(Address spender, BigInteger value) return boolean",
            args: [stake.toString(), i.toString()]
        }

        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();
            $("#appro"+stake).addClass("greyBtn");

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");
            console.log(result)
        }).catch(error => {
            console.log(error)
            //alert(error)
        });

    }


    async stake(cont, amount, current, userCurrent, bal){

        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        let i = new BigNumber("99999999999999999999999999999999999999999999999999999999999999999999999")

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: cont.toString(),
            methodName: "stake",
            methodDesc: "(BigInteger amount) return void",
            args: [new BigNumber(amount).multipliedBy(Math.pow(10, 8)).toString()]
        }

        const res = await window.nabox.contractCall(data).then(result => {
            //document.getElementById("userStaked"+ cont).innerHTML = new BigNumber(userCurrent).plus(new BigNumber(amount)).toFixed(5).toString()
            //document.getElementById("balm"+ cont).innerHTML = new BigNumber(bal).minus(new BigNumber(amount).multipliedBy(Math.pow(10,8))).dividedBy(Math.pow(10, 8)).toFixed(5).toString()
            $(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

            $(".alertInfo").toggle();
            $("#inputToStake"+ cont).val("");

        }).catch(error => {

            $(".errorInfo").toggle();
        });

    }

    async stakeWithCharge(cont, amount, current, userCurrent, bal, charge){

        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        let i = new BigNumber("99999999999999999999999999999999999999999999999999999999999999999999999")

        const data = {
            from: this.account.toString(),
            value: charge,
            contractAddress: cont.toString(),
            methodName: "stake",
            methodDesc: "(BigInteger amount) return void",
            args: [new BigNumber(amount).multipliedBy(Math.pow(10, 8)).toString()]
        }

        const res = await window.nabox.contractCall(data).then(result => {
            //document.getElementById("userStaked"+ cont).innerHTML = new BigNumber(userCurrent).plus(new BigNumber(amount)).toFixed(5).toString()
            //document.getElementById("balm"+ cont).innerHTML = new BigNumber(bal).minus(new BigNumber(amount).multipliedBy(Math.pow(10,8))).dividedBy(Math.pow(10, 8)).toFixed(5).toString()
            $(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

            $(".alertInfo").toggle();
            $("#inputToStake"+ cont).val("");

        }).catch(error => {

            $(".errorInfo").toggle();
        });

    }

    async stakeMulti(cont, amount,c, a, current, userCurrent, bal){

        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        let i = new BigNumber("99999999999999999999999999999999999999999999999999999999999999999999999")

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: cont.toString(),
            methodName: "stake",
            methodDesc: "(BigInteger value) return BigInteger",
            args: [new BigNumber(amount).multipliedBy(Math.pow(10, 18)).toString()],
            multyAssetValues: [[amount, parseInt(c), parseInt(a)]]
        }

        const res = await window.nabox.contractCall(data).then(result => {
            //document.getElementById("userStaked"+ cont).innerHTML = new BigNumber(userCurrent).plus(new BigNumber(amount)).toFixed(5).toString()
            //document.getElementById("balm"+ cont).innerHTML = new BigNumber(bal).minus(new BigNumber(amount).multipliedBy(Math.pow(10,8))).dividedBy(Math.pow(10, 8)).toFixed(5).toString()
            $(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

            $(".alertInfo").toggle();
            $("#inputToStake"+ cont).val("");

        }).catch(error => {

            $(".errorInfo").toggle();
        });

    }

    async stakeMultiBNB(cont, amount,c, a, current, userCurrent, bal){

        BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
        let i = new BigNumber("99999999999999999999999999999999999999999999999999999999999999999999999")

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: cont.toString(),
            methodName: "stake",
            methodDesc: "(BigInteger value) return BigInteger",
            args: [new BigNumber(amount).multipliedBy(Math.pow(10, 18)).toString()],
            multyAssetValues: [[amount, parseInt(c), parseInt(a)]]
        }

        const res = await window.nabox.contractCall(data).then(result => {
            //document.getElementById("userStaked"+ cont).innerHTML = new BigNumber(userCurrent).plus(new BigNumber(amount)).toFixed(5).toString()
            //document.getElementById("balm"+ cont).innerHTML = new BigNumber(bal).minus(new BigNumber(amount).multipliedBy(Math.pow(10,8))).dividedBy(Math.pow(10, 8)).toFixed(5).toString()
            $(".alertInfo").html("<p>Tx Submited/Wait Confirmation</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

            $(".alertInfo").toggle();
            $("#inputToStake"+ cont).val("");

        }).catch(error => {

            $(".errorInfo").toggle();
        });

    }

    async migrateNow(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "migrate",
            methodDesc: "() return void",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

        }).catch( error =>{

        });
    }

    async compound(ctr){

        const data = {
            from: this.account.toString(),
            value: 1,
            contractAddress: ctr.toString(),
            methodName: "compound",
            methodDesc: "() return void",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{

        });
    }

    async compoundMulti(ctr){

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "compound",
            methodDesc: "() return void",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{

        });
    }

    async getReward(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "getReward",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async getRewardSpecial(ctr){

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "getReward",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async getRewardWithCharge(ctr, charge){

        const data = {
            from: this.account.toString(),
            value: charge,
            contractAddress: ctr.toString(),
            methodName: "getReward",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async getRewardWithChargeOnly(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "getRewardFirstToken",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            document.getElementById("pClaimable"+ ctr).innerHTML = 0.00 + " WTF"

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async getRewardMulti(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "claim",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{

        });
    }

    async getRewardMultiBNB(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "claim",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {

            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");

        }).catch( error =>{

        });
    }

    async exit(ctr){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();



        });
    }

    async exitSpecial(ctr){

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "() return BigInteger",
            args: []
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();



        });
    }




    async withdraw(ctr, val){

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "(BigInteger val) return BigInteger",
            args: [new BigNumber(val).toString()]
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async withdrawSpecial(ctr, val){

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "(BigInteger val) return BigInteger",
            args: [new BigNumber(val).toString()]
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async withdrawWithCharge(ctr, val, charge){

        const data = {
            from: this.account.toString(),
            value: charge,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "(BigInteger val) return BigInteger",
            args: [new BigNumber(val).toString()]
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async notifyReward(ctr, c ,a ){
        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "notifyReward",
            methodDesc: "(BigInteger value) return void",
            args: ["9000000000000000000000000"],
            multyAssetValues: [[9000000, parseInt(c), parseInt(a)]]
        }
        const res = await window.nabox.contractCall(data).then(result => {

        }).catch( error =>{

        });
    }

    async notify(ctr, c, a){
        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "deposit",
            methodDesc: "(BigInteger value) return boolean",
            args: ["10000000000000000000000000"],
            multyAssetValues: [[10000000.000000000000000000, parseInt(c), parseInt(a)]]
        }
        const res = await window.nabox.contractCall(data).then(result => {

        }).catch( error =>{

        });
    }

    async withdrawMulti(ctr, val, dec){

        let s2 = new BigNumber(val).multipliedBy(10000).toFixed(0).toString();
        let i = 0;

        while( i < (dec - 4)){
            s2 += "0";
            i = i + 1;
        }

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "(BigInteger value) return BigInteger",
            args: [s2]
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async withdrawMultiBNB(ctr, val, dec){

        let s2 = new BigNumber(val).multipliedBy(10000).toFixed(0).toString();
        let i = 0;

        while( i < (dec - 4)){
            s2 += "0";
            i = i + 1;
        }

        const data = {
            from: this.account.toString(),
            value: 0.5,
            contractAddress: ctr.toString(),
            methodName: "withdraw",
            methodDesc: "(BigInteger value) return BigInteger",
            args: [s2]
        }
        const res = await window.nabox.contractCall(data).then(result => {
            $(".alertInfo").toggle();

            $(".alertInfo").html("<p>Transaction Succeeded</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");


        }).catch( error =>{
            $(".errorInfo").toggle();
        });
    }

    async earned(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "earned",
            methodDesc :  "(Address account) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async earnedN(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "earnedNuls",
            methodDesc :  "(Address account) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async staked(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "_balanceOf",
            methodDesc :  "(Address account) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async isMigratedV1(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "isMigrated",
            methodDesc :  "(Address acc) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async getBoost(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "getCurrentUserTier",
            methodDesc :  "(Address user) return int",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async getTimestampClaimUnlock(tkn, b){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "releasePercentage",
            methodDesc :  "(int batch) return BigInteger",
            args : [b.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async getTotalSupply(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "totalSupply",
            methodDesc :  "() return BigInteger",
            args : []
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }


    async getUserClaimed(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "getTokenBalance",
            methodDesc :  "(Address owner) return BigDecimal",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)
        console.log(res.result)
        return  res.result;

    }


    async getUserLockTime(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "getUserLockTime",
            methodDesc :  "(Address user) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)
        console.log(res.result)
        return  res.result;

    }


    async balanceOf(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "balanceOf",
            methodDesc :  "(Address owner) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async getAllowance(tkn, ctr){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "allowance",
            methodDesc :  "(Address owner, Address spender) return BigInteger",
            args : [this.account.toString(), ctr]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async tknBalanceOf(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "balanceOf",
            methodDesc :  "(Address owner) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)

        return  res.result;

    }

    async bothReserves(tkn){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "bothTokensReserve",
            methodDesc :  "() return String",
            args : []
        }
        const res = await window.nabox.invokeView(data)

        console.log(res.result+"1")
      return res.result;

    }

    async isClaimed(tkn, batching){
        const data = {
            contractAddress : tkn.toString(),
            methodName : "isClaimed",
            methodDesc :  "(Address addr, int batch) return boolean",
            args : [this.account.toString(), batching]
        }
        const res = await window.nabox.invokeView(data)
        //alert(res.result)
        return res.result;

    }

    async createAndUpdatePair(p){
      var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;

                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    console.log(data)

                }

                // end of state change: it can be after some time (async)
            };
            xhr.open("POST", apiIp+"/api/v1/userLiq", true);


            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                "user": this.account.toString(),
                "pair": p,
                "lp": "",
                "lpAmount": "100000000",
                "amountTknA": "3894",
                "amountTknB": "200"
            }));

    }



    async saleValid(ctr, wallet){

        const data = {
            contractAddress : ctr,
            methodName : "getEarned",
            methodDesc :  "(Address earner) return BigInteger",
            args : [this.account.toString()]
        }
        const res = await window.nabox.invokeView(data)
       // alert(res.result)
        return res.result;

    }

   async claimBatch(ctr,  batch){

        const data = {
            from: this.account.toString(),
            value: 0,
            contractAddress: ctr.toString(),
            methodName: "claimBatch",
            methodDesc: "(int batch) return boolean",
            args: [ batch]
        }
        const res = await window.nabox.contractCall(data).then(result => {

            $(".alertInfo").toggle();
            localStorage.setItem("txHash", result);
            $("#m"+batch + ctr).css("background", "#9ca3af");
            $(".alertInfo").html("<p>Tx Succeeded Submited</p><a target='_blank' href='https://nulscan.io/transaction/info?hash="+ result +"' style='text-decoration:underline'>Check tx</a>");
        }).catch( error =>{
            $(".errorInfo").toggle();
        });

    }

    async queryTransaction(resk){

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status == 200) {
                var data = JSON.parse(this.responseText);

                console.log(data);
                if (data.data.status === 1) {
                    localStorage.setItem("txHash", "")

                }


            }

            // end of state change: it can be after some time (async)
        };
        xhr.open("GET", ip1 + "api/tx/" + resk.toString(), true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

    }

    async multiBalance(stk, chain, asset, dec){
        localStorage.setItem("t", stk)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status == 200) {
                var data = JSON.parse(this.responseText);

                console.log(data)
                document.getElementById("balm" + localStorage.getItem("t")).innerHTML= new BigNumber(data.data.total).dividedBy(Math.pow(10,dec)).toFixed(2).toString()





            }

            // end of state change: it can be after some time (async)
        };

        xhr.open("POST", ip1 +"api/accountledger/balance/" + this.account.toString() , true);


        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "assetChainId" : chain,
            "assetId" : asset
        }));
    }


}