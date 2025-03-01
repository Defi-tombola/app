
import Image from 'next/image'
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";

export function UserDefaultAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export function AssetAvatar({ path }: { path: string }) {
  return (
    <Avatar>
      <AvatarImage className="w-[22px]" src={path} />
    </Avatar>
  )
}

export function tokenSymbolToAvatar({ symbol }: { symbol?: string }) {
  switch (symbol.toUpperCase()) {
    case "USDC": {
      return (<AssetAvatar path="/usdc-logo.svg"></AssetAvatar>)
    }
    case "USDT": {
      return (<AssetAvatar path="/usdt-logo.svg"></AssetAvatar>)
    }
    case "WMON": {
      return (<AssetAvatar path="/monad-logo.svg"></AssetAvatar>)
    }
    default:
      return null
  }
}

export function tokenSymbolToImage({ symbol, width, height }: { symbol: string, width: number, height: number }) {
  switch (symbol.toUpperCase()) {
    case "USDC": {
      return <Image src="/usdc-logo.svg" width={width} height={height} alt="USDC coin"></Image>;
    }
    case "USDT": {
      return <Image src="/usdt-logo.svg" width={width} height={height} alt="USDT coin"></Image>;
    }
    case "MON": {
      return <Image src="/monad-logo.svg" width={width} height={height} alt="Monad coin"></Image>;
    }
    case "WMON": {
      return <Image src="monad-logo.svg" width={width} height={height} alt="Monad coin"></Image>;
    }
    default:
      return null
  }
}