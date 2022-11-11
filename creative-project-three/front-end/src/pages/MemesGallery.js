import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Meme from "../Meme";

const SelectedMemesPage = (props) => {
  const currUserName = props.currUserName;
  const [memes, setMemes] = useState([]);
  const [needToGetMemes, setNeedToGetMemes] = useState(true);

  const getMemes = async (currUserName) => {
    try {
      const response = await axios.get('/api/memes/meme/getall/' + currUserName);
      setMemes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (needToGetMemes) {
      getMemes(currUserName);
      setNeedToGetMemes(false);
    }
  }, [needToGetMemes]);

  const getMemeRow = (memes, lower, upper) => {
    let first = lower;
    let second = lower + 1;
    let third = lower + 2;
    
    if (third < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[second]} key={memes[second].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[third]} key={memes[third].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else if (second < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
          <Meme meme={memes[second]} key={memes[second].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
        </div>
      )
    }
    else if (first < upper) {
      return (
        <div className="saved-memes-row">
          <Meme meme={memes[first]} key={memes[first].id} username={currUserName} setNeedToGetMemes={setNeedToGetMemes} />
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
        <h5>No memes saved yet. Generate some random memes and save some to have them show up here.</h5>
      )
    }
    else {
      let rows = [];
      for (let i = 0; i < length; i += 3) {
        let upper = i + 3;
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
      <h2>Saved Memes</h2>
      <div>
        {createMemeComponents(memes)}
      </div>
    </>
  );
};

export default SelectedMemesPage;