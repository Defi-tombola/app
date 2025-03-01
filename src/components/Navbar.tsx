import {ConnectButton} from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
    return (
      <div className="flex justify-end items-end">
        <div className="pr-2">
          <ModeToggle />
        </div>
        <ConnectButton />
      </div>
    )
}

export default Navbar;