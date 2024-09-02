import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { Link, useRouter, Stack } from "expo-router";
import {
  editWorkoutProgra,
  editCurrentProgram,
} from "../../api/features/workout/workoutProgramSlice";
import { useDispatch } from "react-redux";

const WorkoutProgramCard = ({ workoutProgram, workoutDayFunc }) => {
  // const router = useRouter()
  const dispatch = useDispatch();

  const editButton = () => {
    console.log("running edit button");
    dispatch(editCurrentProgram({ workoutProgram }));
    // router.push('/workout/editSelectedProgram')
  };

  const Item = ({ item, index }) => (
    <View className="w-full  my-1 items-center flex">
      <TouchableOpacity
        className="w-2/3 h-10 border-solid border-2 border-gray-700 rounded-lg items-center justify-center"
        onPress={() => workoutDayFunc(item)}
      >
        <View className="flex-row items-center w-full justify-between">
          <Text className="ml-6 text-white">{item.workoutDay}</Text>
          <Image
            source={require("../../constants/icons/right-arrow-white.png")}
            resizeMode="contain"
            className="mr-4"
            style={{
              width: 14,
              height: 14,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => {
    return (
      <View className="items-center">
        <Item item={item} index={index} />
      </View>
    );
  };

  return (
    <View className="flex w-11/12 rounded-2xl mt-2">
      <View className="bg-gray-900 rounded-2xl">
        <View className="flex-row justify-between mt-2">
          <View className="flex-row mt-2 ml-2">
            <Text className="text-white font-ibmRegular text-lg ml-1">
              📓 Current Program
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="flex-row mr-2 mt-2"
              onPress={() => editButton()}
            >
              <Text className="text-blue-400 text-base mr-1">✏️ Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full justify-center items-center my-4">
          <View className="w-2/3 border-solid border-2 border-gray-700 rounded-lg py-4 justify-center items-center">
            <Link
              href={{
                pathname: "/workout/selectProgramPage",
              }}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-white text-center">
                  {workoutProgram.programName}
                </Text>
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
      </View>
      <View className="bg-gray-900 my-2 rounded-2xl">
        <View className="flex-row ml-2 my-2">
          <Text className="text-white font-ibmRegular text-lg ml-1">
            🗓 Workout Days
          </Text>
        </View>
        <View className="items-center">
          <View className="w-11/12 items-center my-2">
            <FlatList
              data={workoutProgram.workoutDays}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              className=" grow-0 w-11/12 rounded-lg"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutProgramCard;
