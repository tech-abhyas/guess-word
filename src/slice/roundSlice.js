// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { roundService } from "../service/roundService";

// // initiate the state
// const InitialState = {
//   roundData: [],
// }




// // update tasks
// export const fetchRound = createAsyncThunk(
//   "round/fetchRound",
//   async (data, thunkAPI) => {
//     try {
//       const response = await roundService.fetchRound(data);
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


// // get available round
// export const availableRound = createAsyncThunk(
//   "round/available",
//   async (arg, thunkAPI) => {
//     try {
//       const response = await roundService.getAvailableRound();
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );




// // const roundSlice = createSlice({
// //   name: "round",
// //   initialState: InitialState,
// //   reducers: {
// //     clearError: (state, action) => {
// //       state.errMessage = ""
// //       state.isError = false
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder

// //       // category slice
// //       .addCase(fetchRound.pending, (state) => {
// //         state.isError = false
// //         state.errMessage = ""
// //       })
// //       .addCase(fetchRound.fulfilled, (state, action) => {
// //         state.taskCategory = action.payload
// //       })
// //       .addCase(fetchRound.rejected, (state, action) => {
// //         state.isError = true
// //         state.errMessage = action.payload
// //       })

// //       // priority slice
// //       .addCase(availableRound.pending, (state) => {
// //         state.isError = false
// //         state.errMessage = ""
// //       })
// //       .addCase(availableRound.fulfilled, (state, action) => {
// //         state.taskPriority = action.payload
// //       })
// //       .addCase(availableRound.rejected, (state, action) => {
// //         state.isError = true
// //         state.errMessage = action.payload
// //       })


// //   }

// // });


// export const { clearError } = roundSlice.actions
// const { reducer } = roundSlice;
// export default reducer;