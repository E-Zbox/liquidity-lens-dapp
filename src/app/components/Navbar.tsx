"use client";
// store
import { useThemeStore } from "@/store/theme";
// styles
import {
  AboutLogo,
  LogoText,
  MainNav,
  ToggleTheme,
} from "../styles/Navbar.styles";
import { FlexContainer } from "../styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Navbar = () => {
  const {
    navbar: {
      images: { moonImg, programmerImg, sunImg },
    },
  } = screens;

  const [isDark, toggleIsDark] = useThemeStore(({ isDark, toggleIsDark }) => [
    isDark,
    toggleIsDark,
  ]);

  return (
    <MainNav>
      <LogoText>L2</LogoText>
      <FlexContainer
        $alignItems="center"
        $flexDirection="row"
        $width="fit-content"
      >
        <ToggleTheme
          $bgImg={isDark ? sunImg.src : moonImg.src}
          onClick={() => toggleIsDark()}
        ></ToggleTheme>
        <AboutLogo $bgImg={programmerImg.src}></AboutLogo>
      </FlexContainer>
    </MainNav>
  );
};

export default Navbar;
