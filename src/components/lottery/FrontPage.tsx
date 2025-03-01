import Image from "next/image";

export const FrontPage = () => {
  return (
    <div className="w-full h-full md:flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold">Feeling Lucky? 🎟️</h1>
        <h2 className="text-2xl text-gray-300 mt-2">Get your tickets & verify on-chain!</h2>
      </div>
      <Image src="/lottery/usdc-rotating.gif" width={600} height={1200} alt="USDC coin"></Image>
    </div>
  );
};