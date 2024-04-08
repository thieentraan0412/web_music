import { createSlice } from "@reduxjs/toolkit";

const DetailAbum = createSlice({
  name: "detailabum",
  initialState: {
    detailabum: {
      data: null,
      msg: null,
      error: false,
    },
  
  },
  reducers: {
    getDetailAbum: (state, action) => {
      state.detailabum.data = action.payload;
    },

  },
});

export const { getDetailAbum } = DetailAbum.actions;
export default DetailAbum.reducer;
