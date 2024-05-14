import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './Layout.scss';

export default function Layout() {
    return (
        <>
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}