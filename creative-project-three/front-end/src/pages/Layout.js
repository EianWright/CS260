import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

const Layout = (props) => {

    const savedNavBar = <>
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/meme/random" className="nav-link" >Random Meme</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/meme/gallery" className="nav-link" >Meme Gallery</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>;

    const [currUserName, setCurrUserName] = useState("");
    const [goPastHome, setGoPastHome] = useState(false);

    useEffect(() => {
        if (goPastHome) {
            setGoPastHome(false);
            <Navigate to="meme/random" />
        }
    }, [goPastHome]);

    return (
        <>
            <Outlet context={[setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar]} />
        </>
    )
};

export default Layout;