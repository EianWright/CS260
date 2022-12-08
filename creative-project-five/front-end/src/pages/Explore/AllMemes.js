import { useOutletContext, Navigate } from "react-router-dom";
import ExploreNavbar from './Navigation/ExploreNavbar';
import MainNavbar from "./Navigation/ExploreNavbar";

const AllMemes = () => {
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
        <h2>All Memes</h2>
      </>
    )
  }
}

export default AllMemes;