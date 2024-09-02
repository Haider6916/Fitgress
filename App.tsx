import React from "react";
import { SafeAreaView, View } from "react-native";
import Navigation from "./src/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/api/store";
import { MenuProvider } from "react-native-popup-menu";

function App() {
  return (
    <MenuProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </MenuProvider>
  );
}

export default App;
