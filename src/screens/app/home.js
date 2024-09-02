import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../api/features/user/userDataSlice";
import WorkoutCalendar from "../../components/calender/workoutCalender";
import QuotesComponent from "../../components/quotes/quotesComponent";
import UserDataDisplay from "../../components/userData/userDataDisplay";
import ToolsBar from "../../components/tools/toolsBar";
import LoadingIndicator from "../../components/loadingIndicator";
import { navigate } from "../../navigation/rootNavigation";
import { routes } from "../../constants/routes";

export default function Home({ navigation }) {
  // const count = useSelector((state) => state.counter.value);
  const userData = useSelector((state) => state.userData);
  const isLoading = useSelector((state) => state.userData.isLoading);
  const error = useSelector((state) => state.userData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row justify-center items-center">
          <TouchableOpacity
            className="bg-cyan-600 w-28 h-8 rounded-full flex justify-center items-center text-white text-4xl mr-6"
            // onPress={() => router.push("/workout/selectWorkoutPage")}
          >
            <View className="flex-row items-center">
              <Image
                source={require("../../constants/icons/create-white-ios.png")}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                }}
              />
              <Text className="text-white">Workout</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSignOut()} className="mr-4">
            <Image
              source={require("../../constants/icons/menu-white.png")}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const handleSignOut = () => {
    auth()
      .signOut(auth)
      .then(() => {
        console.log("User signed out!");
      });
    navigate(routes.auth);
  };

  const workouts = [
    { date: "2023-09-10", data: "Leg day: squats, lunges, calf raises" },
    { date: "2023-09-12", data: "Cardio: 30 mins running" },
    // ... more workouts
  ];

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="mt-4 pb-12">
        {/* <Text className='text-white text-lg ml-4'>Welcome back, {userData.username}!</Text> */}
        <View className="">
          <QuotesComponent />
        </View>
        <Text className="text-white text-lg ml-4 mt-1">🎯 Goals</Text>
        <View className="justify-center items-center">
          <UserDataDisplay />
        </View>
        <Text className="text-white text-lg ml-4 mt-1">🛠 Tools</Text>
        <View className="mt-2">
          <ToolsBar weightPress={() => navigation.navigate(routes.weightTracker)}/>
        </View>
        <View className="items-center bg-gray-800 rounded-2xl my-2 mx-4 w-11/12 mt-4">
          <WorkoutCalendar workouts={workouts} />
        </View>
        <TouchableOpacity
          className="items-center bg-gray-800 w-1/2 h-10 rounded-xl justify-center border-gray-800 my-2"
          onPress={() => console.log(userData.recordedWorkoutsDates)}
        >
          <Text className="text-white">Test</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
