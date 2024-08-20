import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo-banca-do-vovo.png";
import DashboardIcon from "@material-ui/icons/Dashboard.js";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore.js";
import ImportExportIcon from "@material-ui/icons/ImportExport.js";
import PostAddIcon from "@material-ui/icons/PostAdd.js";
import AddIcon from "@material-ui/icons/Add.js";
import PeopleIcon from "@material-ui/icons/People.js";
import ListAltIcon from "@material-ui/icons/ListAlt.js";
import RateReviewIcon from "@material-ui/icons/RateReview.js";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="logo banca do vovô" />
            </Link>
            <Link to="/admin/dashboard">
                <p><DashboardIcon /> Administração</p>
            </Link>
            <Link>
                <TreeView 
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Produtos">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="Todos" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Criar Novo" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p><ListAltIcon />Pedidos</p>
            </Link>
            <Link to="/admin/users">
                <p><PeopleIcon />Usuários</p>
            </Link>
            <Link to="/admin/reviews">
                <p><RateReviewIcon />Avaliações</p>
            </Link>
        </div>
    );
}

export default Sidebar;