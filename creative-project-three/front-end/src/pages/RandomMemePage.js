import axios from 'axios';
import Meme from '../Meme';
import { useState, useEffect, useRef } from 'react';
import Authentication from '../Authentication';
let authentication = new Authentication();

const RandomMemePage = (props) => {

    const [meme, setMeme] = useState({ id: "", url: "" });
    const [getMeme, setGetMeme] = useState(false);
    const dataFetchedRef = useRef(false);

    const getRandomMeme = async () => {
        try {
            let url = authentication.appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
            console.log(url);
            //let response = await axios.get(url);
            //let meme = response.data;
            let meme = { id: 97784, url: "https://preview.redd.it/69m9ev1bpb051.jpg?auto=webp&s=567dca2c8a02d7f6bf351ef47598a16eb7de1214" }
            setMeme(meme);
        }
        catch (error) {
            console.log("Error" + error);
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
            <p>This uses the <a href="https://humorapi.com/docs/#Random-Meme">Humor Api's random meme endpoint</a> to get a random meme.
                <button className='new-meme-button' onClick={() => {
                    setGetMeme(true);
                }}>New Meme</button>
            </p>
            <Meme key={meme.id} meme={meme} setMeme={setMeme} />
        </>
    );
}

export default RandomMemePage;