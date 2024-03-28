import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AdminSponsor.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteSponsor,
  getAdminSponsor,
} from "../../action/sponsoraction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {MdEditSquare} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import Sidebar from "./Sidebar";
import { DELETE_SPONSOR_RESET } from "../../constants/sponsorconstants";


const AdminSponsor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, sponsor , loading } = useSelector((state) => state.sponsor);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.singleSponsor);

  const deleteSponsorHandler = (id) => {
    dispatch(deleteSponsor(id));
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
      alert.success("Sponsor Deleted Successfully");
      navigate("/admin/sponsors");
      dispatch({ type: DELETE_SPONSOR_RESET });
    }

    dispatch(getAdminSponsor());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Sponsor ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "link",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/sponsor/${params.getValue(params.id, "id")}`}>
              <MdEditSquare/>
            </Link>

            <Button
              onClick={() =>
                deleteSponsorHandler(params.getValue(params.id, "id"))
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

  sponsor &&
    sponsor.forEach((item) => {
      rows.push({
        id: item._id,
        type: item.type,
        link: item.link,
        name: item.name,
      });
    });

  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL SPOSNORS</h1>

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

export default AdminSponsor;