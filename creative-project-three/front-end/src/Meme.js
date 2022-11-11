import React from "react";
import { useState } from "react";

function Meme(props) {
    const [username] = useState(props.username);
    const [meme] = useState(props.meme);

    if (props.showButton === true) {
        return (
            <div className="meme-with-button">
                <img alt="Random meme" src={meme.url} className="meme-image" />
                <button className="remove-meme-button">Remove</button>
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