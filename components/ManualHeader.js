import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ManualHeader() {
  // hook, gives access to state (connected to metamask or not)
  // isWeb3Enabled, but we use account instead. web3 could be connected, but no account
  // isWeb3EnableLoading -> checks to see if metamask button popped up
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  // takes function {} and dependency array []
  // keeps checking values in dependncy array and if something changes calls function and rerender
  // if no dependncy array: run anytime something re-renders. careful with this, causes circular render
  // blank array runs one time on load
  useEffect(() => {
    if (isWeb3Enabled) return;
    // nextjs has problems with window
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  // for handling disconnected from website and annoying popup coming up on refresh
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changes to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        // sets web3enabled to false
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);

  return (
    <div>
      {/* this is same as connect() in fundme index.js */}
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  );
}
