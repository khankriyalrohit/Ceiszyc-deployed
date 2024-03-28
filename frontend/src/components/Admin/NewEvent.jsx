import React, { Fragment, useEffect, useState } from "react";
import "./NewEvent.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createEvent } from "../../action/eventaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {GrStorage} from "react-icons/gr";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import Sidebar from "./Sidebar";
import { NEW_EVENT_RESET } from "../../constants/eventconstants";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "TECH",
    "MECH",
    "ELEC",
    "Hackathon's",
    "Sports",
    "Others",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Event Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_EVENT_RESET });
    }
  }, [dispatch, alert, error,success]);

  const createEventSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createEvent(myForm));
  };

  const createEventImagesChange = (e) => {
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
            onSubmit={createEventSubmitHandler}
          >
            <h1>Create Event</h1>

            <div>
              <ImSpellCheck />
              <input
                type="text"
                placeholder="Event Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdAttachMoney/>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <MdDescription/>

              <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdAccountTree/>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createEventImagesChange}
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