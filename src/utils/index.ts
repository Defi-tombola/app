export const LOTTERY_PROVIDER_ADDRESS = "0x05f40DaB8365E4d5F8147cB65B60bF57C665BD2a"
export const LOTTERY_OWNER_ADDRESS = "0x306f9373E3f4dB87f51057F04F1FCBd7658f4e08"
export const LOTTERY_HOUSE_ADDRESS = "0x5ce0241EEB7DfcF8f2499386d70369e4094C400A"
export const USDC_ADDRESS = "0x673cD70FA883394a1f3DEb3221937Ceb7C2618D7";

export const DEFAULT_CHAIN_ID = 10143;

export namespace BytesTransformer {
  export const toBytes = (value: string) => {
    const num = BigInt(value);
    return "0x" + num.toString(16).padStart(64, "0");
  }

  export const toReadableDecimal = (value: string) => {
    const num = BigInt(value);
    return num.toString();
  }
}
