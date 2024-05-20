import { createSlice } from "@reduxjs/toolkit";
const celebritySlice = createSlice({
  name: "celebrity",
  initialState: {
    searchText: "",
    celebrityData: [],
    expandedAccordionId: "",
    error: false,
    isAnyInputChanged: false,
  },
  reducers: {
    updateSearchText(state, action) {
      state.searchText = action.payload;
    },
    updateExpandedAccordionId(state, action) {
      state.expandedAccordionId = action.payload;
    },
    setCelebrityData(state, action) {
      state.celebrityData = action.payload;
    },
    updateName(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.name = action.payload.name;
      state.isAnyInputChanged = true;
    },
    updateAge(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.age = action.payload.age;
      state.isAnyInputChanged = true;
    },
    updateGender(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.gender = action.payload.gender;
      state.isAnyInputChanged = true;
    },
    updateCountry(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      const country = action.payload.country.replace(/\d/g, "");
      celeb.country = country;
      state.isAnyInputChanged = true;
    },
    updateDescription(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.description = action.payload.description;
      state.isAnyInputChanged = true;
    },
    editCelebrityData(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.inputType = "input";
    },
    saveCelebrityData(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      if (
        celeb.name === "" ||
        celeb.age === "" ||
        celeb.gender === "" ||
        celeb.country === "" ||
        celeb.description === ""
      ) {
        state.error = true;
      } else {
        state.error = false;
        celeb.inputType = "text";
        celeb.prevName = celeb.name;
        celeb.prevAge = celeb.age;
        celeb.prevCountry = celeb.country;
        celeb.prevGender = celeb.gender;
        celeb.prevDescription = celeb.description;
        state.isAnyInputChanged = false;
      }
    },
    setPreviousDetails(state, action) {
      const celeb = state.celebrityData.find(
        (el) => el.id === action.payload.id
      );
      celeb.name = celeb.prevName;
      celeb.age = celeb.prevAge;
      celeb.country = celeb.prevCountry;
      celeb.gender = celeb.prevGender;
      celeb.description = celeb.prevDescription;
    },
    deleteCelebrity(state, action) {
      state.celebrityData = state.celebrityData.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const CelebrityActions = celebritySlice.actions;
export const CelebrityReducer = celebritySlice.reducer;
