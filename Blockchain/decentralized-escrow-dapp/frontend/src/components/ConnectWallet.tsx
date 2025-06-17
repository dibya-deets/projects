import { ethers } from "ethers";

type Props = {
  setWallet: (wallet: ethers.BrowserProvider) => void;
  setAccount: (address: string) => void;
};

export default function ConnectWallet({ setWallet, setAccount }: Props) {
  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(provider);
    setAccount(accounts[0]);
  };

  return (
    <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
      Connect Wallet
    </button>
  );
}
