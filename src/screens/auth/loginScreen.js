import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Auth from "@react-native-firebase/auth";
import { TextInput } from "react-native-paper";
import { navigate } from "../../navigation/rootNavigation";
import { routes } from "../../constants/routes";

import { styled } from "nativewind";

const StyledText = styled(Text);
const StyledView = styled(View);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await Auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigate(routes.app);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleHandler = async () => {
    // provider.setCustomParameters({ prompt: "select_account" });
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // redux action? --> dispatch({ type: SET_USER, user });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  return (
    <StyledView className="flex-1 bg-gray-900">
      <StyledView className="flex">
        <StyledView className="flex justify-center pb-12">
          <StyledText className="text-4xl flex-2 text-center font-ibmRegular text-white pb-5 pt-8">
            F I T G R E S S
          </StyledText>
          <Image
            source={require("../../constants/icons/exp-white.png")}
            style={styles.logoimg}
          />
        </StyledView>
      </StyledView>

      <View style={styles.txtinpmain}>
        <View className="form space-y-2">
          <View style={styles.txtinpcon}>
            <TextInput
              mode="flat"
              label="Email"
              style={styles.txtinp}
              activeUnderlineColor={"#07B6D5"}
              textColor={"white"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.txtinpcon}>
            <TextInput
              mode="flat"
              label="Password"
              style={styles.txtinp}
              activeUnderlineColor={"#07B6D5"}
              textColor={"white"}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity className="flex items-end mb-5">
            <Text
              className="text-white font-ibmRegular"
              style={{ textDecorationLine: "underline", color: "#07B6D5" }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View className="items-center">
            <TouchableOpacity
              style={styles.loginback}
              onPress={() => handleSignIn()}
            >
              <Text
                className="text-center text-gray-700 font-ibmBold text-xl"
                style={styles.logintxt}
              >
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lineimgmain}>
          <Image
            source={require("../../constants/icons/Line.png")}
            style={styles.lineimg}
          />
          <Text
            className="text-xl text-gray-700 font-bold text-center py-5 font-ibmMedium"
            style={styles.logintxt}
          >
            {" "}
            OR
          </Text>
          <Image
            source={require("../../constants/icons/Line.png")}
            style={styles.lineimg}
          />
        </View>
        <View style={styles.iconsmain}>
          <TouchableOpacity
            style={styles.btnback}
            onPress={() => googleHandler()}
          >
            <Image
              source={require("../../constants/icons/google.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnback}>
            <Image
              source={require("../../constants/icons/apple-white.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnback}>
            <Image
              source={require("../../constants/icons/facebook.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-white font-ibmMedium">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigate(routes.signUp)}>
            <Text
              className="font-ibmBold "
              style={{
                textDecorationLine: "underline",
                marginLeft: 4,
                color: "#07B6D5",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </StyledView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logoimg: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  txtinpmain: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    paddingHorizontal: 20,
  },
  txtinpcon: {
    borderRadius: 4,
    height: 55,
    overflow: "hidden",
    marginBottom: 15,
  },
  txtinp: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 57,
    overflow: "hidden",
    backgroundColor: "#182130",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loginback: {
    alignSelf: "center",
    backgroundColor: "#07B6D5",
    height: 56,
    width: 240,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logintxt: {
    color: "white",
  },
  lineimgmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lineimg: {
    width: 120,
  },
  iconsmain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnback: {
    backgroundColor: "#232E41",
    height: 55,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  img: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
