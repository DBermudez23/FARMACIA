import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter, Redirect } from "expo-router";
import { useEffect } from "react";
import SafeScreen from "@/components/SafeScreen";

export default function AuthLayout() {
  const { aToken, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && aToken) {
      router.replace("/home");
    }
  }, [isAuthenticated, aToken]);

  return (
    <SafeScreen>
      <Stack
        screenOptions={{
          headerShown: false,
             animation: "fade",
         }}
      >
        {/* Las rutas de autenticación se mostrarán aquí */}
      </Stack>
    </SafeScreen>
  );
}