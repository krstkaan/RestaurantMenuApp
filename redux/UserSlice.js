import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload;
    },
    adminlogin: (state,action) =>{
      state.isAdmin = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, adminlogin } = userSlice.actions;
export default userSlice.reducer;