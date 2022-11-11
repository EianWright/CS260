import React from "react";
import axios from 'axios';

function Meme(props) {
    const username = props.username;
    const meme = props.meme;
    const setNeedToGetMemes = props.setNeedToGetMemes;

    const deleteMeme = async (username, meme, setNeedToGetMemes) => {
        try {
            console.log(meme);
            const response = await axios.delete('/api/memes/meme/' + username + '/' + meme.id);
            if (response.status !== 404) {
                setNeedToGetMemes(true);
            }
        } catch (error) {
            // TODO: PUT IN AN ERROR COMPONENT
            console.log(error);
        }
    }

    if (setNeedToGetMemes !== undefined) {
        return (
            <div className="meme-with-button">
                <img alt="Random meme" src={meme.url} className="meme-image" />
                <button onClick={e => deleteMeme(username, meme, setNeedToGetMemes)} className="remove-meme-button">Remove</button>
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