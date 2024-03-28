import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../Images/logo.png";
import { FaUserAlt,FaSearch } from "react-icons/fa";
import {AiFillContacts} from "react-icons/ai"

const Header = () => {
  return (
    <ReactNavbar
      navColor1="hsl(219, 48%, 8%)"
      navColor2="hsl(219, 48%, 8%)"
      burgerColor="hsl(250, 100%, 75%)"
      burgerColorHover="hsl(250, 100%, 75%)"
    //   logo={logo}
      logoWidth="250px"
      logoHoverColor="hsl(250, 100%, 75%)"
      nav2justifyContent="space-around"
      nav3justifyContent="space-around"
      nav4justifyContent = "flex-start"
      link1Text="Home"
      link2Text="Events"
      link3Text="Sponsors"
      link4Text="Team"
      link1Url="/"
      link2Url="/events"
      link3Url="/sponsors"
      link4Url="/team"
      link1ColorHover="white"
      link1Color="HSL(250, 100%, 75%)"
      link1Size="1.5rem"
      link1Padding="3vmax"
      profileIcon={true}
      searchIcon = {true}
      cartIcon = {true}
      cartIconUrl = "/about"
      profileIconUrl = "/login"
      ProfileIconElement={FaUserAlt}
      CartIconElement={AiFillContacts}
      SearchIconElement = {FaSearch}
      cartIconColor="HSL(250, 100%, 75%)"
      profileIconColor="HSL(250, 100%, 75%)"
      searchIconColor = "HSL(250, 100%, 75%)"
      cartIconMargin = "1vmax"
      profileIconColorHover="white"
      cartIconColorHover="white"
      searchIconColorHover="white"
    />
  );
};

export default Header;