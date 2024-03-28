import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminEvents.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteEvent,
  getAdminEvent,
} from "../../action/eventaction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";
import { DELETE_EVENT_RESET } from "../../constants/eventconstants";


const AdminEvents = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, event , loading } = useSelector((state) => state.event);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleEvent);

  const deleteEventHandler = (id) => {
    dispatch(deleteEvent(id));
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
      alert.success("Event Deleted Successfully");
      navigate("/admin/events");
      dispatch({ type: DELETE_EVENT_RESET });
    }

    dispatch(getAdminEvent());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/event/${params.getValue(params.id, "id")}`}>
              <MdEditSquare/>
            </Link>

            <Button
              onClick={() =>
                deleteEventHandler(params.getValue(params.id, "id"))
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

  event &&
    event.forEach((item) => {
      rows.push({
        id: item._id,
        category: item.category,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL EVENTS</h1>

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

export default AdminEvents;