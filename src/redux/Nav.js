import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
    name: "nav",
    initialState: {
        menuOpen: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.menuOpen = !state.menuOpen;
        },
        openMenu: (state) => {
            state.menuOpen = true;
        }
    }

});
export const { toggleMenu,openMenu } = navSlice.actions;
export default navSlice.reducer;