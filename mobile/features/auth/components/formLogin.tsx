import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/AuthStyles";
import { useDispatch } from "react-redux";
import { useLoginAdminMutation } from "../api/authApi";
import { useToast } from "react-native-toast-notifications";
import { setToken } from "../authSlice";

const FormLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.show("Por favor completa todos los campos.", { type: "warning" });
      return;
    }

    try {
      // Llamada al endpoint de login
      const result = await loginAdmin({
        mail: email,
        contrasena: password,
      }).unwrap();

      if (result?.success && result?.token) {
        dispatch(setToken(result.token));
        toast.show("Inicio de sesión exitoso", { type: "success" });
      } else {
        toast.show(result?.message || "Credenciales inválidas", { type: "danger" });
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      toast.show("Error al conectar con el servidor", { type: "danger" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>MAIL</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Ingresa tu correo"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>CONTRASEÑA</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholder="********"
        placeholderTextColor="#aaa"
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "CARGANDO..." : "INGRESAR"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormLogin;
