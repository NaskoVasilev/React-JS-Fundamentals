import React, {Fragment} from 'react';
import AdminHeaderView from '../components/adminHeaderView';

function Header(props) {
    let isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    let username = sessionStorage.getItem('username');

    return (
        <header>
            <nav id="main-menu">
                <ul>
                    {username != null ?
                        <Fragment>
                            <li id="menu" className="active has-sub"><a href="#"><span>Menu</span></a>
                                <ul>
                                    {isAdmin ? <AdminHeaderView/> : ''}
                                    <li className="has-sub"><a href="/user/takenBooks"><span>Taken books</span></a></li>
                                    <li className="has-sub"><a href="/user/favouriteBooks"><span>Favourite books</span></a></li>
                                    <li className="has-sub"><a href="/user/readBooks"><span>Read books</span></a></li>
                                    <li><a href="/user/notification/all">Notifications</a></li>
                                </ul>
                            </li>
                            <li><span>Welcome, username!</span></li>
                            <li><a href="javascript:void(0)" onClick={props.logoutHandler}>Logout</a></li>

                            <li><a href="/book/all">Books</a></li>
                            <li id="search-from">
                                <form method="post" action="/book/search">
                                    <input type="submit" value="Search"/>
                                    <input type="text" name="tags"/>
                                </form>
                            </li>
                        </Fragment>
                        :
                        <Fragment>
                            <li><a href="/"><span>Home</span></a></li>
                            <li><a href="/users/login">Login</a></li>
                            <li><a href="/users/register">Register</a></li>
                        </Fragment>

                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header