import React from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/storeTypes";
import { MenuStateValues } from "../../constants/menuVars";
import { toggleMenu } from "../../redux/action_creators/menu_action_creators";

const IconMenu = () => {
    const menuState = useSelector((state: StoreState) => state.menu.menuState);
    const dispatch = useDispatch();
    const handleIconMenu = () => {
        dispatch(toggleMenu());
    };
    //console.log('menuState =', menuState);
    const icon = <FontAwesomeIcon icon={menuState === MenuStateValues.CLOSE ? faBars : faXmark} size={'2x'} color={'#fff'}/>
    return (
        <div className="header__icon-menu" onClick={handleIconMenu}>
            {icon}
        </div>   
    );
};

export { IconMenu };

