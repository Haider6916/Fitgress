import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addExerciseSet,
  deleteExerciseSet,
  showSets,
} from "../../api/features/workout/workoutSlice";
import ExerciseCard from "./exerciseCard";

const ExerciseCardList = ({ exercises }) => {
  const dispatch = useDispatch();

  return (
    <ScrollView className="bg-gray-900 w-full flex">
      <View className="items-center">
        <View>
          {exercises.map((ex, i) => {
            return (
              <View
                className="rounded-2xl my-2 bg-gray-800 flex items-center w-full"
                key={i}
              >
                <View className="flex-row justify-center items-center">
                  <TouchableOpacity
                    onPress={() => dispatch(deleteExerciseSet(i))}
                  >
                    <Image
                      source={require("../../constants/icons/close-white.png")}
                      className="object-cover h-6 w-6 mx-4"
                    />
                  </TouchableOpacity>
                  <View className="w-2/3 justify-center items-center my-4">
                    <View className="w-full border-solid border-2 border-gray-700 rounded-lg py-3 justify-center items-center">
                      <Link
                        href={{
                          pathname: "/workout/selectExerciseModal",
                          params: { ex: { exercises }, i: i },
                        }}
                      >
                        <View className="flex-row items-center justify-center">
                          <Text className="text-white">{ex.exercise}</Text>
                          <Image
                            source={require("../../constants/icons/expand-arrow-white.png")}
                            resizeMode="contain"
                            className="ml-2"
                            style={{
                              width: 14,
                              height: 14,
                            }}
                          />
                        </View>
                      </Link>
                    </View>
                  </View>
                  {ex.show == true ? (
                    <TouchableOpacity onPress={() => dispatch(showSets(i))}>
                      <Image
                        source={require("../../constants/icons/eye-show-white.png")}
                        className="object-cover h-6 w-6 mx-4"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => dispatch(showSets(i))}>
                      <Image
                        source={require("../../constants/icons/eye-hide-white.png")}
                        className="object-cover h-6 w-6 mx-4"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <ExerciseCard show={ex.show} cardIndex={i} sets={ex.sets} />
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => dispatch(addExerciseSet())}
          className="items-center bg-gray-800 h-10 rounded-xl justify-center border-gray-800 my-2"
        >
          <View className="flex-row items-center px-6">
            <Image
              source={require("../../constants/icons/add-white.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
              className="mr-2"
            />
            <Text className="text-white">Exercise</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExerciseCardList;
