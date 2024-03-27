import { NextUIProvider } from "@nextui-org/react";

const NextUiProviders = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
export default NextUiProviders