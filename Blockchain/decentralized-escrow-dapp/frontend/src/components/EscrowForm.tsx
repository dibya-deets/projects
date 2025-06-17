import { useState } from "react";
import { ethers } from "ethers";
import { getEscrowContract } from "../utils/contract.ts";

type Props = {
  wallet: ethers.BrowserProvider;
  account: string;
};

export default function EscrowForm({ wallet }: Props) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      const signer = await wallet.getSigner();
      const escrow = getEscrowContract(signer);

      const tx = await escrow.deposit({
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert("Deposit successful!");
    } catch (err) {
      console.error(err);
      alert("Deposit failed");
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Deposit ETH to Escrow</h2>
      <input
        type="text"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleDeposit}
      >
        Deposit
      </button>
    </div>
  );
}
