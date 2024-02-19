import React from "react"
import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";

function App() {
    React.useEffect(() => {
        webFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Montserrat"]
            }
        });
    }, []);

    return (
        <Router>
            <Header />
        </Router>
    );
}

export default App;
