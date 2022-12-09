import { useOutletContext, Navigate } from "react-router-dom";
import ProfilePage from './ProfilePage';
import MainNavbar from "./Navigation/MainNavbar";

const ProfilePageProxy = () => {
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
                <ProfilePage currUser={currUser} />
            </>
        )
    }
}

export default ProfilePageProxy