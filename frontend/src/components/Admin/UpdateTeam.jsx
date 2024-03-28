import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateTeam,
  getTeamDetails
} from "../../action/teamaction";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdAccountTree} from "react-icons/md";
import {MdDescription} from "react-icons/md";
import {ImSpellCheck} from "react-icons/im";
import {MdAttachMoney} from "react-icons/md";
import SideBar from "./Sidebar";
import { UPDATE_TEAM_RESET } from "../../constants/teamconstants";

const UpdateTeam = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams()

  const { error, team } = useSelector((state) => state.getTeamDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.singleTeam);

  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState("");
  const [contribution, setContribution] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const teamId = id;

  useEffect(() => {
    if (team && team._id !== teamId) {
      dispatch(getTeamDetails(teamId));
    } else {
      setName(team.name);
      setYear(team.year);
      setBranch(team.branch);
      setContribution(team.contribution);
      setOldImages(team.images);
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
      alert.success("Team Updated Successfully");
      navigate("/admin/team");
      dispatch({ type: UPDATE_TEAM_RESET });
    }
  }, [
    dispatch,
    alert,
    error,  
    isUpdated,
    teamId,
    team,
    updateError,
  ]);

  const updateTeamSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("year", year);
    myForm.set("branch", branch);
    myForm.set("contribution", contribution);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateTeam(teamId, myForm));
  };

  const updateTeamImagesChange = (e) => {
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
            onSubmit={updateTeamSubmitHandler}
          >
            <h1>Update Team</h1>

            <div>
              <ImSpellCheck/>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdAttachMoney/>
              <input
                type="number"
                placeholder="Year"
                required
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </div>

            <div>
              <ImSpellCheck/>
              <input
                type="text"
                placeholder="Branch"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateTeamImagesChange}
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

export default UpdateTeam;