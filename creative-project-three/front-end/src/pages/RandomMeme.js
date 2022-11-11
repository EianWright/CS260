import axios from 'axios';
import Meme from '../Meme';
import { useState, useEffect, useRef } from 'react';


const RandomMemePage = (props) => {

    const [meme, setMeme] = useState({ id: "", url: "" });
    const [getMeme, setGetMeme] = useState(false);
    const dataFetchedRef = useRef(false);

    const getRandomMeme = async () => {
        try {
            let url = '/api/memes/meme/random';
            const response = await axios.get(url);
            let meme = response.data;
            setMeme(meme);
        }
        catch (error) {
            console.log("Error" + error);
        }
    }

    const saveMeme = async (meme, currUserName) => {
        try {
            let url = '/api/memes/meme/add/' + currUserName;
            console.log(url);
            const response = await axios.put(url, meme);
            console.log(response.data.username);
        } catch (error) {
            console.log(error);
        }
    }

    // This and the dataFetchedRef are only needed in development to avoid calling the API twice on page reload.
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getRandomMeme();
    })

    useEffect(() => {
        if (getMeme) {
            getRandomMeme()
            setGetMeme(false);
        }
    }, [getMeme]);

    return (
        <>
            <p>This uses the <a href="https://humorapi.com/docs/#Random-Meme">Humor Api's random meme endpoint</a> to get a random meme.</p>
            <div>
                <button className='meme-button' onClick={() => {
                    setGetMeme(true);
                }}>New Meme</button>
                <button className='meme-button' onClick={() => {
                    saveMeme(meme, props.currUserName);
                }}>Save Meme</button>
            </div>
            <div className="new-meme-container">
                <Meme key={meme.id} meme={meme} setMeme={setMeme} />
            </div>
        </>
    );
}

export default RandomMemePage;