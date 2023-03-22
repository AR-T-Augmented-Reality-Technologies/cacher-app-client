import { createSlice } from '@reduxjs/toolkit';

export const scrapbookSlice = createSlice({
    name: 'scrapbook',
    initialState: {
        scrapbook_id: -1,
        location: "",
        images: [
            {
                photo_id: -1,
                image: "",
                likes: 0,
                num_comments: 0,
                caption: "",
                upload_date: "2023-03-22T16:56:23.000Z",
                scrap_id: -1
            }
        ]
    },
    reducers: {
        focus_scrapbook: (state, action) => {
            state.scrapbook_id = action.payload.scrapbook_id;
            state.location = action.payload.location;
            state.images = [...action.payload.images];
        },
        unfocus_scrapbook: (state) => {
            state.scrapbook_id = -1;
            state.location = "";
            state.images = [];
        }
    }
});

export const { focus_scrapbook, unfocus_scrapbook } = scrapbookSlice.actions;
export default scrapbookSlice.reducer;