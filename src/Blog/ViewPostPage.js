import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useToken from '../useToken';
import Modal from './Modal'; // Import the Modal component
import "./ViewPostPage.css";
import CreatePostForm from './CreatePostForm';
import DeletePostsPage from './DeletePost';

import NavigationBar from '../NavBar';

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState(''); // For handling messages like "No posts found."
    const { token } = useToken(); // Use the token from your custom hook
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    let name = '';
    let surname = '';
    let type= '';


    if (token) {
        const decodedToken = jwtDecode(token);
        // Assume the token has a claim 'userId', change to 'username' if necessary
        name = decodedToken.Name; // Adjust the key based on your token structure
        surname = decodedToken.Surname;
        type = decodedToken.Type;
    }

    // create new post pop up

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = async () => {
        setShowModal(false);
        await fetchPosts();
    };

    
    // delete post pop up
    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };
    const handleCloseDeleteModal = async () => {
        setShowDeleteModal(false);
        await fetchPosts();
    };

    const handleGeneralDeleteAction = () => {
        handleOpenDeleteModal(); // Open the delete posts modal
    };

    

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.post('http://localhost:3001/viewPost'); // Match this endpoint to your backend
            // Check if response contains posts data directly
            if (response.data.length > 0) {
                console.log(response.data);
                console.log(type);
                setPosts(response.data);
                setMessage('');
            } else if (response.data.message) {
                // Handle case with message but no posts
                const noPostsMessage = response.data.message || 'No posts found.';
                setMessage(noPostsMessage);
                setPosts([]); // Ensure posts are cleared if there are no posts
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setMessage('Error fetching posts.');
        }
    };

    return (
        <div>
            <NavigationBar />
            
            <div className="Container">
                
            <div className="blog">
                <h1>News Feed Posts</h1>
                
                 
            {/* Immediately display message if set (e.g., "No posts found.") right under the header */}
            {message && <p className="message">{message}</p>}

            {/* Only iterate over and display posts if there are posts */}
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="post-container">
                        <p className="post-title">{post.title}</p>
                        <p className="post-content">{post.text}</p>
                        <div className='author-date'>
                            <h2 className="post-author">{post.name}</h2>
                            <p className="post-date">
                                {new Date(post.postDate).toLocaleDateString("en-US", {
                                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                // This will only show when there are no posts and no other message is set
                <p className="message">No posts available to display.</p>
            )}
            </div>

                <div className='Blog-buttons'>
                    
                    {(type === 'manager' || type === 'admin') && (
                            <button onClick={handleGeneralDeleteAction} className="delete-action-button">
                                Delete Post
                            </button>
                        )}

                    <button onClick={handleOpenModal} className="create-post-button">Create New Post</button>

                </div>

                {/* The Modal for creating a new post */}
                <Modal show={showModal} onClose={handleCloseModal}>
                    <CreatePostForm onClose={handleCloseModal} /> {/* This is the form inside your modal */}
                </Modal>

                {/* The Modal for deleting posts */}
                <Modal show={showDeleteModal} onClose={handleCloseDeleteModal}>
                    <DeletePostsPage onClose={handleCloseDeleteModal} />
                </Modal>
                                            
                </div>
        </div>
    );
}

export default PostsPage;
