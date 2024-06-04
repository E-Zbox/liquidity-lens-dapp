"use client";
import { useState } from "react";
// api
import { IToken } from "@/api/interface";
// styles
import {
  BROWN_TEXT,
  GOLD_TEXT,
  MainTokenPair,
  MainToolTip,
  NORMAL_TEXT,
  TokenPairText,
  ToolTipText,
} from "@/app/styles/home/TokenPair.styles";
import { MouseEventHandler } from "react";
import { FlexContainer } from "@/app/styles/shared/Container.styles";

interface ITokenPairProps {
  tokens: [IToken, IToken];
}

const LOCAL_STORAGE_TOKEN_PAIR_STATE = "tokenPairState";

const TokenPair = ({ tokens }: ITokenPairProps) => {
  const [token0, token1] = tokens;

  const [mouseOverToken0, setMouseOverToken0] = useState(false);
  const [mouseOverToken1, setMouseOverToken1] = useState(false);
  const [mousePosition0, setMousePosition0] = useState({ x: "0", y: "0" });
  const [mousePosition1, setMousePosition1] = useState({ x: "0", y: "0" });

  const handleToken0MouseEvent: MouseEventHandler = (e) => {
    const { type, clientX, clientY, target, currentTarget } = e;

    const { clientWidth: parentWidth, clientHeight: parentHeight } =
      currentTarget;
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

    if (type === "mouseover" && !mouseOverToken0) {
      setMouseOverToken0(true);
      let y;

      if (clientY <= windowHeight / 2) {
        // position Tooltip to be below parent
        y = "120%";
      } else {
        // position Tooltip to be above parent
        y = `-300%`;
      }

      setMousePosition0({ x: "0", y });
    } else if (type == "mouseleave") {
      setMouseOverToken0(false);
    }
  };

  const handleToken1MouseEvent: MouseEventHandler = (e) => {
    const { type, clientX, clientY, target, currentTarget } = e;

    const { clientWidth: parentWidth, clientHeight: parentHeight } =
      currentTarget;
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

    if (type === "mouseover" && !mouseOverToken1) {
      setMouseOverToken1(true);
      let y;

      if (clientY <= windowHeight / 2) {
        // position Tooltip to be below parent
        y = "120%";
      } else {
        // position Tooltip to be above parent
        y = `-300%`;
      }

      setMousePosition1({ x: "0", y });
    } else if (type == "mouseleave") {
      setMouseOverToken1(false);
    }
  };

  return (
    <MainTokenPair>
      <TokenPairText
        $color={token1.symbol < token0.symbol ? GOLD_TEXT : BROWN_TEXT}
        onMouseOver={handleToken0MouseEvent}
        onMouseLeave={handleToken0MouseEvent}
        onMouseOut={handleToken0MouseEvent}
      >
        {token0.symbol}
      </TokenPairText>
      <TokenPairText $color={NORMAL_TEXT}>/</TokenPairText>
      <TokenPairText
        $color={token1.symbol > token0.symbol ? GOLD_TEXT : BROWN_TEXT}
        onMouseOver={handleToken1MouseEvent}
        onMouseLeave={handleToken1MouseEvent}
        onMouseOut={handleToken1MouseEvent}
      >
        {token1.symbol}
      </TokenPairText>
      {mouseOverToken0 ? (
        <MainToolTip
          $left={""}
          $top={`${mousePosition0.y}`}
          $show={mouseOverToken0}
        >
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="fit-content"
          >
            <ToolTipText $isTitle={true}>DEC:</ToolTipText>
            <ToolTipText $isTitle={false}>{token0.decimals}</ToolTipText>
          </FlexContainer>
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="fit-content"
          >
            <ToolTipText $isTitle={true}>NAME:</ToolTipText>
            <ToolTipText $isTitle={false}>{token0.name}</ToolTipText>
          </FlexContainer>
        </MainToolTip>
      ) : (
        <></>
      )}
      {mouseOverToken1 ? (
        <MainToolTip
          $left={""}
          $top={`${mousePosition1.y}`}
          $show={mouseOverToken1}
        >
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="fit-content"
          >
            <ToolTipText $isTitle={true}>DEC:</ToolTipText>
            <ToolTipText $isTitle={false}>{token1.decimals}</ToolTipText>
          </FlexContainer>
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="fit-content"
          >
            <ToolTipText $isTitle={true}>NAME:</ToolTipText>
            <ToolTipText $isTitle={false}>{token1.name}</ToolTipText>
          </FlexContainer>
        </MainToolTip>
      ) : (
        <></>
      )}
    </MainTokenPair>
  );
};

export default TokenPair;
