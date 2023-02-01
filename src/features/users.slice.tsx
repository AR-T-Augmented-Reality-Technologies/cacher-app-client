import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        id: -1,
        email: "",
        username: "",
        token: ""
    },
    reducers: {
        add_user: (state, action) => {
            state = {
                id: action.payload.user.user_id,
                email: action.payload.user.user_email,
                username: action.payload.user.user_username,
                token: action.payload.token
            };
        },
        logout_user: (state) => {
            state = {
                id: -1,
                email: "",
                username: "",
                token: ""
            };
        }
    }
});

export const { add_user, logout_user } = usersSlice.actions;
export default usersSlice.reducer;