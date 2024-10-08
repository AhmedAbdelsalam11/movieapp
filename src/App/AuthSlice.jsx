
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Correct import
import { auth } from '../config/firebaseConfig';


const initialState = {
  isLoading: false,
  error: null,
  data: null,
};


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      return userCredential
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth,user.email, user.password);
      return userCredential.user
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.data = []; 
        state.error = action.payload.message;
      
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null; 
        state.error = action.payload.message; 
       
      });
  },
});
export const selectAuth = ({auth}) =>auth
export default authSlice.reducer;