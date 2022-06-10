import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="p-5 border-b-2 flex flex-row">
      {/* not connecting to server  */}
      {/* This does everything manualheader does -.- */}
      <h1 className="py-4 px-4 font-blog text-3xl">Raffle</h1>
      <div className="ml-auto py-2 px-4"></div>
      <ConnectButton moralisAuth={false}></ConnectButton>
    </div>
  );
}
