import React from "react";
import HeaderAppBar from "./HeaderAppBar";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: `calc(100dvh - ${theme.custom.headerHeight})`,
  overflow: "auto",
  alignItems: "center",
  justifyContent: "center",
}));

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeaderAppBar />
      <MainContent component="main">{children}</MainContent>
    </>
  );
}
