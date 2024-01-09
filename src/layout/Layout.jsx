import React from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
                <ToastContainer />
                <Header />
                <main style={{ minHeight: "70vh" }}>
                    {children}
                </main>

            </div>
        </div>
    );
};

Layout.defaultProps = {
    title: "Rapid-Quest",
    description: "Rapid-Quest",
    keywords: "mern,react,node,mongodb",
    author: "Tipu Sultan",
};

export default Layout;