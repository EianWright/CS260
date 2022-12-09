import axios from "axios";
import { useEffect, useState } from "react";
import MemeGallery from "../Shared/MemeGallery";

const ProfilePage = (props) => {
  const currUserID = props.currUser.id;
  const [memes, setMemes] = useState([]);
  const [needToGetMemes, setNeedToGetMemes] = useState(true);

  const getMemes = async (currUserID) => {
    try {
      const response = await axios.get('/api/v4/meme/saved/' + currUserID);
      setMemes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (needToGetMemes) {
      getMemes(currUserID);
      setNeedToGetMemes(false);
    }
  }, [needToGetMemes]);

  const createMemeComponents = (memes) => {
    if (memes.length === 0) {
      return (
        <h5>Hi, {props.currUser.name}. It looks like you haven't saved any memes yet. As you generate random memes and save them, they will show up here.</h5>
      )
    }
    else {
      return (<>
      <MemeGallery providedMemes={memes} currUser={props.currUser} setNeedToGetMemes={setNeedToGetMemes} />
      </>)
    }
  }

  return (
    <>
      <h2>My Memes</h2>
      <h6>{props.currUser.name}</h6>
      <div>
        {createMemeComponents(memes)}
      </div>
    </>
  );
};

export default ProfilePage;