import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminUsers.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllUsers,
} from "../../action/useraction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";


const AdminUsers = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users , loading } = useSelector((state) => state.allUser);

  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error,]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 150,
      flex: 0.3,
    },
    {
        field: "role",
        headerName: "Role",
        type: "text",
        minWidth: 150,
        flex: 0.3,
      },

  ];

  const rows = [];

  users && users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>

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

export default AdminUsers;