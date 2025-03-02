import { toast } from "sonner";
import React from "react";
import { getExplorerLinkByTransactionHash } from "@/utils/explorer";
import { ExternalLinkIcon } from "lucide-react";

export type ViewOnExplorerProps = {
  message: string,
  txHash: string,
}
export const viewOnExplorer = (props: ViewOnExplorerProps) => {
  const explorer = getExplorerLinkByTransactionHash(props.txHash);
  toast.success(props.message, {
    description: (
      <a href={explorer} target="_blank" className="flex gap-1 items-center">
        View on Explorer <ExternalLinkIcon size={13}/>
      </a>
    )
  });
}
