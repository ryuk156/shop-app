import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/actions/authAction";

const AuthScreen = (props) => {
  const [isLoader,setIsLoader] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const authhandler =async () => {
     
    if (isSignUp) {
        setIsLoader(true)
     await dispatch(signup(email, password));
     setIsLoader(false)
    } else {
        setIsLoader(true)
    await dispatch(login(email, password));
     setIsLoader(false)
    }
     
    
    
  };
  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assets/login_back.jpg")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <BlurView style={styles.AuthContainer} intensity={150}>
          <KeyboardAvoidingView behavior="margin" keyboardVerticalOffset={2}>
            <ScrollView>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  minLength={5}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize="none"
                  keyboardType="default"
                />
              </View>
              <View style={styles.buttonView}>
                <View style={styles.button}>
                    {isLoader?<ActivityIndicator size="large" color={Colors.white} />:
                    <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    color="#2666CF"
                    onPress={() => {
                      authhandler();
                    }}
                  />}
                  
                </View>
              </View>
              <View style={styles.registerLink}>
                <Text style={{ color: "black" }}>Already have account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsSignUp(!isSignUp);
                  }}
                >
                  <Text style={styles.registerText}>
                    {isSignUp ? "Login" : "Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </BlurView>
      </ImageBackground>
    </View>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Authentication",
    headerStyle: {
      backgroundColor: "transparent",
    },
    headerTransparent: true,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  AuthContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    margin: 12,
    padding: 25,
    maxHeight: 400,
    maxWidth: 400,
    width: "80%",
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 8,
    color: "black",
  },
  input: {
    paddingHorizontal: 2,
    marginVertical: 8,
    borderBottomWidth: 2,
    color: "black",
    borderBottomColor: "#2666CF",
  },
  button: {
    width: "50%",
  },
  buttonView: {
    marginVertical: 10,
    alignItems: "center",
  },
  registerLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 2,
  },
  registerText: {
    color: "#2666CF",
    paddingLeft: 2,
    fontWeight: "bold",
  },
});

export default AuthScreen;
