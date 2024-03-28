import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateSponsor,
 getSponsorDetails
} from "../../action/sponsoraction";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import Sidebar from "./Sidebar";
import { UPDATE_SPONSOR_RESET } from "../../constants/sponsorconstants";

const UpdateSponsor = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams()

  const { error, sponsor } = useSelector((state) => state.getSponsorDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.singleSponsor);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

 

  const sponsorId = id;

  useEffect(() => {
    if (sponsor && sponsor._id !== sponsorId) {
      dispatch(getSponsorDetails(sponsorId));
    } else {
      setName(sponsor.name);
      setLink(sponsor.link);
      setType(sponsor.type);
      setOldImages(sponsor.images);
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
      alert.success("Sponsor Updated Successfully");
      navigate("/admin/sponsors");
      dispatch({ type: UPDATE_SPONSOR_RESET });
    }
  }, [
    dispatch,
    alert,
    error,  
    isUpdated,
    sponsorId,
    sponsor,
    updateError,
  ]);

  const updateSponsorSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("link", link);
    myForm.set("type", type);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateSponsor(sponsorId, myForm));
  };

  const updateSponsorImagesChange = (e) => {
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
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateSponsorSubmitHandler}
          >
            <h1>Update Sponsor</h1>

            <div>
              <ImSpellCheck/>
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
                placeholder="Sponsor Link"
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
                placeholder="Sponsor Name"
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
                onChange={updateSponsorImagesChange}
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

export default UpdateSponsor;