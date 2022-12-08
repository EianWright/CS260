import axios from "axios";
import { useEffect, useState } from "react";
import Meme from "../Shared/Meme";

const SelectedMemesPage = (props) => {
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

  const getMemeRow = (memes, lower, upper) => {
    let first = lower;
    let second = lower + 1;
    let third = lower + 2;
    let fourth = lower + 3;

    if (fourth < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[second]} key={memes[second].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[third]} key={memes[third].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[fourth]} key={memes[fourth].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else if (third < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[second]} key={memes[second].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[third]} key={memes[third].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else if (second < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[second]} key={memes[second].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else if (first < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} userID={currUserID} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else {
      return (<></>)
    }
  }

  const createMemeComponents = (memes) => {
    let length = memes.length;
    if (memes.length === 0) {
      return (
        <h5>Hey, {props.currUser.name}. It looks like you haven't saved any memes yet. As you generate random memes and save them, they will show up here.</h5>
      )
    }
    else {
      let rows = [];
      for (let i = 0; i < length; i += 4) {
        let upper = i + 4;
        if (upper > length) {
          upper = length;
        }
        rows.push(getMemeRow(memes, i, upper));
      }
      return (<>
        {rows}
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

export default SelectedMemesPage;