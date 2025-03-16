import {Link} from 'react-router-dom';

const ArticlesList = ({articles}) => {

    return (
        <>
            <h1>Articles</h1>
            {articles.map(article => (
                <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150)}...</p>
                </Link>
            ))}
        </>
        // article.name is basically the articeId
        /*whenever you use map in react or anything that will change the length and order of the list you need to 
        add a key prop to the outermost element in the list which is the Link element in this case which has a unique
        value; in our case each article has a unique ID or name property to identify the article for the URL parameter*/
    );

}

export default ArticlesList;