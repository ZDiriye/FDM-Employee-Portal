// CreatePostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import useToken from '../useToken';
import { jwtDecode } from 'jwt-decode';
//import "./CreatePostForm.css";

function CreateTeamPostForm({ onClose }) {
    const [postContent, setPostContent] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const { token } = useToken();
    let teamId = '';
    let user = '';
    let name = '';
    let surname = '';
    if (token) {
        const decodedToken = jwtDecode(token);
        user = decodedToken.userID;
        name = decodedToken.Name;
        surname = decodedToken.Surname;
        teamId = decodedToken.TeamID;
    }

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const fullName = name + " " + surname;

        formData.append('text', postContent);
        formData.append('title', title);
        formData.append('teamId', teamId);
        formData.append('name', fullName);

        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:3001/addTeamPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPostContent('');
            setTitle('');
            setImage(null);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };


    // After submitting the form, close the modal
    const onSubmitAndClose = async (event) => {
        await handleSubmit(event);
        onClose();
    };

    return (
        <form onSubmit={onSubmitAndClose}>
            <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                   
                    <textarea
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
            <button type="submit">Submit Post</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default CreateTeamPostForm;
