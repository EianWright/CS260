import { useOutletContext, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ExploreNavbar from "./ExploreNavbar";
import MainNavbar from "../../MainPages/Navigation/MainNavbar"

const ExploreLayout = () => {
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
                <ExploreNavbar />
                <Outlet context={[props]} />
            </>
        )
    }
};

export default ExploreLayout