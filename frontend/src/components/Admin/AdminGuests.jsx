import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminGuests.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteGuest,
  getAdminGuest,
} from "../../action/guestaction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";
import { DELETE_GUEST_RESET } from "../../constants/guestconstants";


const AdminGuests = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, guest , loading } = useSelector((state) => state.guest);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleGuest);

  const deleteGuestHandler = (id) => {
    dispatch(deleteGuest(id));
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
      alert.success("Guest Deleted Successfully");
      navigate("/admin/guests");
      dispatch({ type: DELETE_GUEST_RESET });
    }

    dispatch(getAdminGuest());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Guest ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "field",
      headerName: "Field",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "date",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/guest/${params.getValue(params.id, "id")}`}>
              <MdEditSquare/>
            </Link>

            <Button
              onClick={() =>
                deleteGuestHandler(params.getValue(params.id, "id"))
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

  guest &&
    guest.forEach((item) => {
      rows.push({
        id: item._id,
        field: item.field,
        date: item.date,
        name: item.name,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL GUESTS</h1>

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

export default AdminGuests;