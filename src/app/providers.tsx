"use client"; 

import { Provider } from "react-redux";
import  store  from "@/store/index";
import { UserProvider } from "./UserContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}><UserProvider>{children}</UserProvider></Provider>;
}
