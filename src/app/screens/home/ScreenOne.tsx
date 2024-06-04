"use client";
import { useEffect, useState } from "react";
// api
import { getCurrentFactory } from "@/api";
import { IFactory } from "@/api/interface";
// components
import Card from "@/app/components/home/Card";
// styles
import { MainTitle } from "@/app/styles/home/ScreenOne.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import {
  expressInThousands,
  expressThousandsInZeroGroup,
} from "@/utils/transformer";

const ScreenOne = () => {
  const [factoryState, setFactoryState] = useState<IFactory>();

  const renderCards = () => {
    const factoryStateKeys = Object.getOwnPropertyNames(factoryState);
    if (factoryStateKeys.length > 0 && factoryState) {
      const {
        totalFeesETH,
        totalFeesUSD,
        totalValueLockedETH,
        totalValueLockedUSD,
        totalVolumeETH,
        totalVolumeUSD,
      } = factoryState;
      return (
        <>
          <Card
            key={Math.floor(Math.random() * 100 * Date.now())}
            title={[
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalVolumeUSD))
                ),
                selected: true,
                text: "Total Volume",
                slug: "USD",
              },
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalVolumeETH))
                ),
                selected: false,
                text: "Total Volume",
                slug: "ETH",
              },
            ]}
          />
          <Card
            key={Math.floor(Math.random() * 40 * Date.now())}
            title={[
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalValueLockedUSD))
                ),
                selected: true,
                text: "TVL",
                slug: "USD",
              },
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalValueLockedETH))
                ),
                selected: false,
                text: "TVL",
                slug: "ETH",
              },
            ]}
          />
          <Card
            key={Math.floor(Math.random() * 1000 * Date.now())}
            title={[
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalFeesUSD))
                ),
                selected: true,
                text: "Accumulated Fees",
                slug: "USD",
              },
              {
                body: expressThousandsInZeroGroup(
                  expressInThousands(Number(totalFeesETH))
                ),
                selected: false,
                text: "Accumulated Fees",
                slug: "ETH",
              },
            ]}
          />
        </>
      );
    }
  };

  useEffect(() => {
    getCurrentFactory()
      .then((res) => {
        const { data, error, success } = res;

        if (success) {
          setFactoryState(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, []);

  return (
    <FlexContainer $height={factoryState ? "fit-content" : "0px"}>
      {factoryState !== undefined ? (
        <>
          <MainTitle>Overview</MainTitle>
          <FlexContainer
            $flexDirection="row"
            $justifyContent="flex-start"
            $alignItems="center"
          >
            {renderCards()}
          </FlexContainer>
        </>
      ) : (
        <></>
      )}
    </FlexContainer>
  );
};

export default ScreenOne;
