import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    music: {
      data: null,
      msg: null,
      error: false,
    },
  },
  reducers: {
    getMusicSuccess: (state, action) => {
      state.music.data = action.payload;
      state.music.msg = action.payload;
    },
  },
});

export const { getMusicSuccess, getplaymusic } = musicSlice.actions;

export default musicSlice.reducer;
