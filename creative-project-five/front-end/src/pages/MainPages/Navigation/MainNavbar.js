import React from "react";
import { Link } from "react-router-dom";

class MainNavbar extends React.Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-sm bg-light">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link onClick={e => this.props.setGoPastHome(false)} to="/" className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/meme/random" className="nav-link" >Random Meme</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/meme/mine" className="nav-link" >My Memes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/explore" className="nav-link" >Explore</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default MainNavbar;