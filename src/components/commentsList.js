// the {comments} parameter represent the comments that we want to display 

const CommentsList = ({ comments }) => {

    return (
        <>
            <h3>Comments: </h3>
            
            {comments.map(comment => (
                <div className="comment" key={comment.postedBy + ':' + comment.text}>
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.text}</p>
                </div>
            ))}
        </>
    );

    // we're wrapping everything into a react fragment since our component can't return more than one top level element
     // below we're just gonna map through all the comments that were passed as a prop
    //  we use the className attribute in the div for css styling purposes
    
    
};

export default CommentsList;