import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./authNavigation";
import AppNavigation from "./appNavigation";
import { routes } from "../constants/routes";
import { navigationRef } from "./rootNavigation";

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  if (loading) return null;
  else
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={routes.auth}
        >
          <MainStack.Screen name={routes.auth} component={AuthNavigation} />
          <MainStack.Screen name={routes.app} component={AppNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    );
}
