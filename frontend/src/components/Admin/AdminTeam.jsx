import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminTeam.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteTeam,
  getAdminTeam,
} from "../../action/teamaction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";
import { DELETE_TEAM_RESET } from "../../constants/teamconstants";


const AdminTeam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, team , loading } = useSelector((state) => state.team);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleTeam);

  const deleteTeamHandler = (id) => {
    dispatch(deleteTeam(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Team Deleted Successfully");
      navigate("/admin/teams");
      dispatch({ type: DELETE_TEAM_RESET });
    }

    dispatch(getAdminTeam());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Team ID", minWidth: 200, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "contribution",
      headerName: "Contribution",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
        field: "year",
        headerName: "Year",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
    {
        field: "branch",
        headerName: "Branch",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
    {
      field: "year",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/team/${params.getValue(params.id, "id")}`}>
              <MdEditSquare/>
            </Link>

            <Button
              onClick={() =>
                deleteTeamHandler(params.getValue(params.id, "id"))
              }
            >
              <AiFillDelete/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  team &&
    team.forEach((item) => {
      rows.push({
        id: item._id,
        contribution: item.contribution,
        year: item.year,
        branch : item.branch,
        name: item.name,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL TEAMS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  );
};

export default AdminTeam;