import { ethers } from 'ethers'
import Contract from './contracts/SimpleAuction.json'

export function getAuction(withSigner=false) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const networks = Object.values(Contract.networks)
  const network = networks[networks.length - 1]
  const contract = new ethers.Contract(network.address, Contract.abi, provider)
  if(!withSigner) {
    return contract
  }
  const signer = provider.getSigner()
  const contractWithSigner = contract.connect(signer)
  return contractWithSigner
}
