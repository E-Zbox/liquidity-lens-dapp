export interface IRecord {
  [name: string]: string;
}

interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IFactory {
  id: string;
  poolCount: string;
  totalFeesETH: string;
  totalFeesUSD: string;
  totalValueLockedETH: string;
  totalValueLockedUSD: string;
  totalVolumeUSD: string;
  totalVolumeETH: string;
  txCount: string;
}

export interface IFactoryResponse extends IGenericResponse<IFactory> {}

export interface IToken {
  id: string;
  decimals: string;
  name: string;
  symbol: string;
  totalSupply: string;
  // anything after this is optional
  feesUSD?: string;
  totalValueLockedUSD?: string;
  volumeUSD?: string;
}

export interface IPool {
  id: string;
  token0: IToken;
  token0Price: string;
  token1: IToken;
  token1Price: string;
  totalValueLockedUSD: string;
  txCount: string;
  volumeUSD: string;
}

export interface IPoolResponse extends IGenericResponse<IPool[]> {}

export interface ISwap {
  amount0: string;
  amount1: string;
  amountUSD: string;
  id: string;
  origin: string;
  recipient: string;
  sender: string;
  timestamp: string;
  token0: IToken;
  token1: IToken;
}

export interface ISwapResponse extends IGenericResponse<ISwap[]> {}

export interface ITokenResponse extends IGenericResponse<IToken[]> {}
