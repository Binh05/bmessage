import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitThemeState {
    theme: 'dark' | 'light';
}

const initialState: InitThemeState = {
    theme: 'light'
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
            state.theme = action.payload
        },
        resetTheme: (state) => {
            state.theme = 'light'
        }
    }
})

export const theme = themeSlice.reducer
export const { setTheme, resetTheme } = themeSlice.actions