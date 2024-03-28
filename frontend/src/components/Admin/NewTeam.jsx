import React, { Fragment, useEffect, useState } from "react";
import "./NewTeam.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createTeam } from "../../action/teamaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import Sidebar from "./Sidebar";
import { NEW_TEAM_RESET } from "../../constants/teamconstants";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newTeam);

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [contribution, setContribution] = useState("");
  const [year, setYear] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Team Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_TEAM_RESET });
    }
  }, [dispatch, alert, error,success]);

  const createTeamSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("year", year);
    myForm.set("branch", branch);
    myForm.set("contribution", contribution);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createTeam(myForm));
  };

  const createTeamImagesChange = (e) => {
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
            onSubmit={createTeamSubmitHandler}
          >
            <h1>Create Team</h1>

            <div>
              <ImSpellCheck />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdDescription/>

              <textarea
                placeholder="Contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <MdAccountTree/>
              <input
                type="number"
                placeholder="Year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div>
              <MdAccountTree/>
              <input
                type="text"
                placeholder="Branch"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>


            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createTeamImagesChange}
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