import {useState} from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddCommentForm = ({articleName, onArticleUpdated}) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const {user} = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken(); // we only want to send the token along with the request if the user is logged in and exists (there's a chance user object is null)
        const headers = token ? {authtoken: token} : {}; //check if token exists, if it doesn exist set header to token, otherwise set it to empty object
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText, 
        }, {
            headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return(
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {/* <label>
                Name:
                <input
                    value ={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
            </label> */}
            {/*above and below we created a 2-way binding between the input and the value of the state (aka the name and commentText);
            so basically we set our input to the value of our name and commentText states by saying value ={name} and with the onChange thing 
            we made sure that the name state is kept in sync whenever the value of our input has changed; so whenever the user types something in, it 
            immediatley calls setName with a new value in the input; this is a common pattern when working with react forms*/}
            {user && <p>You are posting as {user.email}</p>}
            {/* <label> don't need this since we're only using the text area*/}
                {/* Comment: */}
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" 
                    cols="50" />
            {/* </label> */}
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;