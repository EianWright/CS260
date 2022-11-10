import { useOutletContext } from "react-router-dom";

const SelectedMemesPage = (props) => {
    const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();
  
    return (
        <>
        {savedNavBar}
        <h2>Selected Memes</h2>
        </>
        );
  };
  
export default SelectedMemesPage;