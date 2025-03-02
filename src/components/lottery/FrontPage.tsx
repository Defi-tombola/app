import Image from "next/image";

export const FrontPage = () => {
  return (
    <div className="bg-[url('/tombola.webp')] bg-fill bg-center backdrop-brightness-150 filter">
      <div className="flex justify-center items-center flex-col backdrop-filter-xs">
        <h1 className="text-5xl font-bold">Feeling Lucky? 🎟️</h1>
        <h2 className="text-2xl text-gray-300 mt-2">Get your tickets & verify on-chain!</h2>
      </div>
      <Image className="filter " src="/lottery/usdc-rotating.gif" width={600} height={1200} alt="USDC coin"></Image>
    </div>
  );
};