import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.data = null;
      state.isLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addUser, removeUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;
