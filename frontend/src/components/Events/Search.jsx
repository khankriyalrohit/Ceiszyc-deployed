import React, { useState, Fragment } from "react";
import "./Search.css";
import {useNavigate} from "react-router-dom"


const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/events/${keyword}`);
      } else {
        navigate("/events");
      }
    };
  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search
