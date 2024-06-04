import styled from "styled-components";

interface ITab {
  $selected: boolean;
}

interface IPoolText {
  $isHeader?: boolean;
}

interface ISwapModalToken {
  $selected: boolean;
}

interface ISwapModalTokenImg {
  $bgImg?: string;
}

export const Tab = styled.button<ITab>`
  border: none;
  outline: none;
  font-size: 1.3rem;
  border-radius: 8px;
  margin-left: calc(var(--ten-px));
  padding: calc(var(--ten-px) * 1.4);
  scale: ${({ $selected }) => ($selected ? 1 : 0.9)};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.7)};
  color: ${({ $selected, theme: { gold, textColor } }) =>
    $selected ? gold : textColor};
  background-color: ${({ $selected, theme: { gold } }) =>
    $selected ? `${gold}2d` : "transparent"};

  &:nth-of-type(1) {
    margin-left: 0px;
  }

  &:active {
    scale: ${({ $selected }) => ($selected ? 1 : 0.85)};
  }

  &:hover {
    opacity: ${({ $selected }) => !$selected && "0.7"};
    color: ${({ $selected, theme: { gold } }) => !$selected && gold};
    background-color: ${({ $selected, theme: { textColor } }) =>
      !$selected && `${textColor}14`};
  }
`;

export const PoolTable = styled.main`
  width: 100%;
  min-width: 800px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 7px;
  margin-top: calc(var(--ten-px) * 3.5);
  background-color: ${({ theme: { textColor } }) => `${textColor}24`};
  box-shadow: 0px 0px 5px ${({ theme: { textColor } }) => `${textColor}34`};
`;

export const Pool = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  row-gap: 0px;
  column-gap: 10px;
  place-content: center;
  grid-template-columns: 400px repeat(3, 1fr);
  grid-template-rows: 100%;
  margin-bottom: 1px;
  padding-left: var(--ten-px);
  background-color: ${({ theme: { bgColor } }) => `${bgColor}`};
`;

export const PoolItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const PoolText = styled.h3<IPoolText>`
  width: 100%;
  font-family: "Nunito Sans";
  ${({ $isHeader }) =>
    $isHeader
      ? `
  font-size: 1.1rem;
  font-weight: bolder;
  opacity: 0.5;
  `
      : `
  font-size: 1.23rem;
  font-weight: normal;
  opacity: 0.8;
  `}
`;

export const SwapTable = styled.main`
  width: 100%;
  min-width: 800px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 7px;
  margin-top: calc(var(--ten-px) * 0.5);
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(
    to right,
    ${({ theme: { textColor } }) => `${textColor}3A, ${textColor}13`}
  );
  box-shadow: 0px 0px 5px ${({ theme: { textColor } }) => `${textColor}34`};
`;

export const Swap = styled.main`
  width: 100%;
  height: 70px;
  display: grid;
  column-gap: 10px;
  place-content: center;
  grid-template-columns: 0.5fr 1.5fr repeat(2, 1fr);
  grid-template-rows: 100%;
  margin-top: 1px;
  padding-left: var(--ten-px);
  background-color: ${({ theme: { bgColor } }) => `${bgColor}`};

  &:nth-of-type(1) {
    margin-top: 0;
  }
`;

export const SwapItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const SwapExchangeItem = styled(SwapItem)`
  justify-content: center;
`;

export const SwapText = styled.h3<IPoolText>`
  width: fit-content;
  font-family: "Nunito Sans";
  ${({ $isHeader }) =>
    $isHeader
      ? `
  font-size: 1.1rem;
  font-weight: bolder;
  opacity: 0.5;
  `
      : `
  font-size: 1.23rem;
  font-weight: normal;
  opacity: 0.8;
  `}
`;

export const SwapImage = styled.img`
  --size: 16px;
  height: var(--size);
  width: var(--size);
  margin: 0px calc(var(--three-px) * 1.5);
`;

export const SwapSelect = styled.button`
  font-size: 1.3rem;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  scale: 0.95;
  background: transparent;
  box-shadow: 0px 0px 8px ${({ theme: { textColor } }) => `${textColor}3A`}
      inset,
    0px 0px 20px ${({ theme: { textColor } }) => `${textColor}0A`} inset;
  color: ${({ theme: { textColor } }) => `${textColor}AE`};
  border: 2px solid ${({ theme: { blue02 } }) => blue02};
  background: ${({ theme: { blue02 } }) => blue02};
  padding: calc(var(--ten-px) * 1.5) calc(var(--ten-px) * 2)
    calc(var(--ten-px) * 1.5) calc(var(--ten-px) * 1.5);

  &:hover {
    scale: 1;
    box-shadow: 0px 0px 8px ${({ theme: { textColor } }) => `${textColor}3A`};
  }

  &:active {
    scale: 0.95;
  }
`;

export const SwapSelectModal = styled.div`
  --spacing: calc(var(--ten-px) * 1.5);
  width: 400px;
  height: 500px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme: { bgColor } }) => bgColor};
  box-shadow: 0px 0px 5px ${({ theme: { textColor } }) => `${textColor}43`};
  padding: var(--spacing);
  overflow: hidden;
`;

export const SwapSelectModalContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-column-gap: var(--spacing);
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;
  background-color: ${({ theme: { textColor } }) => `${textColor}04`};
`;

export const SwapSelectModalTitle = styled.h3`
  font-size: 1.3rem;
  opacity: 0.9;
  padding: calc(var(--ten-px) * 2) 0px;
`;

export const SwapModalScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const SwapModalToken = styled.div<ISwapModalToken>`
  --bgColor: ${({ theme: { blue02 } }) => `${blue02}2E`};
  font-size: 1.3rem;
  outline: none;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${({ theme: { textColor } }) => `${textColor}0A`};
  color: ${({ theme: { textColor } }) => `${textColor}AE`};
  border: 2px solid
    ${({ $selected, theme: { blue02 } }) =>
      $selected ? blue02 : "var(--bgColor)"};
  background: var(--bgColor);
  margin-bottom: calc(var(--spacing) * 0.5);
  padding: calc(var(--ten-px) * 1.5);

  &:hover {
    background: ${({ $selected, theme: { blue02 } }) =>
      !$selected && `${blue02}9A`};
    box-shadow: ${({ $selected, theme: { textColor } }) =>
      !$selected && `0px 0px 8px ${textColor}1A`};
  }

  &:active {
    scale: 0.95;
  }

  &::before {
    --size: 15px;
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    height: var(--size);
    width: var(--size);
    transform: translate(0px, -50%);
    border-radius: 30px;
    border: 2px solid ${({ theme: { blue02 } }) => blue02};
    background-color: ${({ $selected, theme: { blue02 } }) =>
      $selected ? blue02 : "transparent"};
  }
`;

export const SwapModalTokenImg = styled.div<ISwapModalTokenImg>`
  --size: 24px;
  width: var(--size);
  height: var(--size);
  margin-right: var(--seven-px);
  color: ${({ $bgImg, theme: { textColor } }) =>
    $bgImg ? `url(${$bgImg})` : `${textColor}`};
  background: ${({ $bgImg, theme: { gold } }) =>
    $bgImg ? `url(${$bgImg})` : `${gold}`};
  background-position: center;
  background-size: contain;
`;
