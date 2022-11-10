import { useState } from "react";
import { BrowserRouter, useOutletContext, Routes, Route, Navigate } from "react-router-dom";

const Home = (props) => {
  const [setGoPastHome, goPastHome, setCurrUserName, currUserName, savedNavBar] = useOutletContext();

  const [formNameField, setFormNameField] = useState(currUserName);

  if (goPastHome) {
    return (
      <Navigate to="meme/random" />
    );
  }

  const handleChange = (event) => {
    setFormNameField(event.target.value)
  }

  const handleSubmit = (event) => {
    setCurrUserName(formNameField);
    setGoPastHome(true)
    event.preventDefault();
  }

  return (
    <div>
      <h2>Home</h2>
      <p>Please enter a name to access the rest of the application.</p>
      <form onSubmit={handleSubmit} >
        <label>
          Name:
          <input type="text" value={formNameField} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default Home;