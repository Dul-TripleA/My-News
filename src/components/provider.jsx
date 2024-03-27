"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
// import NextUiProviders from "./nextUiProviders";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default SessionWrapper;
