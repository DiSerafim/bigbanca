import React from "react"
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";

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

            <Footer />
        </Router>
    );
}

export default App;
