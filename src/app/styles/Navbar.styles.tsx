import styled from "styled-components";

interface IBgImg {
  $bgImg: string;
}

export const MainNav = styled.nav`
  position: absolute;
  top: 15px;
  left: 50%;
  width: 98%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  transform: translateX(-50%);
  padding: 0px calc(var(--ten-px) * 8) 0px calc(var(--ten-px) * 3);
  background: ${({ theme: { textColor } }) => `${textColor}22`};
  z-index: 1;
`;

export const LogoText = styled.h3`
  //font-family: "Josefin Sans", sans-serif;
  font-family: "Jacquard 12", system-ui;
  font-weight: 400;
  font-size: 2.5rem;
  font-style: normal;
  width: fit-content;
  padding: calc(var(--seven-px) * 1.2);
  border-radius: 5px;
  background-color: ${({ theme: { gold } }) => gold};
  border: 1px solid ${({ theme: { textColor } }) => `${textColor}22`};
`;

export const AboutLogo = styled.div<IBgImg>`
  --size: 60px;
  width: var(--size);
  height: var(--size);
  scale: 0.85;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 30px;

  &:hover {
    scale: 1;
  }

  &:active {
    scale: 0.9;
  }
`;

export const ToggleTheme = styled.button<IBgImg>`
  --size: 40px;
  width: var(--size);
  height: var(--size);
  outline: none;
  background-none;
  border: none;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
