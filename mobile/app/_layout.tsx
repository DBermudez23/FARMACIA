import { Stack } from "expo-router";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/providers/AuthContext";


export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}/>
      </AuthProvider>
    </Provider>
  );
}
