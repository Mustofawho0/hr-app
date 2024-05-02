import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullname: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (prevState = initialState, action) => {
      prevState.fullname = action.payload.fullname;
      prevState.image = action.payload.image;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
