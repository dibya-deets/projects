import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet.tsx";
import EscrowForm from "./components/EscrowForm";
import EscrowActions from "./components/EscrowActions";

function App() {
  const [wallet, setWallet] = useState<any>(null);
  const [account, setAccount] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">🛡️ Decentralized Escrow</h1>
      <ConnectWallet setWallet={setWallet} setAccount={setAccount} />
      {wallet && (
        <>
          <p className="mb-4 text-gray-700">Connected Account: {account}</p>
          <EscrowForm wallet={wallet} />
          <EscrowActions wallet={wallet} />
        </>
      )}
    </div>
  );
}

export default App;
