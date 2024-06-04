"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
// components
import Navbar from "../components/Navbar";
// styles
import { MainApp } from "@/app/styles/App.styles";
import { PositionContainer } from "@/app/styles/shared/Container.styles";
import { Loader } from "@/app/styles/Loader.styles";
// utils
import { screens } from "@/utils/data";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    default: {},
  } = screens;
  return (
    <MainApp>
      <Navbar />
      {children}
    </MainApp>
  );
}
