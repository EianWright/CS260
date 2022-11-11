import React from "react";

function Meme(props) {

    return (
        <>
            <img alt="Random meme" src={props.meme.url} className="meme-image" />
        </>
    );
}

export default Meme;