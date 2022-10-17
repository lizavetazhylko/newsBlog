import React from "react";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreState } from "../../redux/storeTypes";
import "./User.css";
import { UserCall } from "../../types/userTypes";
import { UserCallAddress } from "../../constants";

const User = (props: UserCall) => {
    const user = useSelector((state: StoreState) => state.user.user);
    if (!user) {
        return (
            <div className={`username ${props.call}`}>
                <FontAwesomeIcon icon={faUser} size={'2x'} color={'#fff'} />
            </div>
        )
    }
    const userName = user.username;
    if (!userName) {
        return (
            <div className={`username ${props.call}`}>
                <FontAwesomeIcon icon={faUser} size={'2x'} color={'#fff'} />
            </div>
        )
    }
    const firstNameLetter = userName.charAt(0).toUpperCase();
    const lastNameLetter = userName.charAt(userName.indexOf(' ') + 1).toUpperCase();
    //console.log('AAA = ', firstNameLetter + lastNameLetter);
    return (
        <div className={`username ${props.call}`}>
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