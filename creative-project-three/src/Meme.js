import React from "react";

function Meme(props) {
    
    return (
        <div className="meme-container">
            <img alt="Random meme" src={props.meme.url} className="meme-image" />
        </div>
    );
}

export default Meme;