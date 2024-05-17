import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
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