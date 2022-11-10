import React from "react";

function Meme(props) {
    
    return (
        <div>
            <p>{props.meme.id}</p>
            <p>{props.meme.url}</p>
            <img src={props.meme.url} className="meme-image" />
        </div>
    );
}

export default Meme;