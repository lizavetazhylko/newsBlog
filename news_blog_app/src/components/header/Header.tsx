import React from "react";
import { User } from "../user/User";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <User />
        </header>
    );
}

export { Header };