import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Authentication from './Authentication';
let authentication = new Authentication();

function App() {
  const [getMeme, setGetMeme] = useState(false);
  const dataFetchedRef = useRef(false);

  const getRandomMeme = async () => {
    try {
      let url = authentication.appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
      console.log(url);
    }
    catch (error) {
      console.log("Error");
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
      <button onClick={() => {
        setGetMeme(true);
        }}>Get Random Meme</button>
    </div>
  );
}

export default App;
