import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: [],
  video: [],
  lessonId: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.id = action.payload;
      console.log(state.id);
      localStorage.setItem("courseId", JSON.stringify(state.id));
    },

    addVideo: (state, action) => {
      state.video = action.payload;
      console.log(state.video);
      localStorage.setItem("video", JSON.stringify(state.video));
    },
    
    addLessonId: (state, action) => {
      state.lessonId = action.payload;
      // console.log(state.video);
      // localStorage.setItem("video", JSON.stringify(state.video));
    },


  },
});

export const { addId, addVideo, addLessonId } = courseSlice.actions;

export default courseSlice.reducer;
