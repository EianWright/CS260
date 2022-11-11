import { useOutletContext, Navigate } from "react-router-dom";
import RandomMemePage from './RandomMeme'


const RandomMemePageProxy = (props) => {
    const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();

    if (currUserName === null) {
        return (
            <Navigate to="/" />
        );
    }
    else {
        return (
            <>
                {savedNavBar}
                <RandomMemePage currUserName={currUserName} />
            </>
        )
    }
}

export default RandomMemePageProxy;