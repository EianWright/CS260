import { useState } from "react";
import axios from 'axios';
import { useOutletContext, Navigate } from "react-router-dom";
import MessageDisplay from "../Shared/MessageDisplay";

const Home = () => {
  const [props] = useOutletContext();

  const previousUserName = props.currUser.name;

  const [message, setMessage] = useState({ messageType: 0, messageText: "" });
  const [formNameField, setFormNameField] = useState(() => { return props.currUser.name; });

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
    if (message.messageType !== 0) {
      setMessage({ messageType: 0, messageText: "" });
    }
    setFormNameField(event.target.value);
  }

  const handleSubmit = (event) => {
    if (formNameField === null || formNameField === undefined || formNameField === '') {
      setMessage({ messageType: 1, messageText: "Please enter a name."});
    }
    else {
      addUser(formNameField);
    }
    event.preventDefault();
  }

  return (
    <div>
      <h2>Home</h2>
      <p>Please enter a name to access the rest of the application.</p>
      <MessageDisplay message={message} />
      <form onSubmit={handleSubmit} className='name-form' >
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