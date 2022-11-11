import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Meme from "../Meme";

const SelectedMemesPage = (props) => {
    const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();
    const [memes, setMemes] = useState([]);

    const getMemes = async (currUserName) => {
      try {
        const response = await axios.get('/api/memes/meme/getall/' + currUserName);
        setMemes(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getMemes(currUserName);
    }, []);
  
    return (
        <>
        {savedNavBar}
        <h2>Selected Memes</h2>
        <div>
          {memes.map(meme => (
            <Meme meme={meme} key={meme.id} />
          ))}
        </div>
        </>
        );
  };
  
export default SelectedMemesPage;