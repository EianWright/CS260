import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Authentication from './Authentication';
import Meme from './Meme';
let authentication = new Authentication();

function App() {
  const [getMeme, setGetMeme] = useState(false);
  const [meme, setMeme] = useState({ id:"", url:"" });
  const dataFetchedRef = useRef(false);

  const getRandomMeme = async () => {
    try {
      let url = authentication.appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
      console.log(url);
      //let response = await axios.get(url);
      //let meme = response.data;
      let meme = {id:97784,url:"https://preview.redd.it/69m9ev1bpb051.jpg?auto=webp&s=567dca2c8a02d7f6bf351ef47598a16eb7de1214"}
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
    <div className="App">
      <h1>Hello.</h1>
      <button onClick={() => {
        setGetMeme(true);
        }}>Get Random Meme</button>
      <Meme key={meme.id} meme={meme} setMeme={setMeme} />
    </div>
  );
}

export default App;
