import { useOutletContext, Navigate } from "react-router-dom";
import MemesGallery from './MemesGallery'


const MemesGalleryProxy = (props) => {
    const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();

    if (currUserName === null || currUserName === undefined || goPastHome !== true) {
        return (
            <Navigate to="/" />
        );
    }
    else {
        return (
            <>
                {savedNavBar}
                <MemesGallery currUserName={currUserName} />
            </>
        )
    }
}

export default MemesGalleryProxy;