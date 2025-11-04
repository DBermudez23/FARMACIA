import { View, Text, Image } from "react-native";
import FormLogin from "@/features/auth/components/formLogin";
import { styles } from "@/assets/styles/AuthStyles";

const SignIn = () => {
  return (
    <View style={styles.screen}>
      {/* Imagen superior */}
      <Image
        source={require("@/assets/images/LoginPharmacy.png")}
        style={styles.heroImage}
      />

      {/* Formulario */}
      <FormLogin />

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require("@/assets/images/logoPharmacy.png")} 
          style={styles.footerLogo}
        />
        <Text style={styles.footerText}>ADMIN</Text>
      </View>
    </View>
  );
};

export default SignIn;
