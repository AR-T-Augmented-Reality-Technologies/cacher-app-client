import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: 0
    },
    reducers: {
        add_user: (state, action) => {
            state.value = action.payload;
        },
        logout_user: (state) => {
            state.value = 0;
        }
    }
});

export const { add_user, logout_user } = usersSlice.actions;
export default usersSlice.reducer;