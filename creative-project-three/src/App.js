import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import RandomMemePageProxy from './pages/RandomMemePageProxy';
import SelectedMemesPage from './pages/SelectedMemesPage';
import Home from './pages/Home'

function App() {

  

  return (
    <div className="App">
      <h1>Creative Project 3</h1>
      <BrowserRouter basename='/creative-project-three/build'>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="meme/random" element={<RandomMemePageProxy />} />
            <Route path='meme/gallery' element={<SelectedMemesPage />} />
            <Route path='meme/*' element={<Navigate to="random" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <footer className='repo-footer'>
        <a href='https://github.com/EianWright/CS260/tree/main/creative-project-three'>Creative Project Three GitHub Repo</a>
      </footer>
    </div>
  );
}

export default App;
