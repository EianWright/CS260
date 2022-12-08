import axios from 'axios';
import Meme from '../Shared/Meme';
import MessageDisplay from '../Shared/MessageDisplay';
import { useState, useEffect, useRef } from 'react';


const RandomMemePage = (props) => {

    const [meme, setMeme] = useState({ id: "", url: "" });
    const [getMeme, setGetMeme] = useState(false);
    const [message, setMessage] = useState({ messageType: 0, messageText: "" });
    const dataFetchedRef = useRef(false);

    const getRandomMeme = async () => {
        try {
            setMessage({ messageType: 0, messageText: "" });
            let url = '/api/v4/meme/random';
            const response = await axios.get(url);
            let meme = response.data;
            setMeme(meme);
            props.setLastMeme(meme);
        }
        catch (error) {
            setMessage({ messageType: 1, messageText: "Sorry, there was an error retrieving a random meme." });
        }
    }

    const saveMeme = async (meme, currUserID) => {
        try {
            let url = '/api/v4/meme/saved/' + currUserID + '/' + meme.id;
            const response = await axios.post(url, meme);
            if (response.status === 204) {
                setMessage({ messageType: 1, messageText: "Meme has already been saved to your gallery!" });
            }
            else {
                setMessage({ messageType: 2, messageText: "Meme successfully saved!" });
            }
        } catch (error) {
            let message = "Error: " + error.message;
            setMessage({ messageType: 1, messageText: message });

        }
    }

    // This and the dataFetchedRef are only needed in development to avoid calling the API twice on page reload.
    useEffect(() => {
        if (dataFetchedRef.current) {
            return;
        }
        else {
            dataFetchedRef.current = true;
            if (props.lastMeme.url !== "") {
                setMeme(props.lastMeme);
            }
        }
    }, [props.lastMeme]);

    useEffect(() => {
        if (getMeme) {
            getRandomMeme()
            setGetMeme(false);
        }
    }, [getMeme]);

    const getWelcomeMessage = () => {
        if (props.lastMeme.url === "" || props.lastMeme.url === undefined || props.lastMeme.url === null) {
            return(
                <p>Welcome {props.currUser.name}. This uses the <a href="https://humorapi.com/docs/#Random-Meme">Humor Api's random meme endpoint</a> to get a random meme. Click "New Meme" to get started.</p>
            );
        }
        else {
            return(
                <></>
            );
        }
    }

    const getSaveButton = () => {
        if (meme.url === "" || meme.url === undefined || meme.url === null) {
            return (
                <></>
            )
        }
        else {
            return (
                <button className='meme-button' onClick={() => {
                    saveMeme(meme, props.currUser.id);
                }}>Save Meme</button>
            );
        }
    }

    return (
        <>
            {getWelcomeMessage()}
            <div>
                <button className='meme-button' onClick={() => {
                    setGetMeme(true);
                }}>New Meme</button>
                {getSaveButton()}
            </div>
            <MessageDisplay message={message} />
            <div className="new-meme-container">
                <Meme key={meme.id} meme={meme} setMeme={setMeme} />
            </div>
        </>
    );
}

export default RandomMemePage;