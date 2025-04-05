import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
    name: "nav",
    initialState: {
        menuOpen: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.menuOpen = !state.menuOpen;
        }
    }

});
export const { toggleMenu } = navSlice.actions;
export default navSlice.reducer;