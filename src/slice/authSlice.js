import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../service/authService";
import { roundService } from "../service/roundService";

const userLocalData = JSON.parse(localStorage.getItem("user"))
const InitialState = {
    user: userLocalData || {},
    roundComplete: 0,
    roundLeft: 0,
    roundScore: [],
    roundData: {},
    userScore: []

}



export const userRegister = createAsyncThunk(
    "auth/register",
    async (object, thunkAPI) => {
        try {
            const response = await authService.register(object);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




// update tasks
export const fetchRound = createAsyncThunk(
    "round/fetchRound",
    async (data, thunkAPI) => {
        try {
            const response = await roundService.fetchRound(data);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// get available round
export const availableRound = createAsyncThunk(
    "round/available",
    async (arg, thunkAPI) => {
        try {
            const response = await roundService.getAvailableRound();
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get available round
export const updateScore = createAsyncThunk(
    "auth/updateScore",
    async (obj, thunkAPI) => {
        try {
            const response = await authService.updateScore(obj);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState: InitialState,
    reducers: {
        userLogout: (state) => {

        },
        gameScoreTrack: (state, action) => {

            state.userScore = [...state.userScore, action.payload]

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.user = {}
                state.roundComplete = 0
                state.roundLeft = 0
                state.roundScore = []
                localStorage.setItem("user", JSON.stringify({}))
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.roundLeft = parseInt(action.payload.user.round)
                localStorage.setItem("user", JSON.stringify(action.payload.user))
            })
            .addCase(userRegister.rejected, (state) => {
                state.user = {}
            })

            .addCase(fetchRound.pending, (state) => {
            })
            .addCase(fetchRound.fulfilled, (state, action) => {
                state.roundData = action.payload.roundData
            })

            .addCase(updateScore.pending, (state) => {
            })

            .addCase(updateScore.fulfilled, (state, action) => {
                console.log(action.payload)
            })


    }

});


export const { gameScoreTrack } = authSlice.actions
const { reducer } = authSlice;
export default reducer;