import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";

const RecordedExerciseCard = ({ sets }) => {
  return (
    <View className="rounded my-1 bg-gray-800 items-center w-11/12">
      {sets.map((val, i) => {
        return (
          <View className="flex-row items-center justify-center" key={i}>
            <Text className="p-4  text-white rounded-2x1 font-ibmRegular w-24 bg-gray-800 text-center">
              {val.weight}
            </Text>
            <Text className="p-4  text-white rounded-2x1 font-ibmRegular w-24 bg-gray-800 text-center">
              {val.rep}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const RecordedWorkoutDayCards = ({ workoutDayData }) => {
  // const router = useRouter()

  return (
    <ScrollView className="bg-gray-900 w-full flex">
      <Stack.Screen
        options={{
          title: workoutDayData.workoutDay,
          headerTitleStyle: {
            color: "white",
          },
          headerLeft: () => (
            <TouchableOpacity
            // onPress={() => router.back()}
            >
              <Image
                source={require("../../constants/icons/back-white.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => saveFunc()}>
              <Text className="text-white">Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View className="items-center">
        <View className="w-11/12">
          {workoutDayData.exercises.map((ex, i) => {
            return (
              <View
                className="rounded-2xl my-2 bg-gray-800 flex items-center w-full"
                key={i}
              >
                <View className="flex-row justify-center mt-2 items-center">
                  <View className="w-2/3 justify-center items-center my-2">
                    <View className="w-full border-solid border-2 border-gray-700 rounded-lg py-3 justify-center items-center">
                      <View className="flex-row items-center justify-center">
                        <Text className="text-white">{ex.exercise}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <RecordedExerciseCard sets={ex.sets} />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecordedWorkoutDayCards;
