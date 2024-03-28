import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {  BsYoutube, BsInstagram,BsFacebook ,BsTwitter} from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Us</Typography>
        <Typography>
          Tehri Hydro Development Coorporation - Institute of Hydropower Engineering & TechnoLogy,BagirathiPuram,Tehri - 249001
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="..." target="black">
          <BsFacebook />
        </a>
        <a href="https://youtube.com/@0toinfinity967" target="black">
          <BsYoutube />
        </a>
        <a href="https://instagram.com/khankriyal__rohit?igshid=MzNlNGNkZWQ4Mg==" target="black">
          <BsInstagram />
        </a>
        <a href="www.linkedin.com/in/rohit-khankriyal-359680242" target="black">
          <BsTwitter/>
        </a>
      </div>
    </div>
  );
};

export default Footer;