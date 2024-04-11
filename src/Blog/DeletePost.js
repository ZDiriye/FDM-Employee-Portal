import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./DeletePost.css";

function DeletePostsPage() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.post('http://localhost:3001/viewPost');
            if (response.data.length > 0) {
                setPosts(response.data);
                setMessage('');
            } else {
                setMessage(response.data.message || 'No posts found.');
                setPosts([]);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setMessage('Error fetching posts.');
        }
    };

    const togglePostSelection = (index) => {
        setSelectedPosts(selectedPosts.includes(index)
            ? selectedPosts.filter(i => i !== index)
            : [...selectedPosts, index]
        );
    };

    const handleDeleteSelectedPosts = async () => {
        const postIdsToDelete = selectedPosts.map(index => posts[index].postId);
        console.log(postIdsToDelete);
        try {
            const response = await axios.delete('http://localhost:3001/deletePost', { data: { postIdsToDelete }});
            console.log(response);
            setPosts(posts.filter((_, index) => !selectedPosts.includes(index)));
            setSelectedPosts([]);
            setMessage(response.data.message || 'Selected posts have been deleted.');
        } catch (error) {
            console.error("Error deleting posts:", error);
            setMessage(error.response?.data.message || 'Error occurred while deleting posts.');
        }
    };

    return (
        <div>
            <div className="delete-container">
                <div className="delete-blog">
                    <h1>News Feed Posts</h1>
                    {message && <p className="delete-message">{message}</p>}
                    {posts.map((post, index) => (
                        <div key={index} className="delete-post-container">
                            <input
                                type="checkbox"
                                checked={selectedPosts.includes(index)}
                                onChange={() => togglePostSelection(index)}
                            />
                            <p className="delete-post-title">{post.title}</p>
                            <p className="delete-post-content">{post.text}</p>
                            <div className='delete-author-date'>
                                <h2 className="delete-post-author">{post.name}</h2>
                                <p className="delete-post-date">
                                    {new Date(post.postDate).toLocaleDateString("en-US", {
                                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='delete-blog-buttons'>
                    <button onClick={handleDeleteSelectedPosts} className="delete-action-button">
                        Delete Selected Posts
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePostsPage;
