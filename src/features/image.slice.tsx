import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
    name: 'images',
    initialState: {
        id: -1,
        image: "",
        likes: "",
        commentnum: -1,
        caption: "",
        uploadDate: ""
    },
    reducers: {
        add_image: (state, action) => {
            state.id = action.payload.image.photo_id;
            state.image = action.payload.image.image;
            state.likes = action.payload.image.likes;
            state.commentnum = action.payload.image.num_comments;
            state.caption = action.payload.image.caption;
            state.uploadDate = action.payload.image.upload_date;
        },
    }
});
export const { add_image } = imageSlice.actions;
export default imageSlice.reducer;