import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateGuest,
  getGuestDetails
} from "../../action/guestaction";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import SideBar from "./Sidebar";
import { UPDATE_GUEST_RESET } from "../../constants/guestconstants";

const UpdateGuest = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams()

  const { error, guest } = useSelector((state) => state.getGuestDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.singleGuest);

  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const guestId = id;

  useEffect(() => {
    if (guest && guest._id !== guestId) {
      dispatch(getGuestDetails(guestId));
    } else {
      setName(guest.name);
      setDate(guest.date);
      setField(guest.field);
      setOldImages(guest.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Guest Updated Successfully");
      navigate("/admin/guest");
      dispatch({ type: UPDATE_GUEST_RESET });
    }
  }, [
    dispatch,
    alert,
    error,  
    isUpdated,
    guestId,
    guest,
    updateError,
  ]);

  const updateGuestSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("field", field);
    myForm.set("date", date);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateGuest(guestId, myForm));
  };

  const updateGuestImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateGuestSubmitHandler}
          >
            <h1>Update Guest</h1>

            <div>
              <ImSpellCheck/>
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
                placeholder="Product Description"
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
                onChange={updateGuestImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Guest Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
             Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateGuest;