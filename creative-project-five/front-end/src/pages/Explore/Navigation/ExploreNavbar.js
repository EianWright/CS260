import React from "react";
import { Link } from "react-router-dom";

class MainNavbar extends React.Component {
    render() {
        return (
            <>
                <h1 className="explore-title">Explore!</h1>
                <nav className="navbar navbar-expand-sm bg-light">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/explore/memes/all" className="nav-link" >Memes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/explore/people/all" className="nav-link">People</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default MainNavbar;