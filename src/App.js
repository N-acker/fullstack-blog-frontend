import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // we import these from the react-router-dom package that we installed 
import NavBar from './navBar'; //here we imported our nav bar componenet; same goes for each component below in the pages folder
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import ArticlesListPage from './pages/articlesListPage';
import ArticlePage from './pages/articlePage';
import NotFoundPage from './pages/notFoundPage';
import LoginPage from './pages/loginPage';
import CreateAccountPage from './pages/createAccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />
      <div id="page-body">
        {/*  here we are displaying the JSX tags of all our pages/components; 
        we want each of these pages to be rendered when we're at the correct route in our browser;
        we can do this by npm install react-router-dom*/}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/articles" element={<ArticlesListPage/>}/>
          <Route path="/articles/:articleId" element={<ArticlePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          <Route path="*" element={<NotFoundPage/>}></Route>
          {/* by setting the asterisk as the path basically says that we want to display that
          specific JSX component on every page except for the pages listed within the routes element*/}
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
