import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const convertTimestampToISO = (timestamp) => timestamp?.toDate()?.toISOString();

// fetch user created interval templates  from subcollection
export const fetchUserIntervalTemplates = createAsyncThunk(
  "intervalTemplates/fetchUserIntervalTemplates",
  async () => {
    const uid = auth().currentUser.uid;
    const querySnapshot = await firestore()
      .collection("users")
      .doc(uid)
      .collection("userCreatedIntervalTemplate")
      .get();

    const intervalTemplates = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert the timestamps
      if (data.createdAt) {
        data.createdAt = convertTimestampToISO(data.createdAt);
      }
      if (data.updatedAt) {
        data.updatedAt = convertTimestampToISO(data.updatedAt);
      }

      return {
        id: doc.id,
        intervalTemplate: data,
      };
    });
    console.log("user created workouts fetched");
    console.log(intervalTemplates);
    return intervalTemplates;
  }
);

// delete selected template
export const deleteSelectedTemplate = createAsyncThunk(
  "intervalTemplates/deleteSelectedTemplate",
  async ({ item, index }) => {
    const uid = auth().currentUser.uid;

    try {
      await firestore()
        .collection("users")
        .doc(uid)
        .collection("userCreatedIntervalTemplate")
        .doc(item.id)
        .delete();
      return index;
    } catch (e) {
      console.error("error removing document" + e);
    }
  }
);

const initialState = {
  intervalTemplates: [],
  isLoading: false,
  error: null,
};

export const intervalTemplatesSlice = createSlice({
  name: "intervalTemplates",
  initialState,
  reducers: {
    setRounds: (state, action) => {
      state.rounds = action.payload;
    },
    removeTemplate: (state, action) => {
      state.intervalTemplates.splice(action.payload, 1);
    },
    addNewTemplate: (state, action) => {
      state.intervalTemplates.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserIntervalTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserIntervalTemplates.fulfilled, (state, action) => {
        console.log("fetch sucess");
        state.isLoading = false;
        state.intervalTemplates = action.payload;
      })
      .addCase(fetchUserIntervalTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSelectedTemplate.fulfilled, (state, action) => {
        state.intervalTemplates.splice(action.payload, 1);
      });
  },
});

// Action creators are generated for each case reducer function
export const { addNewTemplate, removeTemplate } =
  intervalTemplatesSlice.actions;

export default intervalTemplatesSlice.reducer;
