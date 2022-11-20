import { useOutletContext, Navigate } from "react-router-dom";
import MemesGallery from './MemesGallery'
import Navbar from './Navbar'


const MemesGalleryProxy = () => {
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
                <Navbar setGoPastHome={props.setGoPastHome} />
                <MemesGallery currUser={currUser} />
            </>
        )
    }
}

export default MemesGalleryProxy;