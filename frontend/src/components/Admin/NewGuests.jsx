import React, { Fragment, useEffect, useState } from "react";
import "./NewGuest.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createGuest } from "../../action/guestaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import Sidebar from "./Sidebar";
import { NEW_GUEST_RESET } from "../../constants/guestconstants";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Guest added Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_GUEST_RESET });
    }
  }, [dispatch, alert, error,success]);

  const createGuestSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("date", date);
    myForm.set("field", field);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createGuest(myForm));
  };

  const createGuestImagesChange = (e) => {
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
            onSubmit={createGuestSubmitHandler}
          >
            <h1>Add Guest</h1>

            <div>
              <ImSpellCheck />
              <input
                type="text"
                placeholder="Guest Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdAttachMoney/>
              <input
                type="text"
                placeholder="Date"
                required
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>

            <div>
              <MdDescription/>

              <textarea
                placeholder="Guest Field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createGuestImagesChange}
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