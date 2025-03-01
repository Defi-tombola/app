export const EXPLORERS = {
  monadTestnet: {
    baseUrl: 'https://testnet.monadexplorer.com',
    getAddressUrl: (address) => `/address/${address}`,
    getTransactionUrl: (txHash) => `/tx/${txHash}`,
  },
};

export const getExplorerLinkByAddress = (address, explorerKey = "monadTestnet") => {
  const explorer = EXPLORERS[explorerKey];
  return explorer ? `${explorer.baseUrl}${explorer.getAddressUrl(address)}` : undefined;
};

export const getExplorerLinkByTransactionHash = (txHash, explorerKey = "monadTestnet") => {
  const explorer = EXPLORERS[explorerKey];
  return explorer ? `${explorer.baseUrl}${explorer.getTransactionUrl(txHash)}` : undefined;
};
