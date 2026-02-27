import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ThemeSliceState {
    theme: 'light' | 'dark'
}

const initialState: ThemeSliceState = {
    theme: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            if (action.payload !== state.theme) {
                state.theme = action.payload
            }
        }
    }
})

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer