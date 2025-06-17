import { ethers } from "ethers";
import abijson from "./escrowAbi.json";
import type { InterfaceAbi } from "ethers";

const abi: InterfaceAbi = abijson;
const CONTRACT_ADDRESS = "0x3A299320f538E632524A8e527283DF466Cfff136";

export const getEscrowContract = (
    providerOrSigner: ethers.Provider | ethers.Signer
) => {
    return new ethers.Contract(CONTRACT_ADDRESS, abi, providerOrSigner);
};