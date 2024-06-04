// .
import home from "./home";
import navbar from "./navbar";
// assets
import loaderImgBlack from "../../public/loader-black.gif";
import loaderImgWhite from "../../public/loader-white.gif";

export const devices = {};

export const screens = {
  default: {
    images: {
      loaderImgBlack,
      loaderImgWhite,
    },
  },
  home,
  navbar,
};

export const theme = {
  dark: {
    navBg: "#5c5c5c",
    bgColor: "#000000",
    textColor: "#ffffff",
    brown: "#6a421b",
    gold: "#d7a829",
    blue01: "#222f40",
    blue02: "#3e74b4",
  },
  light: {
    navBg: "#bcbcbc",
    bgColor: "#ffffff",
    textColor: "#000000",
    brown: "#6a421b",
    gold: "#d7a829",
    blue01: "#222f40",
    blue02: "#3e74b4",
  },
};
