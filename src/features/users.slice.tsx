import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        age: 0,
        dob: "",
        token: ""
    },
    reducers: {
        add_user: (state, action) => {
            state = action.payload;
        },
        logout_user: (state) => {
            state = {
                email: "",
                username: "",
                firstname: "",
                lastname: "",
                age: 0,
                dob: "",
                token: ""
            };
        }
    }
});

export const { add_user, logout_user } = usersSlice.actions;
export default usersSlice.reducer;