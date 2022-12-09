import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import MainLayout from "./MainPages/Navigation/MainLayout";
import ProfilePageProxy from "./MainPages/ProfilePageProxy";
import RandomMemeProxy from "./MainPages/RandomMemeProxy";
import Home from "./MainPages/Home";
import ExploreLayout from "./Explore/Navigation/ExploreLayout";
import AllMemes from "./Explore/AllMemes";
import AllPeople from "./Explore/AllPeople";

class MyRouter extends React.Component {
    render() {
        return (
            <BrowserRouter basename='/CS260/creative-project-five/front-end/build'>
                <Routes>
                    <Route path="/" element={<MainLayout />} >
                        <Route index element={<Home />} />
                        <Route path="explore/" element={<ExploreLayout />}>
                                <Route index element={<Navigate to="memes/all" />} />
                                <Route path="memes/all" element={<AllMemes />} />
                                <Route path="people/all" element={<AllPeople />} />
                        </Route>
                        <Route path="explore/*" element={<Navigate to="explore/" />} />
                        <Route path="meme/random" element={<RandomMemeProxy />} />
                        <Route path='meme/mine' element={<ProfilePageProxy />} />
                        <Route path='meme/*' element={<Navigate to="random" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default MyRouter;