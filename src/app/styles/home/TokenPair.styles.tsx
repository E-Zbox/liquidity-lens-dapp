import styled from "styled-components";

export const NORMAL_TEXT = "normal";
export const GOLD_TEXT = "gold";
export const BROWN_TEXT = "brown";

interface ITokenPairText {
  $color: typeof NORMAL_TEXT | typeof GOLD_TEXT | typeof BROWN_TEXT;
}

interface IToolTipText {
  $isTitle: boolean;
}

interface IMainToolTip {
  $left: string;
  $top: string;
  $show: boolean;
}

export const MainTokenPair = styled.main`
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: var(--seven-px) calc(var(--ten-px) * 1.5);
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme: { textColor } }) => `${textColor}14`};
  }
`;

export const TokenPairText = styled.h3<ITokenPairText>`
  margin-left: var(--three-px);
  font-family: "Nunito Sans";
  font-size: 1rem;
  font-weight: bolder;
  color: ${({ $color, theme: { brown, gold, textColor } }) => {
    switch ($color) {
      case BROWN_TEXT:
        return `${brown}`;
      case GOLD_TEXT:
        return `${gold}9a`;
      case NORMAL_TEXT:
        return `${textColor}9a`;
    }
  }};

  &:nth-of-type(1) {
    margin-left: 0px;
  }
`;

export const MainToolTip = styled.main<IMainToolTip>`
  position: absolute;
  left: ${({ $left }) => "10%"};
  top: ${({ $top }) => $top};
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  z-index: 1;
  overflow: hidden;
  border-radius: 5px;
  padding: 0px calc(var(--ten-px) * 1.5);
  background-color: ${({ theme: { bgColor } }) => bgColor};

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color: ${({ theme: { textColor } }) => `${textColor}3a`};
  }
`;

export const ToolTipText = styled.h3<IToolTipText>`
  color: ${({ $isTitle, theme: { bgColor, textColor } }) =>
    $isTitle ? bgColor : `${textColor}64`};
  opacity: ${({ $isTitle }) => ($isTitle ? "0.25" : "1")};
  margin-left: ${({ $isTitle }) => (!$isTitle ? "var(--three-px)" : "0px")};
  font-family: ${({ $isTitle }) => ($isTitle ? "Roboto" : "Source Sans Pro")};
  font-size: 1rem;
  width: fit-content;
  flex-wrap: nowrap;
`;
