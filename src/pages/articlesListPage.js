import ArticlesList from '../components/articlesList';
import articles from "./articleContent";

const ArticlesListPage = () => {
    return (
       
        <>
           <ArticlesList articles={articles}/>
        </>
        
    );
}

export default ArticlesListPage;