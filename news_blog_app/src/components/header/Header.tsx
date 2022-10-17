import React from "react";
import { Button } from "react-bootstrap";
import { UserCallAddress } from "../../constants";
import { IconMenu } from "../menu/IconMenu";
import { User } from "../user/User";
import "./Header.css";

const Header = () => {
    const handleLogOut = () => {
        localStorage.removeItem('jwtAccess');
        localStorage.removeItem('jwtRefresh');
        window.location.href = '/signin';
    }
    return (
        <header className="header">
            <IconMenu/>
            <User call={UserCallAddress.HEADER}/>
            <Button onClick={handleLogOut} style={{ marginLeft: 10 }}>
                Log out
            </Button>
        </header>
    );
}

export { Header };