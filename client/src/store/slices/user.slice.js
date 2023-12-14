import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        addCreateForm: false,
        addUpdateForm: false,
        addDeleteForm: false
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        createForm: (state) => {
            state.addCreateForm = !state.addCreateForm
        },
        updateForm: (state) => {
            state.addUpdateForm = !state.addUpdateForm
        },
        deleteForm:(state) => {
            state.addDeleteForm = !state.addDeleteForm
        },
        addUser: (state, action) => {
            state.data.push(action.payload);
        },
        updatedUser: (state, action) => {
            state.data = state.data.map(user => {
                if (user.id == action.payload.id) {
                    return { ...user, ...action.payload.data }
                }
                return user
            })
        },
        deleteUser: (state, action) => {
            state.data = state.data.filter((user) => user.id != action.payload);
        },
    },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;