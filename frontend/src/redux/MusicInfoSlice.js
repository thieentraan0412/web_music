import { createSlice } from "@reduxjs/toolkit";

const musicInfoSlice = createSlice({
  name: "musicInfo",
  initialState: {
    musicInfo: {
      data: null,
      msg: null,
      error: false,
    },
  
  },
  reducers: {
    getMusicInfoSuccess: (state, action) => {
      state.musicInfo.data = action.payload;
    },
  },
});

export const { getMusicInfoSuccess } = musicInfoSlice.actions;

export default musicInfoSlice.reducer;
