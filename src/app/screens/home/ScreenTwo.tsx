"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// api
import { getLimitedTokensData, getPools, getSwaps } from "@/api";
import { IPool, ISwap, IToken } from "@/api/interface";
// components
import TokenImg from "@/app/components/home/TokenImg";
// stores
import { useThemeStore } from "@/store/theme";
// styles
import {
  Pool,
  PoolItem,
  PoolTable,
  PoolText,
  Swap,
  SwapExchangeItem,
  SwapImage,
  SwapItem,
  SwapModalScroll,
  SwapModalToken,
  SwapSelect,
  SwapSelectModal,
  SwapSelectModalContainer,
  SwapSelectModalTitle,
  SwapTable,
  SwapText,
  Tab,
} from "@/app/styles/home/ScreenTwo.styles";
import { Loader } from "@/app/styles/Loader.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import TokenPair from "@/app/components/home/TokenPair";
import {
  expressInThousands,
  expressThousandsInZeroGroup,
} from "@/utils/transformer";

const LOCAL_STORAGE_POOL_STATE = "poolState";
const LOCAL_STORAGE_SWAP_STATE = "swapState";
const LOCAL_STORAGE_SWAP_MODAL_STATE = "swapModalTokenState";

const SWAP_MODAL_TOKEN0 = "token0";
const SWAP_MODAL_TOKEN1 = "token1";

interface ISwapModalToken extends IToken {
  selected: boolean;
}

interface ISwapModalTokenState {
  [name: string]: ISwapModalToken[];
}

