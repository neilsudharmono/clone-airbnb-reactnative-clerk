import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Login = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const { startSSOFlow } = useSSO();

  const onSelectAuth = async (strategy: Strategy) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      console.log(createdSessionId);
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("SSO Auth Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="grey"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 15 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="call-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separator: {
    fontFamily: "monsb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 15,
    fontFamily: "monsb",
  },
});
export default Login;
