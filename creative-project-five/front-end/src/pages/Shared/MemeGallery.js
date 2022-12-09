import Meme from "../Shared/Meme";

const MemeGallery = (props) => {
  const providedMemes = props.providedMemes;
  const currUserID = props.currUser.id;
  const setNeedToGetMemes = props.setNeedToGetMemes;

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
    if (memes === undefined) {
      return <></>
    }
    let length = memes.length;
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

  return (
    <>
      <div>
        {createMemeComponents(providedMemes)}
      </div>
    </>
  );
};

export default MemeGallery;