import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //useNavigate is a new version of the old hook "useHistory"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // we're importing 2 things from the firebase auth package allowing us to create an account 



const CreateAccountPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); //for re-entering a password to confirm that this is it
    const [error, setError] = useState('');
    //[state variable, state setter function] = useState( initial state value )

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if(password != confirmPassword){ //makes sure the 2 passwords entered match
                setError('Password and Confirm Password do not match');
                return;
            }

            // if they match then we call the function below from firebase auth to create the account using the email and password 
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles'); //after the account is created we send the user to the articles page
        }catch(e){
            setError(e.message);
        }
    }

    
    
    return(
        <>
            <h1>Create Account</h1>
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
            <input 
                type="password" 
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}/>
                {/* e.target.value where value={password} */}     
            
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account? Log in here</Link>
        </>
        
    );
}

export default CreateAccountPage;