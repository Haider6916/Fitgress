import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { addNewTemplate } from "./intervalTemplatesSlice";

// add new workout program to user created workouts subcollection
export const addTemplateToUserCollection = createAsyncThunk(
  "intervaltimer/addTemplateToUserCollection",
  async (template, thunkAPI) => {
    if (inputValue?.trim() === "") {
      setError("Input cannot be empty!");
    } else {
      setError("");
      // Continue with your submit action, for example sending the data to an API
      const uid = auth().currentUser.uid;
      template.createdAt = firestore.FieldValue.serverTimestamp();
      const addTemplate = await firestore()
        .collection("users")
        .doc(uid)
        .collection("userCreatedIntervalTemplate")
        .add(template);
      console.log("document added to sub collection");
      const newTemplate = { id: addTemplate.id, template };
      return newTemplate;
    }

    const uid = auth.currentUser.uid;
    template.createdAt = firestore.FieldValue.serverTimestamp();

    const addTemplate = await firestore()
      .collection("users")
      .doc(uid)
      .collection("userCreatedIntervalTemplate")
      .add(template);
    console.log("document added to sub collection");
    const newTemplate = { id: addTemplate.id, intervalTemplate: template };
    thunkAPI.dispatch(addNewTemplate(newTemplate));
    return newTemplate;
  }
);

const initialState = {
  templateName: "",
  warmUpDuration: { minutes: 0, seconds: 0 },
  activeDuration: { minutes: 0, seconds: 0 },
  restDuration: { minutes: 0, seconds: 0 },
  coolDownDuration: { minutes: 0, seconds: 0 },
  rounds: "",
  createdAt: "",
  isTemplateValid: true,
  isRoundsValid: true,
};

export const intervalTimerSlice = createSlice({
  name: "intervalTimer",
  initialState,
  reducers: {
    setRounds: (state, action) => {
      state.rounds = action.payload;
    },
    setMinutesValue: (state, action) => {
      const { field, value, type } = action.payload;
      state[field].minutes = value;
      console.log(state[field]);
    },
    setSecondsValue: (state, action) => {
      const { field, value } = action.payload;
      state[field].seconds = value;
      console.log(state[field]);
    },
    updateRounds: (state, action) => {
      state.rounds = action.payload;
    },
    updateTemplateName: (state, action) => {
      state.templateName = action.payload;
    },
    updateCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    resetTemplate: (state) => initialState,
    replaceTemplateState: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTemplateToUserCollection.fulfilled, (state, action) => {
      console.log("added template " + action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setRound,
  setMinutesValue,
  setSecondsValue,
  updateRounds,
  updateTemplateName,
  updateCreatedAt,
  replaceTemplateState,
  resetTemplate,
} = intervalTimerSlice.actions;

export default intervalTimerSlice.reducer;
