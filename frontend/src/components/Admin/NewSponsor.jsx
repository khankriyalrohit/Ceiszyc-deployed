import React, { Fragment, useEffect, useState } from "react";
import "./NewSponsor.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createSponsor } from "../../action/sponsoraction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import Sidebar from "./Sidebar";
import { NEW_SPONSOR_RESET } from "../../constants/sponsorconstants";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newSponsor);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Sponsor Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_SPONSOR_RESET });
    }
  }, [dispatch, alert, error,success]);

  const createSponsorSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("link", link);
    myForm.set("type", type);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createSponsor(myForm));
  };

  const createSponsorImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createSponsorSubmitHandler}
          >
            <h1>Create Sponsor</h1>

            <div>
              <ImSpellCheck />
              <input
                type="text"
                placeholder="Sponsor Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdDescription/>

              <textarea
                placeholder="Sponosor link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdAccountTree/>
              <input
                type="text"
                placeholder="Sponsor Type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createSponsorImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Event Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewEvent;