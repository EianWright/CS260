import axios from "axios";
import { useEffect, useState, useRef } from "react";
import MemeGallery from "../Shared/MemeGallery";

const ProfilePage = (props) => {
  const currUserID = props.currUser.id;
  const [allRetrievedMemes] = useState([]);
  const [memesIndex, setMemesIndex] = useState(-1);
  const [memes, setMemes] = useState([]);
  const [needToGetMemes, setNeedToGetMemes] = useState(false);
  const [hasMoreMemes, setHasMoreMemes] = useState(true);
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const dataFetchedRef = useRef(false);

  const getMemes = async (currUserID) => {
    try {
      //:userid/:numbermemes/:sortorder/:lastmemeid
      let lastMemeID = "NONE";
      console.log(memes);
      console.log(memesIndex);
      if (memesIndex > -1 && allRetrievedMemes.length > 0) {
        lastMemeID = allRetrievedMemes[memesIndex][allRetrievedMemes[memesIndex].length - 1].id;
      }
      console.log(lastMemeID);
      const response = await axios.get('/api/v4/meme/saved/' + currUserID + '/12/' + sortOrder + '/' + lastMemeID);
      allRetrievedMemes.push(response.data.memes);
      setMemes(response.data.memes);
      setHasMoreMemes(response.data.hasMore);
      setMemesIndex((allRetrievedMemes.length - 1));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (needToGetMemes !== false) {
      console.log(needToGetMemes);
      setNeedToGetMemes(false);
      let memesLength = memes.length;
      let deletedElements = allRetrievedMemes.splice(memesIndex);
      console.log(memesLength);
      if (!hasMoreMemes && (memesLength > 1 || deletedElements.length > 1)) {
        setHasMoreMemes(true);
      }
      goBack(memesIndex);
    }
  }, [needToGetMemes]);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    else {
      dataFetchedRef.current = true;
      if (memes.length === 0) {
        getMemes(currUserID);
      }
    }
  }, [memes]);

  const goBack = (currentIndex) => {
    console.log(currentIndex);
    if (currentIndex === 0) {
      if (allRetrievedMemes.length > 0) {
        console.log("This")
        setMemes(allRetrievedMemes[0]);
        setMemesIndex(0);
      }
      else {
        console.log("That")
        setMemes([]);
        setMemesIndex(-1);
        getMemes(currUserID);
      }
    }
    else if (currentIndex < 0) {
      setMemes([]);
      setMemesIndex(-1);
      if (hasMoreMemes) {
        getMemes(currUserID);
      }
    }
    else {
      setMemesIndex(currentIndex - 1);
      console.log(memesIndex);
      console.log(allRetrievedMemes);
      console.log(allRetrievedMemes[currentIndex - 1]);
      setMemes(allRetrievedMemes[currentIndex - 1]);
    }
  }

  function getBackButton() {
    return (
      <button onClick={e => goBack(memesIndex)} >Back</button>
    )
  }

  const getNextFromRetrievedArray = (currentIndex) => {
    setMemesIndex(currentIndex + 1);
    setMemes(allRetrievedMemes[currentIndex + 1]);
  }

  function getNextButton() {
    if (memesIndex < allRetrievedMemes.length - 1) {
      return (
        <button onClick={e => getNextFromRetrievedArray(memesIndex)} >Next</button>
      )
    }
    else {
      return (
        <button onClick={e => getMemes(currUserID)} >Next</button>
      )
    }
  }

  function getNextAndBackButtons() {
    let showBackButton = (memesIndex > 0);
    let showNextButton = (hasMoreMemes || memesIndex < allRetrievedMemes.length - 1);
    if (!showBackButton && !showNextButton) {
      return (
        <></>
      )
    }
    else if (showBackButton && showNextButton) {
      return (
        <>
          <div>
            {getBackButton()}
            {getNextButton()}
          </div>
        </>
      );
    }
    else if (showBackButton) {
      return (
        <>
          <div>
            {getBackButton()}
          </div>
        </>
      )
    }
    else if (showNextButton) {
      return (
        <>
          <div>
            {getNextButton()}
          </div>
        </>
      )
    }
    else {
      return (
        <></>
      )
    }
  }

  const createMemeComponents = (memes) => {
    if (memes.length === 0) {
      return (
        <h5>Hi, {props.currUser.name}. It looks like you haven't saved any memes yet. As you generate random memes and save them, they will show up here.</h5>
      )
    }
    else {
      return (<>
        <MemeGallery providedMemes={memes} currUser={props.currUser} setNeedToGetMemes={setNeedToGetMemes} />
        {getNextAndBackButtons()}
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