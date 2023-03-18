import React, { useState } from 'react';

export const ImageTestUpload = (props: {}) => {
    const [file, setFile] = useState("");

    const submit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
    
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("http://localhost:4000/api/images/upload", {
            method: "POST",
            body: formData
        });


        console.log(response);
        
        return response;
    }

    return (
        <>
            <form onSubmit={submit}>
                <input onChange={(e) => e.target.files && setFile(`${e.target.files[0]}`)} type="file" accept="image/*" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};