import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./pages/MainPages/Navigation/MainLayout";
import RandomMemeProxy from './pages/MainPages/RandomMemeProxy';
import Home from './pages/MainPages/Home'
import MemesGalleryProxy from './pages/MainPages/MemesGalleryProxy';

function App() {
  return (
    <div className="App">
      <h1>Creative Project 5</h1>
      <BrowserRouter basename='/CS260/creative-project-five/front-end/build'>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="meme/random" element={<RandomMemeProxy />} />
            <Route path='meme/mine' element={<MemesGalleryProxy />} />
            <Route path='explore/' element={< MainLayout />} >

            </Route>
            <Route path='meme/*' element={<Navigate to="random" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <footer className='repo-footer'>
        <a href='https://github.com/EianWright/CS260/tree/main/creative-project-five'>Creative Project Five GitHub Repo</a>
      </footer>
    </div>
  );
}

export default App;
