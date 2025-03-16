import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //useNavigate is a new version of the old hook "useHistory"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // we're importing 2 things from the firebase auth package 

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //[state variable, state setter function] = useState( initial state value )

    const navigate = useNavigate();

    const logIn = async () => {

        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            // this function should successfully login the user given that they entered the correct email and password 
            // if the correct email and password weren't entered then then it throws an error hence the try-catch block
            // below we're calling navigate with the path that we want to send the user to
            navigate('/articles'); //this is what we do when we want to send the user to the articles page upon log-in
        }catch(e){
            setError(e.message);
        }
        
    }
    
    return(
        <>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            {/* an error would pop up if you do something like not put a correct email or something */}
            <input 
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}/> 
                {/* e.target.value where value={email} */}
            <input 
                type="password" 
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
                {/* e.target.value where value={password} */}
            <button onClick={logIn}>Login In</button>
            <Link to="/create-account">Don't have an account already? Create one here</Link>
        </>
        
    );
}

export default LoginPage;