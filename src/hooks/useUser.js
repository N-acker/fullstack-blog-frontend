/*the whole idea of this custom hook is that inside any component we can just type something like const user = useUser() and 
immediatley have access to  that user object and see if the user has logged in, see what the user's ID is and see what their email is, etc. */
// we're doing this because we want to know how to udjust our page based on whether the user logged in or not
// for example we don't want to let a user to click un upvote more than once 
/* the useUser custom hook lets our components get immediate access to the currently logged-in user and if the user isn't  currently
logged-in, then they'll know by the fact that the user won't exist*/
// custom hooks in react are just hooks that have hooks inside of them 

import {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const useUser = () => {
    const [user, setUser] = useState(null); //the initial value is null because when we're still figuring out if the user is logged-in the value is null
    const [isLoading, setIsLoading] = useState(true); /* in order to know whether the user state above is null just cause we haven't loaded the user yet
    or if the state is null cause the user isn't logged in, we need to keep track of whether or not we already loaded it and that's what the is loading
    state variable is for*/

    /* the onAuthStateChanged works by calling it and we can pass a callback to it and whenever a user changes there authState either by logging in or out
     or creating an account, the callback that we passed to it will be called; below is what that looks like*/

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => { // this is either gonna be a firebase user object or it will be null
            setUser(user); //if it's a firebase user object that will mean that the user is logged in and if it's null that means the user isn't logged in
            setIsLoading(false);
        }); // unsubscribe is a function that our onAuthStateChanged function retutns that will allow us to cancel that subscription an avoid memory leaks

        return unsubscribe; /*this calls the unsubscribe function when the component that's using this useUser hook is removed from the DOM like
        if the user navigates from the page for example*/
     }, []);/* the second argument to useEffect is the empty array which makes sure that we only subscibe to authState changes when the component first calls
     this useUser hook so it won't get called whenever the component updates*/

     return{user, isLoading}; //we return these 2 states so the user can access them 
}

export default useUser;
