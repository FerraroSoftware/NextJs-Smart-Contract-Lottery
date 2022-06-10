// function to call lottery
// moralis has hook useWeb3Contract
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants";

export default function LotteryEntrance() {
    const {runContractFunction: enterRaffle} = useWeb3Contract({
       abi: ,
       contractAddress: ,
       functionName: ,
       params: {},
       msgValue:
    })

  return <div>lottery entrance</div>;
}
