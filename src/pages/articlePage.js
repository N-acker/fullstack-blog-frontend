import { useState, useEffect  } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './notFoundPage';
import CommentsList from '../components/commentsList';
import AddCommentForm from '../components/addCommentForm';
import useUser from '../hooks/useUser';
import articles from './articleContent';

const ArticlePage = () => {


  /* below we added a state called article info to our article page component*/
  /* in useState we pass in the initial state vlaue and it returns an array with 2 values,
   the first being the state value and the second being a function that changes the state value*/
  //  we pass in an intial JSON object into usestate and it returns the object and a fucntion that changes it
  /* we added a state called article info to our articlePage component, now we have to make a request to the server and set
  our set our articleInfo state using the setArticleState function to the data we get back from the server and this replaces
  the default value that we passed into the useState function*/
  
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const {canUpvote} = articleInfo;

  // const params = useParams();
     /*params is an object whos keys are the names that we've given URL parameters; if we go to the App components and
    take a look at the routes, the route that has the ArticlePage component shows that for /:articleId the key is  gonna be
    articleId and the value is gonna be whatever the current string at that part of the URL*/
    // const articleId = params.articleId; -> or we can shorten this to use object destructuring as seen below 
    // const { articleId } = params; -> or we can skip creating the params = useParams() thing and do as below
    // below we get articleId directly from useParams
    /*okay so basically App.js has a route for this current function called ArticlePage; within the route there is a URL path  and
    within that URL path is a URL parameter defined by the dynamic segment :articleId which is extracted; here is how it would work: we would be on the 
    articlesListPage page and when we click on a certain article it would navigate to the articleListComponent which would append the /articleName 
    articleId aka the URL paramater and we know which article we are retreiving since we passed in the article content into the articlesListComponent; 
    after the link in the articlesListPage/articlesList (component) is clicked we navigate to a new URL with the added /:articleId part which is a 
    parmeter which is then able to be retreived automatically by useParams() since it automatically detects URL parameters */ 
    const { articleId } = useParams();    

    const {user, isLoading} = useUser(); /* now with our useUser custom hook, we now have access to whether or not the user is logged in and we can 
    use it to hide certain things in our JSX*/


  /* in useEffect we pass in 2 arugments, the first being a function and the second indicating
    when the function is called; it doesn't use array destructuring and thus returns nothing*/
  // an empty array passed as the second argument means that the function will be executley the moment the articlePage component is rendered 
  /* useEffect allows us to add logic to our components that'll be ecevuted outside the component rendering and thus
  useEffect hooks are where we would want to put most of our logic for doing things like loading data from a server*/
  // the useEffect hook also runs when the articlePage component updates 
  // here we use the axios library to make requsts to the server 
      useEffect( () => {
        const loadArticleInfo = async () => {
          const token = user && await user.getIdToken(); // we only want to send the token along with the request if the user is logged in and exists (there's a chance user object is null)
          const headers = token ? {authtoken: token} : {}; //check if token exists, if it doesn exist set header to token, otherwise set it to empty object
          // now that we have the token we are gonna include it in our request
          const response = await axios.get(`/api/articles/${articleId}`, {
              headers,
          }); // we added  "proxy": "http://localhost:8000/", in package.json so now URL can be shortened
          const newArticleInfo = response.data;
          setArticleInfo(newArticleInfo); 
        }

        //to make sure that the canUpvote property is set correctly, we only want to load the article info once we're done figuring out when the user has logged in
        if(!isLoading){
          loadArticleInfo();
        }
        
      }, [isLoading, user]); //these are the dependencies for the userEffect hook to make sure everything happens at the right time 
  /* we included articleId in the dpendecy array because By including articleId in the dependency array, 
  you ensure that the useEffect hook re-runs whenever the articleId changes. 
  This is important because the effect depends on articleId to fetch the correct article data. */

  
    const article = articles.find(article => article.name === articleId);
    /*above we are using the built in JS find function to find the article based on some criteria; we pass into the find function
    that we want to find an article from an articles array whos name proprty is equal to articleId if there is one, if there isn't one we'll deal
    with it later on*/

    // here we are constructing a button so that the client can request that the server add an upvote 
    const addUpvote = async () =>{
      const token = user && await user.getIdToken(); // we only want to send the token along with the request if the user is logged in and exists (there's a chance user object is null)
      const headers = token ? {authtoken: token} : {}; //check if token exists, if it doesn exist set header to token, otherwise set it to empty object
      const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
      const updatedArticle = response.data;
      setArticleInfo(updatedArticle);
    }



    if(!article){
      return <NotFoundPage/>
    }

/* if the use isn't logged in, instead of displaying this upvote button we're gonna want to display some sort of button that says login to upvote; also
if the user isn't logged in we want to hide the AddCommentForm and instead displaying a button saying "login if you want to add a comment"*/

    return (

        <>
         <h1>{article.title}</h1>

         <div className = "upvotes-section">

            {user 
              ?<button onClick = {addUpvote}>{canUpvote ? 'Upvote': 'Already Upvoted'}</button> // if the user exists aka is logged in we display the upvote button
              : <button>Log in to upvote</button> // if the user doesn't exist aka isn't logged in we display login button
            } 

           <p>This article has {articleInfo.upvotes} upvote(s)</p>
         </div>

         {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))} 
          {user
            ?<AddCommentForm
              articleName={articleId}
              onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} /> // if the user exists aka is logged in we display the comment form
            :<button>Log in to add a comment</button> // if the user doesn't exist aka isn't logged in we display a login to add comment button
          }
          
          <CommentsList comments={articleInfo.comments} />
        </>
    // above we are looping through all the articles in our content
    // we've wrapped everything into a react fragment since you can't return more than one top level element from a component (we have h1 and p)
    
    );
}

export default ArticlePage;