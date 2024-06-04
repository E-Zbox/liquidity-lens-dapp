"use client";
// screens
import ScreenOne from "../screens/home/ScreenOne";
import ScreenTwo from "../screens/home/ScreenTwo";
// styles
import { MainHome } from "../styles/home/index.styles";

export default function Home() {
  return (
    <MainHome>
      <ScreenOne />
      <ScreenTwo />
    </MainHome>
  );
}
