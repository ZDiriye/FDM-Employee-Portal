import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useToken from '../useToken';
import Modal from './Modal'; // Import the Modal component
import CreatePostForm from './CreatePostForm';
import "./ViewPostPage.css";
import NavigationBar from '../NavBar';

function DeletePostsPage() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState(''); // For handling messages like "No posts found."
    const { token } = useToken(); // Use the token from your custom hook
    const [showModal, setShowModal] = useState(false);

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

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGeneralDeleteAction = () => {
        console.log("General delete action initiated");
        // Implement the action (e.g., show a modal for selecting which posts to delete)
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
                setPosts(response.data);
                setMessage('');
            } else if (response.data.message) {
                // Handle case with message but no posts
                setMessage(response.data.message);
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
                
                {/* Display message if set (e.g., "No posts found.") */}
                {message && <p className="message">{message}</p>}
                {/* Iterate over posts and display them */}
                {posts.map((post, index) => (
                    <div key={index} className="post-container">
                        <p className="post-title">{post.title}</p>
                        <p className="post-content">{post.text}</p>
                        <div className=' author-date'>
                            <h2 className="post-author">{post.name}</h2>
                            <p className="post-date">
                                {new Date(post.postDate).toLocaleDateString("en-US", {
                                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                                })}
                            </p>
                        </div>
                        </div>
                    ))}
                {/* The Modal for creating a new post */}
                <Modal show={showModal} onClose={handleCloseModal}>
                    <CreatePostForm onClose={handleCloseModal} /> {/* This is the form inside your modal */}
                </Modal>
            </div>

                <div className='Blog-buttons'>
                    
                    {/* Conditional rendering for a generalized action button */}
                    {(type === 'menager' || type === 'admin') && (
                            <button onClick={handleGeneralDeleteAction} className="delete-action-button">
                                General Action
                            </button>
                        )}
                    
                    <button onClick={handleOpenModal} className="create-post-button">Create New Post</button>

                                            
                </div>
                            
                
            </div>
        </div>
    );
}

export default DeletePostsPage;
