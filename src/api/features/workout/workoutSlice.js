import {
  createSlice,
  createAction,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import React from "react";
import { set } from "react-native-reanimated";
import { useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { addRecordedWorkoutDate } from "../user/userDataSlice";

// add recorded workoutday to user recordedWorkouts subcollection and date to recordedWorkoutsDates
export const addRecordedWorkout = createAsyncThunk(
  "workout/addRecordedWorkout",
  async (workoutDay, thunkAPI) => {
    const uid = auth().currentUser.uid;
    workoutDay.createdAt = firestore.FieldValue.serverTimestamp();
    const addRecordedWorkout = await firestore()
      .collection("users")
      .doc(uid)
      .collection("recordedWorkouts")
      .add(workoutDay);
    console.log("document added to sub collection");
    thunkAPI.dispatch(addRecordedWorkoutDate());
    const recordedWorkout = { id: addRecordedWorkout.id, workoutDay };
    return recordedWorkout;
  }
);

const initialState = {
  workoutDay: null,
  createdAt: null,
  exercises: [
    {
      exercise: "Select an exercise",
      show: true,
      sets: [{ weight: "", rep: "" }],
    },
  ],
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    // add a new exercise card.
    addExerciseSet: (state) => {
      state.exercises.push({
        exercise: "Select an exercise",
        show: true,
        sets: [{ weight: "", rep: "" }],
      });
    },
    // delete the selected exercise card
    deleteExerciseSet: (state, action) => {
      state.exercises = state.exercises.filter((val, i) => {
        if (i !== action.payload) {
          return val;
        }
      });
    },
    // update the exercise name after selecting in list modal.
    updateExercise: (state, action) => {
      console.log(action.payload);
      const exercise = action.payload.item;
      const index = action.payload.i;

      const newExercises = state.exercises.map((item, i) => {
        if (index == i) {
          return { ...item, exercise: exercise };
        }
        return item;
      });
      console.log(newExercises);
      state.exercises = newExercises;
    },
    // hide/show sets in specific card.
    showSets: (state, action) => {
      let updatedShows = state.exercises.map((item, i) => {
        if (action.payload == i) {
          return { ...item, show: !item.show };
        }
        return item;
      });
      state.exercises = updatedShows;
    },
    // update weight and reps text
    updateWeightSets: (state, action) => {
      const cardIndex = action.payload.cardIndex;
      const setIndex = action.payload.index;
      const data = action.payload.data;

      console.log(data);
      console.log(cardIndex);

      const newExercises = state.exercises.map((item, i) => {
        if (cardIndex == i) {
          return { ...item, sets: data };
        }
        return item;
      });
      state.exercises = newExercises;
    },
    // add set to exercise card
    addSet: (state, action) => {
      const newExercises = state.exercises.map((item, i) => {
        if (action.payload == i) {
          item.sets.push({ weight: "", rep: "" });
        }
        return item;
      });

      state.exercises = newExercises;
    },
    deleteSet: (state, action) => {
      const cardIndex = action.payload.cardIndex;
      const setIndex = action.payload.index;
      console.log(action.payload);

      let updatedExercises = state.exercises.map((item, i) => {
        if (cardIndex == i) {
          let updatedSet = item.sets.filter((val, i) => {
            if (setIndex !== i) {
              return val;
            }
          });
          return { ...item, sets: updatedSet };
        }
        return item;
      });

      state.exercises.map;
      console.log(updatedExercises);
      state.exercises = updatedExercises;
    },
    updateWorkoutDay: (state, action) => {
      state.workoutDay = action.payload;
    },
    resetInitialState: (state) => initialState,
    editWorkout: (state, action) => {
      console.log(action.payload);
      state.workoutDay = action.payload.workoutDay;
      state.exercises = action.payload.exercises;
    },
    handleInputChange: (state, action) => {
      const cardIndex = action.payload.cardIndex;
      const setIndex = action.payload.i;
      const data = action.payload.text;
      const exercises = state.exercises;
      const field = action.payload.field;

      // Clone the workouts array
      const updatedWorkouts = [...exercises];

      // Clone the specific workout's exercises array
      const updatedSets = [...updatedWorkouts[cardIndex].sets];

      // Update the specific field for the exercise at the given index
      updatedSets[setIndex][field] = data;

      // Update the exercises array in the specific workout
      updatedWorkouts[cardIndex].sets = updatedSets;

      // Set the updated workouts array to state
      state.exercises = updatedWorkouts;
    },
  },
});

export const exercises = (state) => state.workout.exercises;

// Action creators are generated for each case reducer function
export const {
  addExerciseSet,
  deleteExerciseSet,
  updateExercise,
  showSets,
  updateWeightSets,
  addSet,
  deleteSet,
  updateWorkoutDay,
  resetInitialState,
  editWorkout,
  handleInputChange,
} = workoutSlice.actions;

export default workoutSlice.reducer;
