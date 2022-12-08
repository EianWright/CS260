import { useState } from "react";
import axios from 'axios';
import { useOutletContext, Navigate } from "react-router-dom";

const Home = () => {
  const [props] = useOutletContext();

  const previousUserName = props.currUser.name;

  const [formNameField, setFormNameField] = useState(() => {return props.currUser.name;});

  if (props.goPastHome) {
    return (
      <Navigate to="/meme/random" />
    );
  }

  const addUser = async (username) => {
    try {
      if (previousUserName !== username) {
        let url = '/api/v4/user/' + username;
        const response = await axios.post(url);
        props.setCurrUser(response.data.user);
        props.setLastMeme({ id: "", url: "" })
      }
      props.setGoPastHome(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setFormNameField(event.target.value)
  }

  const handleSubmit = (event) => {
    addUser(formNameField);
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