import {IERC20__factory, LotteryProvider, LotteryProvider__factory} from "@robertprp/lottery-contracts";
import {networkProvider} from "./network-provider";
import {LOTTERY_HOUSE_ADDRESS, LOTTERY_PROVIDER_ADDRESS, USDC_ADDRESS} from "@/utils";
import { LotteryType, TicketType } from "@/core/api/schema";
import { Erc20Provider } from "@/core/services/erc20-provider";
import invariant from "tiny-invariant";
import { toast } from "sonner";
import { viewOnExplorer } from "@/components/ui/view-on-explorer-toast";
import BigNumber from "bignumber.js";

export type BuyTicketsProps = {
    nTickets: number;
    lottery: LotteryType;
}

export class LotteryProviderService {
    private readonly providerAddress: string;
    constructor(_providerAddress = LOTTERY_PROVIDER_ADDRESS) {
        this.providerAddress = _providerAddress
    }

    public async buyTickets(props: BuyTicketsProps) {
        try {
            const lotteryProvider = await this.getContract();
            const ticketPrice = props.lottery.ticketPrice;
            const nTickets = props.nTickets;

            const minAllowance = ticketPrice.multipliedBy(nTickets);
            invariant(props.lottery.ticketAsset?.address, "Ticket asset address is not defined");

            const tokenProvider = new Erc20Provider(props.lottery.ticketAsset.address);

            const allowance = await tokenProvider.getAllowance();
            console.log(`Token allowance: ${allowance.toString()}`)
            console.log(`needed allowance: ${minAllowance.toString()}`)
            if (allowance < minAllowance) {
                const infiniteAllowance = new BigNumber(Number.MAX_VALUE);
                const tx = await tokenProvider.approve(infiniteAllowance.toString());
                viewOnExplorer({ message: "Approved infinite token allowance", txHash: tx.hash });
            }

            return lotteryProvider.buyTicket(props.lottery.uid, nTickets);
        } catch (error) {
            toast.error("An error occurred while buying tickets.");
        }
    }

    private getContract = async (): Promise<LotteryProvider> => {
        return LotteryProvider__factory
            .connect(LOTTERY_PROVIDER_ADDRESS,
                await networkProvider.getSigner());
    };
}