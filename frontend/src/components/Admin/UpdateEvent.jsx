import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateEvent,
  getEventDetails
} from "../../action/eventaction";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import SideBar from "./Sidebar";
import { UPDATE_EVENT_RESET } from "../../constants/eventconstants";

const UpdateEvent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams()

  const { error, event } = useSelector((state) => state.getEventDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.singleEvent);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "TECH",
    "MECH",
    "ELEC",
    "Hackathon's",
    "Sports",
    "Others",
  ];

  const eventId = id;

  useEffect(() => {
    if (event && event._id !== eventId) {
      dispatch(getEventDetails(eventId));
    } else {
      setName(event.name);
      setDescription(event.description);
      setPrice(event.price);
      setCategory(event.category);
      setOldImages(event.images);
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
      alert.success("Event Updated Successfully");
      navigate("/admin/events");
      dispatch({ type: UPDATE_EVENT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,  
    isUpdated,
    eventId,
    event,
    updateError,
  ]);

  const updateEventSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateEvent(eventId, myForm));
  };

  const updateEventImagesChange = (e) => {
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
            onSubmit={updateEventSubmitHandler}
          >
            <h1>Update Event</h1>

            <div>
              <ImSpellCheck/>
              <input
                type="text"
                placeholder="Product Name"
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
                value={price}
              />
            </div>

            <div>
              <MdDescription/>

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdAccountTree/>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                onChange={updateEventImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
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

export default UpdateEvent;