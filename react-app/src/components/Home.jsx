import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () =>  {
    const auth = useSelector(state=>state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    
    if (!auth.login) {
        return <Redirect to='/' />;
      }
    
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push("/");
    }
    return (
        <main>
            <p>STRONA GŁÓWNA</p>
            <button onClick={logout}>Logout</button>  
        </main>
    )  
}

export default Home;

