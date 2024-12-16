import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const lineState = {
        labels: ["Valor Inicial", "Valor ganho"],
        datasets: [
            {
                label: "Total",
                backgroundColor: ["crimson"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const doughnutState = {
        labels: ["Esgotado", "Disponível"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component="h1">Administração</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>Total em Compras <br/> R$ 200,00</p>
                    </div>

                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Produtos</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Pedidos</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Usuários</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;