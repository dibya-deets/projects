import { getEscrowContract } from "../utils/contract";

type Props = {
  wallet: any;
};

export default function EscrowActions({ wallet }: Props) {
  const handleAction = async (action: "approve" | "releaseFunds" | "cancel") => {
    try {
      const signer = await wallet.getSigner();
      const escrow = getEscrowContract(signer);
      const tx = await escrow[action]();
      await tx.wait();
      alert(`${action} executed`);
    } catch (error) {
      console.error(error);
      alert(`Failed to execute ${action}`);
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={() => handleAction("approve")} className="bg-green-600 text-white px-4 py-2 rounded">
        Approve
      </button>
      <button onClick={() => handleAction("releaseFunds")} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Release
      </button>
      <button onClick={() => handleAction("cancel")} className="bg-red-600 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  );
}
