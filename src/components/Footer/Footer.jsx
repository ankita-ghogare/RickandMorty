import { useState, useEffect } from "react";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [totalCharacters, setTotalCharacters] = useState("");
  const [location, setLocation] = useState("");
  const [episodes, setEpisodes] = useState("");
  let responseLocation = null;
  let responseEpisodes = null;
  let responseCharacters = null;

  const fetchData = async () => {
    responseCharacters = await axios.get(
      `https://rickandmortyapi.com/api/character`
    );
    responseLocation = await axios.get(
      `https://rickandmortyapi.com/api/location`
    );
    responseEpisodes = await axios.get(
      `https://rickandmortyapi.com/api/episode`
    );
  };

  useEffect(() => {
    fetchData()
      .then(() => {
        setTotalCharacters(responseCharacters.data?.info?.count);
        setLocation(responseLocation.data?.info?.count);
        setEpisodes(responseEpisodes.data?.info?.count);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="footer_wrapper">
      <ul>
        <li>CHARACTERS: {totalCharacters} </li>
        <li>LOCATIONS: {location}</li>
        <li>EPISODES: {episodes}</li>
      </ul>
    </div>
  );
};

export default Footer;
