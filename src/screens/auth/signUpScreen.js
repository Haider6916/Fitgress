import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import Auth from "@react-native-firebase/auth";
import { createDocument } from "../../api/firebase/db";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import { auth, db } from "../../../firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
import { KeyboardAvoidingView } from "react-native";
import { navigate } from "../../navigation/rootNavigation";
import { routes } from "../../constants/routes";

const SignUpScreen = () => {
  const [fName, setFName] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userInfo,setUserInfo] = useState(null)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        null,
    });
  }, []);

  // Somewhere in your code
const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const usrInfo = await GoogleSignin.signIn();
   setUserInfo(usrInfo);
   console.log('its working');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

  const handleSignIn = async () => {
    await Auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential;
        let data = {
          email: email,
          name: uName,
          fullName: fName,
          uid: user.user.uid,
          followers: [],
          followings: [],
          profilePic: "",
        };
        console.log("Created User Data>>", data);
        createDocument("users", data)
          .then(() => {
            navigate(routes.app);
          })
          .catch((err) => alert(err));
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const createAccount = async () => {
    setLoading(true);
    await Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        handleSignIn();
        console.log("User signed in!");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
      });
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.logotxt}>
          <Text className="text-4xl flex-2 text-center font-ibmRegular text-white pb-5 pt-8">
            F I T G R E S S
          </Text>
          <Image
            source={require("../../constants/icons/exp-white.png")}
            style={styles.logoimg}
          />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView>
        <View style={styles.txtinpmain}>
          <View style={styles.txtinpcon}>
            <TextInput
              mode="flat"
              label="Full Name"
              style={styles.txtinp}
              activeUnderlineColor={"#07B6D5"}
              textColor={"white"}
              value={fName}
              onChangeText={(text) => setFName(text)}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.txtinpcon}>
            <TextInput
              mode="flat"
              label="Username"
              style={styles.txtinp}
              textColor={"white"}
              value={uName}
              onChangeText={(text) => setUName(text)}
              activeUnderlineColor={"#07B6D5"}
            />
          </View>
          <View style={styles.txtinpcon}>
            <TextInput
              mode="flat"
              label="Email"
              style={styles.txtinp}
              textColor={"white"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              activeUnderlineColor={"#07B6D5"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={[styles.txtinpcon, { marginBottom: 40 }]}>
            <TextInput
              mode="flat"
              label="Password"
              style={styles.txtinp}
              textColor={"white"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              activeUnderlineColor={"#07B6D5"}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.signupbtn}
              onPress={() => createAccount()}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} size={"small"} />
              ) : (
                <Text
                  className="text-center text-gray-700 font-ibmBold text-xl"
                  style={{ color: "white" }}
                >
                  SIGN UP
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.lineimgmain}>
            <Image
              source={require("../../constants/icons/Line.png")}
              style={styles.lineimg}
            />
            <Text
              className="text-xl text-gray-700 font-bold text-center py-5 font-ibmMedium"
              style={{ color: "white" }}
            >
              {" "}
              OR
            </Text>
            <Image
              source={require("../../constants/icons/Line.png")}
              style={styles.lineimg}
            />
          </View>

          <View style={styles.iconmain}>
            <TouchableOpacity style={styles.iconback} onPress={()=> signIn()}>
              <Image
                source={require("../../constants/icons/google.png")}
                style={styles.iconimg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconback}>
              <Image
                source={require("../../constants/icons/apple-white.png")}
                style={styles.iconimg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconback}>
              <Image
                source={require("../../constants/icons/facebook.png")}
                style={styles.iconimg}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.lasttxtmain}>
            <Text className="text-white font-ibmMedium">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigate(routes.login)}>
              <Text
                className="font-ibmBold  "
                style={{
                  textDecorationLine: "underline",
                  marginLeft: 4,
                  color: "#07B6D5",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111828",
  },
  logotxt: {
    justifyContent: "center",
    paddingBottom: 12,
  },
  logoimg: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  txtinpmain: {
    flex: 1,
    backgroundColor: "#111828",
    paddingHorizontal: 20,
    marginTop: 40,
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
  signupbtn: {
    alignSelf: "center",
    backgroundColor: "#07B6D5",
    height: 56,
    width: 240,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  lineimg: {
    width: 120,
  },
  iconmain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconback: {
    backgroundColor: "#232E41",
    height: 55,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  iconimg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  lineimgmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lasttxtmain: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
