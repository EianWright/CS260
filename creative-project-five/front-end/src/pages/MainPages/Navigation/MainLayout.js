import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

const MainLayout = () => {

    const [currUser, setCurrUser] = useState({ id:"", name:"" });
    const [lastMeme, setLastMeme] = useState({ id:"", url:""});
    const [goPastHome, setGoPastHome] = useState(false);

    useEffect(() => {
        if (goPastHome) {
            <Navigate to="/meme/random" />
        }
    }, [goPastHome, currUser]);

    function getProps() {
        return {
            goPastHome: goPastHome,
            currUser: currUser,
            lastMeme: lastMeme,
            setLastMeme: setLastMeme,
            setGoPastHome: setGoPastHome,
            setCurrUser: setCurrUser
        };
    }

    return (
        <>
            <Outlet context={[getProps()]} />
        </>
    )
};

export default MainLayout