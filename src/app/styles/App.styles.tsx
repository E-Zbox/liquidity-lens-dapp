import styled from "styled-components";

export const MainApp = styled.main`
  min-height: 100vh;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme: { textColor } }) => `${textColor}0c`};
  z-index: 0;

  &::after {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(
      circle at top,
      ${({ theme: { bgColor, textColor } }) =>
        `${textColor}40, ${bgColor}a0, ${textColor}40`}
    );
  }
`;
