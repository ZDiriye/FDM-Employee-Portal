// CreatePostPage.js
/*
import React, { useState } from 'react';
import axios from 'axios';
import useToken from './useToken';
import { jwtDecode } from 'jwt-decode';
import "./Blog.css";
import NavigationBar from './NavBar';
import Modal from './Modal';

function CreatePostPage() {
    const [postContent, setPostContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { token } = useToken();
    let user = '';


    if (token) {
        const decodedToken = jwtDecode(token);
        user = decodedToken.userID;
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPostContent('');
        setAuthor('');
        setImage(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('text', postContent);
        formData.append('userId', user);

        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:3001/addPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPostContent('');
            setAuthor('');
            setImage(null);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <button onClick={handleOpenModal}>Create New Post</button> 
            <Modal show={showModal} onClose={handleCloseModal}>
                <div className="blog">
                    <h1>Create a Post</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
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
                    </form>
                </div>
                </Modal>
        </div>
    );
}

export default CreatePostPage;
*/