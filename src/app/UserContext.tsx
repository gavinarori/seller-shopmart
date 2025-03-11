"use client";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "@/store/Reducers/authReducer";
import { RootState } from "../store";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { token, userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !userInfo) {
      dispatch(get_user_info() as any);
    }
  }, [token, dispatch, userInfo]);

  return <UserContext.Provider value={{ user: userInfo }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
