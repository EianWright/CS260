import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import MainLayout from "./MainPages/Navigation/MainLayout";
import RandomMemeProxy from "./MainPages/RandomMemeProxy";
import Home from "./MainPages/Home";
import MemesGalleryProxy from "./MainPages/MemesGalleryProxy";
import ExploreLayout from "./Explore/Navigation/ExploreLayout";
import AllMemes from "./Explore/AllMemes";

class MyRouter extends React.Component {
    render() {
        return (
            <BrowserRouter basename='/CS260/creative-project-five/front-end/build'>
                <Routes>
                    <Route path="/" element={<MainLayout />} >
                        <Route index element={<Home />} />
                        <Route path="explore" element={<ExploreLayout />}>
                                <Route index element={<AllMemes />} />
                        </Route>
                        <Route path="explore/*" element={<Navigate to="explore/" />} />
                        <Route path="meme/random" element={<RandomMemeProxy />} />
                        <Route path='meme/mine' element={<MemesGalleryProxy />} />
                        <Route path='meme/*' element={<Navigate to="random" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default MyRouter;