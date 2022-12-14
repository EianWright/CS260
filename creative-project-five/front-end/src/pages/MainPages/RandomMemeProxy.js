import { useOutletContext, Navigate } from "react-router-dom";
import RandomMemePage from './RandomMeme'
import MainNavbar from "./Navigation/MainNavbar";

const RandomMemePageProxy = () => {
    const [props] = useOutletContext();
    
    const currUser = props.currUser;
    if (currUser === null || currUser === undefined || currUser === "" || currUser.id === null || 
        currUser.id === undefined || currUser.id === "" || props.goPastHome !== true) {
        return (
            <Navigate to="/" />
        );
    }
    else {
        return (
            <>
                <MainNavbar setGoPastHome={props.setGoPastHome} />
                <RandomMemePage currUser={currUser} lastMeme={props.lastMeme} setLastMeme={props.setLastMeme} />
            </>
        )
    }
}

export default RandomMemePageProxy;