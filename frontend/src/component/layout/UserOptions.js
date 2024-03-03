import { SpeedDial, SpeedDialAction } from "@mui/material";
import React, { Fragment, useState } from "react";
import "./Header.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert"

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();

    const options = [
        { icon: <ListAltIcon />, name: "Pedidos", func: orders },
        { icon: <PersonIcon />, name: "Perfil", func: account },
        { icon: <ExitToAppIcon />, name: "Sair", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Painel",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/dashboard");
    }

    function orders() {
        navigate("/orders");
    }

    function account() {
        navigate("/account");
    }

    function logoutUser() {
        // dispatch(logout());
        alert.success("Desconectado");
    }
    
    return <Fragment>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            icon={
                <img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />
            }
        >
            {options.map((item) => (
                <SpeedDialAction
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                />
            ))}
        </SpeedDial>
    </Fragment>;
};

export default UserOptions;