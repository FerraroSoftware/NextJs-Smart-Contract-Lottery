import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
      {/* not connecting to server  */}
      {/* This does everything manualheader does -.- */}
      Raffle
      <ConnectButton moralisAuth={false}></ConnectButton>
    </div>
  );
}
