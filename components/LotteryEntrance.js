// function to call lottery
// moralis has hook useWeb3Contract
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  // starting value 0
  const [entranceFee, setEntranceFee] = useState("0");

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read raffle entrance fee
      // if using await, need to put in async function to call it correctly
      async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        setEntranceFee(entranceFeeFromCall);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div>
      lottery entrance
      <div>
        {raffleAddress ? (
          <div>
            <button
              onClick={async function () {
                await enterRaffle();
              }}
            >
              Enter Raffle
            </button>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
          </div>
        ) : (
          <div>No Raffle Address Detected</div>
        )}
      </div>
    </div>
  );
}
