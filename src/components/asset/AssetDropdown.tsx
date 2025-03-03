// components/AssetDropdown.jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssetType } from "@/core/api/schema";
import { tokenSymbolToAvatar } from "@/components/avatar/Avatar";
import { formatShortAddress } from "@/components/lib/utils";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export default function AssetDropdown({ assets }: { assets: AssetType[] }) {
  if (!assets.length) {
    return null
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!"); // Optional: Show a success message
      })
      .catch(() => {
        toast.error("Failed to copy!"); // Optional: Show an error message
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded flex items-center outline-1 outline-offset-1 font-bold">
          Tombola Assets
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {assets.map((asset) => (
          <DropdownMenuItem key={asset.id}>
            <div className="flex justify-between w-full">
              <div className="flex">
                {tokenSymbolToAvatar({ symbol: asset.symbol })}
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-sm text-gray-600">{asset.symbol}</p>
                </div>
              </div>

              <div className="text-gray-500 flex gap-1 items-center justify-center bg-gray-900 rounded-lg p-2 cursor-pointer" onClick={() => copyToClipboard(asset.address)}>
                <CopyIcon size={10}/>
                {formatShortAddress(asset.address)}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}