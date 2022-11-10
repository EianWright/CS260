import axios from 'axios';
import Meme from '../Meme';
import { useState, useEffect, useRef } from 'react';
import { useOutletContext, Navigate } from "react-router-dom";
import Authentication from '../Authentication';
import Layout from './Layout';
import RandomMemePage from './RandomMemePage'
let authentication = new Authentication();

const RandomMemePageProxy = (props) => {
    const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();

    if (currUserName === null) {
        return (
            <Navigate to="/" />
        );
    }
    else {
        return (
            <>
                {savedNavBar}
                <RandomMemePage currUserName={currUserName} />
            </>
        )
    }
}

export default RandomMemePageProxy;