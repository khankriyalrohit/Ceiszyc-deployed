import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminParticipation.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteParticipation,
  getAllParticipations,
} from "../../action/participationaction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";
import { DELETE_PARTICIPATION_RESET } from "../../constants/participationconstants";


const AdminParticipations = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, participation , loading } = useSelector((state) => state.participation);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllParticipations());
  }, [dispatch, alert, error,]);

  const columns = [
    { field: "id", headerName: "Participation ID", minWidth: 200, flex: 0.5 },

    {
      field: "username",
      headerName: "User",
      minWidth: 350,
      flex: 0.5,
    },
    {
      field: "eventname",
      headerName: "Event",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
    ];
   
  const rows = [];

  participation &&
    participation.forEach((item) => {
      rows.push({
        id: item._id,
        username: item.username,
        price: item.price,
        eventname: item.eventname,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PARTICIPATIONS</h1>

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

export default AdminParticipations;