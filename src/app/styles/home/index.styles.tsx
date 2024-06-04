import styled from "styled-components";

export const MainHome = styled.main`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 25px 25px 0px 0px;
  margin-top: calc(var(--ten-px) * 20);
  padding: calc(var(--ten-px) * 3);
  background-color: ${({ theme: { bgColor } }) => bgColor};
  box-shadow: 0px -2px 5px ${({ theme: { textColor } }) => `${textColor}09`};
`;
