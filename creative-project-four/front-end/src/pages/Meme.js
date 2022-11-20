import React from "react";
import axios from 'axios';

function Meme(props) {
    const currUserID = props.userID;
    const meme = props.meme;
    const setNeedToGetMemes = props.setNeedToGetMemes;

    const deleteMeme = async (userID, memeID, setNeedToGetMemes) => {
        try {
            let url = '/api/v4/meme/saved/' + userID + '/' + memeID;
            console.log(url);
            const response = await axios.delete(url);
            if (response.status !== 404) {
                setNeedToGetMemes(true);
            }
        } catch (error) {
            // TODO: PUT IN AN ERROR COMPONENT
            console.log(error);
        }
    }

    function getTimesViewed() {
        let timesViewed = meme.timesViewed;
        if (timesViewed === 1) {
            return timesViewed + " view";
        }
        else {
            return timesViewed + " views"
        }
    }

    if (meme.url === "" || meme.url === undefined || meme.url === null) {
        return (
            <></>
        );
    }
    if (setNeedToGetMemes !== undefined) {
        return (
            <div className="meme-with-button">
                <img alt="Random meme" src={meme.url} className="meme-image" />
                <div className="button-text-container">
                    <p>{getTimesViewed()}</p>
                    <button onClick={e => deleteMeme(currUserID, meme.id, setNeedToGetMemes)} className="remove-meme-button">Remove</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <img alt="Random meme" src={meme.url} className="meme-image" />
            </>
        );
    }
}

export default Meme;