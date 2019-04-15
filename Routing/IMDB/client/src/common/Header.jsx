import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    const { loggedIn, logoutHandler } = props;
    const username = sessionStorage.getItem('username');
    const isAdmin = sessionStorage.getItem('isAdmin');

    return (
        <header>
            <Link to="/" className="logo">Interactive IMDB</Link>
            <div className="header-right">
                <Link to="/">Home</Link>
                {loggedIn ?
                    <span>
                        <a href="javascript:void(0)">Welcome {username}!</a>
                        {isAdmin === 'true' && 
                            <span>
                                <Link to="/movie/create">Create</Link>
                            </span>
                        }
                        <a href="javascript:void(0)" onClick={logoutHandler}>Logout</a> </span> :
                    <span>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </span>
                }
            </div>
        </header>
    )
}

export default Header;
