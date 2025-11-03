import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  token: string | null;
  setToken: (value: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = async (value: string | null) => {
    setTokenState(value);
    if (value) await AsyncStorage.setItem("authToken", value);
    else await AsyncStorage.removeItem("authToken");
  };

  useEffect(() => {
    AsyncStorage.getItem("authToken").then((stored) => {
      if (stored) setTokenState(stored);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
