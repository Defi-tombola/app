import { LOTTERY_PROVIDER_ADDRESS } from "@/utils";
import { IERC20__factory } from "@robertprp/lottery-contracts";
import {  networkProvider } from "@/core/services/network-provider";
import { BigNumberish } from "ethers";

export class Erc20Provider {
  private readonly erc20Address: string
  constructor(address: string) {
    this.erc20Address = address
  }

  public async getWalletBalance(): Promise<BigNumberish> {
    const contract = await this.getContract();
    const signer = await this.getSigner();
    const address = await signer.getAddress();
    return contract.balanceOf(address);
  }

  public async approve(amount: BigNumberish) {
    const contract = await this.getContract();
    const spender = LOTTERY_PROVIDER_ADDRESS;
    return contract.approve(spender, amount)
  }

  public async getAllowance(): Promise<BigNumberish> {
    const spender = LOTTERY_PROVIDER_ADDRESS;
    const contract = await this.getContract()
    const signer = await this.getSigner();
    const address = await signer.getAddress();

    console.log(`Checking allowance: address ${address} and spender ${spender} for token address ${this.erc20Address}`)
    return contract.allowance(address, spender);
  }

  private async getSigner() {
    return networkProvider.getSigner()
  }

  private async getContract() {
    const signer = await this.getSigner();
    return IERC20__factory.connect(this.erc20Address, signer)
  }
}