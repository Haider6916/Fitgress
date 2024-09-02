import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import React, { useEffect } from "react";
// import { Stack, useRouter } from 'expo-router'
import { useSelector, useDispatch } from "react-redux";
import { editWorkout } from "../../api/features/workout/workoutSlice";
import {
  updateProgramName,
  resetWorkoutProgram,
  deleteWorkoutDay,
} from "../../api/features/workout/workoutProgramSlice";
import { addWorkoutProgram } from "../../api/features/workout/selectWorkoutProgramSlice";

const WorkoutProgramComponent = ({ saveFunc }) => {
  // const router = useRouter();
  const workoutProgram = useSelector((state) => state.workoutProgram);
  const dispatch = useDispatch();

  const alertBackButton = () => {
    const confirmAndPerformAction = () => {
      dispatch(resetWorkoutProgram());
      // router.back()
    };
    Alert.alert(
      "Confirm",
      "Your current data will get deleted. Do you want to go back? ",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: confirmAndPerformAction,
        },
      ],
      { cancelable: false }
    );
  };

  const editWorkoutDayPage = ({ item, index }) => {
    dispatch(editWorkout(item));
    console.log(item);
    // router.push({ pathname: '/workout/editWorkoutDay', params: { item, index } })
  };

  const Item = ({ item, index }) => (
    <View className="w-2/3  my-2 items-center flex-row">
      <TouchableOpacity onPress={() => dispatch(deleteWorkoutDay(index))}>
        <Image
          source={require("../../constants/icons/minus-red.png")}
          className="object-cover h-6 w-6 mr-7"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-2/3 h-10 border-solid border-2 border-gray-700 rounded-lg items-center justify-center"
        onPress={() => editWorkoutDayPage({ item, index })}
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
    <SafeAreaView className="bg-gray-900 flex-1">
      {/* <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => alertBackButton()}
                        >
                            <Image
                                source={require('../../constants/icons/back-white.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={saveFunc}
                        >
                            <Text className='text-white font-ibmMedium'>Save</Text>
                        </TouchableOpacity>
                    ),
                }} /> */}
      <View className="bg-gray-900 flex-1 items-center">
        <View className="w-full items-center">
          <View className="my-4 justify-items-start w-11/12">
            <Text className="text-white font-ibmRegular text-lg ml-1">
              📓 Program Name
            </Text>
          </View>
          <TextInput
            className="p-4 bg-gray-800 text-white rounded-2x1 font-ibmRegular w-11/12 rounded-xl"
            placeholderTextColor={"gray"}
            placeholder="Enter Program Name"
            value={workoutProgram.programName}
            onChangeText={(text) => dispatch(updateProgramName(text))}
          />
        </View>
        <View className="flex-row justify-start w-11/12 mt-8 mb-2">
          <Text className="text-white font-ibmRegular text-lg ml-1">
            🗓 Workout Days
          </Text>
        </View>
        <FlatList
          data={workoutProgram.workoutDays}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          className="grow-0 w-full rounded-lg"
        />
        <TouchableOpacity
          className="items-center px-4 h-10 rounded-xl justify-center border-solid border-2 border-gray-700 mt-4"
          // onPress={() => router.push('/workout/createWorkoutDay')}
        >
          <View className="flex-row items-center">
            <Image
              source={require("../../constants/icons/add-white.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
              className="mr-2"
            />
            <Text className="text-white">Workout Day</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
                    className='items-center bg-gray-800 w-1/2 h-10 rounded-xl justify-center border-gray-800 my-2'
                    onPress={() => console.log(workoutProgram)}
                >
                    <Text className='text-white'>Test</Text>
                </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default WorkoutProgramComponent;
