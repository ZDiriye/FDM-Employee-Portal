import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useToken from '../useToken';
import Modal from './TeamModal'; // Import the Modal component
import "./ViewTeamPostPage.css";
import DeletePostsPage from './DeleteTeamPost';
import CreateTeamPostForm from './CreateTeamPostForm';



import NavigationBar from '../NavBar';

function TeamPostsPage() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState(''); // For handling messages like "No posts found."
    const { token } = useToken(); // Use the token from your custom hook
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);

    let teamId = '';
    let name = '';
    let surname = '';
    let type= '';


    if (token) {
        const decodedToken = jwtDecode(token);
        // Assume the token has a claim 'userId', change to 'username' if necessary
        teamId = decodedToken.TeamID;
        name = decodedToken.Name; // Adjust the key based on your token structure
        surname = decodedToken.Surname;
        type = decodedToken.Type;
    }


    // create new post pop up

    const handleOpenTeamModal = () => {
        setShowTeamModal(true);
    };
    const handleCloseTeamModal = async () => {
        setShowTeamModal(false);
        await fetchPosts();
    };

    
    // delete post pop up
    const handleOpenDeleteTeamModal = () => {
        setShowDeleteTeamModal(true);
    };
    const handleCloseDeleteTeamModal = async () => {
        setShowDeleteTeamModal(false);
        await fetchPosts();
    };

    const handleGeneralDeleteAction = () => {
        handleOpenDeleteTeamModal(); // Open the delete posts modal
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.post('http://localhost:3001/teamViewPost', {teamId}); // Match this endpoint to your backend
            // Check if response contains posts data directly
            console.log("this is the response: ", response);
            if (response.data.length > 0) {
                console.log(response.data);
                //console.log(type);
                setPosts(response.data);
                setMessage('');
            } else if (!response.data.validation) {
                // Handle case with message but no posts
                console.log("this is the TeamID :", teamId);
                if (!teamId){
                    
                    const noPostsMessage = "you need to be assigned to a team to view the Team News Feed";
                    setMessage(noPostsMessage);
                    setPosts([]);
                }
                else{
                    const noPostsMessage = response.data.message || 'No posts found.';
                    setMessage(noPostsMessage);
                    setPosts([]);
                }
                 
                 // Ensure posts are cleared if there are no posts
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
                <h1>Team News Feed</h1>
                
                 
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
                <p className="message"></p>
            )}
            </div>
            

                <div className='Blog-buttons'>
                    
                    {(type === 'manager' || type === 'admin') && (
                            <button onClick={handleGeneralDeleteAction} className="delete-action-button">
                                Delete Post
                            </button>
                        )}

                    <button onClick={handleOpenTeamModal} className="create-post-button">Create New Post</button>
                
                </div>

                 {/*The Modal for creating a new post*/}
                 <Modal show={showTeamModal} onClose={handleCloseTeamModal}>
                    <CreateTeamPostForm onClose={handleCloseTeamModal} />
                </Modal>
               

                 {/*The Modal for deleting posts*/}
                <Modal show={showDeleteTeamModal} onClose={handleCloseDeleteTeamModal}>
                    <DeletePostsPage onClose={handleCloseDeleteTeamModal} />
                </Modal>
                                            
                </div>
        </div>
    );
}

/*









*/

export default TeamPostsPage;
