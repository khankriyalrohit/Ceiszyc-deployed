import React from "react";
import "./Sidebar.css";
import {GiSaloon} from 'react-icons/gi'
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import {BiExpand} from "react-icons/bi";
import {MdOutlinePostAdd} from "react-icons/md";
import {BsDatabaseFillAdd} from "react-icons/bs";
import {MdImportExport} from "react-icons/md";
import {FaListAlt} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {BsPeopleFill} from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
     <GiSaloon/>
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <RxDashboard /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<BiExpand />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Events">
            <Link to="/admin/events">
              <TreeItem nodeId="2" label="All" icon={<MdOutlinePostAdd />} />
            </Link>

            <Link to="/admin/event/new">
              <TreeItem nodeId="3" label="Create" icon={<BsDatabaseFillAdd />} />
            </Link>
          </TreeItem>
        </TreeView>


      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<BiExpand />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Sponsors">
            <Link to="/admin/sponsors">
              <TreeItem nodeId="2" label="All" icon={<MdOutlinePostAdd />} />
            </Link>

            <Link to="/admin/sponsor/new">
              <TreeItem nodeId="3" label="Create" icon={<BsDatabaseFillAdd />} />
            </Link>
          </TreeItem>
        </TreeView>


      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<BiExpand />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Guests">
            <Link to="/admin/guests">
              <TreeItem nodeId="2" label="All" icon={<MdOutlinePostAdd />} />
            </Link>

            <Link to="/admin/guest/new">
              <TreeItem nodeId="3" label="Create" icon={<BsDatabaseFillAdd />} />
            </Link>
          </TreeItem>
        </TreeView>


      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<BiExpand />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Team">
            <Link to="/admin/team">
              <TreeItem nodeId="2" label="All" icon={<MdOutlinePostAdd />} />
            </Link>

            <Link to="/admin/team/new">
              <TreeItem nodeId="3" label="Create" icon={<BsDatabaseFillAdd />} />
            </Link>
          </TreeItem>
        </TreeView>


      </Link>

      <Link to="/admin/participations">
        <p>
          <FaListAlt />
          Participation
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <BsPeopleFill /> Users
        </p>
      </Link>

      

    </div>
  );
};

export default Sidebar;