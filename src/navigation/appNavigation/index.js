import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes } from "../../constants/routes";
import * as App from "../../screens/app";
import { height } from "react-native-dimension";
import { AddWeight, WeightTracker } from "../../screens/common";
import { navigate } from "../../navigation/rootNavigation";

const AppStack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

const AppNavigation = ({ navigation }) => {
  return (
    <AppStack.Navigator initialRouteName={routes.bottom}>
      <AppStack.Screen
        name={routes.bottom}
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.weightTracker}
        component={WeightTracker}
        options={{
          title: "Weight",
          headerStyle: {
            backgroundColor: "#111828",
          },
          headerTitleStyle: {
            fontFamily: "IBMPlexSans-Regular",
            fontSize: 26,
            fontWeight: "500",
            color: "white",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(routes.home)}>
              <Image
                source={require("../../constants/icons/back-white.png")}
                style={{ width: 12, height: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.addWeight)}
            >
              <Text
                style={{
                  color: "#07B6D5",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: 'fontFamily: "IBMPlexSans-Regular',
                }}
              >
                Add Weight
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <AppStack.Screen
        name={routes.addWeight}
        component={AddWeight}
        options={{
          title: "Add Weight",
          headerStyle: {
            backgroundColor: "#111828",
          },
          headerTitleStyle: {
            fontFamily: "IBMPlexSans-Regular",
            fontSize: 26,
            fontWeight: "500",
            color: "white",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.weightTracker)}
            >
              <Image
                source={require("../../constants/icons/back-white.png")}
                style={{ width: 12, height: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </AppStack.Navigator>
  );
};

const BottomNavigation = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: height(0),
          paddingBottom: height(5),
          borderTopWidth: 0,
          backgroundColor: "#111827",
          ...styles.shadow,
        },
        headerStyle: {
          backgroundColor: "#111827",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#d1d5db",
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontFamily: "IBMPlexSans-Regular",
          fontSize: 30,
        },
      }}
    >
      <BottomStack.Screen
        name={routes.home}
        component={App.Home}
        options={{
          title: "F I T G R E S S",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className="justify-center align-middle pt-10 items-center">
              <Image
                source={require("../../constants/icons/home-white.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#22d3ee" : "#d1d5db",
                }}
              />
              <Text
                style={{
                  color: focused ? "#22d3ee" : "#d1d5db",
                  fontSize: 12,
                  fontFamily: "IBMPlexSans-Medium",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <BottomStack.Screen
        name={routes.search}
        component={App.SearchPage}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="justify-center align-middle pt-10 items-center">
              <Image
                source={require("../../constants/icons/search-white.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#22d3ee" : "#d1d5db",
                }}
              />
              <Text
                style={{
                  color: focused ? "#22d3ee" : "#d1d5db",
                  fontSize: 12,
                  fontFamily: "IBMPlexSans-Medium",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <BottomStack.Screen
        name={routes.profile}
        component={App.ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View className="justify-center align-middle pt-10 items-center">
              <Image
                source={require("../../constants/icons/friends-white.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#22d3ee" : "#d1d5db",
                }}
              />
              <Text
                style={{
                  color: focused ? "#22d3ee" : "#d1d5db",
                  fontSize: 12,
                  fontFamily: "IBMPlexSans-Medium",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#6b7280",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
