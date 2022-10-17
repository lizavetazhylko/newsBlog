import React from "react";
import { faBlog, faHouseUser, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MenuStateValues } from "../../constants/menuVars";
import { toggleMenu } from "../../redux/action_creators/menu_action_creators";
import { StoreState } from "../../redux/storeTypes";
import { User } from "../user/User";
import "./Menu.css";
import { UserCallAddress } from "../../constants";

const Menu = () => {
    const dispatch = useDispatch();
    const menuState = useSelector((state: StoreState) => state.menu.menuState);
    const currentUser = useSelector((state: StoreState) => state.user.user);
    const handleMenuOut = () => {
        dispatch(toggleMenu());
    };

    const handleClickUserBtn = () => {
        window.location.href = '/signin';
    };
    return (
        <div className={`menu${menuState === MenuStateValues.OPEN ? ' open' : ''}`} onClick={handleMenuOut}>
            <div className="menu-blur" />
            <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                <User call={UserCallAddress.MENU} />
                <nav className="menu-items">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <a href='/' style={{paddingRight: '5px'}}>Home</a> 
                            <FontAwesomeIcon icon={faHouseUser} />
                        </li>
                        <li className="menu-item">
                            <a style={{paddingRight: '5px'}} href='articles'>Articles</a> 
                            <FontAwesomeIcon icon={faNewspaper} />
                        </li>
                        <li className="menu-item">
                            <a href='blogs' style={{paddingRight: '5px'}}>Blogs</a> 
                            <FontAwesomeIcon icon={faBlog} />
                        </li>
                    </ul>
                    <Button style={{width: '100%'}} variant={currentUser ? 'danger' : 'primary'} onClick={handleClickUserBtn}>
                        {currentUser ? 'Log out' : 'SignIn'}
                    </Button>
                </nav>
            </div>
        </div>
    );
};

export { Menu }