const ScreenTwo = () => {
  const {
    default: {
      images: { loaderImgBlack, loaderImgWhite },
    },
    home: {
      images: { dollarEthereumExchangeIcon, exchangeIcon },
      tabs: {
        content,
        ids: { TABS_POOLS_ID, TABS_SWAPS_ID, TABS_TOKENS_ID },
      },
    },
  } = screens;

  const [loading, setLoading] = useState(false);

  // Pool
  const [poolState, setPoolState] = useState<IPool[]>([]);

  // Swap
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapState, setSwapState] = useState<ISwap[]>([]);
  const [swapModalTokenState, setSwapModalTokenState] =
    useState<ISwapModalTokenState>({
      [SWAP_MODAL_TOKEN0]: [],
      [SWAP_MODAL_TOKEN1]: [],
    });

  const [tabState, setTabState] = useState(content);

  const [isDark] = useThemeStore((store) => [store.isDark]);

  const handleTabClick = (_id: number) => {
    setTabState((prevState) => {
      const updatedState = prevState.map((item) => ({
        ...item,
        selected: item.id == _id,
      }));

      return updatedState;
    });
  };

  const selectedTab = tabState.find((item) => item.selected)!;

  const handleModalTokenClick = (index: number, swapModal: string) => {
    switch (swapModal) {
      case SWAP_MODAL_TOKEN0:
        setSwapModalTokenState((prevState) => {
          const updatedToken0State = prevState[SWAP_MODAL_TOKEN0].map(
            (token, _index) => ({ ...token, selected: index === _index })
          );
          const updatedToken1State = prevState[SWAP_MODAL_TOKEN1].map(
            (token, _index) => ({
              ...token,
              selected: index === _index ? false : token.selected,
            })
          );

          return {
            [SWAP_MODAL_TOKEN0]: updatedToken0State,
            [SWAP_MODAL_TOKEN1]: updatedToken1State,
          };
        });
        break;
      case SWAP_MODAL_TOKEN1:
        setSwapModalTokenState((prevState) => {
          const updatedToken0State = prevState[SWAP_MODAL_TOKEN0].map(
            (token, _index) => ({
              ...token,
              selected: index === _index ? false : token.selected,
            })
          );
          const updatedToken1State = prevState[SWAP_MODAL_TOKEN1].map(
            (token, _index) => ({ ...token, selected: index === _index })
          );
          return {
            [SWAP_MODAL_TOKEN0]: updatedToken0State,
            [SWAP_MODAL_TOKEN1]: updatedToken1State,
          };
        });
        break;
      default:
        break;
    }
  };

  const renderTab = () => {
    switch (selectedTab.id) {
      case TABS_POOLS_ID:
        /// POools
        return (
          <PoolTable>
            <Pool>
              <PoolItem>
                <PoolText $isHeader={true}>Name</PoolText>
              </PoolItem>
              <PoolItem>
                <PoolText $isHeader={true}>Total Value Locked ($)</PoolText>
              </PoolItem>
              <PoolItem>
                <PoolText $isHeader={true}>Volume ($)</PoolText>
              </PoolItem>
              <PoolItem>
                <PoolText $isHeader={true}>Tx Count</PoolText>
              </PoolItem>
            </Pool>
            {loading ? (
              <Loader
                src={isDark ? loaderImgBlack.src : loaderImgWhite.src}
                $size="30px"
              />
            ) : (
              poolState.map(
                (
                  { token0, token1, totalValueLockedUSD, volumeUSD, txCount },
                  key
                ) => (
                  <Pool key={key}>
                    <PoolItem>
                      <TokenPair tokens={[token0, token1]} />
                    </PoolItem>
                    <PoolItem>
                      <PoolText>
                        ${" "}
                        {expressThousandsInZeroGroup(
                          expressInThousands(Number(totalValueLockedUSD))
                        )}
                      </PoolText>
                    </PoolItem>
                    <PoolItem>
                      <PoolText>
                        {`${expressThousandsInZeroGroup(
                          expressInThousands(Number(volumeUSD))
                        )}`}
                      </PoolText>
                    </PoolItem>
                    <PoolItem>
                      <PoolText>
                        {expressThousandsInZeroGroup(
                          expressInThousands(Number(txCount))
                        )}
                      </PoolText>
                    </PoolItem>
                  </Pool>
                )
              )
            )}
          </PoolTable>
        );
      case TABS_SWAPS_ID:
        /// Swaps
        return (
          <>
            <FlexContainer
              $height="fit-content"
              $padding={"20px"}
              $miscellaneous="margin-top: calc(var(--ten-px)* 3.5);"
            >
              <SwapSelect onClick={() => setShowSwapModal(true)}>
                <Image
                  src={dollarEthereumExchangeIcon.src}
                  height={32}
                  width={32}
                  alt=""
                  style={{ marginRight: "7px" }}
                />
                <SwapText $isHeader={false}>Token List</SwapText>
              </SwapSelect>
            </FlexContainer>
            <SwapTable>
              <Swap>
                <SwapItem>
                  <SwapText $isHeader={true}>Token Pair</SwapText>
                </SwapItem>
                <SwapExchangeItem>
                  <SwapText $isHeader={true}>Amount (#1)</SwapText>
                  <SwapImage src={exchangeIcon.src} />
                  <SwapText $isHeader={true}>Amount (#2)</SwapText>
                </SwapExchangeItem>
                <SwapItem>
                  <SwapText $isHeader={true}>Amount ($)</SwapText>
                </SwapItem>
                <SwapItem>
                  <SwapText $isHeader={true}>Timestamp</SwapText>
                </SwapItem>
              </Swap>
              {swapState.map(
                (
                  { amount0, amount1, amountUSD, token0, token1, timestamp },
                  key
                ) => {
                  let _amount0 = Math.abs(Number(amount0));
                  let _amount1 = Math.abs(Number(amount1));
                  let _amountUSD = Number(amountUSD);
                  let date = new Date(Number(timestamp) * 1000);
                  let day = date.getDay();
                  let month = date.getMonth() + 1;
                  let year = date.getUTCFullYear();
                  let seconds = date.getSeconds();
                  let minutes = date.getMinutes();
                  let hours = date.getHours();
                  let dateText = `${hours > 9 ? hours : `0${hours}`}:${
                    minutes > 9 ? minutes : `0${minutes}`
                  }:${seconds > 9 ? seconds : `0${seconds}`} ${
                    day > 9 ? day : `0${day}`
                  }/${month > 9 ? month : `0${month}`}/${year}`;

                  return (
                    <Swap key={key}>
                      <SwapItem>
                        <TokenPair tokens={[token0, token1]} />
                      </SwapItem>
                      <SwapExchangeItem>
                        <SwapText>
                          {`${expressThousandsInZeroGroup(
                            expressInThousands(_amount0)
                          )}${
                            _amount0 < 1_000_000
                              ? `.${_amount0
                                  .toFixed(2)
                                  .split(".")
                                  .splice(1)[0]
                                  ?.substring(0, 2)}`
                              : ""
                          }`}
                        </SwapText>
                        <SwapImage src={exchangeIcon.src} />
                        <SwapText>
                          {`${expressThousandsInZeroGroup(
                            expressInThousands(_amount1)
                          )}${
                            _amount1 < 1_000_000
                              ? `.${_amount1
                                  .toFixed(2)
                                  .split(".")
                                  .slice(1)[0]
                                  ?.substring(0, 2)}`
                              : ""
                          }`}
                        </SwapText>
                      </SwapExchangeItem>
                      <SwapItem>
                        <SwapText>
                          {`${expressThousandsInZeroGroup(
                            expressInThousands(_amountUSD)
                          )}${
                            _amountUSD < 1_000_000
                              ? `.${_amountUSD
                                  .toFixed(2)
                                  .split(".")
                                  .slice(1)[0]
                                  ?.substring(0, 2)}`
                              : ""
                          }`}
                        </SwapText>
                      </SwapItem>
                      <SwapItem>
                        <SwapText>{dateText}</SwapText>
                      </SwapItem>
                    </Swap>
                  );
                }
              )}
            </SwapTable>
            {loading ? (
              <FlexContainer
                $alignItems="center"
                $height={"200px"}
                $justifyContent="center"
              >
                <Loader
                  src={isDark ? loaderImgBlack.src : loaderImgWhite.src}
                  $size={"64px"}
                />
              </FlexContainer>
            ) : (
              <></>
            )}
            {
              /* Swap Modal */
              showSwapModal ? (
                <PositionContainer
                  $position="fixed"
                  $height="100vh"
                  $left="0px"
                  $top="0px"
                  $alignItems="center"
                  $justifyContent="center"
                  $bgColor="#000A"
                  onClick={() => setShowSwapModal(false)}
                >
                  <SwapSelectModal>
                    <SwapSelectModalTitle>
                      Pick a token pair
                    </SwapSelectModalTitle>
                    <SwapSelectModalContainer>
                      <SwapModalScroll>
                        {swapModalTokenState[SWAP_MODAL_TOKEN0].map(
                          ({ symbol, selected }, key) => (
                            <SwapModalToken
                              key={key}
                              $selected={selected}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModalTokenClick(key, SWAP_MODAL_TOKEN0);
                              }}
                            >
                              <TokenImg symbol={symbol} />
                              <SwapText $isHeader={false}>{symbol}</SwapText>
                            </SwapModalToken>
                          )
                        )}
                      </SwapModalScroll>
                      <SwapModalScroll>
                        {swapModalTokenState[SWAP_MODAL_TOKEN1].map(
                          ({ symbol, selected }, key) => (
                            <SwapModalToken
                              key={key}
                              $selected={selected}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModalTokenClick(key, SWAP_MODAL_TOKEN1);
                              }}
                            >
                              <TokenImg symbol={symbol} />
                              <SwapText $isHeader={false}>{symbol}</SwapText>
                            </SwapModalToken>
                          )
                        )}
                      </SwapModalScroll>
                    </SwapSelectModalContainer>
                  </SwapSelectModal>
                </PositionContainer>
              ) : (
                <></>
              )
            }
          </>
        );
      case TABS_TOKENS_ID:
        /// Tokens
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (selectedTab.id) {
      case TABS_POOLS_ID:
        /* --- POOL --- */
        const localStoragePoolState = localStorage.getItem(
          LOCAL_STORAGE_POOL_STATE
        );

        if (localStoragePoolState) {
          setPoolState(JSON.parse(localStoragePoolState));
        }

        // get (updated) pool state
        const poolLimit = localStoragePoolState
          ? JSON.parse(localStoragePoolState).length
          : 20;

        if (!localStoragePoolState) {
          setLoading(true);
        }

        getPools(poolLimit)
          .then((res) => {
            const { data, error, success } = res;

            if (!success) {
              throw error;
            }

            setPoolState(data);
          })
          .catch((err) => console.log(err));

        break;
      case TABS_SWAPS_ID:
        /* --- SWAP --- */
        const localStorageSwapState = localStorage.getItem(
          LOCAL_STORAGE_SWAP_STATE
        );

        if (localStorageSwapState) {
          setSwapState(JSON.parse(localStorageSwapState));
        }

        // get (updated) swap state
        const swapLimit = localStorageSwapState
          ? JSON.parse(localStorageSwapState).length
          : 20;

        if (!localStorageSwapState) {
          setLoading(true);
        }

        getSwaps(swapLimit)
          .then((res) => {
            const { data, error, success } = res;

            console.log({ data, error, success });

            if (!success) throw error;

            setSwapState(data);
          })
          .catch((err) => console.log(err));

        // Swap Modal
        const localStorageSwapModalState = localStorage.getItem(
          LOCAL_STORAGE_SWAP_MODAL_STATE
        );

        if (localStorageSwapModalState) {
          setSwapModalTokenState(JSON.parse(localStorageSwapModalState));
        }
        break;
      default:
        break;
    }
  }, [tabState]);

  useEffect(() => {
    setLoading(false);

    if (poolState.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_POOL_STATE, JSON.stringify(poolState));
    }

    if (swapState.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_SWAP_STATE, JSON.stringify(swapState));
    }
  }, [poolState, swapState]);

  useEffect(() => {
    const swapModalTokenStateKeys =
      Object.getOwnPropertyNames(swapModalTokenState);

    if (swapModalTokenStateKeys.length > 0) {
      if (swapModalTokenState[SWAP_MODAL_TOKEN0].length > 0) {
        localStorage.setItem(
          LOCAL_STORAGE_SWAP_MODAL_STATE,
          JSON.stringify(swapModalTokenState)
        );
      } else {
        getLimitedTokensData()
          .then((res) => {
            const { data, error, success } = res;

            if (!success) throw error;

            setSwapModalTokenState({
              [SWAP_MODAL_TOKEN0]: data.map((token, index) => ({
                ...token,
                selected: false,
              })),
              [SWAP_MODAL_TOKEN1]: data.map((token, index) => ({
                ...token,
                selected: false,
              })),
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }, [swapModalTokenState]);

  useEffect(() => {
    if (!showSwapModal) {
      const selectedToken0 = swapModalTokenState[SWAP_MODAL_TOKEN0].find(
        (token) => token.selected
      );
      const selectedToken1 = swapModalTokenState[SWAP_MODAL_TOKEN1].find(
        (token) => token.selected
      );

      if (!selectedToken0 || !selectedToken1) return;

      const token0_ = {
        symbol: selectedToken0.symbol,
      };

      const token1_ = {
        symbol: selectedToken1.symbol,
      };

      setLoading(true);
      getSwaps(40, 0, token0_, token1_)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          setSwapState(data);
        })
        .catch((err) => console.log(err));
    }
  }, [showSwapModal]);

  return (
    <FlexContainer $miscellaneous="margin-top: 60px;">
      <FlexContainer $flexDirection="row" $alignItems="center">
        {tabState.map(({ id, selected, title }) => (
          <Tab key={id} $selected={selected} onClick={() => handleTabClick(id)}>
            {title}
          </Tab>
        ))}
      </FlexContainer>
      {renderTab()}
    </FlexContainer>
  );
};

export default ScreenTwo;
