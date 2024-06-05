import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// interface
import {
  IFactoryResponse,
  IPoolResponse,
  IRecord,
  ISwapResponse,
  ITokenResponse,
} from "./interface";

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

const uniswapGraphQLEndpoint = `https://gateway-arbitrum.network.thegraph.com/api/${SUBGRAPH_API_KEY}/deployments/id/QmZeCuoZeadgHkGwLwMeguyqUKz1WPWQYKcKyMCeQqGhsF`;

const uniswapClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uniswapGraphQLEndpoint,
});

export const getCurrentFactory = async (): Promise<IFactoryResponse> => {
  let response: IFactoryResponse = {
    data: {
      id: "",
      poolCount: "",
      totalFeesETH: "",
      totalFeesUSD: "",
      totalValueLockedETH: "",
      totalValueLockedUSD: "",
      totalVolumeUSD: "",
      totalVolumeETH: "",
      txCount: "",
    },
    error: "",
    success: false,
  };

  try {
    if (!SUBGRAPH_API_KEY) {
      throw new Error(
        "Missing `NEXT_PUBLIC_SUBGRAPH_API_KEY` in env variables"
      );
    }

    const { data } = await uniswapClient.query({
      query: gql`
        query Factories {
          factories(first: 1) {
            id
            poolCount
            txCount
            totalVolumeUSD
            totalVolumeETH
            totalFeesUSD
            totalFeesETH
            totalValueLockedUSD
            totalValueLockedETH
          }
        }
      `,
    });

    response = {
      data: data.factories[0],
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getPools = async (
  limit = 20,
  skip = 0
): Promise<IPoolResponse> => {
  let response: IPoolResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data } = await uniswapClient.query({
      query: gql`
        query Pools {
          pools(skip: ${skip}, first: ${limit}, orderBy: totalValueLockedUSD, orderDirection: desc) {
            token0Price
            id
            token0 {
              symbol
              name
              decimals
              totalSupply
            }
            token1Price
            token1 {
              symbol
              name
              decimals
              totalSupply
            }
            txCount
            volumeUSD
            totalValueLockedUSD
          }
        }
      `,
    });

    response = {
      data: data.pools,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getSwaps = async (
  limit = 20,
  skip = 0,
  token0_: IRecord = {},
  token1_: IRecord = {}
): Promise<ISwapResponse> => {
  let response: ISwapResponse = {
    data: [],
    error: "",
    success: false,
  };

  let where = "";

  let query = `orderBy: timestamp, orderDirection: desc, first: ${limit}, skip: ${skip}`;

  const token0_Keys = Object.getOwnPropertyNames(token0_);

  if (token0_Keys.length > 0) {
    let token0Query = "{";
    let token0_Keys = Object.keys(token0_);
    token0_Keys.map((key, index) => {
      token0Query = `${token0Query}${key}: "${token0_[key]}"${
        index < token0_Keys.length - 1 ? ", " : ""
      }`;
    });
    token0Query = `${token0Query}}`;

    let token1Query = "{";
    let token1_Keys = Object.keys(token1_);
    token1_Keys.forEach((key, index) => {
      token1Query = `${token1Query}${key}: "${token1_[key]}"${
        index < token1_Keys.length - 1 ? ", " : ""
      }`;
    });
    token1Query = `${token1Query}}`;

    where = `token0_: ${token0Query}, token1_: ${token1Query}`;
    query = `where: {${where}}, ${query}`;
  }

  try {
    const { data } = await uniswapClient.query({
      query: gql`
            query Swaps {
              swaps(
                    ${query}
                  ) {
                id
                timestamp
                sender
                recipient
                origin
                amount0
                amount1
                amountUSD
                token0 {
                  decimals
                  name
                  symbol
                  totalSupply
                }
                token1 {
                  decimals
                  name
                  symbol
                  totalSupply
                }
              }
            }
          `,
    });

    response = {
      data: data.swaps,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getLimitedTokensData = async (
  limit = 40,
  skip = 0
): Promise<ITokenResponse> => {
  let response: ITokenResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const { data } = await uniswapClient.query({
      query: gql`
            query Tokens {
                tokens(
                    first: ${limit},
                    skip: ${skip},
                    orderBy: totalValueLockedUSD,
                    orderDirection: desc) {
                    id
                    symbol
                    name
                    decimals
                }
            }
            `,
    });

    response = {
      data: data.tokens,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
