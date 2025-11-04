import { StyleSheet } from "react-native";
import { MainTheme } from "@/themes/MainTheme";

export const styles = StyleSheet.create({
  // --- Pantalla general ---
  screen: {
    flex: 1,
    backgroundColor: MainTheme.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  // --- Imagen superior ---
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },

  // --- Contenedor del formulario ---
  container: {
    width: "100%",
    backgroundColor: MainTheme.white || "#fff",
    borderRadius: 15,
    padding: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: MainTheme.textTitle,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: MainTheme.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: MainTheme.white || "#f9f9f9",
  },

  button: {
    backgroundColor: MainTheme.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: MainTheme.white,
    fontWeight: "700",
    fontSize: 15,
  },

  // --- Sección inferior con logo y texto ADMIN ---
  footer: {
    marginTop: 40,
    alignItems: "center",
  },

  footerLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },

  footerText: {
    fontSize: 14,
    color: MainTheme.textSoft,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
