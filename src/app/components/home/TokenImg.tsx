"use client";
import { useEffect, useState } from "react";
// styles
import { SwapModalTokenImg } from "@/app/styles/home/ScreenTwo.styles";

interface ITokenImgProps {
  symbol: string;
}

const TokenImg = ({ symbol }: ITokenImgProps) => {
  const [bgImgState, setBgImgState] = useState<undefined | string>(
    `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
  );

  useEffect(() => {
    // setBgImgState()
  }, []);
  return <SwapModalTokenImg $bgImg={bgImgState}></SwapModalTokenImg>;
};

export default TokenImg;
