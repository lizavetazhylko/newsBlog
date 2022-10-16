import React from "react";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreState } from "../../redux/storeTypes";
import "./User.css";

const User = () => {
    const user = useSelector((state: StoreState) => state.user.user);
    console.log('user =', user);
    if (!user) {
        return (
            <FontAwesomeIcon icon={faUser} size={'2x'} color={'#fff'} />
        )
    }
    const userName = user.username;
    //console.log('userName', userName);
    if (!userName) {
        return (
            <FontAwesomeIcon icon={faUser} size={'2x'} color={'#fff'} />
        )
    }
    const firstNameLetter = userName.charAt(0).toUpperCase();
    const lastNameLetter = userName.charAt(userName.indexOf(' ') + 1).toUpperCase();
    //console.log('AAA = ', firstNameLetter + lastNameLetter);
    return (
        <div className="username">
            <div className="username-fio">
                {firstNameLetter + lastNameLetter}
            </div>
            <div className="username-text">
                {userName}
            </div>
        </div>
    );

}

export { User };

interface IUser {
    userName: string,
}

export type { IUser };