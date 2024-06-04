import styled from "styled-components";

interface ICardButton {
  $selected: boolean;
}

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 250px;
  width: 350px;
  border-radius: 10px;
  margin-left: calc(var(--ten-px) * 4.5);
  background-color: ${({ theme: { textColor } }) => `${textColor}22`};
  padding: calc(var(--ten-px) * 2.5) 0px calc(var(--ten-px) * 4)
    calc(var(--ten-px) * 1.5);

  &:nth-of-type(1) {
    margin-left: var(--ten-px);
  }
`;

export const MainTitle = styled.h3`
  font-family: "Nunito Sans";
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: calc(var(--ten-px) * 3);
`;

export const CardTitle = styled.h3`
  font-family: "Source Sans Pro";
  font-family: "Nunito Sans";
  font-size: 1.25rem;
  font-weight: normal;
  opacity: 0.45;
`;

export const CardButton = styled.button<ICardButton>`
  border: none;
  outline: none;
  font-size: 0.85rem;
  border-radius: 30px;
  transition: 300ms linear;
  box-shadow: 0px 0px 5px
    ${({ $selected, theme: { blue02, textColor } }) =>
      $selected ? `${blue02}22` : "transparent"};
  border-top: ${({ $selected, theme: { blue02 } }) =>
    !$selected ? `1px solid ${blue02}82` : "none"};
  border-left: ${({ $selected, theme: { blue02 } }) =>
    !$selected ? `1px solid ${blue02}82` : "none"};
  border-bottom: ${({ $selected, theme: { blue02 } }) =>
    !$selected ? `1px solid ${blue02}82` : "none"};
  border-right: ${({ $selected, theme: { blue02 } }) =>
    !$selected ? `1px solid ${blue02}82` : "none"};
  padding: calc(var(--three-px) * 2.5) calc(var(--three-px) * 3.5);
  background: ${({ $selected, theme: { blue02, textColor } }) =>
    $selected
      ? `linear-gradient(to bottom right, ${blue02}, ${textColor}02)`
      : "transparent"};
  margin-left: var(--ten-px);

  &:nth-of-type(1) {
    margin-left: 0px;
  }

  &:hover {
    border-color: transparent;
    background: ${({ $selected, theme: { blue02, textColor } }) =>
      !$selected &&
      `linear-gradient(to bottom right, ${textColor}02, ${blue02}32)`};
  }
`;

export const CardBody = styled.h3`
  font-family: "Nunito Sans";
  font-size: 3rem;
  font-style: Italic;
  font-weight: bolder;
`;

export const CardImage = styled.img`
  width: 40px;
  height: auto;
  margin-right: var(--three-px);
`;
